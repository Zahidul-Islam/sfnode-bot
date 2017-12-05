# SFNode Bot V1

## Tasks

* [ ] Register SFNode Bot with [microsoft bot framework](https://dev.botframework.com)

* [ ] Develop the bot

```
const express = require('express');
const builder = require('botbuilder');

const app     = express();

require('dotenv').config();

const port = process.env.PORT || 8080;

// Create bot and Connection to Microsoft Bot Connector
const connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});

const bot = new builder.UniversalBot(connector);

// respond with user's message
bot.dialog('/', session => {
    session.send(`You said: ${session.message.text}`);
    console.log(session.message.text);
});

// Server Init
app.post('/api/messages', connector.listen());
app.listen(port, () => console.log(`Bot is listening on ${port}`));
```

* [ ] Test the bot using [Microsoft Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator)