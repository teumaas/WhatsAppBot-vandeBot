const dotenv = require("dotenv").config({ path: "../" });
const chalk = require("chalk");

const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});

module.exports = {
  async authorizeSpotify() {
    try {
      const clientData = await spotifyApi.clientCredentialsGrant();
      const setToken = await spotifyApi.setAccessToken(
        clientData.body["access_token"]
      );
      return (
        setToken,
        console.log(chalk.green("✓ Spotify authorization succeeded."))
      );
    } catch (error) {
      return console.log(chalk.red("✗ Spotify authorization failed."));
    }
  },

  /**
   * @param {*} message The incoming message.
   * @param {*} client The bot.
   * @param {*} query The bot.
   */

  async getSong(message, client, query) {
    try {
      if(query == '')
      {
        await client.reply(message.from, `*Gebruik:* \`\`\`/nummer <naam>\`\`\``, message.id);
      }
      else {
        const data = await spotifyApi.searchTracks(`track:${query}`);

        if (data.body.tracks.total != 0) {
          await client.sendLinkWithAutoPreview(message.from, `*Titel:* \`\`\`${data.body.tracks.items[0].name}\`\`\`\n*Artiest:* \`\`\`${data.body.tracks.items[0].album.artists[0].name}\`\`\` \n*Album:* \`\`\`${data.body.tracks.items[0].album.name}\`\`\`\n\n\`\`\`Beluister:\`\`\` ${message.from, data.body.tracks.items[0].external_urls.spotify}`);
          if(message.from, data.body.tracks.items[0].preview_url != null) {
            await client.sendPtt(message.from, data.body.tracks.items[0].preview_url)
          }
        }
        else {
          await client.reply(message.from, `Sorry! Ik kan dit nummer niet vinden op Spotify.`, message.id);
        }
      }
    } catch (error) {
      return await client.reply(message.from, 'Error', message.id);
    }    
  },
};
