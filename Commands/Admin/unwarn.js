const Discord = require('discord.js');
const warns = require('../../Database/Schema/warns');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const utc = require('dayjs/plugin/utc');
require('dayjs/locale/fr');
dayjs.extend(utc)
dayjs.extend(localizedFormat)

module.exports = {
    name: "unwarn",
    logo: "🛠️",
    usage: ["Cette commande permets d'enlever un warn a un membre du serveur."],
    syntax: ["```{prefix}unwarn <@membre> <numero du warn>```"],
    exemple: ["```{prefix}unwarn @Community Bot#6877 2```"],
    enabled: true,
    aliases: ["unwarn"],
    category: "🛡️ ￶ | ￶ Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{


        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}