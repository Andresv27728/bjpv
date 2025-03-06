const handler = async (m, { text, reply }) => {
  if (!text) return reply('*Ejemplo: .serbot --code*');
  if (text !== '--code') return reply('*Opción no válida, usa: .serbot --code*');

  let code = `const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const Pino = require("pino");

async function iniciarSubBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const sock = makeWASocket({
    logger: Pino({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") console.log("✅ Sub-Bot conectado");
    if (connection === "close") console.log("❌ Conexión cerrada");
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;
    const text = m.message.conversation || m.message.extendedTextMessage?.text;
    if (text === "!ping") {
      await sock.sendMessage(m.key.remoteJid, { text: "Pong!" });
    }
  });
}

iniciarSubBot();`;

  reply('```' + code + '```');
};

handler.help = ['serbot', 'serbot code2'];
handler.tags = ['serbot'];
handler.command = ['jadibot', 'serbot'];

export default handler;