var handler = async (m, { conn, text, usedPrefix, command }) => {

if (!text) return conn.reply(m.chat, `🌷↛ 𝑃𝑜𝑟 𝑓𝑎𝑣𝑜𝑟, 𝐼𝑛𝑔𝑟𝑒𝑠𝑒 𝑢𝑛 𝑐𝑜𝑛𝑡𝑒𝑥𝑡𝑜 ℎ𝑎𝑐𝑖𝑎 𝑠𝑢 𝑝𝑟𝑒𝑔𝑢𝑛𝑡𝑎_°`, m, rcanal, )

await m.react('❔')
await delay(1000 * 1)
await m.react('❓')
await delay(1000 * 1)
await m.react('❔')
await delay(1000 * 1)

await conn.reply(m.chat, + dev + `\n\n• *𝑃𝑟𝑒𝑔𝑢𝑛𝑡𝑎:* ` + text + `\n• *𝑅𝑒𝑠𝑝𝑢𝑒𝑠𝑡𝑎:* ` + res, m, rcanal)

}
handler.help = ['pregunta']
handler.tags = ['fun']
handler.command = ['pregunta','preguntas']

handler.register = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let res = ['𝑂𝑏𝑣𝑖𝑜_°','𝑇𝑎𝑙 𝑣𝑒𝑧_°','𝑃𝑜𝑠𝑖𝑏𝑙𝑒𝑚𝑒𝑛𝑡𝑒_°','𝑃𝑜𝑠𝑖𝑏𝑘𝑒𝑚𝑒𝑛𝑡𝑒 𝑛𝑜_°','𝑛𝑜𝑝_°','𝐸𝑠 𝑖𝑚𝑝𝑜𝑠𝑖𝑏𝑙𝑒_°','𝑃𝑜𝑟 𝑞𝑢𝑒 𝑚𝑒 ℎ𝑎𝑐𝑒𝑠 𝑒𝑠𝑎 𝑐𝑙𝑎𝑠𝑒 𝑑𝑒 𝑝𝑟𝑒𝑔𝑢𝑛𝑡𝑎𝑠?_°','𝑃𝑜𝑟 𝑒𝑠𝑜 𝑡𝑒 𝑑𝑒𝑗𝑜🫵🏻😹_°','𝑃𝑎𝑟𝑎 𝑤𝑢𝑒 𝑞𝑢𝑖𝑒𝑟𝑒𝑠 𝑠𝑎𝑏𝑒𝑟?_°','𝑁𝑖 𝑡𝑒 𝑑𝑖𝑟𝑒 𝑙𝑎 𝑟𝑒𝑠𝑝𝑢𝑒𝑠𝑡𝑎😹🫵🏻_°].getRandom()
