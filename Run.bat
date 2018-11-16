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
ECHO                                                   ษอออออออออออออออป
ECHO                                                   บ               บ
ECHO                                                   บ   Sky Bikes   บ
ECHO                                                   บ               บ
ECHO                                                   ศอออออออออออออออผ
ECHO.
ECHO.
ECHO      ษอออออออออออออป
ECHO      บ npm install บ
ECHO      ศอออออออออออออผ
ECHO.
CALL npm install
ECHO.
ECHO.
ECHO      ษอออออออออออออออออป
ECHO      บ ng serve --open บ
ECHO      ศอออออออออออออออออผ
ECHO.
CALL ng serve --open