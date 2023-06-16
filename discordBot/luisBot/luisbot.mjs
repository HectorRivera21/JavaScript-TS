import dotenv from 'dotenv';
dotenv.config();
import { Client, IntentsBitField, } from 'discord.js';
import cron from 'node-cron';
const prefix = '!';
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
client.login(process.env.DISCORD_TOKEN);

client.on('ready',(c)=>{
    let count = 0;
    console.log(`${c.user.tag} is ready`);
    if(count != 1){
        count+=1;
        c.channels.cache.get(process.env.CHANNEL_ID).send("Type !help for commands list");
    }
});
client.on('messageCreate', async (msg) => {
    if(msg.content.startsWith(prefix+'help')){
        msg.reply("command for schedule: \n!h 'message every hour' \n!morning 'message' \n!night 'message'");
    }

    if(msg.content.startsWith(prefix + 'h') && msg.author.bot != true){
        const args = msg.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
        const content = args.slice(1).join(' ');
        cron.schedule('0 * * * *', () => {
            const channel = client.channels.cache.get(process.env.CHANNEL_ID);
            channel.send(content);
        });
        await msg.channel.sendTyping();
        msg.reply(`Message '${content}' scheduled for every hour.`);
    }
    //
    if (msg.content.startsWith(prefix + 'morning') && msg.author.bot != true) {
        const args = msg.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
        const content = args.slice(1).join(' ');
        // Schedule messages for 6 am 
        cron.schedule('0 6 * * *', () => {
          const channel = client.channels.cache.get(process.env.CHANNEL_ID);
          channel.send(content);
        });
        await msg.channel.sendTyping();
        msg.reply(`Message '${content}' scheduled for 6 am.`);
    }
    ///
    if (msg.content.startsWith(prefix + 'night') && msg.author.bot != true) {
        const args = msg.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
        const content = args.slice(1).join(' ');
        // Schedule messages for 12 pm every day
        cron.schedule('0 0 * * *', () => {
          const channel = client.channels.cache.get(process.env.CHANNEL_ID);
          channel.send(content);
        });
        await msg.channel.sendTyping();
        msg.reply(`Message '${content}' scheduled 12 pm.`);
    }
});
