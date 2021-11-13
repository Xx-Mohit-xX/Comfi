const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "lockk",
    description: "Locks and Unlocks a channel",
    ownerOnly: false,
    userperm: ["MANAGE_CHANNELS"],
    botperm: ["MANAGE_CHANNELS"],
    options: [
        {
            type: 'SUB_COMMAND',
            description: 'Lock a channel to prevent raid',
            name: 'enable',
            options: [
        {
            type: 'CHANNEL',
            description: 'Channel to lock',
            name: 'channel',
            required: false,
          channelTypes: ["GUILD_TEXT", "GUILD_VOICE"],
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Unlocks a channel',
            name: 'disable',
            options: [
        {
            type: 'CHANNEL',
            description: 'Channel to Unlock',
            name: 'channel',
          channelTypes: ["GUILD_TEXT", "GUILD_VOICE"],
            required: false,
        },
    ],
        },
    ],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
 
    let channel = interaction.channel || interaction.options.getUser('channel')

let [ sub ] = args

if (sub === "enable") {

        try {
            interaction.guild.roles.cache.forEach(role => {
  
              channel.permissionOverwrites.create(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
    }
let embed = new MessageEmbed()
        .setDescription(`${bot.tick} • **Successfully Locked ${channel}**`)
        .setColor(bot.color);
        interaction.editReply({embeds: [ embed ]}).catch(() => null);
    }

if (sub === "disable") {

        try {
            interaction.guild.roles.cache.forEach(role => {
                channel.permissionOverwrites.create(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
    }

        let embed = new MessageEmbed()
        .setDescription(`${bot.tick} • **Successfully Unlocked ${channel}**`)
        .setColor(bot.color);
        interaction.editReply({embeds: [ embed ]}).catch(() => null);
    }
    
}};
