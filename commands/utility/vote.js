
const Color = "RANDOM";
const Discord = require("discord.js");

module.exports = {
    config: {
        name: "vote",
        category: 'utility',
        aliases: ["uptime"],
        description: "Vote For Comfi",
        usage: "Vote",
    },
    run: async (bot, message, args) => {
    
   

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Vote Bot")
    .setDescription("You can vote us in **discordbotlist** and **top.gg** \n Top.gg Coming soon \n\n **_discordbotlist_** Coming soon")
    .setImage(``)
    .setTimestamp();

    return message.channel.send(Embed);
  }
};