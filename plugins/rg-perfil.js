import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';
import fs from 'fs';

const loadMarriages = () => {
    if (fs.existsSync('./src/database/marry.json')) {
        const data = JSON.parse(fs.readFileSync('./src/database/marry.json', 'utf-8'));
        global.db.data.marriages = data;
    } else {
        global.db.data.marriages = {};
    }
};

var handler = async (m, { conn }) => {
    loadMarriages();

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }

    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1);
    let { premium, level, genre, birth, description, dragones, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[who] || {};
    let username = conn.getName(who);

    genre = genre === 0 ? 'No especificado' : genre || 'No especificado';
    age = registered ? (age || 'Desconocido') : 'Sin especificar';
    birth = birth || 'No Establecido';
    description = description || 'Sin Descripción';
    role = role || 'Aldeano';

    let isMarried = who in global.db.data.marriages;
    let partner = isMarried ? global.db.data.marriages[who] : null;
    let partnerName = partner ? conn.getName(partner) : 'Nadie';
    /*let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
    let userNationalityData = api.data.result;
    let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido';*/

    let noprem = `
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

    let prem = `╭──⪩ 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 ⪨
│⧼👤⧽ *ᴜsᴜᴀʀɪᴏ:* *${username}*
│⧼💠⧽ *ᴇᴅᴀᴅ:* *${age}*
│⧼⚧️⧽ *ɢᴇɴᴇʀᴏ:* *${genre}*
│⧼🎂⧽ *ᴄᴜᴍᴘʟᴇᴀɴ̃ᴏs:* ${birth}
│⧼👩‍❤️‍👩⧽ *ᴄᴀsᴀᴅᴏ:* ${isMarried ? partnerName : 'Nadie'}
│⧼📜⧽ *ᴅᴇsᴄʀɪᴘᴄɪᴏɴ:* ${description}
│⧼🌀⧽ *ʀᴇɢɪsᴛʀᴀᴅᴏ:* ${registered ? '✅': '❌'}

╰─────────────────⪨

╭────⪩ 𝐑𝐄𝐂𝐔𝐑𝐒𝐎𝐒 ⪨
│⧼🪙⧽ *coins:* ${coins.toLocaleString()} ${moneda}
│⧼🌟⧽ *ɴɪᴠᴇʟ:* ${level || 0}
│⧼✨⧽ *ᴇxᴘᴇʀɪᴇɴᴄɪᴀ:* ${exp || 0}
│⧼⚜️⧽ *ʀᴀɴɢᴏ:* ${role}
╰───⪨ *𝓤𝓼𝓾𝓪𝓻𝓲𝓸 𝓓𝓮𝓼𝓽𝓪𝓬𝓪𝓭𝓸* ⪩`.trim();

    conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, { mentions: [who] });
}

handler.help = ['profile'];
handler.register = true;
handler.group = true;
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;