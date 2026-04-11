@echo off
setlocal

REM Spustit z korenove slozky projektu (tam kde je index.html)
if not exist "index.html" (
  echo [CHYBA] Ve aktualni slozce neni index.html
  echo Otevri Command Prompt ve slozce projektu a spust script znovu.
  exit /b 1
)

echo Vytvarim slozky pro media...

mkdir "media\meditace\dychani" 2>nul
mkdir "media\meditace\body-scan" 2>nul
mkdir "media\meditace\vizualizace" 2>nul
mkdir "media\meditace\vdecnost" 2>nul
mkdir "media\meditace\spanek" 2>nul

mkdir "media\pohadky\2" 2>nul
mkdir "media\pohadky\3" 2>nul
mkdir "media\pohadky\4" 2>nul

REM Git neuchovava prazdne slozky -> vytvorime .gitkeep
for %%f in (
  "media\meditace\dychani\.gitkeep"
  "media\meditace\body-scan\.gitkeep"
  "media\meditace\vizualizace\.gitkeep"
  "media\meditace\vdecnost\.gitkeep"
  "media\meditace\spanek\.gitkeep"
  "media\pohadky\2\.gitkeep"
  "media\pohadky\3\.gitkeep"
  "media\pohadky\4\.gitkeep"
) do (
  if not exist %%f type nul > %%f
)

echo.
echo Hotovo. Slozky byly pripraveny.
echo Ted muzes nahrat MP3 soubory do media\meditace\... a media\pohadky\...

exit /b 0
