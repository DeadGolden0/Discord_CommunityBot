const Discord = require('discord.js'),
    config = require('../../config.json');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
require('dayjs/locale/fr');
dayjs.extend(localizedFormat)

module.exports = {
    name: "ban",
    logo: "🚪",
    usage: ["Cette commande permet d'exclure definitevment un membre du serveur."],
    syntax: ["```{prefix}ban <@membre> [raison]```"],
    exemple: ["```{prefix}ban @Community Bot#6877 Pub```"],
    enabled: true,
    aliases: ["ban"],
    category: "🛡️ ￶ | ￶ Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 3000,

    async execute(client, message, args, data){
        try{
            const member = message.mentions.members.first()

            if (!member || !args[0]) return client.embed.usage(message, data, client);
            if(member.id === message.author.id) return message.channel.send('Vous ne pouvez pas vous bannir vous-meme.');
            if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas bannir le propriétaire du serveur.')

            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas Bannir ce membre.')
            if (!member.bannable) return message.channel.send('Le bot ne peut pas bannir ce membre.')

            const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
            const dateban = dayjs().locale('fr').format("LLLL");

            await member.ban({reason})
            .then(member => {
                //message.delete()
                message.channel.send(new Discord.MessageEmbed()
                .setColor("DARK_RED")
                .setDescription(`⛔ ￶ | ￶ ${member.user.tag} a bien été Banni du serveur.`)
                )

                message.guild.channels.cache.get(config.logschannel).send(new Discord.MessageEmbed()
                .setColor("DARK_RED")
                .setThumbnail(member.user.displayAvatarURL())
                .addField("⛔ ￶ | ￶ Bannissement d'un membre", " ￶ ￶￶", false)
                .addFields(
                    { name: 'Membre Banni :', value: `${member.user.tag}`, inline: false },
                    { name: 'Banni par :', value: `${message.author}`, inline: false },
                    { name: 'Raison du Bannisement :', value: `${reason}`, inline: false },
                    { name: 'Date du Bannissement :', value: `${dateban}`, inline: false },
                ))
            })
            .catch(err => {
                if(err) return message.channel.send(new Discord.MessageEmbed()
                .setColor("DARK_RED")
                .setDescription(`⛔ ￶ | ￶ Une erreur s'est produite.`)
                );
            })
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}