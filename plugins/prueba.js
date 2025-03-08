import { default as baileys } from '@whiskeysockets/baileys';

let codes = {}; // Almacena los códigos generados

const handler = async (m, { conn, text }) => {
    console.log("Handler ejecutado");
    const args = text.trim().split(' ');

    // Comando para generar código
    if (args[0] === 'codigo') {
        console.log("Comando 'codigo' detectado");
        if (args.length < 2 || isNaN(args[1]) || parseInt(args[1]) <= 0) {
            return conn.sendMessage(m.chat, { text: '❌ Por favor, ingresa una cantidad válida de coins.\nEjemplo: *codigo 500*' }, { quoted: m });
        }

        let amount = parseInt(args[1]);
        let code = Math.random().toString(36).substring(2, 10).toUpperCase();
        codes[code] = { coins: amount, users: [] };

        console.log(`Código generado: ${code}, Valor: ${amount}`);
        conn.sendMessage(m.chat, { text: `✅ ¡Código generado!\n🔹 Código: *${code}*\n💰 Valor: *${amount}* coins\n👥 Límite: 5 personas.` }, { quoted: m });
    }

    // Comando para canjear código
    if (args[0] === 'canjear') {
        console.log("Comando 'canjear' detectado");
        if (args.length < 2) {
            return conn.sendMessage(m.chat, { text: '❌ Debes ingresar un código para canjearlo.\nEjemplo: *canjear ABC123*' }, { quoted: m });
        }

        let code = args[1];

        if (!codes[code]) {
            return conn.sendMessage(m.chat, { text: '❌ ¡Código inválido! Asegúrate de ingresarlo correctamente.' }, { quoted: m });
        }

        let codeData = codes[code];

        if (codeData.users.length >= 5) {
            return conn.sendMessage(m.chat, { text: '❌ Este código ya ha sido canjeado por 5 personas.' }, { quoted: m });
        }

        if (codeData.users.includes(m.sender)) {
            return conn.sendMessage(m.chat, { text: '❌ Ya has canjeado este código.' }, { quoted: m });
        }

        codeData.users.push(m.sender);
        console.log(`Código ${code} canjeado por ${m.sender}`);
        conn.sendMessage(m.chat, { text: `🎉 ¡Has canjeado el código exitosamente! Recibes *${codeData.coins}* coins.` }, { quoted: m });
    }
};

handler.help = ['codigo <cantidad>', 'canjear <código>'];
handler.tags = ['economy'];
handler.command = ['codigo', 'canjear'];
handler.rowner = true;

export default handler;