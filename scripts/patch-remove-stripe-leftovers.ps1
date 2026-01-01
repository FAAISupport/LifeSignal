param(
  [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Info($m){ Write-Host "[INFO] $m" -ForegroundColor Cyan }
function Warn($m){ Write-Host "[WARN] $m" -ForegroundColor Yellow }

function Backup-File([string]$path) {
  if (!(Test-Path $path)) { return }
  $stamp = Get-Date -Format "yyyyMMdd_HHmmss"
  $bak = "$path.bak_patch_stripe_$stamp"
  Copy-Item $path $bak -Force
  Info "Backup: $path -> $bak"
}

function Replace-In-File([string]$path, [string]$find, [string]$replace) {
  if (!(Test-Path $path)) { Warn "Missing file: $path"; return }
  $content = Get-Content $path -Raw
  if ($content -notmatch [regex]::Escape($find)) {
    Info "No match in $path for '$find' (skipped)"
    return
  }
  Backup-File $path
  $new = $content.Replace($find, $replace)
  if ($DryRun) {
    Info "DRYRUN: would replace in ${path}: '$find' -> '$replace'"

  } else {
    Set-Content -Path $path -Value $new -Encoding UTF8
    Info "Patched: $path"
  }
}

function Regex-Remove([string]$path, [string]$pattern, [string]$label) {
  if (!(Test-Path $path)) { Warn "Missing file: $path"; return }
  $content = Get-Content $path -Raw
  $new = [regex]::Replace($content, $pattern, "", [System.Text.RegularExpressions.RegexOptions]::Singleline)
  if ($new -eq $content) {
    Info "No '$label' block found in $path (skipped)"
    return
  }
  Backup-File $path
  if ($DryRun) {
    Info "DRYRUN: would remove '$label' block(s) from $path"
  } else {
    Set-Content -Path $path -Value $new -Encoding UTF8
    Info "Removed '$label' block(s) in: $path"
  }
}

function Write-File([string]$path, [string]$content) {
  $dir = Split-Path $path -Parent
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  if (Test-Path $path) { Backup-File $path }
  if ($DryRun) {
    Info "DRYRUN: would write file: $path"
  } else {
    Set-Content -Path $path -Value $content -Encoding UTF8
    Info "Wrote: $path"
  }
}

function Remove-File([string]$path) {
  if (!(Test-Path $path)) { Info "Already missing (ok): $path"; return }
  Backup-File $path
  if ($DryRun) {
    Info "DRYRUN: would delete: $path"
  } else {
    Remove-Item -Force $path
    Info "Deleted: $path"
  }
}

# ---------------- PATCHES ----------------

Info "Patching Stripe leftovers (DryRun=$($DryRun.IsPresent))"

# 1) Dashboard portal links -> Paddle
Replace-In-File ".\app\dashboard\page.tsx" "/api/stripe/portal" "/api/paddle/portal"

# 2) Copy changes: Stripe -> Paddle in privacy + pricing
Replace-In-File ".\app\privacy\page.tsx" "Payments are processed through Stripe." "Payments are processed through Paddle."
Replace-In-File ".\components\PricingTable.tsx" "Checkout is secured by Stripe." "Checkout is secured by Paddle."

# 3) Remove lib/stripe.ts (Stripe SDK helper)
Remove-File ".\lib\stripe.ts"

# 4) Replace lib/plans.ts with Paddle-ready stub (no Stripe env keys)
$plansStub = @'
export type BillingInterval = "monthly" | "annual";
export type PlanKey = "checkin" | "assurance" | "facility";

export type PlanConfig = {
  key: PlanKey;
  name: string;
  monthlyLabel: string;
  annualLabel: string;
  paddle?: {
    monthlyPriceId?: string;
    annualPriceId?: string;
  };
};

export const PLANS: PlanConfig[] = [
  { key: "checkin", name: "Daily Check-In", monthlyLabel: "$/mo", annualLabel: "$/yr" },
  { key: "assurance", name: "Assurance", monthlyLabel: "$/mo", annualLabel: "$/yr" },
  { key: "facility", name: "Facility", monthlyLabel: "$/mo", annualLabel: "$/yr" },
];

export function getPaddlePriceId(plan: PlanKey, interval: BillingInterval) {
  const p = PLANS.find(x => x.key === plan);
  if (!p?.paddle) return undefined;
  return interval === "monthly" ? p.paddle.monthlyPriceId : p.paddle.annualPriceId;
}
'@
Write-File ".\lib\plans.ts" $plansStub

# 5) Remove Stripe env schema + throw from lib/env.ts (best-effort)
# Remove "Stripe (optional...)" comment block + STRIPE_* schema lines (common pattern)
Regex-Remove ".\lib\env.ts" "(?ms)^\s*//\s*Stripe.*?\r?\n(?:(?:.*STRIPE_.*\r?\n)+)?" "Stripe schema section"

# Remove STRIPE_* process.env mapping lines
Regex-Remove ".\lib\env.ts" "(?ms)^\s*STRIPE_.*?:\s*process\.env\.[A-Z0-9_]+\s*,\s*\r?\n" "Stripe env mapping lines"

# Remove the explicit 'Stripe billing is not configured' missing-check block
Regex-Remove ".\lib\env.ts" "(?ms)^\s*const\s+missing\s*=\s*\[\s*\r?\n(?:.*?\r?\n)*?\s*\]\.filter\(Boolean\);\s*\r?\n\s*if\s*\(missing\.length.*?\r?\n\s*\}\s*\r?\n" "Stripe missing-check block"
Regex-Remove ".\lib\env.ts" "(?ms)throw new Error\(`Stripe billing is not configured\..*?\);\s*\r?\n" "Stripe throw line"

# 6) Post-check: find remaining 'stripe' references (excluding backups, node_modules, .next)
Info "Scanning for remaining Stripe references..."
$hits = Get-ChildItem -Recurse -File |
  Where-Object {
    $_.FullName -notmatch "node_modules|\.next|\.git" -and
    $_.Name -notmatch "\.bak" -and
    $_.Extension -in @(".ts",".tsx",".js",".jsx",".mjs",".cjs")
  } |
  Select-String -Pattern "(?i)\bstripe\b|@stripe/|STRIPE_|/api/stripe" |
  ForEach-Object {
    [PSCustomObject]@{ Path=$_.Path; LineNumber=$_.LineNumber; Line=$_.Line.Trim() }
  }

if ($DryRun) {
  Info "DRYRUN: hits found: $($hits.Count)"
} else {
  $out = ".\scripts\post-patch-stripe-hits.csv"
  if (!(Test-Path ".\scripts")) { New-Item -ItemType Directory -Path ".\scripts" | Out-Null }
  $hits | Sort-Object Path, LineNumber | Export-Csv -NoTypeInformation -Path $out -Encoding UTF8
  Info "Wrote remaining-hit report: $out (hits: $($hits.Count))"
}

Warn "Done. If post-patch report still has hits, paste it here and I’ll tell you exactly what to change."
