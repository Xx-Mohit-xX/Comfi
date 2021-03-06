const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed } = require("discord.js")

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on("stickerDelete", async (sticker) => {
    const guild = await guilds.findOne({guildId: sticker.guild.id})
    if(!guild.logging) return;
    if(!sticker.guild.me.permissions.has("VIEW_AUDIT_LOG")) return;

    const AuditLogFetch = await sticker.guild.fetchAuditLogs({limit: 1, type: "STICKER_DELETE"});
    const Entry = AuditLogFetch.entries.first();

    const embed = new MessageEmbed()
    .setTitle(`Sticker Deleted!`)
    .setColor(bot.color)
    .setDescription(`> <a:stars_aesthetic:883033007836000308> • **Author:** <@${Entry.executor.id}>`)
    .addFields(
        {name: "Sticker", value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${sticker.name}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${sticker.id}\``},
    )
    .setFooter({text:"Comfi™ Logging"})
    .setTimestamp()

    
    const logsChannel = sticker.guild.channels.cache.find(c => c.id === guild.logging_channel)
    if(logsChannel) {
        logsChannel.send({embeds: [embed]})
    }
})