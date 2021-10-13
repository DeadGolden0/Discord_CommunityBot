const Discord = require('discord.js')

module.exports = {
    name: "avatar",
    logo: "🖼️",
    usage: ["Cette commande permet d'afficher votre avatar ou celui d'un membre."],
    syntax: ["```{prefix}avatar [@membre]```"],
    exemple: ["```{prefix}avatar @Community Bot#6877```"],
    enabled: true,
    aliases: ["avatar"],
    category: "📜 ￶ | ￶ Général",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            let member = message.mentions.users.first() || message.author;
            let avatar = member.displayAvatarURL({dynamic: true,size: 4096})

            message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField(`🖼️ ￶ | ￶ Avatar de ${member.username} :`, "￶\u200B￶")
            .setImage(avatar)
            .setFooter('Dead - Bot ©', client.user.avatarURL())
            .setTimestamp()
            )
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}