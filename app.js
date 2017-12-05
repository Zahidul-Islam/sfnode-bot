const express = require('express');
const builder = require('botbuilder');

const app     = express();

require('dotenv').config();

const port = process.env.PORT || 8080;
// Add global LUIS recognizer to bot
var luisAppUrl = process.env.LUIS_APP_URL;

// Create bot and Connection to Microsoft Bot Connector
const connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});

const bot = new builder.UniversalBot(connector);

bot.recognizer(new builder.LuisRecognizer(luisAppUrl));

// respond with user's message
bot.dialog('/', session => {
    session.send(`You said: ${session.message.text}`);
    console.log(session.message.text);
});

// NextMeetupDate Dialog
bot.dialog('NextMeetupDate', [
    (session, args, next) => {
        const intent = args.intent;
        const month = builder.EntityRecognizer.findEntity(intent.entities, 'builtin.datetimeV2.daterange');

        console.log("==> ", JSON.stringify(intent, null, 2));
        console.log("==? ", JSON.stringify(month, null, 2));
        session.send(intent);

    }
]).triggerAction({
    matches: 'NextMeetupDate'
});

// Server Init
app.post('/api/messages', connector.listen());
app.listen(port, () => console.log(`Bot is listening on ${port}`));