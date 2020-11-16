const dotenv = require("dotenv").config();
const axios = require("axios");

module.exports = {
  /**
   * @param {*} message The incoming message.
   * @param {*} client The bot.
   */

  async getWeather(message, client) {
    try {
        const response = await axios({ method: "get", url: "api.openweathermap.org/data/2.5/weather?q=Breda&appid=a3a7b78d4ff15a91d9c96976cf243627" });
        const data = await response.json();
        
        return console.log(data);
    } catch (error) {
        return  console.log(error);
    }
  },
};
