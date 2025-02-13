/* Código hecho por Destroy
 - https://github.com/The-King-Destroy
 - Dejen créditos aunque sea gracias.
*/

import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/marry.json');
let proposals = {}; 
let marriages = loadMarriages();
const confirmation = {};

function loadMarriages() {
    return fs.existsSync(marriagesFile) ? JSON.parse(fs.readFileSync(marriagesFile, 'utf8')) : {};
}

function saveMarriages() {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}

function getSpouse(user) {
    return marriages[user] ? `@${marriages[user].split('@')[0]}` : 'Nadie';
}

const handler = async (m, { conn, command }) => {
    const isPropose = /^marry$/i.test(command);
    const isDivorce = /^divorce$/i.test(command);
    const isAccept = /^acceptmarry$/i.test(command);
    const isDecline = /^declinemarry$/i.test(command);

    const userIsMarried = (user) => marriages[user] !== undefined;

    try {
        if (isPropose) {
            const proposee = m.quoted?.sender || m.mentionedJid?.[0];
            const proposer = m.sender;

            if (!proposee) {
                if (userIsMarried(proposer)) {
                    return await conn.reply(m.chat, `《✧》 Ya estás casado con *${conn.getName(marriages[proposer])}*\n> Puedes divorciarte con el comando: *#divorce*`, m);
                } else {
                    throw new Error('Debes mencionar a alguien para aceptar o proponer matrimonio.\n> Ejemplo » *#marry @⁨Yuki Suou.⁩*');
                }
            }
            if (userIsMarried(proposer)) throw new Error(`Ya estás casado con ${conn.getName(marriages[proposer])}.`);
            if (userIsMarried(proposee)) throw new Error(`${conn.getName(proposee)} ya está casado con ${conn.getName(marriages[proposee])}.`);
            if (proposer === proposee) throw new Error('¡No puedes proponerte matrimonio a ti mismo!');

            proposals[proposer] = proposee;
            const proposerName = conn.getName(proposer);
            const proposeeName = conn.getName(proposee);
            const confirmationMessage = `♡ ${proposerName} 🫦 te ha propuesto matrimonio. ${proposeeName}, ¿aceptas? •(=^●ω●^=)•\n\n*Debes responder con:*\n> *#acceptmarry* » para aceptar\n> *#declinemarry* » para rechazar.`;
            await conn.reply(m.chat, confirmationMessage, m, { mentions: [proposee, proposer] });

            confirmation[proposee] = {
                proposer,
                timeout: setTimeout(() => {
                    conn.sendMessage(m.chat, { text: '*《✧》Se acabó el tiempo, no se obtuvo respuesta. La propuesta de matrimonio fue cancelada.*' }, { quoted: m });
                    delete confirmation[proposee];
                }, 60000)
            };

        } else if (isDivorce) {
            if (!userIsMarried(m.sender)) throw new Error('No estás casado con nadie.');

            const partner = marriages[m.sender];
            delete marriages[m.sender];
            delete marriages[partner];
            saveMarriages();

            await conn.reply(m.chat, `✐ ${conn.getName(m.sender)} y ${conn.getName(partner)} se han divorciado.`, m);
        } else if (isAccept) {
            if (!(m.sender in confirmation)) return conn.reply(m.chat, '*《✧》No tienes ninguna propuesta de matrimonio pendiente.*', m);
            const { proposer, timeout } = confirmation[m.sender];

            delete proposals[proposer];
            marriages[proposer] = m.sender;
            marriages[m.sender] = proposer;
            saveMarriages();

            conn.sendMessage(m.chat, { 
                text: `✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩
¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧\n\n*•.¸♡ Esposo ${conn.getName(proposer)}\n*•.¸♡ Esposa ${conn.getName(m.sender)}\n\n\`Disfruten de su luna de miel\`

✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩`, 
                mentions: [proposer, m.sender] 
            }, { quoted: m });

            clearTimeout(timeout);
            delete confirmation[m.sender];

        } else if (isDecline) {
            if (!(m.sender in confirmation)) return conn.reply(m.chat, '*《✧》No tienes ninguna propuesta de matrimonio pendiente.*', m);
            const { timeout } = confirmation[m.sender];

            clearTimeout(timeout);
            delete confirmation[m.sender];

            return conn.sendMessage(m.chat, { text: '*《✧》Han rechazado la propuesta de matrimonio.*' }, { quoted: m });
        }
    } catch (error) {
        await conn.reply(m.chat, `《✧》 ${error.message}`, m);
    }
}

// Función para mostrar el perfil con estado de matrimonio
handler.profile = (m, { userId, conn }) => {
    let pareja = getSpouse(userId);

    let profileText = `
「✿」 *𝑃𝑒𝑟𝑓𝑖𝑙* 🌷@${userId.split('@')[0]}◤

✦↛𝐸𝑑𝑎𝑑 » Desconocida
⚥↛*𝐺𝑒𝑛𝑒𝑟𝑜* » Desconocido
♡↛*𝐶𝑎𝑠𝑎𝑑𝑜 𝑐𝑜𝑛* » ${pareja}
`.trim();

    conn.reply(m.chat, profileText, m, { mentions: [pareja.replace('@', '')] });
}

handler.tags = ['fun'];
handler.help = ['marry *@usuario*', 'divorce', 'acceptmarry', 'declinemarry'];
handler.command = ['marry', 'divorce', 'acceptmarry', 'declinemarry', 'perfil'];
handler.group = true;

export default handler;