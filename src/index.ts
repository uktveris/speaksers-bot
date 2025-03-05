import { Client, IntentsBitField } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const token = process.env.DISCORD_TOKEN as string;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(token);

client.on("ready", (c) => {
  console.log(c.user.tag + " is up!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content === "hi") {
    message.reply("hello there");
  }
});
