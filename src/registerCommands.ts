import * as dotenv from "dotenv";
import { ApplicationCommandOptionType, REST, Routes } from "discord.js";

dotenv.config();

const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;
const token = process.env.DISCORD_TOKEN;

const commands = [
  {
    name: "test",
    description: "replies with random word",
  },
  {
    name: "concat",
    description: "add two words",
    options: [
      {
        name: "first-string",
        description: "the first string",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "second-string",
        description: "the second string",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(token as string);

async function registerCommands() {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId!, guildId!), {
      body: commands,
    });
    console.log("commands registered!");
  } catch (error) {
    console.log("error occurred: " + (error as Error).message);
  }
}

export default registerCommands;
