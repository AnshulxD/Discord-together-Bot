const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json")
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

client.on('messageCreate', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length)
    if (args[1] == !undefined) return
    if (args == "help") {
        let embed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`We only have one service`)
            .setDescription('``Youtube``')
        return message.channel.send({ embeds: [embed] });
    }
    switch (args) {
        case "youtube":
            if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel')
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
                let embed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle(`Youtube Activity Created!`)
                    .addFields(
                        { name: "Click the link below to join!", value: invite.code }
                    ).setTimestamp()
                    .setFooter(`Created by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
                return message.channel.send({ embeds: [embed] });
            });
            break
            }
});

client.login(config.token);