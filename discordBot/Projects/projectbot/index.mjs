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
const animeAPI= async () =>
{
    try {
        const response = await fetch("http://animechan.melosh.space/random");
        const random = await response.json();
        return random;
    } catch (error) {
        console.error(error);
    }
};

const animeSearchApi = async (Title) =>
{   
    if(Title != null){
        const animeTitle  = await Title.replace(/ /g, '_');
        const url = `https://myanimelist.p.rapidapi.com/anime/search/${animeTitle}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3db04112dcmsh5209da7f8f9b3fdp1f3fe3jsn80e19939202c',
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
            }
        };

        try{
            const response = await fetch(url, options);
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const anime = data[0];
                return anime;
            } else {
                return null;
            }
        }catch(error){
            console.error(error);
        }
    }
};

client.on('messageCreate', async (msg) => {
    if(msg.content.startsWith(prefix + 'Q') && msg.author.bot != true){

        const random =  await animeAPI();
        const search =  await animeSearchApi(random.anime);
        console.log('object :>> ', search);
        const picture = ((search.picture_url != null) ? search.picture_url : "https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_1280.png");
        const animeQoute = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${random.anime}`)
        .setAuthor({name: `${random.character}`})
        .setDescription(`${random.quote}`)
        .setThumbnail(`${picture}`);

        const channel = client.channels.cache.get(process.env.CHANNEL_ID);
        channel.send({ embeds: [animeQoute] });
    };
});

client.on('messageCreate', async (msg) => {
    if(msg.content.startsWith(prefix + 'search') && msg.author.bot != true){
        const search =  await animeSearchApi();
        // const animeQoute = new EmbedBuilder()
        // .setColor(0x0099FF)
        // .setTitle(`${random.anime}`)
        // .setAuthor({name: `${random.character}`})
        // .setDescription(`${random.quote}`)
        // .setImage('https://i.imgur.com/AfFp7pu.png');

        // const channel = client.channels.cache.get(process.env.CHANNEL_ID);
        // channel.send({ embeds: [animeQoute] });
    };
});
