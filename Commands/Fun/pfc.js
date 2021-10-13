const Discord = require('discord.js');
const choice = ["🌑", "🧾", "✂️"]

module.exports = {
    name: "pfc",
    logo: "✂️",
    usage: ["Jouer a Pierre Feuille Ciseaux contre le bot."],
    syntax: ["```{prefix}pfc```"],
    exemple: ["```{prefix}pfc```"],
    enabled: true,
    aliases: ["pfc"],
    category: "🎲 ￶ | ￶ Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const gameEmbed = new Discord.MessageEmbed()
                .setTitle("Veuillez choisir parmis les reactions ci-dessous.")
                .setColor('BLUE')
                .setDescription("Vous avez 30 secondes pour choisir.")
                .setTimestamp()

            const m = await message.channel.send(gameEmbed);
            // Wait for a reaction to be added
            const reacted = await client.tools.promptMessage(m, message.author, 30, choice);

            if(reacted){
                // Get a random emoji from the array
                const botChoice = choice[Math.floor(Math.random() * choice.length)];
                // Check if it's a win/tie/loss
                const result = await getResult(reacted, botChoice);
                // Clear the reactions
                await m.delete();

                message.channel.send(new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle(`${result}`)
                    .setDescription(`Joueur : ${message.author}`)
                    .addFields(
                        { name: "￶\u200B", value: "￶\u200B", inline: false },
                        { name: "Vous avez choisi :", value: `${reacted}`, inline: true },
                        { name: " | \u200B | ", value: ` | \u200B | `, inline: true },
                        { name: "Le bot a choisi :", value: `${botChoice}`, inline: true },
                    )
                )

                function getResult(user, botchoice) {
                    if ((user === "🌑" && botchoice === "✂️") || (user === "🧾" && botchoice === "🌑") || (user === "✂️" && botchoice === "🧾")) {
                        return "**✅ ￶ | ￶ Vous avez Gagner !**";
                    } else if (user === botchoice) {
                        return "**🤷‍♂️ ￶ | ￶ Egalité**";
                    } else {
                        return "**❌ ￶ | ￶ Vous avez perdu !**";
                    }
                }
            } else {
                await m.delete();
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription(`⏰ ￶ | ￶ Temps écoulé.`)
                );
            }
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}