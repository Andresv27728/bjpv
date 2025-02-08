export function before(m) {
const user = global.db.data.users[m.sender];
if (user.afk > -1) {
conn.reply(m.chat, `🌷 𝐷𝑒𝑗𝑎𝑠𝑡𝑒 𝑑𝑒 𝑒𝑠𝑡𝑎𝑟 𝑖𝑛𝑎𝑐𝑡𝑖𝑣𝑜\n${user.afkReason ? '🍡 𝑀𝑜𝑡𝑖𝑣𝑜 𝑑𝑒 𝑙𝑎 𝑖𝑛𝑎𝑐𝑡𝑖𝑣𝑖𝑑𝑎𝑑: ' + user.afkReason : ''}\n\n*Tiempo Inactivo: ${(new Date - user.afk).toTimeString()}*`, m, rcanal)
user.afk = -1;
user.afkReason = '';
}
const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
for (const jid of jids) {
const user = global.db.data.users[jid];
if (!user) {
continue;
}
const afkTime = user.afk;
if (!afkTime || afkTime < 0) {
continue;
}
const reason = user.afkReason || '';
conn.reply(m.chat, `🍨 *𝐸𝑙 𝑢𝑠𝑢𝑎𝑟𝑖𝑜 𝑒𝑠𝑡𝑎 𝑖𝑛𝑎𝑐𝑡𝑖𝑣𝑜, 𝑝𝑜𝑟 𝑓𝑎𝑣𝑜𝑟 𝑛𝑜 𝑙𝑜 𝑒𝑡𝑖𝑞𝑢𝑒𝑡𝑒𝑠_°.*`, m, rcanal)
}
return true;
}
