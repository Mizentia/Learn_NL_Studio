@echo off
title Push Learn NL Studio to GitHub
color 0e
cd /d "%~dp0"

echo ===================================================
echo          PUSH LEARN NL STUDIO TO GITHUB
echo ===================================================
echo.

git status
echo.
set /p msg="Commit message (Enter for auto): "
if "%msg%"=="" set msg=Update Learn NL Studio

git add .
git commit -m "%msg%"
git push origin main
pause
