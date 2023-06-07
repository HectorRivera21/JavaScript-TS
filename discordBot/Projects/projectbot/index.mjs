import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
import { Client, IntentsBitField, EmbedBuilder} from 'discord.js';
// import cron from 'node-cron';
const prefix = "!"
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.login(process.env.DISCORD_TOKEN);
client.on('ready',(c)=>{
    console.log(`${c.user.tag} is ready`);
});
client.on('messageCreate', async (msg) => {
    if(msg.content.startsWith(prefix + 'Q') && msg.author.bot != true){
        try {
            var response = await fetch("http://animechan.melosh.space/random")
            var random = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${random.anime}`)
        .setAuthor({name: `${random.character}`})
        .setDescription(`${random.quote}`);

        const channel = client.channels.cache.get(process.env.CHANNEL_ID);
        channel.send({ embeds: [exampleEmbed] });
    };
});