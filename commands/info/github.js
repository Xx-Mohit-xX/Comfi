/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const fetch = require('node-fetch');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "github",
    description: "Shows Information about github user",
  directory: "info",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Github username',
            name: 'username',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
    
        const name = interaction.options.getString("username");
		if (!name) {
			return interaction.editReply(`${bot.error} • Please provide a valid user`);
		}

		const url = `https://api.github.com/users/${name}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return interaction.editReply(
        {content: `${bot.error} An error occured - [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord) ! \nError: ${e}`
        });
		}

		try {
			const embed = new MessageEmbed()
				.setColor(bot.color)
				.setTitle(`${response.login} (${response.id})`)
				.setDescription(response.bio ? response.bio : 'None')
				.addFields(
					{ name: '>> Followers', value: `\`\`\`${response.followers.toLocaleString()}\`\`\``, inline: true },
					{ name: '>> Following', value: `\`\`\`${response.following.toLocaleString()}\`\`\``, inline: true },
					{ name: '>> Repositories', value: `\`\`\`${response.public_repos.toLocaleString()}\`\`\``, inline: true },
					{ name: '>> Email', value: `\`\`\`${response.email ? response.email : 'None'}\`\`\`` },
					{ name: '>> Company', value: `\`\`\`${response.company ? response.company : 'None'}\`\`\`` },
					{ name: '>> Location', value: `\`\`\`${response.location ? response.location : 'None'}\`\`\`` },
				)
				.setURL(response.html_url)
				.setThumbnail(response.avatar_url)
        		.setTimestamp();

			await interaction.editReply({embeds: [ embed ]});
		} catch (e) {
  await bot.senderror(interaction, e)
    }
    }
};