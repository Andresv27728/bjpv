// Créditos a https://github.com/deylinqff

import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { 
      text: '*🌺 𝑭𝒂𝒍𝒕𝒂 𝒆𝒍 𝒕𝒆𝒙𝒕𝒐 𝒑𝒂𝒓𝒂 𝒄𝒓𝒆𝒂𝒓 𝒍𝒂 𝒊𝒎𝒂𝒈𝒆𝒏✎*' 
    }, { quoted: m });
    return;
  }

  m.react('✨');
  await conn.sendMessage(m.chat, { 
    text: `*🌹 𝒄𝒓𝒆𝒂𝒏𝒅𝒐 𝒊𝒎𝒂𝒈𝒆𝒏 𝒅𝒆 ✎ ${text}*` 
  }, { quoted: m });

  try {
    const res = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error();

    const buffer = await res.buffer();
    m.react('🪄');

    // Enviar la imagen generada primero
    await conn.sendMessage(m.chat, { 
      image: buffer, 
      caption: '🌟 *Imagen generada con éxito.*\nSelecciona una opción a continuación:'
    }, { quoted: m });

    // Luego enviar el menú interactivo
    const listMessage = {
      text: '📌 *Menú de Opciones* \nSelecciona una categoría:',
      footer: '📍 Kirito-Bot',
      title: 'Menú Principal',
      buttonText: '🔽 Abrir Menú',
      sections: [
        {
          title: '🐾 Animales',
          rows: [
            { title: '🐱 Gato', rowId: '.imgg gato', description: 'Ver imágenes de gatos' },
            { title: '🐶 Perro', rowId: '.imgg perro', description: 'Ver imágenes de perros' },
          ],
        },
        {
          title: '🎨 Generador IA',
          rows: [
            { title: '🔍 Nueva Imagen', rowId: '.imgg nueva', description: 'Generar otra imagen IA' },
            { title: '📤 Compartir', rowId: '.compartir', description: 'Compartir la imagen generada' },
          ],
        },
      ],
    };

    await conn.sendMessage(m.chat, listMessage, { quoted: m });

  } catch (e) {
    await conn.sendMessage(m.chat, { text: '*🚨 Ha ocurrido un error 😔*' }, { quoted: m });
  }
};

handler.tags = ['tools'];
handler.help = ['genearimg'];
handler.command = ['iaimg', 'img', 'imgia'];

export default handler;