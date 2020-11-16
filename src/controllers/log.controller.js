module.exports = {
    /**
     * @param {*} message The incoming message.
     * @param {*} client The bot.
     */
    async logMessage(message, client) {
        return console.log(`${message.sender.pushname}: ${message.body}`)
    },
  };
  