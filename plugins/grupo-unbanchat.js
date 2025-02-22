let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '💐l🍡 *¡Este chat no está registrado!*', m, fake)
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, '💐𝑴𝒊𝒕𝒔𝒖𝒓𝒊 𝑲𝒂𝒏𝒓𝒐𝒋𝒊-𝑴𝑫 *no está desactivada en este chat!*', m, fake)
chat.isBanned = false
await conn.reply(m.chat, '*🍡↛𝑴𝒊𝒕𝒔𝒖𝒓𝒊 𝑲𝒂𝒏𝒓𝒐𝒋𝒊-𝑴𝑫 ya esta activada en este chat ♡*', m, fake)
}
handler.help = ['unbanchat'];
handler.tags = ['grupo'];
handler.command = ['on','activar','desbanchat']
handler.rowner = true 
handler.botAdmin = true
handler.group = true

export default handler
