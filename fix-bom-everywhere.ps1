$ErrorActionPreference = "Stop"

Write-Host "=== Removing UTF-8 BOMs (repo-wide) and validating tsconfig/package.json ==="

function Remove-Utf8Bom([string]$path) {
  if (!(Test-Path $path)) { return $false }

  $bytes = [System.IO.File]::ReadAllBytes($path)

  # UTF-8 BOM = EF BB BF
  if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Copy-Item $path "$path.bom.bak" -Force
    $newBytes = New-Object byte[] ($bytes.Length - 3)
    [Array]::Copy($bytes, 3, $newBytes, 0, $newBytes.Length)
    [System.IO.File]::WriteAllBytes($path, $newBytes)
    return $true
  }
  return $false
}

# 1) Remove BOM from known critical JSON files first
$critical = @("tsconfig.json", "package.json", "next.config.js", "next.config.mjs")
foreach ($f in $critical) {
  $p = Join-Path $PSScriptRoot $f
  if (Remove-Utf8Bom $p) { Write-Host "✔ Removed BOM: $f" }
}

# 2) Remove BOM across repo for common source files
$exts = @("*.ts","*.tsx","*.js","*.jsx","*.mjs","*.cjs","*.json","*.css","*.md")
$changed = 0

foreach ($ext in $exts) {
  Get-ChildItem -Path $PSScriptRoot -Recurse -File -Filter $ext -ErrorAction SilentlyContinue |
    ForEach-Object {
      if (Remove-Utf8Bom $_.FullName) {
        $changed++
        Write-Host "✔ Removed BOM: $($_.FullName.Substring($PSScriptRoot.Length + 1))"
      }
    }
}

Write-Host "BOM removals total: $changed"

# 3) Validate JSON parses cleanly now
function Assert-Json([string]$file) {
  $p = Join-Path $PSScriptRoot $file
  if (!(Test-Path $p)) { return }
  try {
    $txt = Get-Content $p | Out-String
    $null = $txt | ConvertFrom-Json
    Write-Host "✔ JSON OK: $file"
  } catch {
    Write-Host "✖ JSON INVALID: $file"
    Write-Host $_.Exception.Message
    throw
  }
}

Assert-Json "tsconfig.json"
Assert-Json "package.json"

# 4) Clean Next cache so it re-reads tsconfig
$nextDir = Join-Path $PSScriptRoot ".next"
if (Test-Path $nextDir) {
  Remove-Item -Recurse -Force $nextDir
  Write-Host "✔ Removed .next cache"
}

Write-Host "=== Done. Next: npm run build ==="
