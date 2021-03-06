/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const {
  CommandInteraction,
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require('discord.js')

module.exports = {
  name: 'invitee',
  description: 'Sends an invite for the bot',
  directory: "utility",
  ownerOnly: false,
  userperm: [''],
  botperm: [''],

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {

    try {

      const embed = new MessageEmbed()
        .setAuthor('Hello Dear!', interaction.user.avatarURL({ dynamic: true }))
        .setTitle('Comfi Invite Link!')
        .setDescription(
          "I'm a cool Discord Bot, ain't I? Use the buttons below to invite me to your server or join our support server!\n\nStay Safe"
        )
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(bot.color)

      const yes = new MessageButton()
        .setStyle('SUCCESS')
        .setLabel('Sure!')
        .setCustomId('inviteyes')

      const no = new MessageButton()
        .setStyle('DANGER')
        .setLabel('Nope!')
        .setCustomId('inviteno')

      const row = new MessageActionRow().addComponents(yes).addComponents(no)

     await interaction
        .editReply({
          content: `<@${interaction.user.id}>`,
          embeds: [embed],
          components: [row]
        })
        .catch(() => null)

    } catch {
      await bot.senderror(interaction, e)
    }

  }
}
