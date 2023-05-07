const { glob } = require('glob');
const { promisify } = require('util');
const { ApplicationCommandType, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const Client = require('../models/Client');
const { platform } = require('os');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

function load (value) {
  if (process.platform === "win32") return require(`${process.cwd()}/${value}`);
  else return require(value);
}

module.exports = async (bot) => {
  // Events
  const eventFiles = await glob(`${process.cwd()}/events/*/*.js`);
  eventFiles.map((value) => load(value));

  // Slash
  const slashCommands = await glob(`${process.cwd()}/commands/*/*.js`);
  const arrayOfSlashCommands = [];
  const data = [];

    slashCommands.map((value) => {

    const file = load(value);
    if (!file?.name) return;

    bot.slashCommands.set(file.name, file);

    if ([ApplicationCommandType.User, ApplicationCommandType.Message].includes(file.type)) delete file.description;

    arrayOfSlashCommands.push({
      name: file.name,
      description: file.description,
      type: file.type ? file.type : ApplicationCommandType.ChatInput,
      options: file.options ? file.options : null,
      default_member_permissions: null,
    });

    data.push({
      name: file.name,
      description: file.description,
      directory: file.directory,
    });
  });

    const dev = process.env.DEV_MODE || 'false';
    
  (async () => {
console.log("yes")
    try {
      bot.logger.cmd('Started refreshing (/) commands');
        console.log("yes-try")
      if (dev === "true") {
        await rest.put(Routes.applicationGuildCommands(process.env.clientID, '758949191497809932'), {
          body: arrayOfSlashCommands,
        });

        bot.logger.cmd('Successfully reloaded Guild (/) commands');
      } else if (dev === "false") {
          
        await rest.put(Routes.applicationCommands(process.env.clientID), {
          body: arrayOfSlashCommands,
        }).then(function () {
          bot.logger.cmd(
            'Successfully reloaded Application (/) commands.'
          );
        })
      }
    } catch (error) {
      console.log(error);
    }
  })();

  bot.on('ready', async () => {
    const client = await Client.findOne({ clientId: bot.user.id });

    if (!client.commands || client.commands.length === 0) {
      client.commands.push(data);
      await client.save();
    }

    if (client.commands[0].find((cmd) => cmd?.name !== data.name)) {
      await Client.findOneAndUpdate(
        { clientId: bot.user.id },
        { $push: [{ commands: { name: data.name, description: data.description, directory: data.directory } }] },
      );
      bot.logger.cmd('Successfully reloaded application (/) commands database.');
    }
  });
};
