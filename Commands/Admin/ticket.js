const Discord = require('discord.js')

module.exports = {
    name: "ticket",
    logo: "📩",
    usage: ["Vous permet de cree des ticket pour contacter le staff."],
    syntax: ["Définir la catégorie ou seront afficher la liste des tickets ouvert.```{prefix}ticket set <categoryID>```", "Crée le message pour ouvrir des ticket.```{prefix}ticket create```"],
    exemple: ["```{prefix}ticket```"],
    enabled: true,
    aliases: ["ticket"],
    category: "🛡️ ￶ | ￶ Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            // If no arguments then return usage error
            if(!args[0]){
                return client.embed.usage(message, data, client);
            };

            // If addon for ticket is missing create it
            if(!data.guild.addons.ticket){
                data.guild.addons.ticket = { enable: false, category:  "", logsticket: ""}
                data.guild.markModified('addons.ticket');
                await data.guild.save();
            };

            // Set up ticket
            if(args[0].toLowerCase() === "create"){
                if(!data.guild.addons.ticket.enable || data.guild.addons.ticket.category.trim() === ""){
                    return message.channel.send("La catégorie des tickets n'a pas été Initialiser.")
                }

                // Return success message to user
                const Embed = new Discord.MessageEmbed()
                    .setColor("DARK_GREEN")
                    .setTitle("Ticket")
                    .setDescription(`Pour ouvrir un ticket veuillez cliquer sur 📩`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())

                const ticketMessage = await message.channel.send(Embed);
                await ticketMessage.react("📩")

                const collector = ticketMessage.createReactionCollector(
                    (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id),
                    { dispose: true }
                );
                collector.on("collect", async (reaction, user) => {
                    switch (reaction.emoji.name) {
                      case "📩":
                        reaction.users.remove(user.id);
                        const tag_channel = user.discriminator;
                        const channel = await message.guild.channels.create(`ticket-${tag_channel}`);
                        channel.setParent(data.guild.addons.ticket.category);
                        channel.updateOverwrite(message.guild.id, {
                            SEND_MESSAGE: false,
                            VIEW_CHANNEL: false,
                          });
                          channel.updateOverwrite(user, {
                            SEND_MESSAGE: true,
                            VIEW_CHANNEL: true,
                          });
                          channel.send(`${user}`)
                          const reactionMessage = await channel.send(new Discord.MessageEmbed()
                          .setColor("DARK_GREEN")
                          .setTitle(`Ticket-${tag_channel}`)
                          .setDescription(`Merci d'avoir contacter le support. Veuillez posez questions ci-dessous !`)
                          .setFooter("Dead - Bot ©", client.user.displayAvatarURL()));

                          try {
                            await reactionMessage.react("🔒");
                            await reactionMessage.react("⛔");
                          } catch (err) {
                            channel.send("Error sending emojis!");
                            throw err;
                          }

                          const Tickercollector = reactionMessage.createReactionCollector(
                            (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
                            { dispose: true }
                          );
                      
                          Tickercollector.on("collect", (reaction) => {
                            switch (reaction.emoji.name) {
                              case "🔒":
                                channel.setName(`Close-${tag_channel}`)
                                channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
                                break;
                              case "⛔":
                                channel.send("Le ticket sera supprimer dans 5 secondes.");
                                setTimeout(() => channel.delete(), 5000);
                                break;
                            }
                          });
                        break;
                    }
                });
                return;
            };

            // Return usage error as users missing arguments
            if(!args[1]){
                return client.embed.usage(message, data, client);
            };

            // Set up category ticket
            if(args[0].toLowerCase() === "set"){
                // Find the mentioned channel
                let categoryid = await client.tools.resolveChannel(args[1], message.guild);
                if(!categoryid) return message.channel.send("Impossible de trouver le canal mentionné");
            
                // Enable ticket message and save channel
                data.guild.addons.ticket.enable = true;
                data.guild.addons.ticket.category = categoryid;
                data.guild.markModified('addons.ticket');
                await data.guild.save();
            
                // Return success message to user
                return message.channel.send(new Discord.MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle("Catégorie sélectionner.")
                    .setDescription(`✅ ￶ | ￶ La catégorie ou seront crée les tickets a bien été définie.`)
                    .setFooter("Dead - Bot ©", client.user.displayAvatarURL())
                );
            };

        }catch(err){
            client.logger.error(`Une erreur s'est produite pendant l'execution de la commande : ${data.cmd.name}`)
            console.log(err)
            return client.embed.error(message, data, client);
        }
    }
}