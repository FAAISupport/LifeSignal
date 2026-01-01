$ErrorActionPreference = "Stop"

Write-Host "=== Fixing missing Stripe checkout route + tsconfig includes ==="

# 1) Ensure route file exists
$routeDir = Join-Path $PSScriptRoot "app\api\stripe\checkout"
$routeFile = Join-Path $routeDir "route.ts"

if (!(Test-Path $routeDir)) {
  New-Item -ItemType Directory -Force -Path $routeDir | Out-Null
}

if (Test-Path $routeFile) {
  Copy-Item $routeFile "$routeFile.bak" -Force
}

@'
import { NextResponse } from "next/server";

/**
 * Temporary placeholder route so Next/TS can type-check builds.
 * If you're not using Stripe Checkout, keep this returning 410.
 * If you are using Stripe Checkout, replace this with real session creation logic.
 */

export async function POST() {
  return NextResponse.json(
    {
      error: "Stripe Checkout route is not implemented.",
      hint: "If you are using Paddle, you can delete Stripe checkout UI flows and keep this route returning 410."
    },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json({ ok: false }, { status: 405 });
}
'@ | Set-Content $routeFile -Encoding UTF8

Write-Host "✔ Wrote $routeFile"

# 2) Patch tsconfig to avoid .next/dev/types
$tsconfig = Join-Path $PSScriptRoot "tsconfig.json"
if (Test-Path $tsconfig) {
  $raw = Get-Content $tsconfig | Out-String
  Copy-Item $tsconfig "$tsconfig.bak" -Force

  # Replace any include that contains ".next/**/*.ts" with ".next/types/**/*.ts"
  $raw2 = $raw -replace '"\.next/\*\*/\*\.ts"', '".next/types/**/*.ts"'

  # If exclude doesn't contain ".next", add it (best-effort)
  if ($raw2 -notmatch '"exclude"\s*:\s*\[') {
    # do nothing
  } else {
    if ($raw2 -notmatch '"\.next"') {
      $raw2 = $raw2 -replace '("exclude"\s*:\s*\[[^\]]*)\]', '$1, ".next"]'
    }
  }

  Set-Content $tsconfig $raw2 -Encoding UTF8
  Write-Host "✔ Patched tsconfig.json (backup: tsconfig.json.bak)"
} else {
  Write-Host "⚠ tsconfig.json not found, skipping tsconfig patch"
}

# 3) Clear .next cache
$nextDir = Join-Path $PSScriptRoot ".next"
if (Test-Path $nextDir) {
  Remove-Item -Recurse -Force $nextDir
  Write-Host "✔ Removed .next cache"
}

Write-Host "=== Done. Now run: npm run build ==="
