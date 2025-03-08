
const { Client, LocalAuth } = require('whatsapp-web.js');

let codes = {};
let userCoins = {}; // Almacenamos las coins de los usuarios

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

function addCoinsToUser(user, coins) {
    if (!userCoins[user]) {
        userCoins[user] = 0;
    }
    userCoins[user] += coins;
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

        message.reply(`¡Código generado! El código es *code*. Puedes canjear *{coins}* coins. Solo 5 personas pueden usarlo.`);
    }

    if (text.startsWith('!canjear')) {
        const code = text.split(' ')[1];
