const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, {
    text: "✨ *Elige una opción:*",
    footer: "Kirito-Bot",
    buttons: [
      {
        buttonId: ".menu",
        buttonText: { displayText: "📜 Menú" },
        type: 1
      },
      {
        buttonId: ".profile",
        buttonText: { displayText: "👤 Perfil" },
        type: 1
      }
    ],
    headerType: 1
  }, { quoted: m });

  return m.react('✅');
};

handler.command = ['botones'];
handler.help = ['botones'];
handler.tags = ['info'];
handler.register = true;

export default handler;