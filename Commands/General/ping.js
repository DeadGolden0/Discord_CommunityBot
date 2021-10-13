const Discord = require('discord.js')

module.exports = {
    name: "ping",
    logo: "📡",
    usage: ["Cette commande permets de tester le temps de latence entre le Bot et le serveur discord"],
    syntax: ["```{prefix}ping```"],
    exemple: ["```{prefix}ping```"],
    enabled: true,
    aliases: ["ping"],
    category: "📜 ￶ | ￶ Général",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            message.channel.send(new Discord.MessageEmbed()
            .setColor("DARK_ORANGE")
            //.setAuthor(client.user.username, client.user.avatarURL())
            .setDescription(`📡 ￶ | ￶ Latence : \`${client.ws.ping}\` MiliSecondes`)
            //.setTimestamp()
            )
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}