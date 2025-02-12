//* Código hecho por Destroy

//*adaptado por Deylin 

import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/marry.json');
let marriages = loadMarriages();
const proposals = {};
const confirmation = {};

function loadMarriages() {
    try {
        return fs.existsSync(marriagesFile) ? JSON.parse(fs.readFileSync(marriagesFile, 'utf8')) : {};
    } catch (error) {
        console.error('Error al cargar la base de datos de matrimonios:', error);
        return {};
    }
}

function saveMarriages() {
    try {
        fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
    } catch (error) {
        console.error('Error al guardar la base de datos de matrimonios:', error);
    }
}

const handler = async (m, { conn, command }) => {
    const isPropose = /^marry$/i.test(command);
    const isDivorce = /^divorce$/i.test(command);
    const proposer = m.sender;

    try {
        if (isPropose) {
            const proposee = m.quoted?.sender || m.mentionedJid?.[0];
            if (!proposee) {
                if (marriages[proposer]) {
                    return await conn.reply(m.chat, `《✧》Ya estás casado con *${await conn.getName(marriages[proposer])}*.\n> Usa *#divorce* para divorciarte.`, m);
                }
                throw new Error('Menciona a alguien para proponer matrimonio.\nEjemplo: *#marry @usuario*');
            }
            if (marriages[proposer]) throw new Error(`Ya estás casado con ${await conn.getName(marriages[proposer])}.`);
            if (marriages[proposee]) throw new Error(`${await conn.getName(proposee)} ya está casado con ${await conn.getName(marriages[proposee])}.`);
            if (proposer === proposee) throw new Error('¡No puedes casarte contigo mismo!');

            proposals[proposer] = proposee;
            confirmation[proposee] = {
                proposer,
                timeout: setTimeout(() => {
                    conn.reply(m.chat, '*《✧》Tiempo agotado. Propuesta de matrimonio cancelada.*', m);
                    delete confirmation[proposee];
                }, 60000)
            };

            const proposerName = await conn.getName(proposer);
            const proposeeName = await conn.getName(proposee);
            const message = `♡ ${proposerName} te ha propuesto matrimonio. ${proposeeName}, ¿aceptas?\n\n*Responde con:*\n> ✐"Si" » para aceptar\n> ✐"No" » para rechazar.`;
            await conn.reply(m.chat, message, m, { mentions: [proposee, proposer] });

        } else if (isDivorce) {
            if (!marriages[proposer]) throw new Error('No estás casado con nadie.');

            const partner = marriages[proposer];
            delete marriages[proposer];
            delete marriages[partner];
            saveMarriages();

            await conn.reply(m.chat, `✐ ${await conn.getName(proposer)} y ${await conn.getName(partner)} se han divorciado.`, m);
        }
    } catch (error) {
        await conn.reply(m.chat, `《✧》${error.message}`, m);
    }
};

handler.before = async (m) => {
    if (!confirmation[m.sender] || !m.text) return;
    
    const { proposer, timeout } = confirmation[m.sender];

    if (/^No$/i.test(m.text)) {
        clearTimeout(timeout);
        delete confirmation[m.sender];
        return conn.reply(m.chat, '*《✧》Han rechazado tu propuesta de matrimonio.*', m);
    }

    if (/^Si$/i.test(m.text)) {
        marriages[proposer] = m.sender;
        marriages[m.sender] = proposer;
        saveMarriages();

        const proposerName = await conn.getName(proposer);
        const partnerName = await conn.getName(m.sender);
        const marriageMessage = `✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩\n¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧\n\n♡ *Esposo:* ${proposerName}\n♡ *Esposa:* ${partnerName}\n\nDisfruten de su luna de miel.\n✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩`;

        conn.sendMessage(m.chat, { text: marriageMessage, mentions: [proposer, m.sender] }, { quoted: m });

        clearTimeout(timeout);
        delete confirmation[m.sender];
    }
};

handler.tags = ['rg'];
handler.help = ['marry *@usuario*', 'divorce'];
handler.command = ['marry', 'divorce'];
handler.group = true;

export default handler;