const Discord = require('discord.js');

module.exports = {
    name: "8ball",
    logo: "🎱",
    usage: ["Laissez la 8ball répondre à votre question."],
    syntax: ["```{prefix}8ball <Question>```"],
    exemple: ["```{prefix}8ball Suis-je vieux ?```"],
    enabled: true,
    aliases: ["eightball"],
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
            if(!args[0]) return client.embed.usage(message, data, client);

            let replies = [
                "Pffft",
                "D'après moi oui.",
                "Essaye plus tard",
                "C'est non",
                "Peu probable",
                "C'est certain",
                "Essaye encore",
                "Pose une autre question.",
                "Oui absolument",
                "Tu peux compter dessus",
                "Ça intéresse quelqu'un",
                "Pas d'avis",
                "Faut pas rêver",
                "N'y compte pas",
                "C'est ton destin",
                "Jamais.",
                "Sans aucun doute",
                "Impossible",
                "Le sort en est jeté",
                "Une chance sur deux",
                "Très probable",
                "Oui",
                "Pas mon problème.",
                "Laisse moi rire.",
                "Perspectives assez mauvaises",
                "Repose ta question",
                "C'est bien parti",
                "OUI !!!",
                "Malheureusement, c'est sans espoir",
                "Et puis quoi encore ?",
                "Les astres disent que OUI",
                "Mes sources me disent que NON",
                "La flemme de répondre !",
                "Je ne peux rien prédire pour l'instant"
            ];

            let result = replies[Math.floor((Math.random() * replies.length))];
            let question = args.slice(0).join(" ");

            return message.channel.send(new Discord.MessageEmbed()
                .setTitle("🔮 ￶ | ￶ Magique 8 BALL ￶ | ￶ 🔮")
                .setColor('NAVY')
                .setDescription(`Question de ${message.author}`)
                .addFields(
                    { name: "￶\u200B", value: "￶\u200B", inline: false },
                    { name: " | \u200B | ", value: ` | \u200B | `, inline: true },
                    { name: "❔ ￶ | ￶ Question :", value: `${question}`, inline: true },
                    { name: " | \u200B | ", value: ` | \u200B | `, inline: true },
                    { name: " | \u200B | ", value: ` | \u200B | `, inline: true },
                    { name: "✏️ ￶ | ￶ Réponse :", value: `${result}`, inline: true },
                    { name: " | \u200B | ", value: ` | \u200B | `, inline: true },
                )
            )

        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}