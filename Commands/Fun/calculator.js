const Discord = require('discord.js');

module.exports = {
    name: "calcul",
    logo: "🧮",
    usage: ["Cette commande permet d'effectuer des calculs basiques."],
    syntax: ["```{prefix}calculator <operation>```"],
    exemple: ["```{prefix}calculator 5 * 8```"],
    enabled: true,
    aliases: ["cal"],
    category: "🎲 ￶ | ￶ Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            let signos = ["*","/","+","-","x"];
            if(!args[2]){
                return client.embed.usage(message, data, client);
            };

            if(!signos.includes(args[1].toLowerCase())){
                return client.embed.usage(message, data, client);
            };

            let signo = args[1].toLowerCase() === "x" ? '*' : args[1];
            let calculation = await eval(args[0]+signo+args[2]);
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle("🧮 ￶ | ￶ Calculatrice ￶ | ￶ 🧮")
                .setDescription(`Question de ${message.author}`)
                .setColor('NAVY')
                .addFields(
                    { name: "￶\u200B", value: "￶\u200B", inline: false },
                    { name: "❔ ￶ | ￶ Calcul :", value: `\`\`\`${args[0]} ${signo} ${args[2]}\`\`\``, inline: false },
                    { name: "📚 ￶ | ￶ Résultat :", value: `\`\`\`${calculation}\`\`\``, inline: false },
                )
            )
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}