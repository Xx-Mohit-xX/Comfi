/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require('discord.js');
/**
 *
 * @param {CommandInteraction} interaction
 * @param {Array} pages
 */
module.exports = async (interaction, pages) => {
  if (!pages || !interaction) throw new TypeError('Please supply both interaction and a pages array!');
  const { author } = interaction;
  const count = 0;
  let pos = 0;
  const dropdowns = [];
  pages.forEach((page) => {
    const newPos = pos++;
    dropdowns.push({
      label: `#${newPos}`,
      description: `Click this to jump to the ${newPos} page!`,
      value: `${newPos}`,
    });
  });

  const row = new ActionRowBuilder().addComponents([
    new StringSelectMenuBuilder()
      .setPlaceholder('Choose a page!')
      .addOptions(dropdowns)
      .setCustomId('queue_pagination'),
  ]);
  await interaction.followUp({ embeds: [pages[count]], components: [row] });

  const m = await interaction.fetchReply();

  const filter = (drop) => drop.user.id == interaction.user.id;

  const collector = m.createMessageComponentCollector({
    type: 'SELECT_MENU',
    idle: 60000,
    filter,
  });
  collector.on('collect', async (drop) => {
    if (drop.isSelectMenu()) {
      if (drop.customId === 'queue_pagination') {
        const newPage = drop.values[0];
        drop.deferUpdate();
        m.edit({
          embeds: [pages[newPage]],
          ephemeral: true,
        });
      }
    }
  });

  collector.on('end', async (collected) => {
    if (collected.size === 0) {
      const newPage = collected.values[0];
      m.edit({
        embeds: pages[newPage],
        components: [],
      });
    }
  });
};
