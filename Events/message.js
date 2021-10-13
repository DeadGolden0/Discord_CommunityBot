const Discord = require('discord.js');
const config = require("./../config.json"),
cmdCooldown = {};

module.exports = async(client, message) => {
try {
    if(message.type !== 'DEFAULT' || message.author.bot) return; // Return if author is bot
    if(!message.guild) return; // Return if dms or group chat

    let guildData;
    //if(!message.guild.prefix){ // Load prefix into cache 
        guildData = await client.Database.fetchGuild(message.guild.id);
        message.guild.prefix = guildData.prefix.toLowerCase();
    //}

    // Define prefix as variable
    let prefix = message.guild.prefix;

    //Check if message mentions bot only
    if(message.content ===`<@!${message.client.user.id}>` || message.content ===`<@${message.client.user.id}>`){
        return message.reply(`Tu sembles avoir oublié le prefix ? Voici : \`${prefix}\``);;
    }

    // Return if it doesn't start with prefix
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    //Checking if the message is a command
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //If it isn't a command then return
    if(!cmd) return;

    //If channel isn't nsfw and command is return error
    if(!message.channel.nsfw && cmd.nsfw){
        return; //Error message
    }

    //If command is owner only and author isn't owner return
    if(cmd.ownerOnly && message.author.id !== config.ownerID){
        return;
    }

    let userPerms = [];
    //Checking for members permission
    cmd.memberPermissions.forEach((perm) => {
        if(!message.channel.permissionsFor(message.member).has(perm)){
            userPerms.push(perm);
        }
    });
    //If user permissions arraylist length is more than one return error
    if(userPerms.length > 0 && !message.member.roles.cache.find((r) => r.name.toLowerCase() === config.adminRole.toLowerCase())){
        client.logger.cmd(`${message.author.tag} used ${cmd.name} - Permissions manquantes`);
        return message.channel.send(new Discord.MessageEmbed()
        .setColor('DARK_RED')
        .setDescription('**❌ ￶ | ￶ Vous n\'avez pas la permission d\'utiliser cette commande.**\n\nPermission nécessaire :' + userPerms.map((p) => `\`${p}\``).join(", "))
        ).then(sent => sent.delete({timeout: 3000}));
        //message.channel.send("On dirait qu'il vous manquez les permissions suivantes :\n" +userPerms.map((p) => `\`${p}\``).join(", "))
    }

    let clientPerms = [];
    //Checking for client permissions
    cmd.botPermissions.forEach((perm) => {
    if(!message.channel.permissionsFor(message.guild.me).has(perm)){
        clientPerms.push(perm);
        }
    });
    //If client permissions arraylist length is more than one return error
    if(clientPerms.length > 0){
        client.logger.cmd(`${message.author.tag} used ${cmd.name} - Permissions manquantes`);
        return message.channel.send(new Discord.MessageEmbed()
        .setColor('DARK_RED')
        .setDescription('**❌ ￶ | ￶ Le Bot n\'a pas la permission d\'utiliser cette commande.**\n\nPermission nécessaire :' + clientPerms.map((p) => `\`${p}\``).join(", "))
        ).then(sent => sent.delete({timeout: 3000}));
        //message.channel.send("Il me manque les permissions suivantes :\n" +clientPerms.map((p) => `\`${p}\``).join(", "));
    }

    let userCooldown = cmdCooldown[message.author.id];

    if(!userCooldown){
        cmdCooldown[message.author.id] = {};
        uCooldown = cmdCooldown[message.author.id];
    }

    let time = uCooldown[cmd.name] || 0;
    //Check if user has a command cooldown
    if(time && (time > Date.now())){
        let timeLeft = Math.ceil((time-Date.now())/1000);
        return message.channel.send(`🛡️ ￶ | ￶ La commande est sur cooldown. Vous devez attendre ${timeLeft} secondes`).then(sent => sent.delete({timeout: 3000}))//Error message
    }

    cmdCooldown[message.author.id][cmd.name] = Date.now() + cmd.cooldown;

    //Get the user database
    let userData = await client.Database.fetchUser(message.author.id);
    if(!guildData) guildData = await client.Database.fetchGuild(message.guild.id);
    let data = {};
    data.user = userData;
    data.guild = guildData;
    data.cmd = cmd;

    //Execute the command and log the user in console
    cmd.execute(client, message, args, data);
    client.logger.cmd(`${message.author.tag} a utilisé la commande : ${cmd.name} ${args}`);

    //Create a new log for the command
    client.Database.createLog(message, data);

    } catch(err) {
        console.error(err);
    }

};