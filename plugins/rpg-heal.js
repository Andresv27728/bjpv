let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        return conn.reply(m.chat, '🌷↛ 𝐸𝑙 𝑢𝑠𝑢𝑎𝑟𝑖𝑜 𝑛𝑜 𝑙𝑜 𝑒𝑛𝑐𝑢𝑒𝑛𝑡𝑟𝑜 𝑒𝑛 𝑚𝑖 𝑏𝑎𝑠𝑒 𝑑𝑒 𝑑𝑎𝑡𝑜𝑠, 𝑝𝑜𝑟 𝑓𝑎𝑣𝑜𝑟 𝑟𝑒𝑔𝑖𝑠𝑡𝑟𝑎𝑟𝑠𝑒_°.', m);
    }
    if (user.coin < 20) {
        return conn.reply(m.chat, '⚕️↛ 𝑆𝑢 𝑠𝑎𝑙𝑑𝑜 𝑒𝑠 𝑖𝑛𝑠𝑢𝑓𝑖𝑐𝑖𝑒𝑛𝑡𝑒 𝑝𝑎𝑟𝑎 𝑝𝑜𝑑𝑒𝑟 𝑐𝑢𝑟𝑎𝑟𝑡𝑒, 𝑃𝑎𝑟𝑎 𝑐𝑢𝑟𝑎𝑟𝑡𝑒, 𝑚𝑖𝑛𝑖𝑚𝑜 𝑛𝑒𝑐𝑒𝑠𝑖𝑡𝑎𝑠 20 𝑌𝑒𝑛𝑒𝑠_°.', m);
    }
    let healAmount = 40; 
    user.health += healAmount;
    user.coin -= 20; 
    if (user.health > 100) {
        user.health = 100; 
    }
    user.lastHeal = new Date();
    let info = `💉↛ *𝑇𝑒 ℎ𝑎𝑠 𝑐𝑢𝑟𝑎𝑑𝑜 ${healAmount} 𝑃𝑢𝑛𝑡𝑜𝑠 𝑑𝑒 𝑠𝑎𝑙𝑢𝑑 𝑅𝑒𝑐𝑖𝑏𝑖𝑠𝑟𝑡𝑒_°*\n🪙↛ *${moneda} 𝑅𝑒𝑠𝑡𝑎𝑛𝑡𝑒𝑠:* ${user.coin}\n💊↛ *𝑆𝑎𝑙𝑢𝑑 𝑎𝑐𝑡𝑢𝑎𝑙:* ${user.health}`;
    await conn.sendMessage(m.chat, { text: info }, { quoted: m });
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = ['heal', 'curar']

export default handler;
