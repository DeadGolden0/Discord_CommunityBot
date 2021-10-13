const Discord = require('discord.js')

module.exports = {
    name: "coinflip",
    logo: "🥏",
    usage: ["Cette commande permets de jouer a pile ou face."],
    syntax: ["```{prefix}coinflip```"],
    exemple: ["```{prefix}coinflip```"],
    enabled: true,
    aliases: ["cf"],
    category: "🎲 ￶ | ￶ Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const choix = ["Pile", "Face"];
            const resultat = choix[Math.floor(Math.random() * choix.length)];

            message.delete()
            await message.channel.send(new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setDescription(`🎲 ￶ | ￶ **${message.author.username} Lance la pièce en l'air....**`, "￶\u200B￶")
                .setImage('https://media1.tenor.com/images/7db68a601d5cc4f39cb699f06ff9c3f8/tenor.gif?itemid=9665789')
                .setFooter('Dead - Bot ©', client.user.avatarURL())
                .setTimestamp()
            ).then(sent => sent.delete({timeout: 3200}))

            await message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`🎲 ￶ | ￶ ${message.author.username} a fait : **${resultat}**`, "￶\u200B￶")
            )
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}