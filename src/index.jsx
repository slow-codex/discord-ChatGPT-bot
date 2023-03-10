require("dotenv").config();

// Create a Discord Bot using OpenAI
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Prepare connection to OpenAI API
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

// Check for when a message on discord is sent
client.on("messageCreate", async function (message) {
  try {
    if (message.author.bot) return;

    const gptResponse = await openai.createCompletion({
      model: "davinci",
      prompt: `ChatGPT is a friendly chatbot.
			${message.author.username}: ${message.content}
			ChatGPT:`,
      temperature: 0.9,
      max_tokens: 500,
      stop: ["ChatGPT:", "Arnab Dutta:"],
    });
    // console.log(gptResponse.data.choices);
    message.reply(`${gptResponse.data.choices[0].text}`);
  } catch (err) {
    return console.log(err);
  }
});

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT Bot is Online on Discord");
