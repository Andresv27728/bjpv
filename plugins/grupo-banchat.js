let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `> 💐 𝑴𝒊𝒕𝒔𝒖𝒓𝒊 𝑲𝒂𝒏𝒓𝒐𝒋𝒊-𝑴𝑫 fue  desactivada de este chat ♡`, m, rcanal)

}
handler.help = ['banchat']
handler.tags = ['grupo']
handler.command = ['off']

handler.botAdmin = true
handler.rowner = true 
handler.group = true

export default handler
