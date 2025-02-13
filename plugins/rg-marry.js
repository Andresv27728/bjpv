/* Código creado por Deyin
 - Mejorado y optimizado
 - Dejen créditos aunque sea gracias.
*/

import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/marry.json');
const proposals = new Map();
const confirmations = new Map();
const marriages = loadMarriages();

function loadMarriages() {
    return fs.existsSync(marriagesFile) ? JSON.parse(fs.readFileSync(marriagesFile, 'utf8')) : {};
}

function saveMarriages() {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}

async function handleMarriage(m, conn) {
    const proposee = m.quoted?.sender || m.mentionedJid?.[0];
    const proposer = m.sender;

    if (!proposee) {
        if (marriages[proposer]) {
            return conn.reply(m.chat, `Ya estás casado con *${conn.getName(marriages[proposer])}*.\nUsa *#divorce* para divorciarte.`, m);
        }
        return conn.reply(m.chat, 'Debes mencionar a alguien para proponer matrimonio.', m);
    }
    if (marriages[proposer]) return conn.reply(m.chat, `Ya estás casado con ${conn.getName(marriages[proposer])}.`, m);
    if (marriages[proposee]) return conn.reply(m.chat, `${conn.getName(proposee)} ya está casado con ${conn.getName(marriages[proposee])}.`, m);
    if (proposer === proposee) return conn.reply(m.chat, '¡No puedes casarte contigo mismo!', m);

    proposals.set(proposee, proposer);
    const proposerName = conn.getName(proposer);
    const proposeeName = conn.getName(proposee);

    const message = await conn.reply(m.chat, `♡ ${proposerName} ha propuesto matrimonio a ${proposeeName}.\n\nUsa *#acceptmarry* para aceptar o *#declinemarry* para rechazar.`, m, { mentions: [proposee] });

    const timeout = setTimeout(() => {
        conn.sendMessage(m.chat, { text: '⏳ Tiempo agotado. La propuesta de matrimonio fue cancelada.' }, { quoted: m });
        proposals.delete(proposee);
        confirmations.delete(proposee);
    }, 60000);

    confirmations.set(proposee, { proposer, timeout, messageId: message.key.id });
}

async function handleDivorce(m, conn) {
    if (!marriages[m.sender]) return conn.reply(m.chat, 'No estás casado con nadie.', m);

    const partner = marriages[m.sender];
    delete marriages[m.sender];
    delete marriages[partner];
    saveMarriages();

    await conn.reply(m.chat, `💔 ${conn.getName(m.sender)} y ${conn.getName(partner)} se han divorciado.`, m);
}

async function handleAcceptance(m, conn) {
    if (!confirmations.has(m.sender)) return;

    const { proposer, timeout, messageId } = confirmations.get(m.sender);
    if (!m.quoted || m.quoted.id !== messageId) return; // Solo responde si cita la propuesta

    clearTimeout(timeout);
    confirmations.delete(m.sender);
    proposals.delete(m.sender);

    marriages[proposer] = m.sender;
    marriages[m.sender] = proposer;
    saveMarriages();

    return conn.sendMessage(m.chat, { 
        text: `🎉 ¡Se han casado!\n\n❤️ ${conn.getName(proposer)} 💍 ${conn.getName(m.sender)}\n\n¡Felicidades! 🎊`, 
        mentions: [proposer, m.sender] 
    }, { quoted: m });
}

async function handleRejection(m, conn) {
    if (!confirmations.has(m.sender)) return;

    const { timeout, messageId } = confirmations.get(m.sender);
    if (!m.quoted || m.quoted.id !== messageId) return; // Solo responde si cita la propuesta

    clearTimeout(timeout);
    confirmations.delete(m.sender);
    proposals.delete(m.sender);

    return conn.sendMessage(m.chat, { text: '💔 Han rechazado la propuesta de matrimonio.' }, { quoted: m });
}

const handler = async (m, { conn, command }) => {
    if (/^marry$/i.test(command)) return handleMarriage(m, conn);
    if (/^divorce$/i.test(command)) return handleDivorce(m, conn);
    if (/^acceptmarry$/i.test(command)) return handleAcceptance(m, conn);
    if (/^declinemarry$/i.test(command)) return handleRejection(m, conn);
};

handler.tags = ['fun'];
handler.help = ['marry @usuario', 'divorce', 'acceptmarry', 'declinemarry'];
handler.command = ['marry', 'divorce', 'acceptmarry', 'declinemarry'];
handler.group = true;

export default handler;