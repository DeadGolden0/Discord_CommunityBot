const Discord = require('discord.js');
const dayjs = require('dayjs');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const utc = require('dayjs/plugin/utc');
require('dayjs/locale/fr');
dayjs.extend(utc)
dayjs.extend(localizedFormat)

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};
const booster_emojis = "<:server_boost:856912963642064906>";

module.exports = {
	name: "serverinfos",
    logo: "📌",
    usage: ["Cette commande permets d'afficher les informations du serveur."],
    syntax: ["```{prefix}serverinfos```"],
	exemple: ["```{prefix}serverinfos```"],
    enabled: true,
    aliases: ["sinfos"],
    category: "📜 ￶ | ￶ Général",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    async execute(client, message, args, data){
        try{
			const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
			const members = message.guild.members.cache;
			const channels = message.guild.channels.cache;
        	const emojisSize = message.guild.emojis.cache;
			const emojis = message.guild.emojis.cache.map((e) => `${e}`).join(' | ');
			message.channel.send(new Discord.MessageEmbed()
				//.setDescription(`**Guild information for __${message.guild.name}__**`)
				.setColor('DARK_RED')
				.setThumbnail(message.guild.iconURL({ dynamic: true }))
        	    .addFields(
        	        { name: "🎫 ￶ | ￶ Informations générales du serveur ￶ | ￶ ￶￶🎫", value: "￶\u200B￶", inline: false },
        	        { name: "🔰 ￶ | ￶ Nom :", value: `${message.guild.name}`, inline: true },
        	        { name: "￶🆔 ￶ | ￶ ￶￶Identifiant du serveur :", value: `${message.guild.id}`, inline: true },
        	        { name: "🔥 ￶ | ￶ Propriétaire :", value: `${message.guild.owner.user.tag}`, inline: true },
        	        { name: "￶\u200B￶", value: "￶\u200B￶", inline: false },
        	        { name: `🗺️ ￶ | ￶ Region :`, value: `${regions[message.guild.region]}`, inline: true },
        	        { name: `${booster_emojis} ￶ | ￶ Boost Tier :`, value: `${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'Aucun Boost'} (${message.guild.premiumSubscriptionCount || '0'})`, inline: true },
        	        { name: "🕒 ￶ | ￶ ￶￶Date de création du serveur :", value: `${dayjs(message.guild.createdTimestamp).locale('fr').format('l')}`, inline: true },
        	        { name: "￶\u200B￶", value: "￶\u200B￶", inline: false },
        	    )
				.addField("📊 ￶ | ￶ Statistiques du serveur ￶ | ￶ ￶￶📊", [
        	        '\u200b',
					`**🆔 ￶ | ￶ ￶￶Nombre d'Emojis :** ${emojisSize.size}`,
					`**👥 ￶ | ￶ Membre(s) :** ￶ ${message.guild.memberCount}`,
					`**👤 ￶ | ￶ ￶￶Humain(s) :** ￶ ${members.filter(member => !member.user.bot).size}`,
					`**🤖 ￶ | ￶ Bot(s) :** ￶ ${members.filter(member => member.user.bot).size}`,
					`**✍️ ￶ | ￶ Channels Textuel :** ￶ ${channels.filter(channel => channel.type === 'text').size}`,
					`**🗣️ ￶ | ￶ Channels Vocaux :** ￶ ${channels.filter(channel => channel.type === 'voice').size}`,
					'\u200b'
				])
				.addField(`⭐ ￶ | ￶ ￶￶Rôles : [${roles.length - 1}]`, roles.length < 10 ? roles.join(' | ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'Il n\'y a aucun ￶￶Rôles sur ce serveur')
        	    .addField("￶\u200B￶", "￶\u200B￶", false)
        	    .addField(`😀 ￶ | ￶ Emojis [${emojisSize.size}]`, emojis.slice() || 'Il n\'y a aucun Emojis sur ce serveur')
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