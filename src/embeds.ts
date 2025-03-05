import { EmbedBuilder } from "discord.js";

const embed = new EmbedBuilder()
  .setTitle("my title")
  .setAuthor({ name: "some guy" })
  .setColor(0xe1e829)
  .setFooter({ text: "some text in footer, here we go" });

export { embed };
