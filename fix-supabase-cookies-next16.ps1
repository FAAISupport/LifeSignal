$ErrorActionPreference = "Stop"

function WriteFile($path, $content) {
  $dir = Split-Path $path -Parent
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  if (Test-Path $path) { Copy-Item -LiteralPath $path -Destination "$path.bak_fix" -Force }
  Set-Content -LiteralPath $path -Value $content
}

# 1) Replace lib/supabase/server.ts
$serverTs = @'
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/lib/env";

export async function supabaseServer() {
  // Next.js 16: cookies() is async
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components may be read-only
          }
        },
      },
    }
  );
}
'@

WriteFile "lib\supabase\server.ts" $serverTs
Write-Host "✅ Updated lib/supabase/server.ts"

# 2) Update call sites: supabaseServer() -> await supabaseServer()
$targets = @(
  "lib\auth.ts",
  "app\signup\page.tsx",
  "app\logout\route.ts",
  "app\dashboard\page.tsx",
  "app\api\paddle\transaction\route.ts",
  "app\dashboard\actions.ts",
  "app\admin\page.tsx",
  "app\dashboard\seniors\[seniorId]\page.tsx"
)

foreach ($t in $targets) {
  if (!(Test-Path -LiteralPath $t)) {
    Write-Host "Skipping missing: $t"
    continue
  }

  $lines = Get-Content -LiteralPath $t
  if ($null -eq $lines) { continue }
  $content = [string]::Join("`n", $lines)
  $orig = $content

  # Replace "const sb = supabaseServer();" with "const sb = await supabaseServer();"
  $content = $content -replace 'const\s+sb\s*=\s*supabaseServer\(\)\s*;', 'const sb = await supabaseServer();'

  if ($content -ne $orig) {
    Copy-Item -LiteralPath $t -Destination "$t.bak_fix" -Force
    Set-Content -LiteralPath $t -Value $content
    Write-Host "✅ Updated: $t"
  }
}

Write-Host "Done. Backups created with .bak_fix extension."
