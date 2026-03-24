param(
    [Parameter(Mandatory = $false)]
    [string]$AccountSid = $env:TWILIO_ACCOUNT_SID,

    [Parameter(Mandatory = $false)]
    [string]$AuthToken = $env:TWILIO_AUTH_TOKEN,

    [Parameter(Mandatory = $false)]
    [ValidateSet("US")]
    [string]$CountryCode = "US",

    [Parameter(Mandatory = $false)]
    [int]$Top = 5,

    [Parameter(Mandatory = $false)]
    [switch]$SearchLocal,

    [Parameter(Mandatory = $false)]
    [string[]]$AreaCodes = @("352","407","321","727","813","904")
)

if ([string]::IsNullOrWhiteSpace($AccountSid) -or [string]::IsNullOrWhiteSpace($AuthToken)) {
    throw "Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables, or pass -AccountSid and -AuthToken."
}

$ErrorActionPreference = "Stop"

function Convert-WordToDigits {
    param([Parameter(Mandatory = $true)][string]$Word)

    $map = @{
        'A'='2'; 'B'='2'; 'C'='2'
        'D'='3'; 'E'='3'; 'F'='3'
        'G'='4'; 'H'='4'; 'I'='4'
        'J'='5'; 'K'='5'; 'L'='5'
        'M'='6'; 'N'='6'; 'O'='6'
        'P'='7'; 'Q'='7'; 'R'='7'; 'S'='7'
        'T'='8'; 'U'='8'; 'V'='8'
        'W'='9'; 'X'='9'; 'Y'='9'; 'Z'='9'
    }

    $clean = ($Word.ToUpper() -replace '[^A-Z]', '')
    $digits = foreach ($ch in $clean.ToCharArray()) {
        $map[[string]$ch]
    }

    -join $digits
}

function Invoke-TwilioAvailableSearch {
    param(
        [Parameter(Mandatory = $true)][ValidateSet("Local","TollFree")] [string]$Type,
        [Parameter(Mandatory = $true)][string]$ContainsDigits,
        [Parameter(Mandatory = $false)][string]$AreaCode,
        [Parameter(Mandatory = $false)][int]$PageSize = 20
    )

    $baseUri = "https://api.twilio.com/2010-04-01/Accounts/$AccountSid/AvailablePhoneNumbers/$CountryCode/$Type.json"

    $query = @{
        SmsEnabled   = "true"
        VoiceEnabled = "true"
        PageSize     = $PageSize
        Contains     = "*$ContainsDigits*"
    }

    if ($Type -eq "Local" -and $AreaCode) {
        $query["AreaCode"] = $AreaCode
    }

    $qs = ($query.GetEnumerator() | ForEach-Object {
        "{0}={1}" -f [System.Uri]::EscapeDataString([string]$_.Key), [System.Uri]::EscapeDataString([string]$_.Value)
    }) -join "&"

    $uri = "$baseUri`?$qs"

    $pair = "{0}:{1}" -f $AccountSid, $AuthToken
    $bytes = [System.Text.Encoding]::ASCII.GetBytes($pair)
    $basic = [Convert]::ToBase64String($bytes)

    Invoke-RestMethod -Method Get -Uri $uri -Headers @{
        Authorization = "Basic $basic"
    }
}

function Get-Score {
    param(
        [Parameter(Mandatory = $true)][string]$PhoneNumber,
        [Parameter(Mandatory = $true)][string]$MatchedWord,
        [Parameter(Mandatory = $true)][string]$MatchedDigits
    )

    $digitsOnly = $PhoneNumber -replace '\D', ''
    if ($digitsOnly.StartsWith("1")) {
        $digitsOnly = $digitsOnly.Substring(1)
    }

    # Basic vanity scoring model
    $score = 0

    # Prefer exact end match of the word digits
    if ($digitsOnly.EndsWith($MatchedDigits)) { $score += 100 }

    # Prefer contiguous match anywhere
    if ($digitsOnly.Contains($MatchedDigits)) { $score += 50 }

    # Longer brand words are better
    $score += ($MatchedWord.Length * 5)

    # Slight bonus for toll-free style feel if number begins 800/888/877/etc.
    $prefix3 = $digitsOnly.Substring(0,3)
    if ($prefix3 -in @("800","888","877","866","855","844","833","822")) { $score += 25 }

    return $score
}

# Brand-friendly candidate words/fragments.
# "LifeSignal" itself is too long for the classic 7-digit vanity part, so we search strong fragments.
$candidates = @(
    "LIFESIG",   # 7 chars
    "SIGNAL",
    "LIFESGN",   # closer to your requested spelling LifeSgnal
    "LIFESAF",
    "LIFELINE",
    "CHECKIN",
    "SAFE",
    "LIFE",
    "SIGN",
    "CARE",
    "ALERT",
    "SENIOR"
) | Select-Object -Unique

$searchPlan = foreach ($word in $candidates) {
    $digits = Convert-WordToDigits -Word $word
    if ($digits.Length -ge 4 -and $digits.Length -le 8) {
        [PSCustomObject]@{
            Word   = $word
            Digits = $digits
        }
    }
}

$results = New-Object System.Collections.Generic.List[object]

Write-Host ""
Write-Host "Searching Twilio toll-free inventory..." -ForegroundColor Cyan

foreach ($item in $searchPlan) {
    try {
        $resp = Invoke-TwilioAvailableSearch -Type TollFree -ContainsDigits $item.Digits -PageSize 20
        foreach ($n in $resp.available_phone_numbers) {
            $score = Get-Score -PhoneNumber $n.phone_number -MatchedWord $item.Word -MatchedDigits $item.Digits
            $results.Add([PSCustomObject]@{
                PhoneNumber = $n.phone_number
                Friendly    = $n.friendly_name
                Type        = "TollFree"
                AreaCode    = $null
                MatchWord   = $item.Word
                MatchDigits = $item.Digits
                Region      = $n.region
                Locality    = $n.locality
                RateCenter  = $n.rate_center
                Lata        = $n.lata
                Score       = $score
            })
        }
    }
    catch {
        Write-Warning "TollFree search failed for $($item.Word) / $($item.Digits): $($_.Exception.Message)"
    }
}

if ($SearchLocal) {
    foreach ($ac in $AreaCodes) {
        Write-Host "Searching Twilio local inventory for area code $ac..." -ForegroundColor Yellow
        foreach ($item in $searchPlan) {
            try {
                $resp = Invoke-TwilioAvailableSearch -Type Local -ContainsDigits $item.Digits -AreaCode $ac -PageSize 20
                foreach ($n in $resp.available_phone_numbers) {
                    $score = Get-Score -PhoneNumber $n.phone_number -MatchedWord $item.Word -MatchedDigits $item.Digits
                    $results.Add([PSCustomObject]@{
                        PhoneNumber = $n.phone_number
                        Friendly    = $n.friendly_name
                        Type        = "Local"
                        AreaCode    = $ac
                        MatchWord   = $item.Word
                        MatchDigits = $item.Digits
                        Region      = $n.region
                        Locality    = $n.locality
                        RateCenter  = $n.rate_center
                        Lata        = $n.lata
                        Score       = $score
                    })
                }
            }
            catch {
                Write-Warning "Local search failed for area code $ac / $($item.Word) / $($item.Digits): $($_.Exception.Message)"
            }
        }
    }
}

$final = $results |
    Group-Object PhoneNumber |
    ForEach-Object {
        $_.Group | Sort-Object Score -Descending | Select-Object -First 1
    } |
    Sort-Object -Property @{Expression="Score";Descending=$true}, @{Expression="Type";Descending=$false}, @{Expression="PhoneNumber";Descending=$false}

if (-not $final) {
    Write-Host ""
    Write-Host "No matching vanity-style numbers were returned from Twilio." -ForegroundColor Red
    Write-Host "Try adding -SearchLocal or changing the candidate words." -ForegroundColor DarkYellow
    exit 0
}

Write-Host ""
Write-Host "Top vanity-style matches for LifeSignal:" -ForegroundColor Green
$final |
    Select-Object -First $Top PhoneNumber, Type, MatchWord, MatchDigits, Score, Locality, Region, Friendly |
    Format-Table -AutoSize

Write-Host ""
Write-Host "All matches saved to .\lifesignal-vanity-results.csv" -ForegroundColor Green

$final | Export-Csv -NoTypeInformation -Encoding UTF8 -Path ".\lifesignal-vanity-results.csv"

