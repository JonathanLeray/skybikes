@ECHO OFF 
MODE CON COLS=120 LINES=50
TITLE Sky Bikes
COLOR 0f
SETLOCAL enableDelayedExpansion
SET PATH=%PATH%;%ProgramFiles%;
SET PATH=%PATH%;%ProgramFiles(x86)%;
SET PATH=%PATH%;%LOCALAPPDATA%;
SET PATH=%PATH%;%ProgramFiles%"\nodejs\";
SET PATH=%PATH%;%ProgramFiles(x86)%"\nodejs\";
SET PATH=%PATH%;%LOCALAPPDATA%"\nodejs\";
SET PATH=%PATH%;%USERPROFILE%"\AppData\Roaming\npm";

CLS
ECHO.
ECHO                                                   浜様様様様様様様�
ECHO                                                   �               �
ECHO                                                   �   Sky Bikes   �
ECHO                                                   �               �
ECHO                                                   藩様様様様様様様�
ECHO.
ECHO.
ECHO      浜様様様様様様�
ECHO      � npm install �
ECHO      藩様様様様様様�
ECHO.
CALL npm install
ECHO.
ECHO.
ECHO      浜様様様様様様様様�
ECHO      � ng serve --open �
ECHO      藩様様様様様様様様�
ECHO.
CALL ng serve --open