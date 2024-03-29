/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/
const {
  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Message,
} = require('discord.js');
const guilds = require('../models/guild');

/**
 * Determines the color to use for an interaction.
 *
 * If a hex color string is passed, returns it directly.
 *
 * If a CommandInteraction or Message is passed,
 * looks up the configured color for that guild and returns it.
 *
 * Falls back to a default color if none of the above apply.
 */
function color(interaction) {
	let color
	if (
		!(interaction instanceof CommandInteraction) &&
		/^#[0-9A-F]{6}$/i.test(interaction)
	) {
		color = interaction
		return color
	}
	if (
		interaction instanceof CommandInteraction ||
		interaction instanceof Message
	) {
		let dbcolor
		const guild = guilds
			.findOne({ guildId: interaction.guild.id })
			.then({}, (guild, err) => {
				color = guild.color
				return dbcolor
			})
		color = dbcolor
		return color
	}
	color = '#F4B3CA'
	return color

	return color
}

/**
* @param {img || color} regex
* @param {Discord.Message} message
*/
/**
 * Checks if a message matches a given regex.
 *
 * @param {RegExp} regex - The regex to test against.
 * @param {Discord.Message} message - The message to test.
 * @returns {boolean} Whether the message matches the regex.
 */
function match_regex(regex, message) {
	regex =
		regex === 'img'
			? new RegExp('.jpg|jpeg|png|webp|avif|gif|svg')
			: false || regex === 'color'
			? new RegExp('^#[0-9A-F||a-z]{6}$', 'i')
			: false

	return regex.test(message)
}

/**
 * @param {number} max - maximum number
 * @param {number} min - minimum number
*/
function rndint(max, min) {
  return Math.floor(Math.random() * (max - (min || 0))) + (min || 0);
}

/**
 * @param {string} timestamp - the timestamp
*/
/**
 * Converts a timestamp to a human readable string with days, hours, minutes, and seconds.
 * @param {number} timestamp - The timestamp in milliseconds to convert.
 * @returns {string} The human readable time string.
 */
function timer(timestamp) {
	const timeLeft = timestamp
	const days = Math.floor(timeLeft / 86400000)
	const hours = Math.floor(timeLeft / 3600000) - days * 24
	const minutes = Math.floor(timeLeft / 60000) - days * 1440 - hours * 60
	const seconds =
		Math.floor(timeLeft / 1000) - days * 86400 - hours * 3600 - minutes * 60
	const mseconds = timeLeft / 1000 - days * 86400 - hours * 3600 - minutes * 60
	let string = ''
	if (days) string += `${days} ${days == 1 ? 'day ' : 'days '}`
	if (hours) string += `${hours} ${hours == 1 ? 'hour ' : 'hours '}`
	if (minutes) {
		string += `${minutes} ${minutes == 1 ? 'minute ' : 'minutes '}`
	}
	if (seconds) {
		string += `${seconds} ${seconds == 1 ? 'second ' : 'seconds '}`
	}
	if (!string.length) string = `${mseconds.toFixed(1)} second`
	return string
}

/**
 * @param {string} ms - time in ms
*/
function sleep(ms) {
    /**
	 * Pauses execution for the given number of milliseconds.
	 *
	 * @param {number} ms - The number of milliseconds to pause for.
	 */
	new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * @param {string} str - time in ms
 */
function toHHMMSS(str) {
	const sec_num = parseInt(str, 10)
	let hours = Math.floor(sec_num / 3600)
	let minutes = Math.floor((sec_num - hours * 3600) / 60)
	let seconds = sec_num - hours * 3600 - minutes * 60
	if (hours < 10) {
		hours = `0${hours}`
	}
	if (minutes < 10) {
		minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * @param {string[]} arr - array of permissions in v13 forms
*/
/**
 * Converts an array of permission strings in v13 format to v14 format by replacing permission names with permission values.
 *
 * @param {string[]} arr - Array of permission strings in v13 format
 * @returns {string[]} Array of permission strings in v14 format
 */
function fixPermissions(arr = Array) {
	let perm = arr[0]

	const permissions = [
		{ name: 'ADMINISTRATOR', value: 'Administrator' },
		{ name: 'VIEW_AUDIT_LOG', value: 'ViewAuditLog' },
		{ name: 'VIEW_GUILD_INSIGHTS', value: 'ViewGuildInsights' },
		{ name: 'MANAGE_GUILD', value: 'ManageGuild' },
		{ name: 'MANAGE_ROLES', value: 'ManageRoles' },
		{ name: 'MANAGE_CHANNELS', value: 'ManageChannels' },
		{ name: 'KICK_MEMBERS', value: 'KickMembers' },
		{ name: 'BAN_MEMBERS', value: 'BanMembers' },
		{ name: 'CREATE_INSTANT_INVITE', value: 'CreateInstantInvite' },
		{ name: 'CHANGE_NICKNAME', value: 'ChangeNickname' },
		{ name: 'MANAGE_NICKNAMES', value: 'ManageNicknames' },
		{ name: 'MANAGE_EMOJIS_AND_STICKERS', value: 'ManageEmojisandStickers' },
		{ name: 'MANAGE_WEBHOOKS', value: 'ManageWebhooks' },
		{ name: 'VIEW_CHANNEL', value: 'ViewChannels' },
		{ name: 'SEND_MESSAGES', value: 'SendMessages' },
		{ name: 'SEND_TTS_MESSAGES', value: 'SendTTSMessages' },
		{ name: 'MANAGE_MESSAGES', value: 'ManageMessages' },
		{ name: 'EMBED_LINKS', value: 'EmbedLinks' },
		{ name: 'ATTACH_FILES', value: 'AttachFiles' },
		{ name: 'READ_MESSAGE_HISTORY', value: 'ReadMessageHistory' },
		{ name: 'MENTION_EVERYONE', value: 'MentionEveryone' },
		{ name: 'USE_EXTERNAL_EMOJIS', value: 'UseExternalEmojis' },
		{ name: 'ADD_REACTIONS', value: 'AddReactions' },
		{ name: 'CONNECT', value: 'Connect' },
		{ name: 'SPEAK', value: 'Speak' },
		{ name: 'STREAM', value: 'Stream' },
		{ name: 'MUTE_MEMBERS', value: 'MuteMembers' },
		{ name: 'DEAFEN_MEMBERS', value: 'DeafenMembers' },
		{ name: 'MOVE_MEMBERS', value: 'MoveMembers' },
		{ name: 'USE_VAD', value: 'UseVAD' },
		{ name: 'PRIORITY_SPEAKER', value: 'PrioritySpeaker' },
		{ name: 'REQUEST_TO_SPEAK', value: 'RequestToSpeak' },
		{ name: 'MANAGE_THREADS', value: 'ManageThreads' },
		{ name: 'USE_PUBLIC_THREADS', value: 'UsePublicThreads' },
		{ name: 'USE_PRIVATE_THREADS', value: 'UsePrivateThreads' },
		{ name: 'USE_EXTERNAL_STICKERS', value: 'UseExternalStickers' },
		{ name: 'USE_APPLICATION_COMMANDS', value: 'UseApplicationCommands' },
		{ name: 'MODERATE_MEMBERS', value: 'ModerateMembers' }
	]

	for (const { name, value } of permissions)
		perm = perm.replace(new RegExp(name, 'igm'), value)

	return [perm]
}

/**
 * @param {string} perm - permissions
*/
function formatPerms(perm) {
  return perm
    .toLowerCase()
    .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
    .replace(/_/g, ' ')
    .replace(/Guild/g, 'Server')
    .replace(/Use Vad/g, 'Use Voice Acitvity');
}

/**
 * @param {string[]} arr - array
*/
/**
 * Trims an array to the first 10 elements and appends
 * a string with the number of additional elements if truncated.
 *
 * @param {Array} arr - The array to trim
 * @returns {string} The array elements joined by ' **|** '
 */
function trimArray(arr = []) {
	if (arr.length > 10) {
		const length = arr.length - 10
		arr = arr.slice(0, 10)
		arr.push(`\n${length} more...`)
	}
	return arr.join(' **|** ')
}

/**
 * @param {String} date - date
*/
function checkDays(date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);
  return `${days + (days == 1 ? ' day' : ' days')} ago`;
}

/**
 * @param {String} str - string
*/
function format(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * @param {String[]} arr - array of server features
*/
/**
 * Formats an array of server features into a string of enabled features.
 *
 * @param {String[]} arr - Array of server feature keys
 * @returns {String} String of enabled features
 */
function fixFeatures(arr = []) {
	const all = {
		ANIMATED_ICON: 'Animated Icon',
		BANNER: 'Banner',
		COMMERCE: 'Commerce',
		COMMUNITY: 'Community',
		DISCOVERABLE: 'Discoverable',
		FEATURABLE: 'Featurable',
		INVITE_SPLASH: 'Invite Splash',
		MEMBER_VERIFICATION_GATE_ENABLED: 'Member Verification Gate Enabled',
		NEWS: 'News',
		PARTNERED: 'Partnered',
		PREVIEW_ENABLED: 'Preview Enabled',
		VANITY_URL: 'Vanity URL',
		VERIFIED: 'Verified',
		VIP_REGIONS: 'VIP Region',
		WELCOME_SCREEN_ENABLED: 'Welcome Screen Enabled',
		TICKETED_EVENTS_ENABLED: 'Ticketed Events Enabled',
		MONETIZATION_ENABLED: 'Monetization Enabled',
		MORE_STICKERS: 'More Stickers',
		THREE_DAY_THREAD_ARCHIVE: 'Three Day Thread Archive',
		SEVEN_DAY_THREAD_ARCHIVE: 'Seven Day Thread Archive',
		PRIVATE_THREADS: 'Private Threads,'
	}
	const final = []
	for (const feature in all) {
		if (arr.includes(feature)) final.push(`✅ ${all[feature]}`)
	}
	return `${final.join('\n')}`
}

const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const mn = d * 30;
const w = d * 7;
const y = d * 365.25;

/**
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 */

function ms(val, options) {
  options = options || {};
  const type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    `val is not a non-empty string or a valid number. val=${
      JSON.stringify(val)}`,
  );
}

/**
 * @param {String} str
 * @return {Number}
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mths|mn|years?|yrs?|y)?$/i.exec(
    str,
  );
  if (!match) {
    return;
  }
  const n = parseFloat(match[1]);
  const type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'month':
    case 'months':
    case 'mth':
    case 'mths':
      return n * mn;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

/**
 * Short format for `ms`.
 *
 * Formats the given milliseconds `ms` into a short human readable string.
 * If `ms` is greater than or equal to 1 month, returns value in months.
 * Progresses similarly down to seconds if not.
 * If less than 1 second, returns value in ms.
 * Rounds to nearest whole number.
 *
 * @param {Number} ms - Milliseconds to format
 * @return {String} - Short formatted string
 */
function fmtShort(ms) {
	const msAbs = Math.abs(ms)
	if (msAbs >= mn) {
		return `${Math.round(ms / mn)}mon`
	}
	if (msAbs >= w) {
		return `${Math.round(ms / w)}w`
	}
	if (msAbs >= d) {
		return `${Math.round(ms / d)}d`
	}
	if (msAbs >= h) {
		return `${Math.round(ms / h)}h`
	}
	if (msAbs >= m) {
		return `${Math.round(ms / m)}m`
	}
	if (msAbs >= s) {
		return `${Math.round(ms / s)}s`
	}
	return `${ms}ms`
}

/**
 * @param {Number} ms
 * @return {String}
 */

/**
 * Formats the given number of milliseconds into a long, human-readable string.
 *
 * Absolutizes and pluralizes the milliseconds based on common time units.
 * Returns strings like "1 day", "2 hours", "3 minutes", etc.
 * Falls back to returning just the number of milliseconds if less than a second.
 */
function fmtLong(ms) {
	const msAbs = Math.abs(ms)
	if (msAbs >= mn) {
		return plural(ms, msAbs, mn, 'month')
	}
	if (msAbs >= w) {
		return plural(ms, msAbs, w, 'week')
	}
	if (msAbs >= d) {
		return plural(ms, msAbs, d, 'day')
	}
	if (msAbs >= h) {
		return plural(ms, msAbs, h, 'hour')
	}
	if (msAbs >= m) {
		return plural(ms, msAbs, m, 'minute')
	}
	if (msAbs >= s) {
		return plural(ms, msAbs, s, 'second')
	}
	return `${ms} ms`
}

function plural(ms, msAbs, nz, name) {
  const isPlural = msAbs >= nz * 1.5;
  return `${Math.round(ms / nz)} ${name}${isPlural ? 's' : ''}`;
}

/**
 * @param {String[]} array - select randome array
*/
function selectRandom(array = []) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * @param {Discord.Embed} embed - get string from embed
*/
/**
 * Extracts all text content from a Discord embed object into a single string.
 *
 * Loops through the embed's title, description, fields, and footer to build the string.
 * Performs text replacements on invites and links in the content.
 * Formats timestamp in the footer to a human readable date/time string.
 */
function getAllTextFromEmbed(embed) {
	let text = ''
	function getTime(now) {
		const date = new Date(now)
		const escape = (value) => `0${value}`.slice(-2)
		const ampm = date.getHours() >= 12 ? 'PM' : 'AM'

		return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${escape(
			date.getHours()
		)}:${escape(date.getMinutes())}:${escape(date.getSeconds())}${ampm}`
	}

	if (embed.title) {
		text += `**${embed.title
			.replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, 'Invite')
			.replace(/\[(.*)\]\((.*)\)/g, 'Hyper link')}**`
	}
	if (embed.description) {
		text += `\n${embed.description
			.replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, 'Invite')
			.replace(/\[(.*)\]\((.*)\)/g, 'Hyper link')}`
	}
	if (embed.fields) {
		text += '\n'
		for (const field of embed.fields) {
			text += `\n**${field.name
				.replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, 'Invite')
				.replace(/\[(.*)\]\((.*)\)/g, 'Hyper link')}**\n ${field.value
				.replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, 'Invite')
				.replace(/\[(.*)\]\((.*)\)/g, 'Hyper link')}`
		}
	}
	if (embed.footer) {
		let field = `\n\n**${embed.footer.text
			.replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, 'Invite')
			.replace(/\[(.*)\]\((.*)\)/g, 'Hyper link')}`

		if (embed.timestamp) {
			const time =
				embed.timestamp instanceof Date
					? getTime(embed.timestamp.getTime())
					: embed.timestamp
			field += `at ${time}`
		}

		text += `${field}**`
	}

	return text
}

/**
 * @param {String} text - clean a string
*/
function clean(text) {
  if (typeof text === 'string') {
    return text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`);
  }
  return text;
}

/**
 * Sends a random tip to the user from a list of tips.
 * Checks if a random number is below a threshold,
 * and if so sends an embed with a random tip.
 */
function tips(interaction, client) {
	const all = [
		'You can report bugs in Support server !',
		"If a gun isn't there, please be paitent and wait for the us to get the stats",
		'Join Our Support server!'
	]
	const ran = Math.floor(Math.random() * 50) + 2
	const rTip = all[Math.floor(Math.random() * all.length)]
	if (ran <= 11) {
		interaction.channel.send({
			embeds: [
				new EmbedBuilder()
					.setTitle('Tips')
					.setColor(client.color)
					.setDescription(`**💡 Did you know**\n${rTip}`)
					.setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
					.setTimestamp()
					.setURL(client.web)
			]
		})
	}
}

/**
 * Generates MessageActionRows containing MessageButtons 
 * for inviting the bot, joining support server, visiting website, 
 * YouTube channel, and Ko-fi page.
 * 
 * @param {Client} client - The Discord client
 * @returns {MessageActionRow[]} - Array containing a MessageActionRow
 * with the MessageButtons
 */
/** 
function buttons(client) {
  const invite = new MessageButton()
    .setLabel("Invite the bot!")
    .setStyle("LINK")
    .setEmoji("896527406100283462")
    .setURL(
      `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=4231314550&scope=bot%20applications.commands`
    );
  const support = new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
    .setEmoji("867093614403256350")
    .setURL("https://discord.gg/SbQHChmGcp");
  const website = new MessageButton()
    .setLabel("Website")
    .setStyle("LINK")
    .setEmoji("🖥")
    .setURL("https://cath.gq/");
  const youtube = new MessageButton()
    .setLabel("YouTube")
    .setStyle("LINK")
    .setEmoji("841186450497339412")
    .setURL("https://youtube.com/Kirito01");
  const kofi = new MessageButton()
    .setLabel("Ko-fi")
    .setStyle("LINK")
    .setEmoji("900590344364757013")
    .setURL("https://ko-fi.com/cathteam");
  const row = new MessageActionRow().addComponents(
    invite,
    support,
    website,
    youtube,
    kofi
  );
  return [row];
}
*/

/**
 * Returns an object with styled console log methods using ANSI escape codes.
 * The object properties are styled log methods like red(), blue() etc.
 * The methods accept string arguments to log to the console in that style.
 */
const colorize = (...args) => ({
	black: `\x1b[30m${args.join(' ')}`,
	red: `\x1b[31m${args.join(' ')}`,
	green: `\x1b[32m${args.join(' ')}`,
	yellow: `\x1b[33m${args.join(' ')}`,
	blue: `\x1b[34m${args.join(' ')}`,
	magenta: `\x1b[35m${args.join(' ')}`,
	cyan: `\x1b[36m${args.join(' ')}`,
	white: `\x1b[37m${args.join(' ')}`,
	bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
	bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
	bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
	bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
	bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
	bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
	bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
	bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
})
const leven = (te, t) => {
  if (!te.length) return t.length;
  if (!t.length) return te.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= te.length; j++) {
      arr[i][j] = i === 0
        ? j
        : Math.min(
          arr[i - 1][j] + 1,
          arr[i][j - 1] + 1,
          arr[i - 1][j - 1] + (te[j - 1] === t[i - 1] ? 0 : 1),
        );
    }
  }
  return arr[t.length][te.length];
};

function chunk(arr, size) {
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
    arr.slice(i * size, i * size + size);
  });
}

/**
 * Generates a progress bar string based on a value, max value, and size.
 *
 * @param {number} value - The current progress value
 * @param {number} maxValue - The maximum progress value
 * @param {number} size - The number of characters wide to make the progress bar
 * @returns {Object} - Object containing the progress bar string (Bar) and percentage text
 */
function progressBar(value, maxValue, size) {
	const percentage = value / maxValue
	const progress = Math.round(size * percentage)
	const emptyProgress = size - progress
	const progressText = '▇'.repeat(progress)
	const emptyProgressText = '—'.repeat(emptyProgress)
	const percentageText = `${Math.round(percentage * 100)}%`

	const Bar = progressText + emptyProgressText
	return { Bar, percentageText }
}

function prettyMs(milliseconds, options = {}) {
  const pluralize = (word, count) => (count === 1 ? word : `${word}s`);
  const SECOND_ROUNDING_EPSILON = 0.0000001;
  if (!Number.isFinite(milliseconds)) {
    throw new TypeError('Expected a finite number');
  }

  if (options.colonNotation) {
    options.compact = false;
    options.formatSubMilliseconds = false;
    options.separateMilliseconds = false;
    options.verbose = false;
  }

  if (options.compact) {
    options.secondsDecimalDigits = 0;
    options.millisecondsDecimalDigits = 0;
  }

  const result = [];

  const floorDecimals = (value, decimalDigits) => {
    const flooredInterimValue = Math.floor(
      value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON,
    );
    const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
    return flooredValue.toFixed(decimalDigits);
  };

  const add = (value, long, short, valueString) => {
    if (
      (result.length === 0 || !options.colonNotation)
      && value === 0
      && !(options.colonNotation && short === 'm')
    ) {
      return;
    }

    valueString = (valueString || value || '0').toString();
    let prefix;
    let suffix;
    if (options.colonNotation) {
      prefix = result.length > 0 ? ':' : '';
      suffix = '';
      const wholeDigits = valueString.includes('.')
        ? valueString.split('.')[0].length
        : valueString.length;
      const minLength = result.length > 0 ? 2 : 1;
      valueString = '0'.repeat(Math.max(0, minLength - wholeDigits)) + valueString;
    } else {
      prefix = '';
      suffix = options.verbose ? ` ${pluralize(long, value)}` : short;
    }

    result.push(prefix + valueString + suffix);
  };

  const parsed = parseMilliseconds(milliseconds);

  add(Math.trunc(parsed.days / 365), 'year', 'y');
  add(parsed.days % 365, 'day', 'd');
  add(parsed.hours, 'hour', 'h');
  add(parsed.minutes, 'minute', 'm');

  if (
    options.separateMilliseconds
    || options.formatSubMilliseconds
    || (!options.colonNotation && milliseconds < 1000)
  ) {
    add(parsed.seconds, 'second', 's');
    if (options.formatSubMilliseconds) {
      add(parsed.milliseconds, 'millisecond', 'ms');
      add(parsed.microseconds, 'microsecond', 'µs');
      add(parsed.nanoseconds, 'nanosecond', 'ns');
    } else {
      const millisecondsAndBelow = parsed.milliseconds
        + parsed.microseconds / 1000
        + parsed.nanoseconds / 1e6;

      const millisecondsDecimalDigits = typeof options.millisecondsDecimalDigits === 'number'
        ? options.millisecondsDecimalDigits
        : 0;

      const roundedMiliseconds = millisecondsAndBelow >= 1
        ? Math.round(millisecondsAndBelow)
        : Math.ceil(millisecondsAndBelow);

      const millisecondsString = millisecondsDecimalDigits
        ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits)
        : roundedMiliseconds;

      add(
        Number.parseFloat(millisecondsString, 10),
        'millisecond',
        'ms',
        millisecondsString,
      );
    }
  } else {
    const seconds = (milliseconds / 1000) % 60;
    const secondsDecimalDigits = typeof options.secondsDecimalDigits === 'number'
      ? options.secondsDecimalDigits
      : 1;
    const secondsFixed = floorDecimals(seconds, secondsDecimalDigits);
    const secondsString = options.keepDecimalsOnWholeSeconds
      ? secondsFixed
      : secondsFixed.replace(/\.0+$/, '');
    add(Number.parseFloat(secondsString, 10), 'second', 's', secondsString);
  }

  if (result.length === 0) {
    return `0${options.verbose ? ' milliseconds' : 'ms'}`;
  }

  if (options.compact) {
    return result[0];
  }

  if (typeof options.unitCount === 'number') {
    const separator = options.colonNotation ? '' : ' ';
    return result.slice(0, Math.max(options.unitCount, 1)).join(separator);
  }

  return options.colonNotation ? result.join('') : result.join(' ');
}

function parseMilliseconds(milliseconds) {
  if (typeof milliseconds !== 'number') {
    throw new TypeError('Expected a number');
  }

  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
    microseconds: Math.trunc(milliseconds * 1000) % 1000,
    nanoseconds: Math.trunc(milliseconds * 1e6) % 1000,
  };
}

const default_opts = {
  hoursPerDay: 24,
  daysPerWeek: 7,
  weeksPerMonth: 4,
  monthsPerYear: 12,
  daysPerYear: 365.25,
};
const UNIT_MAP = {
  ms: ['ms', 'milli', 'millisecond', 'milliseconds'],
  s: ['s', 'sec', 'secs', 'second', 'seconds'],
  m: ['m', 'min', 'mins', 'minute', 'minutes'],
  h: ['h', 'hr', 'hrs', 'hour', 'hours'],
  d: ['d', 'day', 'days'],
  w: ['w', 'week', 'weeks'],
  mth: ['mon', 'mth', 'mths', 'month', 'months'],
  y: ['y', 'yr', 'yrs', 'year', 'years'],
};

/**
 * Parse a timestring
 *
 * @param   {string} string
 * @param   {string} returnUnit
 * @param   {Object} opts
 * @returns {number}
 */

/**
 * Parse a timestring into total seconds.
 *
 * @param {string} string - The timestring to parse
 * @param {string} [returnUnit] - The unit to return the result in
 * @param {Object} [opts] - Options to override defaults
 * @returns {number} The parsed timestring in total seconds, or in the returnUnit if specified
 */
function parseTimestring(string, returnUnit, opts) {
	opts = { ...default_opts, ...(opts || {}) }

	let totalSeconds = 0
	const unitValues = getUnitValues(opts)
	const groups = string
		.toLowerCase()
		.replace(/[^.\w+-]+/g, '')
		.match(/[-+]?[0-9.]+[a-z]+/g)

	if (groups === null) {
		throw new Error(`The string [${string}] could not be parsed by timestring`)
	}

	groups.forEach((group) => {
		const value = group.match(/[0-9.]+/g)[0]
		const unit = group.match(/[a-z]+/g)[0]

		totalSeconds += getSeconds(value, unit, unitValues)
	})

	if (returnUnit) {
		return convert(totalSeconds, returnUnit, unitValues)
	}

	return totalSeconds
}

function getUnitValues(opts) {
  const unitValues = {
    ms: 0.001,
    s: 1,
    m: 60,
    h: 3600,
  };

  unitValues.d = opts.hoursPerDay * unitValues.h;
  unitValues.w = opts.daysPerWeek * unitValues.d;
  unitValues.mth = (opts.daysPerYear / opts.monthsPerYear) * unitValues.d;
  unitValues.y = opts.daysPerYear * unitValues.d;

  return unitValues;
}

function getUnitKey(unit) {
  for (const key of Object.keys(UNIT_MAP)) {
    if (UNIT_MAP[key].indexOf(unit) > -1) {
      return key;
    }
  }
  throw new Error(`The unit [${unit}] is not supported by timestring`);
}

function getSeconds(value, unit, unitValues) {
  return value * unitValues[getUnitKey(unit)];
}
function convert(value, unit, unitValues) {
  return value / unitValues[getUnitKey(unit)];
}

module.exports = {
  color,
  rndint,
  timer,
  sleep,
  toHHMMSS,
  fixPermissions,
  trimArray,
  formatPerms,
  checkDays,
  format,
  fixFeatures,
  ms,
  selectRandom,
  getAllTextFromEmbed,
  clean,
  tips,
  //  buttons,
  colorize,
  leven,
  chunk,
  progressBar,
  parseTimestring,
  prettyMs,
  match_regex,
};
