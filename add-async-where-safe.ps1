$files = Get-ChildItem -Path . -Recurse -Include *.ts,*.tsx -File

foreach ($file in $files) {
  $path = $file.FullName

  # Read file safely (supports [brackets] in folder names)
  try {
    $lines = Get-Content -LiteralPath $path -ErrorAction Stop
  } catch {
    Write-Host "Skipping unreadable/missing: $path"
    continue
  }

  $content = [string]::Join("`n", $lines)
  $original = $content
  $changed = $false

  # ===== A) export default function -> export default async function
  if ($content -match 'await\s+supabaseServer\(\)') {
    if ($content -match 'export\s+default\s+function\s+') {
      if ($content -notmatch 'export\s+default\s+async\s+function\s+') {
        $content = [regex]::Replace(
          $content,
          'export\s+default\s+function\s+',
          'export default async function ',
          1
        )
        $changed = $true
      }
    }
  }

  # ===== B) lib/auth.ts: exported functions using await supabaseServer()
  if ($path -match '\\lib\\auth\.ts$') {
    $pattern = 'export\s+function\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*\{([\s\S]*?)\}'
    $content = [regex]::Replace($content, $pattern, {
      param($m)
      $name = $m.Groups[1].Value
      $args = $m.Groups[2].Value
      $body = $m.Groups[3].Value

      if ($body -match 'await\s+supabaseServer\(\)') {
        $script:changed = $true
        return "export async function $name($args) {$body}"
      } else {
        return $m.Value
      }
    })
  }

  if ($changed -or $original -ne $content) {
    Write-Host "Adding async safely in $path"
    Copy-Item -LiteralPath $path -Destination "$path.bak2" -Force
    Set-Content -LiteralPath $path -Value $content
  }
}

Write-Host "Done. Backups created with .bak2 extension."
