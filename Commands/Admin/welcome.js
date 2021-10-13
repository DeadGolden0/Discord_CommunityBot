module.exports = {
    name: "welcome",
    logo: "🎉",
    usage: ["Cette commande permet de definir un Channel et un message a envoyer quand un nouveau membre rejoin le serveur."],
    syntax: ["Définir le canal pour le message de bienvenue.```{prefix}welcome set <channel>```", "Configurer un message de bienvenue personnalisé.```{prefix}welcome custom <texte>```", "Activer le message de bienvenue.```{prefix}welcome enable```", "Désactiver le message de bienvenue.```{prefix}welcome disable```", "Tester le message de bienvenue.```{prefix}welcome test```", "Variables disponibles : ```{user.ping} - @User\n{user.name} - User\n{user.id} - 875685472669874216\n{user.tag} - User#2487\n{guild.name} - ServerName\n{guild.id} - 875412597854125698\n{guild.totalUser} - 256```"],
    exemple: ["```{prefix}welcome set #bienvenue```"],
    enabled: true,
    aliases: ["join"],
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
            
            // If addon for welcome is missing create it
            if(!data.guild.addons.welcome){
                data.guild.addons.welcome = { enabled: false, channel:  "", message: "", image: false, embed: false }
                data.guild.markModified('addons.welcome');
                await data.guild.save();
            };
            
            // Disable welcome messages
            if(args[0].toLowerCase() === "disable"){
                // Disable the welcome messages
                data.guild.addons.welcome.enabled = false;
                data.guild.markModified('addons.welcome');
                await data.guild.save();
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle("Message de bienvenue désactiver.")
                    .setDescription(`✅ ￶ | ￶ Les messages de bienvenue ont bien été désactiver.`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
                );
            };

            // Enable welcome messages
            if(args[0].toLowerCase() === "enable"){
                // Enable the welcome messages
                data.guild.addons.welcome.enabled = true;
                data.guild.markModified('addons.welcome');
                await data.guild.save();
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle("Message de bienvenue Activer.")
                    .setDescription(`✅ ￶ | ￶ Les messages de bienvenue ont bien été Activer.`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
                );
            };
            
            if(args[0].toLowerCase() === "test"){
                // If welcome messages are disabled or channel isn't set return error
                if(!data.guild.addons.welcome.enabled || data.guild.addons.welcome.channel.trim() === ""){
                    return message.channel.send("Les messages de bienvenue sont actuellement désactivés.")
                }
                
                // Find the channel
                let channel = await client.tools.resolveChannel(data.guild.addons.welcome.channel, message.guild);
                let welcomeMsg = (data.guild.addons.welcome.message === null || data.guild.addons.welcome.message === "" || data.guild.addons.welcome.message === " ") ? "{user.ping} a rejoint le serveur !" : data.guild.addons.welcome.message; // Get the custom message or use the preset one
                
                // Replace all valid tags
                let fmsg = await welcomeMsg
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
            
            // Set up welcome messages
            if(args[0].toLowerCase() === "set"){
                // Find the mentioned channel
                let channel = await client.tools.resolveChannel(args[1], message.guild);
                if(!channel) return message.channel.send("Impossible de trouver le canal mentionné");
            
                // Enable welcome message and save channel
                data.guild.addons.welcome.enabled = true;
                data.guild.addons.welcome.channel = channel.id;
                data.guild.markModified('addons.welcome');
                await data.guild.save();
            
                // Return success message to user
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle("Channel sélectionner.")
                    .setDescription(`✅ ￶ | ￶ Les messages de bienvenue seront envoyés dans le channel ${channel}`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
                );
            };
            
            // Set up custom message for welcome messages
            if(args[0].toLowerCase() === "custom"){
                // Join arguments into a string
                let msg = args.slice(1).join(" ");
                // Save the message to the database
                data.guild.addons.welcome.message = msg;
                data.guild.markModified('addons.welcome');
                await data.guild.save();
            
                // Return success message to user
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle("Message de bienvenue défini.")
                    .setDescription(`✅ ￶ | ￶ Le message de bienvenue a été défini sur : ${msg}`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
                );
            };
            
            // None of the requirements were met so return usage error
            return client.embed.usage(message, data, client);

        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}