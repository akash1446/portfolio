@echo off
cd /d "%~dp0"

rem ---- EDIT these two lines with your real values (no < > brackets) ----
set "DB_PASS=your-mysql-password"
set "MAIL_PASS=your-16-letter-app-password"
rem ----------------------------------------------------------------------

rem Find Java automatically from javac on your PATH
for %%i in (javac.exe) do if not "%%~$PATH:i"=="" set "JAVA_HOME=%%~dp$PATH:i.."

echo Using JAVA_HOME=%JAVA_HOME%
mvn clean spring-boot:run
pause