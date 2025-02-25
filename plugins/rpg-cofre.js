const handler = async (m, { isPrems, conn }) => {
  if (!global.db.data.users[m.sender]) {
    throw `🌷↛ 𝑈𝑠𝑢𝑎𝑟𝑖𝑜 𝑛𝑜 𝑟𝑒𝑔𝑖𝑠𝑡𝑟𝑎𝑑𝑜, 𝑟𝑒𝑔𝑖𝑠𝑡𝑟𝑎𝑡𝑒 𝑝𝑎𝑟𝑎 𝑢𝑠𝑎𝑟 𝑒𝑙 𝑐𝑜𝑚𝑎𝑛𝑑𝑜 𝑐𝑜𝑛 *verifi* 𝑜 *registrar*_°`;
  }

  const lastCofreTime = global.db.data.users[m.sender].lastcofre;
  const timeToNextCofre = lastCofreTime + 86400000;

  if (Date.now() < timeToNextCofre) {
    const tiempoRestante = timeToNextCofre - Date.now();
    const mensajeEspera = `🌷↛ 𝑌𝑎 ℎ𝑎𝑏𝑖𝑎𝑠 𝑟𝑒𝑐𝑙𝑎𝑚𝑎𝑑𝑜 𝑡𝑢 𝑐𝑜𝑓𝑟𝑒\n⌛ 𝑉𝑢𝑒𝑙𝑣𝑒 𝑎 𝑖𝑛𝑡𝑒𝑛𝑡𝑎𝑟𝑙𝑜 𝑒𝑛 𝑢𝑛 𝑡𝑖𝑒𝑚𝑝𝑜 𝑎𝑝𝑟𝑜𝑥𝑖𝑚𝑎𝑑𝑜 𝑑𝑒: *${msToTime(tiempoRestante)}* 𝑃𝑎𝑟𝑎 𝑞𝑢𝑒 𝑣𝑢𝑒𝑙𝑣𝑎𝑠 𝑎 𝑟𝑒𝑐𝑙𝑎𝑚𝑎𝑟 𝑡𝑢 𝑐𝑜𝑓𝑟𝑒_°`;
    await conn.sendMessage(m.chat, { text: mensajeEspera }, { quoted: m });
    return;
  }

  const img = 'https://qu.ax/LuGoK.jpg';
  const dia = Math.floor(Math.random() * 100);
  const tok = Math.floor(Math.random() * 10);
  const ai = Math.floor(Math.random() * 40);
  const expp = Math.floor(Math.random() * 5000);

  global.db.data.users[m.sender].coin += dia;
  global.db.data.users[m.sender].diamonds += ai;
  global.db.data.users[m.sender].joincount += tok;
  global.db.data.users[m.sender].exp += expp;
  global.db.data.users[m.sender].lastcofre = Date.now();

  const texto = `
╭━〔 Cσϝɾҽ Aʅҽαƚσɾισ 〕⬣
┃📦 *Obtienes Un Cofre*
┃ ¡Felicidades!
╰━━━━━━━━━━━━⬣

╭━〔 Nυҽʋσʂ Rҽƈυɾʂσʂ 〕⬣
┃ *${dia} ${moneda}* 🪙
┃ *${tok} Tokens* ⚜️
┃ *${ai} Diamantes* 💎
┃ *${expp} Exp* ✨
╰━━━━━━━━━━━━⬣`;

  try {
    await conn.sendFile(m.chat, img, 'yuki.jpg', texto);
  } catch (error) {
    throw `⚠️ Ocurrió un error al enviar el cofre.`;
  }
};

handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['cofre'];
handler.level = 5;
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return `${hours} Horas ${minutes} Minutos`;
}
