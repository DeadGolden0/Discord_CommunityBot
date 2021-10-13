config = require('../config.json');

module.exports = async (client, data) => {
    console.log("Lancement du Bot.... ");
    console.log("Le Bot est connecté en tant que : " + client.user.tag);

    let guildData;
    guildData = await client.Database.fetchGuild("856546352133439530");
    prefix = guildData.prefix.toLowerCase();

    console.log(`Prefix sélectionner : ${prefix}`)
    client.user.setActivity(` | ${prefix}help | `, {type: "WATCHING"});
}