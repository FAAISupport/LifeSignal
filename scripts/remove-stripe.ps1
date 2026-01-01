# scripts/remove-stripe.ps1
# Safe Stripe removal for Next.js repo (routes, deps, env vars) + usage report.
# Usage:
#   powershell -ExecutionPolicy Bypass -File .\scripts\remove-stripe.ps1 -DryRun
#   powershell -ExecutionPolicy Bypass -File .\scripts\remove-stripe.ps1
# Optional:
#   -KeepRoutes  (keeps app/api/stripe)

param(
  [switch]$DryRun,
  [switch]$KeepRoutes
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Info([string]$m) { Write-Host "[INFO] $m" -ForegroundColor Cyan }
function Warn([string]$m) { Write-Host "[WARN] $m" -ForegroundColor Yellow }

function Backup-File([string]$path) {
  if (!(Test-Path $path)) { return }
  $stamp = Get-Date -Format "yyyyMMdd_HHmmss"
  $bak = "$path.bak_remove_stripe_$stamp"
  if ($DryRun) { Info "DRYRUN: would backup $path -> $bak"; return }
  Copy-Item $path $bak -Force
  Info "Backed up: $path -> $bak"
}

function Remove-Path([string]$path) {
  if (!(Test-Path $path)) { return }
  if ($DryRun) { Info "DRYRUN: would remove $path"; return }
  Remove-Item -Recurse -Force $path
  Info "Removed: $path"
}

function Remove-Stripe-Routes() {
  if ($KeepRoutes) { Info "KeepRoutes enabled; not deleting app/api/stripe"; return }
  $stripeDir = Join-Path (Get-Location) "app\api\stripe"
  if (Test-Path $stripeDir) { Remove-Path $stripeDir } else { Info "No app/api/stripe folder found." }
}

function Remove-Stripe-Deps() {
  $pkgPath = Join-Path (Get-Location) "package.json"
  if (!(Test-Path $pkgPath)) { Warn "No package.json found; skipping deps removal."; return }

  Backup-File $pkgPath
  $pkg = Get-Content $pkgPath -Raw | ConvertFrom-Json

  $stripeDeps = @("stripe","@stripe/stripe-js","@stripe/react-stripe-js","stripe-event-types")
  $depGroups  = @("dependencies","devDependencies","peerDependencies","optionalDependencies")
  $removed = New-Object System.Collections.Generic.List[string]

  foreach ($g in $depGroups) {
    $prop = $pkg.PSObject.Properties[$g]
    if ($null -eq $prop -or $null -eq $prop.Value) { continue }

    foreach ($d in $stripeDeps) {
      if ($prop.Value.PSObject.Properties.Name -contains $d) {
        $prop.Value.PSObject.Properties.Remove($d) | Out-Null
        $removed.Add("${g}:$d") | Out-Null
      }
    }
  }

  $json = $pkg | ConvertTo-Json -Depth 50
  if ($DryRun) {
    Info "DRYRUN: would write updated package.json (removed: $($removed.Count))"
  } else {
    Set-Content -Path $pkgPath -Value $json -Encoding UTF8
    if ($removed.Count -gt 0) { Info ("Removed deps: " + ($removed -join ", ")) } else { Info "No Stripe deps found." }
  }
}

function Remove-Stripe-Env() {
  $root = Get-Location
  $envFiles = @(
    (Join-Path $root ".env"),
    (Join-Path $root ".env.local"),
    (Join-Path $root ".env.development"),
    (Join-Path $root ".env.production"),
    (Join-Path $root ".env.production.local")
  )

  $patterns = @(
    '^STRIPE_.*=',
    '^NEXT_PUBLIC_STRIPE_.*='
  )

  foreach ($f in $envFiles) {
    if (!(Test-Path $f)) { continue }
    Backup-File $f

    $lines = Get-Content $f
    $out = New-Object System.Collections.Generic.List[string]
    $removedCount = 0

    foreach ($line in $lines) {
      $rm = $false
      foreach ($p in $patterns) {
        if ($line -match $p) { $rm = $true; break }
      }
      if ($rm) { $removedCount++ } else { $out.Add($line) | Out-Null }
    }

    if ($DryRun) {
      Info "DRYRUN: would remove $removedCount Stripe env lines from $f"
    } else {
      Set-Content -Path $f -Value $out -Encoding UTF8
      Info "Updated: $f (removed $removedCount Stripe env lines)"
    }
  }
}

function Write-Stripe-Usage-Report() {
  $root = Get-Location
  $outPath = Join-Path $root "scripts\stripe-usage-report.csv"
  $outDir = Split-Path $outPath -Parent

  $patterns = '(?i)\bstripe\b|@stripe/|STRIPE_|stripe\.com'

  $files = Get-ChildItem -Recurse -File |
    Where-Object {
      $_.FullName -notmatch "node_modules|\.next|\.git" -and
      $_.Name -notmatch "\.bak"
    } |
    Where-Object { $_.Extension -in @(".ts",".tsx",".js",".jsx",".mjs",".cjs") }

  if ($files.Count -eq 0) {
    Info "No source files found to scan."
    return
  }

  $hits = Select-String -Path $files.FullName -Pattern $patterns -AllMatches |
    ForEach-Object {
      [PSCustomObject]@{
        Path       = $_.Path
        LineNumber = $_.LineNumber
        Line       = $_.Line.Trim()
      }
    }

  if ($DryRun) {
    Info "DRYRUN: would write Stripe usage report to $outPath (hits: $($hits.Count))"
    return
  }

  if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
  $hits | Sort-Object Path, LineNumber | Export-Csv -NoTypeInformation -Path $outPath -Encoding UTF8
  Info "Wrote Stripe usage report: $outPath (hits: $($hits.Count))"
}

# -------------------- MAIN --------------------
Info "Starting Stripe removal sweep (DryRun=$($DryRun.IsPresent), KeepRoutes=$($KeepRoutes.IsPresent))"

Remove-Stripe-Routes
Remove-Stripe-Deps
Remove-Stripe-Env
Write-Stripe-Usage-Report

Warn "If scripts/stripe-usage-report.csv contains hits after removal, delete/replace those code paths with Paddle equivalents."
Info "Done."
