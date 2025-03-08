import baileys from '@whiskeysockets/baileys';

let codes = {}; // Almacena los códigos generados

const handler = async (m, { conn, text }) => {
    const args = text.trim().split(' ');

    if (args[0] === 'codigo') {
        if (args.length < 2 || isNaN(args[1]) || parseInt(args[1]) <= 0) {
            return conn.sendMessage(m.chat, { text: '❌ Por favor, ingrese una cantidad válida de coins.\nEjemplo: *codigo 500*' }, { quoted: m });
        }

        let amount = parseInt(args[1]);
        let code = Math.random().toString(36).substring(2, 10).toUpperCase();
        codes[code] = { coins: amount, claimedBy: [] };

        conn.sendMessage(m.chat, { text: `✅ Código generado: *${code}*\nEste código puede ser canjeado por ${amount} coins y puede ser utilizado por 50 personas.` }, { quoted: m });
    }

    if (args[0] === 'canjear') {
        if (args.length < 2) {
            return conn.sendMessage(m.chat, { text: '❌ Debes ingresar un código para canjearlo.\nEjemplo: *canjear ABC123*' }, { quoted: m });
        }

        let code = args[1];

        if (!codes[code]) {
            return conn.sendMessage(m.chat, { text: '❌ ¡Código inválido! Asegúrate de ingresarlo correctamente.' }, { quoted: m });
        }

        let codeData = codes[code];

        if (codeData.claimedBy.length >= 50) {
            return conn.sendMessage(m.chat, { text: '❌ Este código ya ha sido canjeado por 50 personas.' }, { quoted: m });
        }

        if (codeData.claimedBy.includes(m.sender)) {
            return conn.sendMessage(m.chat, { text: '❌ Ya has canjeado este código.' }, { quoted: m });
        }

        codeData.claimedBy.push(m.sender);
        conn.sendMessage(m.chat, { text: `🎉 ¡Has canjeado el código exitosamente! Recibes *${codeData.coins}* coins.` }, { quoted: m });
    }
};

handler.help = ['codigo <cantidad>', 'canjear <código>'];
handler.tags = ['economy'];
handler.command = ['codigo', 'canjear'];
handler.rowner = true;

export default handler;