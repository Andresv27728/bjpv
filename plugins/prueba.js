const handler = async (m, { conn }) => {
  const buttons = [
    { index: 1, quickReplyButton: { displayText: "📜 Menú", id: ".menu" } },
    { index: 2, quickReplyButton: { displayText: "👤 Perfil", id: ".profile" } }
  ];

  const buttonMessage = {
    text: "✨ *Elige una opción:*",
    footer: "Kirito-Bot",
    templateButtons: buttons
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

  return m.react('✅');
};

handler.command = ['botones'];
handler.help = ['botones'];
handler.tags = ['info'];
handler.register = true;

export default handler;