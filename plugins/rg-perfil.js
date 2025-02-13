let handler = async (m, { conn, args }) => {
    loadMarriages();

    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender; // Si la solicitud es sobre un mensaje citado
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender; // Si no, toma el ID del remitente
    }

    let user = global.db.data.users[userId];

    let name = conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Esclavo';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg');

    let isMarried = userId in global.db.data.marriages;
    let partner = isMarried ? global.db.data.marriages[userId] : null;
    let partnerName = partner ? conn.getName(partner) : 'Nadie';

    let profileText = `
「👑」 *Perfil* ✰@${userId.split('@')[0]}✰
${description}

✎ Edad » ${user.age || 'Desconocida'}
✎ *Cumpleaños* » ${cumpleanos}
✎ *Género* » ${genero}
✎ Casado con » ${isMarried ? partnerName : 'Nadie'}

♛ *Experiencia* » ${exp.toLocaleString()}
♛ *Nivel* » ${nivel}
♛ Rango » ${role}

⛁ *Coins Cartera* » ${coins.toLocaleString()} ${moneda}
⛃ *Coins Banco* » ${bankCoins.toLocaleString()} ${moneda}
✰ *Premium* » ${user.premium ? '✅' : '❌'}
  `.trim();

    await conn.sendMessage(m.chat, { 
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '✰ Perfil de Usuario ✰',
                body: dev,
                thumbnailUrl: perfil,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['profile', 'perfil'];  // Aquí agregamos 'perfil'
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];  // Aquí agregamos 'perfil'

export default handler;