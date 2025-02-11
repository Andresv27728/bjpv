// Código creado por Deyin
import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { text: '*🖌 Escribe una descripción para generar tu imagen con IA*' }, { quoted: m });
    return;
  }

  m.react('🎨');
  await conn.sendMessage(m.chat, { text: `*🎨 Generando imagen de:* ${text}` }, { quoted: m });

  try {
    const res = await fetch(`https://lexica.art/api/v1/search?q=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error();

    const json = await res.json();
    if (!json.images || json.images.length === 0) throw new Error();

    const imageUrl = json.images[0].src;
    m.react('✅');
    await conn.sendMessage(m.chat, { image: { url: imageUrl } }, { quoted: m });

  } catch (e) {
    await conn.sendMessage(m.chat, { text: '*🚨 Error generando la imagen 😔*' }, { quoted: m });
  }
};

handler.tags = ['ai'];
handler.help = ['imgai'];
handler.command = ['imgai', 'imagegen', 'imgart'];

export default handler;