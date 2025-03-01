import MessageType from '@whiskeysockets/baileys';

const handler = async (m, { conn, usedPrefix, command }) => {
  // Menú Secundario
  if (command === 'me' || command === 'menú' || command === 'help' || command === 'ayuda') {
    const menuText = `🌟 *Menú Secundario* 🌟

🔹 Opciones disponibles:
1️⃣ *Comandos útiles*
2️⃣ *Información del bot*
3️⃣ *Soporte y contacto*

Presiona un botón para continuar.`;

    const buttons = [
      {
        buttonId: '.imgg gato',
        buttonText: { displayText: '😻 Gato' },
        type: 1
      },
      {
        buttonId: '.imgg perro',
        buttonText: { displayText: '🐶 Perro' },
        type: 1
      }
    ];

    await conn.sendMessage(m.chat, {
      text: menuText,
      footer: '📍 Kirito-Bot',
      buttons: buttons,
      headerType: 1
    }, { quoted: m });
  }

  // Comando para eliminar sala de juego (Tres en Raya)
  const room = Object.values(conn.game).find(
    (room) => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender)
  );
  
  if (command === 'deltictactoe' || command === 'deltt' || command === 'delttt') {
    if (room == undefined) {
      return conn.sendButton(m.chat, '🍭 No estás en ninguna partida de Tres en Raya.', '📍 Kirito-Bot', null, [
        ['Iniciar sala de juego', `${usedPrefix}ttt partida nueva`]
      ], m);
    }
    
    delete conn.game[room.id];
    await m.reply('🍭 Se eliminó la sala de juego de Tres en Raya.');
  }
};

handler.command = ['me', 'menú', 'help', 'ayuda', 'deltictactoe', 'deltt', 'delttt'];
handler.help = ['menu'];
handler.tags = ['main'];

export default handler;