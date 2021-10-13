const Discord = require('discord.js');
const figlet = require('figlet');

module.exports = {
    name: "ascii",
    logo: "💬",
    usage: ["Cette commande permets de transformer ton texte en format ASCII."],
    syntax: ["```{prefix}ascii <Texte>```"],
    exemple: ["```{prefix}ascii Je suis le meilleur.```"],
    enabled: true,
    aliases: ["ascii"],
    category: "🎲 ￶ | ￶ Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            if(!args[0]) return client.embed.usage(message, data, client);

            msg = args.join(" ");

            figlet.text(msg, function (err, data){
                if(err){
                    console.log('Something went wrong');
                    console.dir(err);
                }
                if(data.length > 2000) return message.delete(), message.channel.send(new Discord.MessageEmbed()
                .setColor('DARK_RED')
                .setDescription('**❌ ￶ | ￶ Veuillez indiquer un texte inférieur à 2000 caractères.**'));

                message.channel.send('```' + data + '```')
            })
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}