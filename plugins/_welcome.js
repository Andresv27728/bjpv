import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split('@')[0]}`;
  let chat = global.db.data.chats[m.chat];
  let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg';

  if (!chat.welcome) return true;

  let img;
  try {
    let pp = await conn.profilePictureUrl(who, 'image');
    img = await (await fetch(pp)).buffer();
  } catch {
    img = await (await fetch(defaultImage)).buffer();
  }

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let bienvenida = `🍨 *Bienvenido a ${groupMetadata.subject}*\n\n👋 ${taguser}\n${global.welcom1}\n\n> 🍡 Usa *#help* para ver los comandos.`;

    await conn.sendMessage(m.chat, {
      image: img,
      caption: bienvenida,
      mentions: [who],
      footer: '★ 𝑴𝑖𝑡𝑠𝑢𝑟𝑖 𝐾𝑎𝑛𝑟𝑜𝑗𝑖-𝑀𝐷⁂',
      buttons: [
        {
          buttonId: '.menu',
          buttonText: { displayText: '⚡ Ver Menú' },
          type: 1
        }
      ]
    }, { quoted: m });

  } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
    let bye = `💐 *Adiós de ${groupMetadata.subject}*\n\n🚪 ${taguser}\n${global.welcom2}\n\n🥀 Nunca te quisimos aquí.\n> 💐 Usa *#help* para ver los comandos.`;

    await conn.sendMessage(m.chat, {
      image: img,
      caption: bye,
      mentions: [who],
      footer: '★ 𝑴𝑖𝑡𝑠𝑢𝑟𝑖 𝐾𝑎𝑛𝑟𝑜𝑗𝑖-𝑀𝐷⁂',
      buttons: [
        {
          buttonId: '.menu',
          buttonText: { displayText: '⚡ Ver Menú' },
          type: 1
        }
      ]
    }, { quoted: m });
  }

  return true;
}