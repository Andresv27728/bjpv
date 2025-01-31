import moment from 'moment-timezone';

let handler = async (m, { conn, args }) => {

  let staff = `
✨ *EQUIPO DE AYUDANTES* ✨
👑 *Dueño* ${creador}
🍬 *Bot:* ${botname}
⚜️ *Versión:* ${vs}
📚 *Libreria:* ${libreria} ${baileys}

🪐 *Creador:*

☁️ ⁱᵃᵐ|Lm' Avaricia
🔖 *Rol:* Creador
👾 *GitHub:* https://github.com/2277meliodas

🍃 *Colaboradores:*


☘️ I'm Fz' (Tesis)
🔖 *Rol:* Developer
👾 *GitHub:* https://github.com/FzTeis

 👾 Deylin 
🔖 *Rol:* Developer
👾 *GitHub:* https://github.com/deylinqff


🫧  ⁱᵃᵐ|𝔇ĕ𝐬†𝓻⊙γ𒆜 
🔖 *Rol:* Developer 
👾 *GitHub:*https://github.com/The-King-Destroy

🌪️ 𝓛𝓮𝓰𝓷𝓪
🔖 *Rol:* Moderador 
👾 *GitHub:* https://github.com/Legna-chan
  `.trim();

  await conn.sendMessage(m.chat, { 
      text: staff,
      contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: `✨ Developers`,
              body: dev,
              thumbnailUrl: test,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m });

};

handler.help = ['staff'];
handler.tags = ['main'];
handler.command = ['ayudantes', 'colaboradores', 'staff'];

export default handler;
