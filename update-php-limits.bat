@echo off
echo Updating PHP configuration for large video uploads...
echo.

REM Create backup
copy "C:\Program Files\php-8.4.12\php.ini" "C:\Program Files\php-8.4.12\php.ini.backup"

REM Update php.ini settings using PowerShell
powershell -Command "(Get-Content 'C:\Program Files\php-8.4.12\php.ini') -replace '^upload_max_filesize\s*=.*', 'upload_max_filesize = 1024M' -replace '^post_max_size\s*=.*', 'post_max_size = 1024M' -replace '^max_execution_time\s*=.*', 'max_execution_time = 300' -replace '^max_input_time\s*=.*', 'max_input_time = 300' -replace '^memory_limit\s*=.*', 'memory_limit = 512M' | Set-Content 'C:\Program Files\php-8.4.12\php.ini'"

echo.
echo PHP configuration updated successfully!
echo Please restart your Laravel server (php artisan serve)
echo.
pause
