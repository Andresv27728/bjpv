// Código creado por Deyin
import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { text: '*🔍 Escribe lo que quieres buscar en imágenes*' }, { quoted: m });
    return;
  }

  m.react('🔍');
  await conn.sendMessage(m.chat, { text: `*🔍 Buscando imágenes de:* ${text}` }, { quoted: m });

  try {
    const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(text)}`;
    const res = await fetch(`https://www.googleapis.com/customsearch/v1?cx=YOUR_CX_KEY&key=YOUR_API_KEY&q=${encodeURIComponent(text)}&searchType=image`);
    const json = await res.json();

    if (!json.items || json.items.length === 0) throw new Error();
    
    const imageUrl = json.items[0].link; // Toma la primera imagen de los resultados

    await conn.sendMessage(m.chat, { 
      image: { url: imageUrl },
      caption: `🔎 *Resultados para:* ${text}\n🌍 [Ver más imágenes aquí](${searchUrl})`
    }, { quoted: m });

    m.react('✅');

  } catch (e) {
    await conn.sendMessage(m.chat, { text: '*🚨 No se encontraron imágenes 😔*' }, { quoted: m });
  }
};

handler.tags = ['search'];
handler.help = ['buscarimg'];
handler.command = ['buscarimg', 'image', 'imagen'];

export default handler;