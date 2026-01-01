$pattern = 'const\s+sb\s*=\s*supabaseServer\(\);'
$replacement = 'const sb = await supabaseServer();'

$files = Get-ChildItem -Path . -Recurse -Include *.ts,*.tsx

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match $pattern) {
        Write-Host "Fixing $($file.FullName)"

        # Backup
        Copy-Item $file.FullName "$($file.FullName).bak" -Force

        # Replace
        $newContent = [regex]::Replace($content, $pattern, $replacement)

        Set-Content $file.FullName $newContent -NoNewline
    }
}

Write-Host "Done. Backups created with .bak extension."
