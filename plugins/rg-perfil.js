import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    }

    let user = global.db.data.users[userId];

    let name = conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let pareja = user.marry || 'Nadie';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;

    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg');

    let profileText = `
「✿」 *𝑃𝑒𝑟𝑓𝑖𝑙* 🌷@${userId.split('@')[0]}◤
${description}

✦↛𝐸𝑑𝑎𝑑 » ${user.age || 'Desconocida'}
♛↛*𝐶𝑢𝑚𝑝𝑙𝑒𝑎𝑛̃𝑜𝑠* » ${cumpleanos}
⚥↛*𝐺𝑒𝑛𝑒𝑟𝑜* » ${genero}
♡↛*𝐶𝑎𝑠𝑎𝑑𝑜 𝑐𝑜𝑛* » ${isMarried ? partnerName : 'Nadie'}

☆↛*𝐸𝑥𝑝𝑒𝑟𝑖𝑒𝑛𝑥𝑖𝑎* » ${exp.toLocaleString()}
❖↛*𝑁𝑖𝑣𝑒𝑙* » ${nivel}
✎↛𝑅𝑎𝑛𝑔𝑜 » ${role}

⛁↛*𝐶𝑜𝑖𝑛𝑠 𝐶𝑎𝑟𝑡𝑒𝑟𝑎* » ${coins.toLocaleString()} ${moneda}
⛃↛*𝐶𝑜𝑖𝑛𝑠 𝐵𝑎𝑛𝑐𝑜* » ${bankCoins.toLocaleString()} ${moneda}
❁↛*𝑃𝑟𝑒𝑚𝑖𝑢𝑚* » ${user.premium ? '✅' : '✖️'}
  `.trim();

    await conn.sendMessage(m.chat, { 
        text: profileText,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: '✧ Perfil de Usuario ✧',
                body: dev,
                thumbnailUrl: perfil,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['profile'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;