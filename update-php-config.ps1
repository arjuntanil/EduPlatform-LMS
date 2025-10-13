# PowerShell script to update PHP limits
# Run this as Administrator

$phpIniPath = "C:\Program Files\php-8.4.12\php.ini"

Write-Host "Updating PHP configuration..." -ForegroundColor Yellow

# Read the file
$content = Get-Content $phpIniPath -Raw

# Update or add settings
$settings = @{
    'upload_max_filesize' = '1024M'
    'post_max_size' = '1024M'
    'memory_limit' = '512M'
    'max_execution_time' = '300'
    'max_input_time' = '300'
}

foreach ($setting in $settings.GetEnumerator()) {
    $pattern = "^;?\s*$($setting.Key)\s*=.*"
    $replacement = "$($setting.Key) = $($setting.Value)"
    
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $replacement
        Write-Host "Updated: $($setting.Key) = $($setting.Value)" -ForegroundColor Green
    } else {
        $content += "`n$replacement"
        Write-Host "Added: $($setting.Key) = $($setting.Value)" -ForegroundColor Green
    }
}

# Save the file
Set-Content $phpIniPath $content -NoNewline

Write-Host "`nPHP configuration updated successfully!" -ForegroundColor Green
Write-Host "Please restart your Laravel server." -ForegroundColor Yellow
