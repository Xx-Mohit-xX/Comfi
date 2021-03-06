/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'npm',
  description: 'Get info about npm package',
  ownerOnly: false,
  options: [
    {
      type: 3,
      description: 'Package Name',
      name: 'name',
      required: true,
      autocomplete: true
    }
  ],
  directory: "info",
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
  /**	 
*	 
* @param {CommandInteraction} interaction	 
* @param {String[]} args	 
*/

  run: async (bot, interaction, args) => {
		const npm = interaction.options.getString('name');
		if (!npm) return interaction.editReply({ content: 'Please provide a valid package to search.', ephemeral: true });

		let response;

   try {

		response = await fetch('https://api.npms.io/v2/search?q=' + npm)
      .then(res => res.json())
      .catch((e) => {
			let emed = new MessageEmbed()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})
		});

		const pkg = response.results[0].package;

		if (!pkg) return interaction.editReply({ content: 'Please provide a valid package to search.', ephemeral: true });     

const embed = new MessageEmbed({ // Edit this embed to your liking such as the Color. Using objects happens to make your code more organized.
				author: {
					name: 'NPM',
					icon_url: 'https://i.imgur.com/ErKf5Y0.png',
					url: 'https://www.npmjs.com/'
				},
				title: pkg.name,
				url: pkg.links.npm,
				thumbnail: {
					url: 'https://images-ext-1.discordapp.net/external/JsiJqfRfsvrh5IsOkIF_WmOd0_qSnf8lY9Wu9mRUJYI/https/images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png',
				},
				color: bot.color,
				description: pkg.description,
				fields: [{
					name: '❯ Author',
					value: pkg.author ? pkg.author.name : 'None'
				}, {
					name: '❯ Version',
					value: pkg.version
				}, {
					name: '❯ Description',
					value: pkg.description || 'None'
				}, {
					name: '❯ Repository',
					value: pkg.links.repository ? pkg.links.repository : 'None'
				}, {
					name: '❯ Maintainers',
					value: pkg.maintainers ? pkg.maintainers.map(e => e.username).join(', ') : 'None'
				}, {
					name: '❯ Keywords',
					value: pkg.keywords ? pkg.keywords.join(', ') : 'None'
      }]
			
                                })
		

				const row = new MessageActionRow().addComponents(
					new MessageButton()
						.setStyle(5)
						.setURL(`https://www.npmjs.com/package/${npm}`)          
          .setEmoji(`883017868944502804`)
						.setLabel('Go to Package!!')	);

      await interaction.editReply({ embeds: [embed], components: [row] })
    } catch (e) {
  await bot.senderror(interaction, e)
    }
  }
}