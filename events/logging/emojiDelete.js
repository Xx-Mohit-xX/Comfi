const { EmbedBuilder, AuditLogEvent } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('emojiDelete', async (emoji) => {
  const guild = await guilds.findOne({ guildId: emoji.guild.id });
  if (!guild.logging) return;
  if (!emoji.guild.members.me.permissions.has(bot.functions.fixPermissions('VIEW_AUDIT_LOG'))) return;

  const AuditLogFetch = await emoji.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.EmojiDelete });
  const Entry = AuditLogFetch.entries.first();

  const embed = new EmbedBuilder()
    .setTitle('Emoji Deleted!')
    .setColor(bot.color)
    .setDescription(`> <a:stars_aesthetic:883033007836000308> • **Author:** <@${Entry.executor.id}>`)
    .addFields(
      { name: 'Emoji', value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${emoji.name}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${emoji.id}\`` },
    )
    .setFooter({ text: 'Comfi™ Logging' })
    .setTimestamp();

  const logsChannel = emoji.guild.channels.cache.find((c) => c.id === guild.logging_channel);
  if (logsChannel) {
    logsChannel.send({ embeds: [embed] });
  }
});
