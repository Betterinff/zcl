const { 
  Client, 
  GatewayIntentBits, 
  PermissionFlagsBits 
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // comando zcl (sem /)
  if (message.content.toLowerCase() === "zcl") {

    // permissão do usuário
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return message.reply("❌ Você não tem permissão para usar este comando.");
    }

    // permissão do bot
    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return message.reply("❌ Eu não tenho permissão para apagar mensagens.");
    }

    try {
      await message.channel.bulkDelete(100, true);

      const msg = await message.channel.send("🧹 100 mensagens apagadas!");
      setTimeout(() => msg.delete(), 3000);

    } catch (err) {
      console.error(err);
      message.reply("⚠️ Não consegui apagar mensagens (14 dias+).");
    }
  }
});

client.login(process.env.TOKEN);
