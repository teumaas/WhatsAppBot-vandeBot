const messageHelp = 
`*Dit is een lijst met commando's. 🤖*

Algemene commando's:
- \`\`\`/nummer <artiest of titel>\`\`\` 
- \`\`\`/weer <stad> <land>\`\`\`
`;

module.exports = {
  /**
   * @param {*} message The incoming message.
   * @param {*} client The bot.
   */

  async getHelp(message, client) {
    try {
        if (message.isGroupMsg === true) {
            await client.reply(message.from, "Ik heb je een lijst met commando's verstuurd.", message.id)
            await client.sendText(message.sender.id, messageHelp)
        }
        else {
            await client.sendText(message.from, messageHelp)
        }
    }
    catch(error) {
        return await console.log('error')
    }    
  },
};
