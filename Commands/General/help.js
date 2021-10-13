const Discord = require('discord.js');

module.exports = {
    name: "help",
    logo: "❔",
    usage: ["Cette commande permet d'afficher un menu de toute les commandes."],
    syntax: ["```{prefix}help [commande]```"],
    exemple: ["```{prefix}help coinflip```"],
    enabled: true,
    aliases: ["h"],
    category: "📜 ￶ | ￶ Général",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            let cmd = args[0] ? (await client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()))) : null;
            if(cmd){
                let aliaseList = (cmd.aliases.length < 1) ? "None" : cmd.aliases.join("\n")
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor('DARK_PURPLE')
                    .setAuthor(`Dead Bot ￶ | ￶ Menu d'aide`, `${message.client.user.displayAvatarURL()}`)
                    .setDescription( `${cmd.logo} ￶ | ￶ Commande ${cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1)}`)
                    .addFields(
                        { name: "__Aliases__ :", value: `${aliaseList}`, inline: false },
                        { name: "__Cooldown__ :", value: `${cmd.cooldown / 1000} Secondes`, inline: false },
                        { name: "__Description__ :", value: `${cmd.usage}`, inline: false },
                        { name: "__Syntax__ :", value: `${cmd.syntax.map(x => x.replace(/{prefix}/g, data.guild.prefix)).join("\n")}`, inline: false },
                    )
                    .setFooter("Dead - Bot ©", client.user.avatarURL())
                    .setTimestamp()
                )
            }
            let categories = await client.commands.map(x => x.category).filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            });
            let cmdArr = []
            for(let i=0; i < categories.length; i++){
                let category = categories[i];
                let commands = await client.commands.filter(x => x.category === category).map(x => x.name);
                let cmdText = commands.length < 1 ? "None" : commands.join(", ");
                let obj = {
                    name: category,
                    value: `\`\`\`${cmdText}\`\`\``,
                    inline: false
                }
                cmdArr.push(obj);
            }

            return message.channel.send(new Discord.MessageEmbed()
                .setColor('DARK_PURPLE')
                .setAuthor(`Dead Bot ￶ | ￶ Menu d'aide`, `${message.client.user.displayAvatarURL()}`)
                .setDescription( `Utilisez \`${data.guild.prefix}help [commande]\` pour obtenir plus d'aide.\n Exemple : ${data.guild.prefix}help avatar￶\n\n￶\u200B`)
                .addFields( cmdArr )
                .setFooter("Dead - Bot ©", client.user.avatarURL())
                .setTimestamp()
            )
        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}