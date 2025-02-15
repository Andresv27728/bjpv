// Créditos A Deylin
let handler = async (m, { conn, text }) => {
  // No Quites Los Créditos🚀
  m.react('⚙️');

  
  const groupLinkPattern = /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/;
  const match = text.match(groupLinkPattern);

  if (!match) {
    await conn.sendMessage(m.chat, { text: '❌ *No enviaste un enlace válido de grupo de WhatsApp.*' });
    return;
  }

  const groupId = match[1];
  const message = "〔👑 *${botname}* 👑〕\n\n*Enlace recibido correctamente.*";

  try {
   
    await conn.groupAcceptInvite(groupId);

    
    await conn.sendMessage(m.chat, { text: message });
  } catch (error) {
    console.error('Error al aceptar el enlace del grupo:', error);
    await conn.sendMessage(m.chat, { text: '❌ *Hubo un error al intentar unirse al grupo.*' });
  }
};


Object.defineProperty(handler, 'alwaysOn', {
  value: true, 

  writable: false, 
});

handler.help = ['link2'];
handler.tags = ['enlace2'];
handler.command = ['link2'];
handler.rowner = true; 

export default handler;