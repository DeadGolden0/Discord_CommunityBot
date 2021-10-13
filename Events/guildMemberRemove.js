module.exports = async(client, member) => {
    try {
        let guild = member.guild;

        if(guild.id === client.config.serverStats.serverid){
            client.channels.cache.get(client.config.serverStats.membres).setName(`🍻 Membres : ${member.guild.memberCount}`)
            client.channels.cache.get(client.config.serverStats.humains).setName(`⚡ Humains : ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
            client.channels.cache.get(client.config.serverStats.bots).setName(`❌ Bots : ${member.guild.members.cache.filter(m => m.user.bot).size}`)
        }

        let guildData = await client.Database.fetchGuild(guild.id); // Get guild document from database
        if(!guildData.addons.goodbye.enabled) return; // Goodbye messages aren't enabled
    
        let goodbyeChannel = await client.tools.resolveChannel(guildData.addons.goodbye.channel, guild); // Try find the channel
        if(!goodbyeChannel) return; // Unable to find channel in guild
    
        let goodbyeMsg = (guildData.addons.goodbye.message === null || guildData.addons.goodbye.message === "" || guildData.addons.goodbye.message === " ") ? "{user.ping} has left the server!" : guildData.addons.goodbye.message; // Get the custom message or use the preset one

        // Replace all valid tags
        let finalMsg = await goodbyeMsg
        .replace("{user.ping}", `${member.user}`)
        .replace("{user.name}", `${member.user.username}`)
        .replace("{user.id}", `${member.user.id}`)
        .replace("{user.tag}", `${member.user.tag}`)
        .replace("{guild.name}", `${guild.name}`)
        .replace("{guild.id}", `${guild.id}`)
        .replace("{guild.totalUser}", `${guild.memberCount}`);
    
        return goodbyeChannel.send(finalMsg) // Send the final message to the goodbye channel
    
    } catch (e) {
        console.log(e);
    }
    
    };