let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '💐l🍡 *¡Este chat no está registrado!*', m, fake)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, '💐𝑴𝒊𝒕𝒔𝒖𝒓𝒊 𝑲𝒂𝒏𝒓𝒐𝒋𝒊-𝑴𝑫 *𝑁𝑢𝑛𝑐𝑎 𝑒𝑠𝑡𝑢𝑏𝑜 𝑎𝑝𝑎𝑔𝑎𝑑𝑎 𝑝𝑎𝑟𝑎 𝑒𝑠𝑡𝑒 𝑐ℎ𝑎𝑡_°!*', m, fake)
chat.isBanned = false
await conn.reply(m.chat, '*🍡↛𝑴𝒊𝒕𝒔𝒖𝒓𝒊 𝑲𝒂𝒏𝒓𝒐𝒋𝒊-𝑴𝑫 𝑓𝑢𝑒 𝑒𝑥𝑖𝑡𝑜𝑠𝑎𝑚𝑒𝑛𝑡𝑒 𝑎𝑐𝑡𝑖𝑣𝑎𝑑𝑎 𝑒𝑛 𝑒𝑠𝑡𝑒 𝑐ℎ𝑎𝑡_° ♡*', m, fake)
}
handler.help = ['unbanchat'];
handler.tags = ['grupo'];
handler.command = ['on','activar','desbanchat']
handler.rowner = true 
handler.botAdmin = true
handler.group = true

export default handler
