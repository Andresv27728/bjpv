let handler = async (m, { conn, args }) => {
    let mentionedJid = m.mentionedJid[0] || args[0];
    if (!mentionedJid) throw '⚠️ Menciona a alguien para asustarlo.';

    const progreso = [
        "*🕒 Procesando hackeo...*",
        "■□□□□□ 20%",
        "■■□□□□ 30%",
        "■■■□□□ 50%",
        "■■■■□□ 60%",
        "■■■■■□ 80%",
        "■■■■■■ 100%",
        "□□□□□□ 0%",
        "■□□□□□ 20%",
        "■■□□□□ 30%",
    ];

    const { key } = await conn.sendMessage(m.chat, { text: progreso[0] }, { quoted: m });

    for (let i = 1; i < progreso.length; i++) {
        await delay(1000);
        await conn.sendMessage(m.chat, { text: progreso[i], edit: key });
    }

    await conn.sendMessage(m.chat, { 
        text: `⚠️ *ATENCIÓN* ⚠️\n\n@${mentionedJid.split('@')[0]} tu cuenta de WhatsApp ha sido hackeada, despídete.`, 
        mentions: [mentionedJid], 
        edit: key 
    });
};

handler.help = ['hackear'];
handler.tags = ['diversion'];
handler.command = ['hacke', 'hackear', 'hackea'];

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));