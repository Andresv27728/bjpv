// Créditos a https://github.com/deylinqff

import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => { 
  if (!text) { 
    await conn.sendMessage(m.chat, { text: '🌺 𝑭𝒂𝒍𝒕𝒂 𝒆𝒍 𝒕𝒆𝒙𝒕𝒐 𝒑𝒂𝒓𝒂 𝒄𝒓𝒆𝒂𝒓 𝒍𝒂 𝒊𝒎𝒂𝒈𝒆𝒏✎' }, { quoted: m }); 
    return; 
  }

  m.react('✨'); 
  await conn.sendMessage(m.chat, { text: `🌹 𝒄𝒓𝒆𝒂𝒏𝒅𝒐 𝒊𝒎𝒂𝒈𝒆𝒏 𝒅𝒆 ✎ ${text}` }, { quoted: m });

  try { 
    const res = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`); 
    if (!res.ok) throw new Error();

    const buffer = await res.buffer();
    m.react('🪄');

    // 1️⃣ Enviar la imagen primero
    await conn.sendMessage(m.chat, { 
      image: buffer, 
      caption: '🌟 Imagen generada con éxito. Ahora elige una opción:',
    }, { quoted: m });

    // 2️⃣ Enviar los botones en un mensaje separado
    await conn.sendMessage(m.chat, { 
      text: '📌 *Menú de Opciones* \nSelecciona lo que deseas hacer:',
      footer: '📍 Kirito-Bot',
      buttons: [
        { buttonId: '.imgg nueva', buttonText: { displayText: '🔄 Generar Nueva Imagen' }, type: 1 },
        { buttonId: '.imgg gato', buttonText: { displayText: '😻 Ver Gato' }, type: 1 },
        { buttonId: '.imgg perro', buttonText: { displayText: '🐶 Ver Perro' }, type: 1 },
      ],
      headerType: 1
    }, { quoted: m });

  } catch (e) { 
    await conn.sendMessage(m.chat, { text: '🚨 Ha ocurrido un error 😔' }, { quoted: m }); 
  } 
};

handler.tags = ['tools']; 
handler.help = ['genearimg']; 
handler.command = ['iaimg', 'img', 'imgia'];

export default handler;