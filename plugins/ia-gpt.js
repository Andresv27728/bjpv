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
    const res = await fetch(`https://duckduckgo.com/i.js?q=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error();

    const json = await res.json();
    if (!json.results || json.results.length === 0) throw new Error();

    const imageUrl = json.results[0].image;
    m.react('✅');
    await conn.sendMessage(m.chat, { image: { url: imageUrl } }, { quoted: m });

  } catch (e) {
    await conn.sendMessage(m.chat, { text: '*🚨 No se encontraron imágenes 😔*' }, { quoted: m });
  }
};

handler.tags = ['search'];
handler.help = ['buscarimg'];
handler.command = ['buscarimg', 'image', 'imagen'];

export default handler;