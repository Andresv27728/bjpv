// Código creado por Deyin
import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { text: '*🤖 Escribe una pregunta o mensaje para la IA*' }, { quoted: m });
    return;
  }

  m.react('✨');
  await conn.sendMessage(m.chat, { text: '*🤖 Pensando...*' }, { quoted: m });

  try {
    const res = await fetch(`https://api.itsrose.site/v2/gpt4?text=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error();

    const json = await res.json();
    const respuestaIA = json.response || '*🤖 No pude generar una respuesta.*';

    m.react('✅');
    await conn.sendMessage(m.chat, { text: respuestaIA }, { quoted: m });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: '*🚨 Ha ocurrido un error con la IA 😔*' }, { quoted: m });
  }
};

handler.tags = ['ai'];
handler.help = ['iachat'];
handler.command = ['iax', 'ai', 'chatgpt', 'openai'];

export default handler;