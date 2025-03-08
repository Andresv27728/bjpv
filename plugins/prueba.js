const { Client, LocalAuth } = require('whatsapp-web.js');

let codes = {};

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

client.on('ready', () => {
    console.log('Bot está listo y funcionando!');
});

client.on('message', async (message) => {
    const text = message.body.trim();
    const sender = message.from;

    if (text.startsWith('!codigo')) {
        const code = generateCode();
        const coins = Math.floor(Math.random() * 1000) + 100;
        codes[code] = { coins: coins, users: [] };

        message.reply(`¡Código generado! El código es *${code}*. Puedes canjear *${coins}* coins. Solo 5 personas pueden usarlo.`);
    }

    if (text.startsWith('!canjear')) {
        const code = text.split(' ')[1];
        if (!code || !codes[code]) {
            return message.reply('¡Código inválido! Asegúrate de ingresar el código correctamente.');
        }

        const codeData = codes[code];

        if (codeData.users.length >= 5) {
            return message.reply('Este código ya ha sido canjeado por 5 usuarios.');
        }

        if (codeData.users.includes(sender)) {
            return message.reply('Ya has canjeado este código.');
        }

        codeData.users.push(sender);
        message.reply(`¡Has canjeado el código exitosamente! Recibes *${codeData.coins}* coins.`);
    }
});

client.initialize();

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// Definición del handler (según lo requiera el sistema)
const handler = {
    help: ['codigo'],
    tags: ['economy'],
    command: ['codigo'],
    register: true,
    group: true
};

module.exports = handler;