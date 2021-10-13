const Discord = require('discord.js');
const warns = require('../../Database/Schema/warns');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const utc = require('dayjs/plugin/utc');
require('dayjs/locale/fr');
dayjs.extend(utc)
dayjs.extend(localizedFormat)

module.exports = {
    name: "warn",
    logo: "🛠️",
    usage: ["Cette commande permets d'appliquer un warn a un membre du serveur."],
    syntax: ["```{prefix}warn <@membre> <raison>```"],
    exemple: ["```{prefix}warn @Community Bot#6877 Insulte```"],
    enabled: true,
    aliases: ["warn"],
    category: "🛡️ ￶ | ￶ Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const member = message.mentions.members.first()
            
            if (!member || !args[0]) return client.embed.usage(message, data, client);
            if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn le propriétaire du serveur.')
            if(member.bot) return message.channel.send('Vous ne pouvez pas warn les bots.');
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas warn ce membre.')
            
            const reason = args.slice(1).join(' ')
            if (!reason) return client.embed.usage(message, data, client);
            const datewarn = dayjs().locale('fr').format("LLLL");

            //---------------------------------------------
            //               DB PUSH
            //---------------------------------------------
            warns.findOne({ Guild: message.guild.id, User: member.id}, async(err, data)=>{
                if(err) console.log(err)
                if(!data){
                    let newWarn = warns({
                        User: member.id,
                        Guild: message.guild.id,
                        Warns: {
                            Moderator: message.author.id,
                            Reason: reason,
                            Date: datewarn
                        }
                    })
                    newWarn.save()
                    //---------------------------------------------
                    //               DM Message
                    //---------------------------------------------
                    member.send(new Discord.MessageEmbed()
                    .setColor("DARK_RED")
                    .setDescription(`⛔ ￶ | ￶ Vous avez été warn pour **${reason}** sur le serveur **${message.guild.name}**.`)
                    )
                    //---------------------------------------------
                    //               Server Message
                    //---------------------------------------------
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("DARK_RED")
                    .setDescription(`⛔ ￶ | ￶ ${member} a été warn pour **${reason}**.`)
                    )
                    //---------------------------------------------
                    //               Logs Message
                    //---------------------------------------------
                    message.guild.channels.cache.get(config.logschannel).send(new Discord.MessageEmbed()
                    .setColor("BLURPLE")
                    .setThumbnail(member.user.displayAvatarURL())
                    .addField("⛔ ￶ | ￶ Warn d'un membre", " ￶ ￶￶", false)
                    .addFields(
                        { name: 'Membre Warn :', value: `${member.user.tag}`, inline: false },
                        { name: 'Warn par :', value: `${message.author}`, inline: false },
                        { name: 'Raison du Warn :', value: `${reason}`, inline: false },
                        { name: 'Date du Warn :', value: `${datewarn}`, inline: false },
                    )
                    )
                } else {
                    data.save()
                    data.Warns.unshift({
                        Moderator: message.author.id,
                        Reason: reason,
                        Date: datewarn
                    })
                    //---------------------------------------------
                    //               DM Message
                    //---------------------------------------------
                    member.send(new Discord.MessageEmbed()
                    .setColor("DARK_RED")
                    .setDescription(`⛔ ￶ | ￶ Vous avez été warn pour **${reason}** sur le serveur **${message.guild.name}**.`)
                    )
                    //---------------------------------------------
                    //               Server Message
                    //---------------------------------------------
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("DARK_RED")
                    .setDescription(`⛔ ￶ | ￶ ${member} a été warn pour **${reason}**.`)
                    )
                    //---------------------------------------------
                    //               Logs Message
                    //---------------------------------------------
                    message.guild.channels.cache.get(config.logschannel).send(new Discord.MessageEmbed()
                    .setColor("BLURPLE")
                    .setThumbnail(member.user.displayAvatarURL())
                    .addField("⛔ ￶ | ￶ Warn d'un membre", " ￶ ￶￶", false)
                    .addFields(
                        { name: 'Membre Warn :', value: `${member.user.tag}`, inline: false },
                        { name: 'Warn par :', value: `${message.author}`, inline: false },
                        { name: 'Raison du Warn :', value: `${reason}`, inline: false },
                        { name: 'Date du Warn :', value: `${datewarn}`, inline: false },
                    )
                    )
                }
            })
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}