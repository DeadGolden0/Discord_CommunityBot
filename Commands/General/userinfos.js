const Discord = require('discord.js');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const utc = require('dayjs/plugin/utc');
require('dayjs/locale/fr');
dayjs.extend(utc)
dayjs.extend(localizedFormat)


const flags = {
    DISCORD_EMPLOYEE: "<:discord_employee:856912981216722995>",
    DISCORD_PARTNER: "<:discord_partner:856912988413231144>",
    BUGHUNTER_LEVEL_1: "<:bug_hunter1:856912970185572382>",
    BUGHUNTER_LEVEL_2: "<:bug_hunter2:856912975839494154>",
    HYPESQUAD_EVENTS: "<:discord_hypesquad:856912933585420308>",
    HOUSE_BRAVERY: "<:house_bravery:856912920885461002>",
    HOUSE_BRILLIANCE: "<:hypesquad_briliance:856912951575445505>",
    HOUSE_BALANCE: "<:house_balance:856912958622007306>",
    EARLY_SUPPORTER: "<:early_supporter:856912928049070080>",
    TEAM_USER: "",
    SYSTEM: "",
    VERIFIED_BOT: "",
    VERIFIED_DEVELOPER: "<:bot_dev:856912939718148106>",
};
const status = {
    offline: "Hors Ligne",
    online: "En Ligne",
    dnd: "Ne pas Déranger",
    idle: "Inactif",
};
const booster_emojis = "<:server_boost:856912963642064906>";
const discord_emojis = "<:discord:857770283364777985>";

module.exports = {
    name: "userinfos",
    logo: "📌",
    usage: ["Cette commande permets d'afficher les informations d'une personne."],
    syntax: ["```{prefix}userinfos [@membre]```"],
    exemple: ["```{prefix}userinfos @Community Bot#6877```"],
    enabled: true,
    aliases: ["uinfos"],
    category: "📜 ￶ | ￶ Général",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
            const membre = message.mentions.members.first() || message.member;
            const roles = membre.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
            const userRoles = roles.join(' | ') || "Aucun";
            const userFlags = membre.user.flags.toArray() || "Aucun";

            const joinDiscord = dayjs(membre.user.createdAt).locale('fr').format('LLLL');
            const joinServer = dayjs(membre.joinedAt).locale('fr').format('LLLL');
            const boosterServer = dayjs(membre.premiumSince).locale('fr').format('LLLL')

            message.channel.send(new Discord.MessageEmbed()
	            .setColor(membre.displayHexColor || '0xe43333')
	            //.setAuthor( membre.user.tag,  membre.user.avatarURL())
	            .setThumbnail( membre.user.avatarURL({dynamic: true, size:512}))
                .addFields(
                    { name: "❔ ￶ | ￶ Informations ￶Utilisateur ￶ | ￶ ￶￶❔", value: "￶\u200B￶", inline: false },
                    { name: "🖊️ ￶ | ￶ ￶￶NickName :", value: membre.user.username, inline: true },
                    { name: "📌 ￶ | ￶ Discriminant :", value: `#${membre.user.discriminator}`, inline: true },
                    { name: "￶\u200B￶", value: "￶\u200B￶", inline: false },
                )
                .addFields(
                    { name: "￶🆔 ￶ | ￶ ￶￶Identifiant :", value: membre.id, inline: true },
                    { name: `🏆 ￶ | ￶ ￶￶Badges : [${userFlags.length}]`, value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(" | ") : 'Aucun'}`, inline: true },
                    { name: "￶\u200B￶", value: "￶\u200B￶", inline: false },
                )
                .addFields(
                    { name: `${discord_emojis} ￶ | ￶ ￶￶Sur Discord depuis :`, value: joinDiscord, inline: true },
                    { name: "🎮 ￶ | ￶ Jeu :", value: `${membre.user.presence.game ? membre.user.presence.game.name : "Ne joue a aucun jeu."}`, inline: true },
                    { name: "￶\u200B￶", value: "￶\u200B￶", inline: false },
                )
                .addFields(
                    { name: "❔ ￶ | ￶ ￶￶Informations Serveur ￶ | ￶ ￶￶❔", value: "￶\u200B￶", inline: false },
                    { name: "👑 ￶ | ￶ ￶￶Meilleur Rôle :", value: `${membre.roles.highest.id === message.guild.id ? 'Aucun' : membre.roles.highest.name}`, inline: false },
                    { name: "👋🏼 ￶ | ￶ ￶￶Sur le serveur depuis :", value: joinServer, inline: false },
                    { name: `${booster_emojis} ￶ | ￶ ￶￶Boost serveur :`, value: membre.premiumSince ? boosterServer : "Non", inline: false },
                    { name: `⭐ ￶ | ￶ ￶￶Rôles : [${roles.length}]`, value: `${userRoles}`, inline: false },
                )
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