@echo off
setlocal enabledelayedexpansion

title Learn NL Studio Auto Git Push

echo ===================================================
echo     Learn NL Studio Git Push Automation Tool
echo ===================================================
echo.

where git >nul 2>nul
if !errorlevel! neq 0 (
    echo [ERROR] Git is not installed on this system!
    goto end
)

if not exist .git (
    echo [ERROR] This folder is not a Git repository!
    goto end
)

git config core.askyesno false

echo Checking Git status...
git status --short
echo.

git status --short | findstr /R "^" >nul
if !errorlevel! neq 0 (
    echo [INFO] No changes detected to commit.
    echo Checking if push is needed...
    goto push_stage
)

echo.
echo ===================================================
echo  Staging changes (git add .)...
echo ===================================================
git add .
if !errorlevel! neq 0 (
    echo [ERROR] Failed to stage files. Check folder permissions.
    goto end
)

echo.
set /p commit_msg="Enter commit message (Press Enter for auto-message): "
if "!commit_msg!"=="" (
    set "commit_msg=Auto-update: %date% %time%"
)

echo.
echo Committing changes: "!commit_msg!"
git commit -m "!commit_msg!"
if !errorlevel! neq 0 (
    echo [ERROR] Commit failed.
    goto end
)

:push_stage
git remote -v >nul 2>nul
if !errorlevel! neq 0 (
    echo [ERROR] No remote repository is configured!
    echo Adding origin https://github.com/Mizentia/Learn_NL_Studio.git ...
    git remote add origin https://github.com/Mizentia/Learn_NL_Studio.git
)

for /f "tokens=*" %%i in ('git branch --show-current') do set current_branch=%%i
if "!current_branch!"=="" (
    set current_branch=main
)

echo.
echo ===================================================
echo Pushing changes to GitHub (Branch: !current_branch!)...
echo ===================================================
git push origin !current_branch!
if !errorlevel! equ 0 goto push_success

echo.
echo ===================================================
echo [ERROR] Git push failed! Common reasons:
echo 1. You are not logged in to GitHub.
echo 2. The remote branch has new changes (run 'git pull origin !current_branch!' first).
echo 3. The remote repository URL is incorrect or access is denied.
echo ===================================================
goto end

:push_success
echo.
echo ===================================================
echo [SUCCESS] Project successfully pushed to GitHub!
echo ===================================================

:end
echo.
echo ===================================================
echo  Press any key to close this terminal...
echo ===================================================
pause >nul
