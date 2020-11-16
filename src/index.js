const wa = require('@open-wa/wa-automate');

const { getWeather } = require('./controllers/weather.controller');
const { getHelp } = require('./controllers/help.controller');
const { getSong, authorizeSpotify } = require('./controllers/spotify.controller');
const { logMessage } = require('./controllers/log.controller');

wa.create().then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    checkMessage(client, message);
  });

  authorizeSpotify();
}

async function checkMessage(client, message) {
  if (message.type !== 'chat') return

  var args = message.body.split(/(?<=^\S+)\s/)
  var command = args.splice(0, 1)[0]

  switch (command) {
    case '/weer': await getWeather(message, client); break;
    case '/nummer': await getSong(message, client, args); break;
    case '/help': await getHelp(message, client); break;
  }

  return await logMessage(message, client) 
}
