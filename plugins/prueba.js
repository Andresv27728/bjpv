const handler = async (m, { conn, command }) => {
  if (command === 'botones') {
    const body = 'Elige un botón para continuar:';

    await conn.sendMessage(m.chat, {
      text: body,
      buttons: [
        {
          buttonId: '.menu',
          buttonText: { displayText: 'Menú' },
        },
        {
          buttonId: '.profile',
          buttonText: { displayText: 'Perfil' },
        },
      ],
      headerType: 1, // Tipo de encabezado, aquí es el texto que aparece arriba del mensaje
    });
  } else {
    throw "Comando no reconocido.";
  }
};

handler.help = ['botones'];
handler.command = ['botones'];
handler.tags = ['general'];
handler.register = true;

export default handler;