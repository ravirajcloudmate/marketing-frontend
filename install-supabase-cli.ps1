param(
  [string]$Version = "v2.84.2",
  [ValidateSet("windows_amd64", "windows_arm64")]
  [string]$Arch = "windows_amd64",
  [string]$InstallDir = "$env:USERPROFILE\\supabase-cli"
)

$ErrorActionPreference = "Stop"

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

$url = "https://github.com/supabase/cli/releases/download/$Version/supabase_$Arch.tar.gz"
$tmp = Join-Path $InstallDir "supabase.tar.gz"

Invoke-WebRequest -Uri $url -OutFile $tmp

tar -xzf $tmp -C $InstallDir

$exe = Get-ChildItem -Path $InstallDir -Recurse -Filter "supabase.exe" | Select-Object -First 1
if ($null -eq $exe) {
  $exe = Get-ChildItem -Path $InstallDir -Recurse -Filter "supabase" | Select-Object -First 1
}
if ($null -eq $exe) {
  throw "Supabase binary not found after extraction."
}

$binDir = Split-Path -Parent $exe.FullName

# Update current session PATH (user may need to restart terminal for permanent PATH).
$env:Path = $env:Path + ";" + $binDir

Write-Host "Supabase CLI installed. Binary: $($exe.FullName)"
& $exe.FullName --version

