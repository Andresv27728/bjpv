import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('./src/database/casados.json');
let proposals = {};

function loadMarriages() {
    if (fs.existsSync(marriagesFile)) {
        const data = fs.readFileSync(marriagesFile, 'utf-8');
        return JSON.parse(data);
    } else {
        return {};
    }
}

function saveMarriages(data) {
    fs.writeFileSync(marriagesFile, JSON.stringify(data, null, 2));
}

let marriages = loadMarriages();

function isYaemoriBotMD() {
    try {
        const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
        if (packageJson.name !== 'Mitsuri-Kanroji-Bot-MD') return false;
        if (packageJson.repository.url !== 'git+https://github.com/2277meliodas/Mitsuri-Kanroji-Bot-MD.git') return false;
        return true;
    } catch (error) {
        console.error('Error al leer package.json:', error);
        return false;
    }
}

let handler = async (message, { conn, command, usedPrefix, args }) => {
    if (!isYaemoriBotMD()) {
        await message.reply('✧ Comando no disponible por el momento.');
        return;
    }

    const isMarryCommand = /^(marry)$/i.test(command);
    const isDivorceCommand = /^(divorce)$/i.test(command);

    async function handleError(error) {
        await message.reply('✐ Ocurrió un error.');
        console.error(error);
    }

    switch (true) {
        case isMarryCommand:
            let senderData = global.db.users[message.sender];
            if (senderData.age < 18) {
                await message.reply('✧ Debes ser mayor de 18 años para casarte.');
                return;
            }

            let sender = message.sender;
            if (marriages[sender]) {
                await conn.reply(
                    message.chat,
                    `✧ Ya estás casado/a con *@${marriages[sender].split('@')[0]}*\n> Puedes divorciarte con el comando: *#divorce*`,
                    message,
                    { mentions: [marriages[sender]] }
                );
                return;
            }

            if (!message.mentionedJid || message.mentionedJid.length === 0) {
                await conn.reply(
                    message.chat,
                    `✧ Debes mencionar a alguien para aceptar o proponer matrimonio.\n> Ejemplo » *${usedPrefix + command} @usuario*`,
                    message,
                    { mentions: [conn.user.jid] }
                );
                return;
            }

            let mentioned = message.mentionedJid[0];
            if (marriages[mentioned]) {
                await conn.reply(
                    message.chat,
                    `✧ @${mentioned.split('@')[0]} ya está casado/a con *@${marriages[mentioned].split('@')[0]}*`,
                    message,
                    { mentions: [mentioned, marriages[mentioned]] }
                );
                return;
            }

            if (sender === mentioned) {
                await message.reply('✧ ¡No puedes proponerte matrimonio a ti mismo!');
                return;
            }

            if (proposals[mentioned] && proposals[mentioned] === sender) {
                delete proposals[mentioned];
                let senderName = conn.getName(sender);
                let mentionedName = conn.getName(mentioned);

                marriages[sender] = mentioned;
                marriages[mentioned] = sender;
                saveMarriages(marriages);

                global.db.users[sender].partner = mentionedName;
                global.db.users[mentioned].partner = senderName;

                await conn.reply(
                    message.chat,
                    `✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩\n¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧\n\n*•.¸♡ Esposo/a @${sender.split('@')[0]} ♡¸.•*\n*•.¸♡ Esposo/a @${mentioned.split('@')[0]}*`,
                    message,
                    { mentions: [sender, mentioned] }
                );
            } else {
                let proposedTo = message.mentionedJid && message.mentionedJid[0] ? message.mentionedJid[0] : conn.user.jid;
                proposals[sender] = mentioned;

                await conn.reply(
                    message.chat,
                    `♡ @${proposedTo.split('@')[0]}, @${sender.split('@')[0]} te ha propuesto matrimonio, ¿aceptas?\n> ✐ Aceptar » *${usedPrefix + command}* @${sender.split('@')[0]}`,
                    message,
                    { mentions: [sender, proposedTo] }
                );
            }
            break;

        case isDivorceCommand:
            let divorcingUser = message.sender;
            if (!marriages[divorcingUser]) {
                await message.reply('✧ Tú no estás casado/a con nadie.');
                return;
            }

            let spouse = marriages[divorcingUser];
            delete marriages[divorcingUser];
            delete marriages[spouse];
            saveMarriages(marriages);

            global.db.users[divorcingUser].partner = '';
            global.db.users[spouse].partner = '';

            await conn.reply(
                message.chat,
                `✧ @${divorcingUser.split('@')[0]} y @${spouse.split('@')[0]} se han divorciado.`,
                message,
                { mentions: [divorcingUser, spouse] }
            );
            break;
    }
};

handler.help = ['marry', 'divorce'];
handler.tags = ['marry', 'divorce'];
handler.command = ['marry', 'divorce', 'divorciarse'];
handler.group = true;
handler.register = true;

export default handler;