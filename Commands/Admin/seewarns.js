const Discord = require('discord.js');
const warns = require('../../Database/Schema/warns');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const utc = require('dayjs/plugin/utc');
require('dayjs/locale/fr');
dayjs.extend(utc)
dayjs.extend(localizedFormat)

module.exports = {
    name: "warns",
    logo: "🛠️",
    usage: ["Cette commande permets de visualiser les warns d'un membre du serveur."],
    syntax: ["```{prefix}warns <@membre>```"],
    exemple: ["```{prefix}warns @Community Bot#6877```"],
    enabled: true,
    aliases: ["warns"],
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