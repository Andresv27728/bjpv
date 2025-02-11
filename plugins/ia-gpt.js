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
    
    await conn.sendMessage(m.chat, {
      text: `🔎 Aquí tienes las imágenes encontradas: [Clic aquí para ver en Google](${searchUrl})`,
      contextInfo: { externalAdReply: { title: `Resultados de: ${text}`, body: 'Google Imágenes', sourceUrl: searchUrl } }
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