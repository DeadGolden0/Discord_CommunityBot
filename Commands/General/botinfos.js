const Discord = require('discord.js');

module.exports = {
    name: "botinfos",
    usage: ["Cette commande permets d'afficher les informations du Bot."],
    syntax: ["```{prefix}botinfos```"],
    exemple: ["```{prefix}botinfos```"],
    enabled: true,
    aliases: ["binfos"],
    category: "📜 ￶ | ￶ Général",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            let uptime = await client.tools.convertTime(message.client.uptime);
            let ram = ((process.memoryUsage().heapUsed / 1024 / 1024) + (process.memoryUsage().heapTotal / 1024 / 1024)).toFixed(2);
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setThumbnail( client.user.avatarURL({dynamic: true, size:512}))
                .addFields(
                    { name: "❔ ￶ | ￶ Informations ￶ Général ￶ | ￶ ❔", value: "￶\u200B￶", inline: false },
                    { name: "💻 ￶ | ￶ Développeur :", value: "デッドゴールデン | 🍹 𝓓𝓔𝓐𝓓#0002", inline: false },
                    { name: "￶\u200B￶", value: "￶\u200B￶", inline: false },
                    { name: "💬 ￶ | ￶ Channels :", value: `${client.channels.cache.size}`, inline: true },
                    { name: "👥 ￶ | ￶ Utilisateurs :", value: `${client.users.cache.size}`, inline: true },
                    { name: "⚙️ ￶ | ￶ Serveurs :", value: `${client.guilds.cache.size}`, inline: true },
                    { name: "🛡️ ￶ | ￶ Utilisation Ram :", value: `${ram}MB`, inline: true },
                    { name: "📡 ￶ | ￶ API latence :", value: `${client.ws.ping} ms`, inline: true },
                    { name: "⌛ ￶ | ￶ Uptime :", value: `${uptime}`, inline: true },
                )
                .setFooter("Dead - Bot ©", client.user.avatarURL())
                .setTimestamp()
            )

        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}