// Créditos a https://github.com/deylinqff

const handler = async (m, { conn }) => {
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
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['me', 'menú', 'help', 'ayuda'];

export default handler;