// Créditos A Deylin
let handler = async (m, { conn, text, isOwner }) => {
  // No Quites Los Créditos🚀
  m.react('⚙️');

  if (!isOwner) {
    await conn.sendMessage(m.chat, { text: '🚫 *No tienes permiso para usar este comando.*' });
    return;
  }

  const groupLinkPattern = /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/;
  const match = text.match(groupLinkPattern);

  if (!match) {
    await conn.sendMessage(m.chat, { text: '❌ *No enviaste un enlace válido de grupo de WhatsApp.*' });
    return;
  }

  const inviteCode = match[1];

  try {

    let groupInfo = await conn.groupGetInviteInfo(inviteCode);
    let groupId = groupInfo.id;

    let isInGroup = Object.keys(await conn.groupFetchAllParticipating()).includes(groupId);

    if (!isInGroup) {
      await conn.sendMessage(m.chat, { text: '❌ *No estoy en ese grupo.*' });
      return;
    }

    let mensajeSalida = `📢 *Aviso importante:*  
Este grupo ha infringido nuestras normas de uso, lo que ha llevado a la decisión de retirar el bot para preservar la integridad de la comunidad.  
Agradecemos el tiempo compartido, y lamentamos que se haya llegado a esta medida. Si consideras que esto es un error, por favor contacta con el propietario del bot.`;

    await conn.sendMessage(groupId, { text: mensajeSalida });

    await conn.groupLeave(groupId);
    await conn.sendMessage(m.chat, { text: `🌺 *El bot ha salido del grupo "${groupInfo.subject}" exitosamente.*` });
  } catch (error) {
    console.error('Error al salir del grupo:', error);
    await conn.sendMessage(m.chat, { text: '❌ *Hubo un error al intentar salir del grupo.*' });
  }
};

Object.defineProperty(handler, 'alwaysOn', {
  value: true,
  writable: false,
});

handler.help = ['salir2'];
handler.tags = ['grupo'];
handler.command = ['salir2'];
handler.rowner = true; 
export default handler;