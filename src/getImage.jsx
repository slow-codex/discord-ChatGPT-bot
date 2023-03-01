require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});

const opeanai = new OpenAIApi(configuration);

client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    const gptResponse = await opeanai.createImage({
      prompt: message,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log(image);
    const image = gptResponse.data.data[0].image;
    message.reply(`${image}`);
  } catch (err) {
    console.log(err.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT Bot is Online on Discord");
