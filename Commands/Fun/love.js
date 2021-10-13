const Discord = require('discord.js')

module.exports = {
    name: "love",
    logo: "💖",
    usage: ["Calculer le taux d'amour entre 2 personnes."],
    syntax: ["```{prefix}love <user1> <user2>```"],
    exemple: ["```{prefix}love @デッドゴールデン | 🍹 𝓓𝓔𝓐𝓓 @Community Bot#6877```"],
    enabled: true,
    aliases: ["love"],
    category: "🎲 ￶ | ￶ Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            let member1 = message.mentions.users.first()
            let member2 = message.mentions.users.last()

            const love = Math.random() * 100;
            const loveIndex = Math.floor(love / 10);
            const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
            console.log(member1.username)
            console.log(member2.username)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor('DARK_VIVID_PINK')
                .setTitle(`💖 ￶ | ￶ **${member1.username}**  +  **${member2.username}** ￶ | ￶ 💖`)
                .addFields(
                    { name: "￶\u200B", value: "￶\u200B", inline: false },
                    { name: `💖 ￶ | ￶ Pourcentage d'amour`, value: `${Math.floor(love)}% d'amour`, inline: false },
                    { name: "\u200B", value: `\`\`\`${loveLevel}\`\`\``, inline: false },
                )
            )

        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}