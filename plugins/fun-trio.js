let handler = async(m, { conn, text, usedPrefix, command }) => {

    if (m.mentionedJid && m.mentionedJid.length === 2) {
        let person1 = m.mentionedJid[0];
        let person2 = m.mentionedJid[1];
        let name1 = conn.getName(person1);
        let name2 = conn.getName(person2);
        let name3 = conn.getName(m.sender);
        const pp = 'https://qu.ax/MuTrd.jpg';

        let trio = `\t\t> 🌷~𝐸𝐿 𝑀𝐸𝐽𝑂𝑅 𝑇𝑅𝐼𝑂 𝐷𝐸𝐿 𝐺𝑅𝑈𝑃𝑂~🍡
        

🌷↛ *${name1}* 𝑦 *${name2}* 𝑇𝑖𝑒𝑛𝑒𝑛 𝑢𝑛 *${Math.floor(Math.random() * 100)}%* 𝑑𝑒 𝑐𝑜𝑚𝑝𝑎𝑡𝑖𝑏𝑖𝑙𝑖𝑑𝑎𝑑 𝑐𝑜𝑚𝑜 𝑝𝑎𝑟𝑒𝑗𝑎_°.

🌷↛ 𝑀𝑖𝑒𝑛𝑡𝑟𝑎𝑠 𝑞𝑢𝑒 *${name1}* 𝑦 *${name3}* 𝑡𝑖𝑒𝑛𝑒𝑛 𝑢𝑛 *${Math.floor(Math.random() * 100)}%* 𝑑𝑒 𝑐𝑜𝑚𝑝𝑎𝑡𝑖𝑏𝑖𝑙𝑖𝑑𝑎𝑑 𝑐𝑜𝑚𝑜 𝑝𝑎𝑟𝑒𝑗𝑎_°.

🌷↛ 𝑇𝑎𝑚𝑏𝑖𝑒𝑛 ${name2} 𝑌 ${name3} 𝑇𝑖𝑒𝑛𝑒𝑛 𝑢𝑛 *${Math.floor(Math.random() * 100)}%* 𝑑𝑒 𝑐𝑜𝑚𝑝𝑎𝑡𝑖𝑏𝑖𝑙𝑖𝑑𝑎𝑑 𝑐𝑜𝑚𝑜 𝑝𝑎𝑟𝑒𝑗𝑎_°

🌷↛ ¿𝐻𝑀𝑀𝑀𝑀𝑀𝑀.... 𝑞𝑢𝑒 𝑜𝑝𝑖𝑛𝑎𝑛 𝑢𝑠𝑡𝑒𝑑𝑒𝑠 𝑑𝑒 𝑢𝑛 𝑡𝑟𝑖𝑜, 𝑑𝑜𝑛𝑑𝑒 𝑦 𝑝𝑎𝑟𝑎 𝑐𝑢𝑎𝑛𝑑𝑜? 😏`;

        conn.sendMessage(m.chat, { image: { url: pp }, caption: trio, mentions: [person1, person2, m.sender] }, { quoted: m });
    } else {
        conn.reply(m.chat, '🌷↛𝑀𝑒𝑛𝑐𝑖𝑜𝑛𝑎 𝑎 2 𝑢𝑠𝑢𝑎𝑟𝑖𝑜𝑠 𝑚𝑎𝑠, 𝑝𝑎𝑟𝑎 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑟 𝑠𝑢 𝑐𝑜𝑚𝑝𝑎𝑏𝑖𝑙𝑖𝑑𝑎𝑑 𝑐𝑜𝑚𝑜 𝑡𝑟𝑖𝑜😏 𝑟𝑖𝑐𝑜..._°.', m);
    }
}

handler.help = ['formartrio @usuario1 @usuario2'];
handler.tags = ['fun'];
handler.command = ['formartrio']
export default handler;
