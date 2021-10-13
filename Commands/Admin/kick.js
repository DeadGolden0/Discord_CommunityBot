const Discord = require('discord.js'),
    config = require('../../config.json');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
require('dayjs/locale/fr');
dayjs.extend(localizedFormat)

module.exports = {
    name: "kick",
    logo: "🚪",
    usage: ["Cette commande permet d'exclure un membre du serveur."],
    syntax: ["```{prefix}kick <@membre [raison]>```"],
    exemple: ["```{prefix}kick @Community Bot#6877  Pub```"],
    enabled: true,
    aliases: ["kick"],
    category: "🛡️ ￶ | ￶ Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,
    
    async execute(client, message, args, data){
        try{
            const member = message.mentions.members.first()

            if (!member || !args[0]) return client.embed.usage(message, data, client);
            if(member.id === message.author.id) return message.channel.send('Vous ne pouvez pas vous exclure vous-meme.');
            if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas exclure le propriétaire du serveur.')

            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas exclure ce membre.')
            if (!member.kickable) return message.channel.send('Le bot ne peut pas exclure ce membre.')

            const reason = args.slice(1).join(' ') || 'Aucune raison fournie'
            const datekick = dayjs().locale('fr').format("LLLL");

            await member.kick({reason})
            .then(member => {
                message.delete()
                message.channel.send(new Discord.MessageEmbed()
                .setColor("ORANGE")
                .setDescription(`⛔ ￶ | ￶ ${member.user.tag} a bien été Exclu du serveur.`)
                )
                message.guild.channels.cache.get(config.logschannel).send(new Discord.MessageEmbed()
                .setColor("ORANGE")
                .setThumbnail(member.user.displayAvatarURL())
                .addField("⛔ ￶ | ￶ Exclusion d'un membre", " ￶ ￶￶", false)
                .addFields(
                    { name: 'Membre Exclu :', value: `${member.user.tag}`, inline: false },
                    { name: 'Exclu par :', value: `${message.author}`, inline: false },
                    { name: 'Raison de l\'Exclusion :', value: `${reason}`, inline: false },
                    { name: 'Date de l\'Exclusion :', value: `${datekick}`, inline: false },
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