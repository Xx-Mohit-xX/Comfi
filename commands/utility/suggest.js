/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const guilds = require('../../models/guild')
const simplydjs = require('simply-djs')
const { CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'suggest',
  description: 'Suggestion for server',
  ownerOnly: false,
  directory: "utility",
  options: [
    {
      type: 'STRING',
      description: 'The Suggestion',
      name: 'suggestion',
      required: true
    }
  ],
  userperm: [''],
  botperm: [''],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const guild = await guilds.findOne({ guildId: interaction.guild.id })
      if (guild.suggestions) {
        const suggestion = interaction.options.getString('suggestion')
        let channel = guild.suggestions_channel

        if (!channel) return

        simplydjs.suggestSystem(interaction, {
          channelId: channel,
          suggestion: suggestion,
          embed: {
            title: "Suggestion",
            credit: false,
            color: bot.color,
            footer: {text: "Comfi™ Suggestion System"},
          },
          buttons: {
            upvote: { style: "SECONDARY", emoji: bot.tick },
            downvote: { style: "SECONDARY", emoji: bot.crosss }
          }
        })
      } else if (!guild.suggestions) {
        return await bot.errorEmbed(bot, interaction, `Please Ask an Admin to set the suggestion channel first by using **/suggestion**`
        )
      }
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}
