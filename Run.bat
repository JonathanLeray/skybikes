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
ECHO                                                   ���������������ͻ
ECHO                                                   �               �
ECHO                                                   �   Sky Bikes   �
ECHO                                                   �               �
ECHO                                                   ���������������ͼ
ECHO.
ECHO.
ECHO      �������������ͻ
ECHO      � npm install �
ECHO      �������������ͼ
ECHO.
CALL npm install
ECHO.
ECHO.
ECHO      �����������������ͻ
ECHO      � ng serve --open �
ECHO      �����������������ͼ
ECHO.
CALL ng serve --open