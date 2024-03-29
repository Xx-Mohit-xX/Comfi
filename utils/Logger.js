const chalk = require('chalk');
const Discord = require('discord.js');
const moment = require('moment');
const log = require('simple-node-logger').createRollingFileLogger({
  logDirectory: './utils/logs',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD',
});

const bot = require('../index');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

// LOGGERS
/**
 * Logs content to the console and log files based on log level.
 *
 * @param {string} content The content to log
 * @param {string} type The log level - 'log', 'warn', 'error', 'debug', 'cmd', 'ready', 'table'
 */
exports.log = (content, type = 'log') => {
	if (content === 'error') return
	const timestamp = `[${moment().format('HH:mm:ss:SSS')}]:`
	switch (type) {
		case 'log':
			log.info(content)

			break
		case 'warn':
			log.warn(content)

			break
		case 'error':
			log.error(content)

			break
		case 'debug':
			log.debug(content)

			break
		case 'cmd':
			log.info(content)

			break
		case 'ready':
			log.info(content)

			break
		case 'table':
			log.info(content)

			console.table(content)
			break
		case 'limit':
			log.error(content)

			break
		default:
			break
	}
}

// EXPORTS LOGGER
exports.warn = (bot) => this.log(bot, 'warn');
exports.error = (bot) => this.log(bot, 'error');
exports.debug = (bot) => this.log(bot, 'debug');
exports.cmd = (bot) => this.log(bot, 'cmd');
exports.table = (bot) => this.log(bot, 'table');
exports.limit = (bot) => this.log(bot, 'limit');
exports.ready = (bot) => this.log(bot, 'ready');
