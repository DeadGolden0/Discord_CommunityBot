const Discord = require("discord.js"),
config = require('./../config.json');

module.exports.send = async function(message, embed){
    let newEmbed = new Discord.MessageEmbed()
    .setFooter(config.footer)
    .setColor(config.color)
    embed = {... newEmbed, ... embed}

    return message.channel.send({embed: embed});

};

module.exports.usage = async function(message, data, client){
    let cmd = data.cmd;
    let syntaxeDesc = await cmd.syntax.join("\n").replace(/{prefix}/g, data.guild.prefix);
    let exempleDesc = await cmd.exemple.join("\n").replace(/{prefix}/g, data.guild.prefix);

    let newEmbed = new Discord.MessageEmbed()
    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
    .setTimestamp()
    .setColor("RED")
    .setAuthor("UwU ! Une erreur s'est produite.", message.author.displayAvatarURL())
    .setDescription("Arguments manquants pour exécuter la commande. Veuillez fournir les entrées valides.")
    .addField("__Syntax__ :", syntaxeDesc)
    .addField("__Exemple__ :", exempleDesc);

    return message.channel.send(newEmbed);

};

module.exports.error = async function(message, data, client){
    let cmd = data.cmd;
    message.delete()
    let newEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor("UwU ! Une erreur s'est produite.", message.author.displayAvatarURL())
    .setDescription(`Une erreur s'est produite pendant l'execution de la commande : **${cmd.name}**.\nSi cette erreur persiste, veuillez contacter notre équipe de développement.`)
    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
    .setTimestamp();
    return message.channel.send(newEmbed).then(sent => sent.delete({timeout: 5000}));

};