import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split('@')[0]}`;
  let chat = global.db.data.chats[m.chat];
  let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg';

  if (chat.welcome) {
    let img;
    try {
      let pp = await conn.profilePictureUrl(who, 'image');
      img = await (await fetch(pp)).buffer();
    } catch {
      img = await (await fetch(defaultImage)).buffer();
    }

    const buttons = [
      {
        buttonId: '.menu',
        buttonText: { displayText: '⚡ 𝑉𝑒𝑟 𝑀𝑒𝑛𝑢_°' },
        type: 1
      }
    ];

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `🍨 *Bienvenido* a ${groupMetadata.subject}\n\n👋 「 ${taguser} 」\n${global.welcom1}\n\n•Ｏ(≧∇≦)Ｏ• Disfruta tu estadía en el grupo!\n\n> 🍡 Puedes usar *#help* para ver la lista de comandos.`;
      
      await conn.sendMessage(m.chat, {
        image: img,
        caption: bienvenida,
        mentions: [who],
        footer: '★𝑀𝑖𝑡𝑠𝑢𝑟𝑖 𝐾𝑎𝑛𝑟𝑜𝑗𝑖-𝑀𝐷⁂',
        buttons: buttons,
        viewOnce: true
      }, { quoted: m });

    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `🌸 *│「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」* De ${groupMetadata.subject}\n\n🚪 「 ${taguser} 」\n${global.welcom2}\n\n😒 𝐒𝐄 𝐅𝐔𝐄 𝐄𝐒𝐄 𝐏𝐔𝐓𝐎\n🥀 𝐍𝐮𝐧𝐜𝐚 𝐓𝐞 𝐐𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐀𝐪𝐮í\n\n> 💐 Puedes usar *#help* para ver la lista de comandos.`;
      
      await conn.sendMessage(m.chat, {
        image: img,
        caption: bye,
        mentions: [who],
        footer: '★𝑀𝑖𝑡𝑠𝑢𝑟𝑖 𝐾𝑎𝑛𝑟𝑜𝑗𝑖-𝑀𝐷⁂',
        buttons: buttons,
        viewOnce: true
      }, { quoted: m });
    }
  }

  return true;
}