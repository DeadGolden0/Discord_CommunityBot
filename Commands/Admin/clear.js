const Discord = require('discord.js')

module.exports = {
    name: "clear",
    logo: "♻️",
    usage: ["Cette commande permets de supprimer un certain nombre de messages prédéfinie."],
    syntax: ["```{prefix}clear <Nombre (1-99)>```"],
    exemple: ["```{prefix}clear 50```"],
    enabled: true,
    aliases: ["clear"],
    category: "🛡️ ￶ | ￶ Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const count = args[0]
            if (!/\d+/.test(count)) return client.embed.usage(message, data, client);

            if (count < 1 || count > 99) return message.channel.send(new Discord.MessageEmbed()
            .setColor('DARK_RED')
            .setDescription('**❌ ￶ | ￶ Le nombre de message à supprimer doit être compris entre 1 et 99.**')
            //.setFooter("Dead - Bot ©", client.user.avatarURL())
            //.setTimestamp()
            )
            const { size } = await message.channel.bulkDelete(Number(count) + 1, true)
            //message.channel.send(`:white_check_mark: **${size - 1} messages** ont été supprimés !`).then(sent => sent.delete({timeout: 5e3}))
            message.channel.send(new Discord.MessageEmbed()
            .setColor('DARK_GREEN')
            .setDescription(`✅ ￶ | ￶ **${size - 1} messages** ont été supprimés !`)
            //.setFooter("Dead - Bot ©", client.user.avatarURL())
            //.setTimestamp()
            ).then(sent => sent.delete({timeout: 5e3}))
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}