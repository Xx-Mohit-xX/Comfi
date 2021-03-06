/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const simplydjs = require('simply-djs')

module.exports = {
  name: 'buttonrole',
  description: 'Reaction Roles With Buttons',
  directory: "role",
  ownerOnly: false,
  options: [
    {
      name: 'add',
      description: 'Add Reaction Role to Bot msg only',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'channel',
          type: 'CHANNEL',
          description: 'channel of that message',
          required: true,
          channelTypes: ['GUILD_TEXT']
        },
        {
          name: 'message',
          type: 'STRING',
          description: 'the message id',
          required: true
        },
        {
          name: 'role',
          type: 'ROLE',
          description: 'Role to Add',
          required: true
        },
        {
          name: 'label',
          type: 'STRING',
          description: 'name of the button ?',
          required: false
        },
        {
          name: 'style',
          type: 'STRING',
          description: 'color of the button',
          required: false,
          choices: [
            {
              name: 'Blue',
              value: 'PRIMARY'
            },
            {
              name: 'Grey',
              value: 'SECONDARY'
            },
            {
              name: 'Green',
              value: 'SUCCESS'
            },
            {
              name: 'Red',
              value: 'DANGER'
            }
          ]
        },
        {
          name: 'emoji',
          type: 'STRING',
          description: 'emoji for the button',
          required: false
        }
      ]
    },
    {
      name: 'remove',
      description: 'Removes roles from a bot message',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'channel',
          type: 'CHANNEL',
          description: 'channel of that message',
          required: true,
          channelTypes: ['GUILD_TEXT']
        },
        {
          name: 'message',
          type: 'STRING',
          description: 'the message id',
          required: true
        },
        {
          name: 'role',
          type: 'ROLE',
          description: 'Role to remove',
          required: true
        }
      ]
    }
  ],
  userperm: [''],
  botperm: [''],
  run: async (bot, interaction, args) => {
    let [options] = args

    try {
      if (options === 'add') {
        simplydjs.betterBtnRole(bot, interaction, {
          type: 'add'
        })
      }

      if (options === 'remove') {
        simplydjs.betterBtnRole(bot, interaction, {
          type: 'remove'
        })
      }
    } catch (e) {
  await bot.senderror(interaction, e)
    }
  }
}
