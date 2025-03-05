import { Client, IntentsBitField } from "discord.js";
import * as dotenv from "dotenv";
import registerCommands from "./registerCommands";
import { embed } from "./embeds";

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

// testing command, random word generator
function getRandomWord() {
  const words = [
    "hello",
    "apples",
    "good day",
    "who are you?",
    "car",
    "table",
    "i am a bot",
  ];
  const rndInt = Math.floor(Math.random() * (words.length - 1));
  return words[rndInt];
}

registerCommands();

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

  if (message.content === "send embed") {
    message.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName === "test") {
    interaction.reply(getRandomWord());
  }

  if (interaction.commandName === "concat") {
    const str1 = interaction.options.get("first-string");
    const str2 = interaction.options.get("second-string");
    interaction.reply(
      "first string has " +
        str1!.value?.toString().length +
        " letters and the second one has " +
        str2!.value?.toString().length,
    );
  }
});

client.login(token);
