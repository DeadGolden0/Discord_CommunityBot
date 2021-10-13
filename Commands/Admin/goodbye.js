const Discord = require('discord.js');

module.exports = {
    name: "goodbye",
    logo: "🎉",
    usage: ["Cette commande permet de definir un Channel et un message a envoyer quand un membre quitte le serveur."],
    syntax: ["Définir le canal pour le message d’adieu.```{prefix}goodbye set <channel>```", "Configurer un message d’adieu personnalisé.```{prefix}goodbye custom <texte>```", "Activer le message d’adieu```{prefix}goodbye enable```", "Désactiver le message d’adieu```{prefix}goodbye disable```", "Tester le message d’adieu```{prefix}goodbye test```", "Variables disponibles : ```{user.ping} - @User#2487\n{user.name} - User\n{user.id} - 875685472669874216\n{user.tag} - User#2487\n{guild.name} - ServerName\n{guild.id} - 875412597854125698\n{guild.totalUser} - 254```"],
    exemple: ["```{prefix}goodbye set #goodbye```"],
    enabled: true,
    aliases: ["leave"],
    category: "🛡️ ￶ | ￶ Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{

            // If no arguments then return usage error
            if(!args[0]){
                return client.embed.usage(message, data, client);
            };

            // If addon for goodbye is missing create it
            if(!data.guild.addons.goodbye){
                data.guild.addons.goodbye = { enabled: false, channel:  "", message: "", image: false, embed: false }
                data.guild.markModified('addons.goodbye');
                await data.guild.save();
            };

            // Disable goodbye messages
            if(args[0].toLowerCase() === "disable"){
                // Disable the goodbye messages
                data.guild.addons.goodbye.enabled = false;
                data.guild.markModified('addons.goodbye');
                await data.guild.save();
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle("Message d'au revoir désactiver.")
                    .setDescription(`✅ ￶ | ￶ Les messages d'au revoir ont bien été désactiver.`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
                );
            };

            // Enable goodbye messages
            if(args[0].toLowerCase() === "enable"){
                // Enable the goodbye messages
                data.guild.addons.goodbye.enabled = true;
                data.guild.markModified('addons.goodbye');
                await data.guild.save();
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle("Message d'au revoir Activer.")
                    .setDescription(`✅ ￶ | ￶ Les messages d'au revoir ont bien été Activer.`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
                );
            };

            if(args[0].toLowerCase() === "test"){
                // If goodbye messages are disabled or channel isn't set return error
                if(!data.guild.addons.goodbye.enabled || data.guild.addons.goodbye.channel.trim() === ""){
                    return message.channel.send("Les messages d'au revoir sont actuellement désactivés.")
                }
                
                // Find the channel
                let channel = await client.tools.resolveChannel(data.guild.addons.goodbye.channel, message.guild);
                let goodbyeMsg = (data.guild.addons.goodbye.message === null || data.guild.addons.goodbye.message === "" || data.guild.addons.goodbye.message === " ") ? "{user.ping} a quitter le serveur !" : data.guild.addons.goodbye.message; // Get the custom message or use the preset one
                
                // Replace all valid tags
                let fmsg = await goodbyeMsg
                .replace("{user.ping}", `${message.author}`)
                .replace("{user.name}", `${message.author.username}`)
                .replace("{user.id}", `${message.author.id}`)
                .replace("{user.tag}", `${message.author.tag}`)
                .replace("{guild.name}", `${message.guild.name}`)
                .replace("{guild.id}", `${message.guild.id}`)
                .replace("{guild.totalUser}", `${message.guild.memberCount}`);
                
                return channel.send(fmsg);
            };

            // Return usage error as users missing arguments
            if(!args[1]){
                return client.embed.usage(message, data, client);
            };

            // Set up goodbye messages
            if(args[0].toLowerCase() === "set"){
                // Find the mentioned channel
                let channel = await client.tools.resolveChannel(args[1], message.guild);
                if(!channel) return message.channel.send("Impossible de trouver le canal mentionné");

                // Enable goodbye message and save channel
                data.guild.addons.goodbye.enabled = true;
                data.guild.addons.goodbye.channel = channel.id;
                data.guild.markModified('addons.goodbye');
                await data.guild.save();

                // Return success message to user
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle("Channel sélectionner.")
                    .setDescription(`✅ ￶ | ￶ Les messages d’au revoir seront envoyés dans le channel ${channel}`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
                );
            };

            // Set up custom message for goodbye messages
            if(args[0].toLowerCase() === "custom"){
                // Join arguments into a string
                let msg = args.slice(1).join(" ");
                // Save the message to the database
                data.guild.addons.goodbye.message = msg;
                data.guild.markModified('addons.goodbye');
                await data.guild.save();

                // Return success message to user
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle("Message d'au revoir défini.")
                    .setDescription(`✅ ￶ | ￶ Le message d'au revoir a été défini sur : ${msg}`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
                );
            };

            // None of the requirements were met so return usage error
            return client.embed.usage(message, data);

        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}