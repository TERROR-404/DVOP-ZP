# 1. Nainstalujte balíčky
Ve složce server je potřeba nainstalovat tyto balíčky
```bash
npm init
npm i express
npm i nodemon
npm i cors
npm i helmet
npm i body-parser
npm i pg
npm i jsonwebtoken
npm i bcrypt
```
# 2. Spusťte server
V terminál spusťte tento příkaz
```bash
node .\server\index.js
```
# 3. Otevřete si stránky admina a uživatele
Nejlepší postup by bylo nainstalovat extension Live Server, pokud ho nemáte, spustit ho ve složce s projektem a následně v něm v prohlížeči otevřít soubory "admin.html" a "user.html" (nachízejí se v .\server\public)
