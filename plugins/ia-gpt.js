import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { text: '*🔍 Ingresa un término para buscar imágenes*' }, { quoted: m });
    return;
  }

  await m.react('🔍');
  await conn.sendMessage(m.chat, { text: `*🔍 Buscando imágenes de:* ${text}` }, { quoted: m });

  try {
    const res = await googleImage(text);
    if (!res || res.length === 0) throw new Error();

    const images = res.slice(0, 4).map(img => img); // Obtiene hasta 4 imágenes

    const messages = images.map((img, index) => [
      `Imagen ${index + 1}`,
      'Fuente: Google Imágenes',
      img,
      [[]], [[]], [[]], [[]]
    ]);

    await conn.sendCarousel(m.chat, `🔍 Resultados para: ${text}`, '⪛✰ Google Imágenes ✰⪜', null, messages, m);

  } catch (e) {
    await conn.sendMessage(m.chat, { text: '*🚨 No se encontraron imágenes 😔*' }, { quoted: m });
  }
};

handler.help = ['imagen'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['image', 'imagen', 'buscarimg'];

export default handler;