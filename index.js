const { 
  Client, 
  GatewayIntentBits, 
  Events 
} = require("discord.js");

// Criação do client com intents PERMITIDAS
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Evento: bot pronto
client.once(Events.ClientReady, (c) => {
  console.log(`✅ Bot online como ${c.user.tag}`);
});

// Evento: mensagem
client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("🏓 Pong!");
  }
});

// Login com o token (Railway)
client.login(process.env.TOKEN);
