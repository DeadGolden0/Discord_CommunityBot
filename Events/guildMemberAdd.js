module.exports = async(client, member) => {
    try {
        let guild = member.guild;

        if(guild.id === client.config.serverStats.serverid){
            client.channels.cache.get(client.config.serverStats.membres).setName(`🍻 Membres : ${member.guild.memberCount}`)
            client.channels.cache.get(client.config.serverStats.humains).setName(`⚡ Humains : ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
            client.channels.cache.get(client.config.serverStats.bots).setName(`❌ Bots : ${member.guild.members.cache.filter(m => m.user.bot).size}`)
        }

        let guildData = await client.Database.fetchGuild(guild.id); // Get guild document from database
        if(!guildData.addons.welcome.enabled) return; // Welcome messages aren't enabled
        
        let welcomeChannel = await client.tools.resolveChannel(guildData.addons.welcome.channel, guild); // Try find the welcome channel
        if(!welcomeChannel) return; // Unable to find channel in guild
        
        let welcomeMsg = (guildData.addons.welcome.message === null || guildData.addons.welcome.message === "" || guildData.addons.welcome.message === " ") ? "Welcome {user.ping} to {guild.name}!" : guildData.addons.welcome.message; // Get the custom message or use the preset one

        // Replace all valid tags
        let finalMsg = await welcomeMsg
        .replace("{user.ping}", `${member.user}`)
        .replace("{user.name}", `${member.user.username}`)
        .replace("{user.id}", `${member.user.id}`)
        .replace("{user.tag}", `${member.user.tag}`)
        .replace("{guild.name}", `${guild.name}`)
        .replace("{guild.id}", `${guild.id}`)
        .replace("{guild.totalUser}", `${guild.memberCount}`);
    
        return welcomeChannel.send(finalMsg) // Send the final message to the welcome channel
    
    } catch (e) {
        console.log(e);
    }
    
    };