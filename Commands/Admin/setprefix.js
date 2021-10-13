const Discord = require('discord.js');

module.exports = {
    name: "prefix",
    logo: "📎",
    usage: ["Cette commande permets de definir le prefix du bot sur votre serveur."],
    syntax: ["```{prefix}prefix <prefix>```"],
    exemple: ["```{prefix}prefix /```"],
    enabled: true,
    aliases: ["prefix"],
    category: "🛡️ ￶ | ￶ Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            if(!args[0]) return client.embed.usage(message, data, client);

            if(args[1]) return message.channel.send(new Discord.MessageEmbed()
            .setColor('DARK_RED')
            .setDescription('**❌ ￶ | ￶ Le prefix ne peut pas contenir d\'espace.**')
            )

            let prefix = args.join(" ");
            data.guild.prefix = prefix;
            await data.guild.save();
            
            client.user.setActivity(` | ${prefix}help | `, {type: "WATCHING"});
            console.log(`Prefix sélectionner : ${prefix}`)

            return message.channel.send(new Discord.MessageEmbed()
            .setColor('DARK_GREEN')
            .setDescription(`**✅ ￶ | ￶ Le prefix a bien été définie sur ${prefix}**`)
            )
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}