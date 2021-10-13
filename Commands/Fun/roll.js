const Discord = require('discord.js')

module.exports = {
    name: "roll",
    logo: "🎲",
    usage: ["Cette commande permet d'obtenir un nombre aléatoire entre 0 et 100 ou selon une limite donnée."],
    syntax: ["```{prefix}roll [Limite]```"],
    exemple: ["```{prefix}roll 50```"],
    enabled: true,
    aliases: ["roll"],
    category: "🎲 ￶ | ￶ Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 3000,

    async execute(client, message, args, data){
        try{
            let limite = args[0] || 100;
            var resultat = Math.floor((Math.random() * limite) + 1)

            if (resultat>limite/2) {
                await message.channel.send(new Discord.MessageEmbed()
                .setColor('DARK_GREEN')
                .setDescription(`🎲 ￶ | ￶ ${message.author.username} a fait : **${resultat}**`, "￶\u200B￶")
                )
            }else if (resultat<limite/2) {
                await message.channel.send(new Discord.MessageEmbed()
                .setColor('DARK_RED')
                .setDescription(`🎲 ￶ | ￶ ${message.author.username} a fait : **${resultat}**`, "￶\u200B￶")
                )
            };

        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}