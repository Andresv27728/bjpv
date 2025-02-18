import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) {
    let numcreador = '50488198573'; // Número del creador
    let ownerJid = `${numcreador}@s.whatsapp.net`;
    let name = conn.getName(ownerJid) || 'Deylin';
    let empresa = 'Deylin - Servicios Tecnológicos';

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numcreador}:${PhoneNumber('+' + numcreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
ADR:;;Dirección de tu empresa;;;;
END:VCARD`.trim();

    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: name, 
            contacts: [{ vcard }]
        } 
    }, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador2', 'dueño'];

export default handler;

// Código creado por Deyin