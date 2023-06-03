import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
import { Client, IntentsBitField, } from 'discord.js';
// import cron from 'node-cron';
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
try {
	const response = await fetch("http://animechan.melosh.space/random")
    const result = await response.json();
    console.log(result);
	
} catch (error) {
	console.error(error);
}

