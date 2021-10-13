// Importing modules
const Discord = require('discord.js'),
client = new Discord.Client({partials: ['MESSAGE', 'REACTION'], fetchAllMembers: true}),
config = require('./config.json'),
mongoose = require('mongoose'),
fs = require('fs'),
util = require('util'),
readdir = util.promisify(fs.readdir);
const ascii = require("ascii-table");


// Adding to the client
client.event = new Discord.Collection();
client.commands = new Discord.Collection();
client.config = config;
client.Database = require('./Database/Mongoose.js');
const { GiveawaysManager } = require('discord-giveaways');
client.tools = require('./Tools/Tools.js');
client.logger = require('./Tools/Logger.js');
client.embed = require('./Tools/Embed.js');

async function init(){
    // Load Discordjs Events
    let tableEvents = new ascii("Events List");
    const eventFiles = fs.readdirSync('./Events/').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
    const event = require(`./Events/${file}`);
    const eventName = file.split(".")[0];
    if (eventName) {
        tableEvents.addRow(file, '✅');
        client.on(eventName, event.bind(null, client));
    }else {
        tableEvents.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
        continue;
    }
    }
    console.log(tableEvents.toString());
    
    //Load the commands
    let tableCommands = new ascii("Commands List");
    let folders = await readdir("./Commands/");
    folders.forEach(direct =>{
    const commandFiles = fs.readdirSync('./Commands/' + direct + "/").filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./Commands/${direct}/${file}`);
        //console.log(`Loading Command... ${command.name}`)
        //table.addRow(file, '✅');
        //client.commands.set(command.name, command);
        if (command.name) {
            client.commands.set(command.name, command);
            tableCommands.addRow(file, '✅');
        } else {
            tableCommands.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
            continue;
        }
    }
    })
    console.log(tableCommands.toString());

    //---------------------------------------------
    //        Initialisation a la BDD
    //---------------------------------------------
    mongoose.connect(config.mongodb_srv, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(()=> {
        console.log('Connected to the DataBase successfully.');
    }).catch((err) => {
        console.log(err);
    });

    await client.login(config.token)
}
init();

//---------------------------------------------
//                 GiveAways
//---------------------------------------------
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database/giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});