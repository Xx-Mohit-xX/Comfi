/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const simplydjs = require("simply-djs");
const { CommandInteraction, ApplicationCommandOptionType, ButtonStyle } = require('discord.js');
const guilds = require('../../models/guild');

module.exports = {
  name: 'suggest',
  description: 'Suggestion for server',
  ownerOnly: false,
  directory: 'utility',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'The Suggestion',
      name: 'suggestion',
      required: true,
    },
  ],
  userperm: ['MANAGE_GUILD'],
  botperm: [''],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const guild = await guilds.findOne({ guildId: interaction.guild.id });
      if (guild.suggestions) {
        const suggestion = interaction.options.getString('suggestion');
        const channel = guild.suggestions_channel;

        if (!channel) return;

        simplydjs.suggest(interaction, {
          channelId: channel,
          suggestion,
          embed: {
            title: 'Suggestion',
            color: bot.color,
            footer: { text: 'Comfi™ Suggestion System' },
          },
          buttons: {
            upvote: { style: ButtonStyle.Secondary, emoji: bot.tick },
            downvote: { style: ButtonStyle.Secondary, emoji: bot.crosss },
            votedInfo: { style: ButtonStyle.Secondary }
          },
          progress: { // TODO: Update these emojis
            up: '🟩',
            down: '🟥',
            blank: '⬛'
          }
        });
      } else if (!guild.suggestions) {
        return await bot.errorEmbed(bot, interaction, 'Please Ask an Admin to set the suggestion channel first by using **/suggestion**');
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
