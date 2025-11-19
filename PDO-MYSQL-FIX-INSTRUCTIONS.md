# Laravel PDO MySQL Fix - Manual Steps Required

## Problem
Laravel cannot connect to MySQL due to missing `pdo_mysql` PHP extension.

## Solution Steps

### Option 1: Enable pdo_mysql in System PHP (Recommended)
1. **Right-click** on `enable-pdo-mysql.bat` in this directory
2. Select **"Run as administrator"**
3. Click **"Yes"** on the UAC prompt
4. The script will uncomment `extension=pdo_mysql` in `C:\Program Files\php-8.4.12\php.ini`

### Option 2: Manual Edit
1. **Right-click Notepad** and select **"Run as administrator"**
2. Open: `C:\Program Files\php-8.4.12\php.ini`
3. Find line 934: `;extension=pdo_mysql`
4. Remove the semicolon: `extension=pdo_mysql`
5. **Save** the file

### Option 3: Copy Fixed File (Manual)
1. Open **Command Prompt as Administrator**
2. Run:
```cmd
copy /Y "E:\LMS\first-app\demo-app\php.ini.fixed" "C:\Program Files\php-8.4.12\php.ini"
```

## Verification
After completing any option above:

```powershell
php -m | Select-String "pdo_mysql"
```

Should output: `pdo_mysql`

## Start Laravel Server
```powershell
cd E:\LMS\first-app\demo-app
php artisan serve
```

Visit: http://127.0.0.1:8000
