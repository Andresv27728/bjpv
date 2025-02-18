
import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) {
    // Número del creador
    let numcreador = '50488198573'; // Número del creador
    let ownerJid = `numcreador@s.whatsapp.net`;

    // Obtener el nombre del creador o usar un nombre predeterminado
    let name = conn.getName(ownerJid) || 'Deylin'; 
    let empresa = 'Deylin - Servicios Tecnológicos';

    // Crear la vCard con la información del creador
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;{name};;;
FN:name
ORG:{empresa};
TITLE:CEO & Fundador
TEL;waid=numcreador:{PhoneNumber('+' + numcreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-ABLabel:Dirección Web
X-ABLabel:Correo Electrónico
X-ABLabel:Teléfono de contacto
END:VCARD`.trim();

    // Enviar el mensaje con la vCard del creador
    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: name, 
            contacts: [{ vcard }]
        } 
    }, { quoted: m });
}

// Comandos asociados al handler
handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador2', 'dueño'];

export default handler;