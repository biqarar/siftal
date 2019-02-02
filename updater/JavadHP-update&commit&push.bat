SET SIFTAL=%~dp0%..\dist
SET PROJECTS=%~dp0%..\..\


xcopy "%SIFTAL%" "%PROJECTS%\azvir\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\azvir\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master


xcopy "%SIFTAL%" "%PROJECTS%\dashSample\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\dashSample\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\deadbrowser\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\deadbrowser\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\ermile\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\ermile\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\iranpresidents\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\iranpresidents\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\jibres\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\jibres\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\khadije\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\khadije\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\sarshomar\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\sarshomar\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\taraztax\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\taraztax\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\tejarak\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\tejarak\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\karimehDonate\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\karimehDonate\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master



xcopy "%SIFTAL%" "%PROJECTS%\SalamQuran\public_html\static\siftal" /E /H /K /Y
cd "%PROJECTS%\SalamQuran\"
git add .
git commit -m "Automatic update Siftal! 🐝 🍭"
git push origin master


