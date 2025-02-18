import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) { 
    let numcreador = '50488198573';
    let ownerJid = numcreador + '@s.whatsapp.net';

    // Obtener el nombre del creador
    let name = await conn.getName(ownerJid) || 'Deylin'; 

    // Obtener la descripción de la empresa desde el perfil de WhatsApp
    let about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || 'Descripción no disponible';

    let empresa = 'Deylin - Servicios Tecnológicos';

    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numcreador}:${new PhoneNumber('+' + numcreador).getNumber('international')}
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
NOTE:${about}
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-ABLabel:Dirección Web
X-ABLabel:Correo Electrónico
X-ABLabel:Teléfono de contacto
X-WA-BIZ-NAME:${empresa}
X-WA-BIZ-DESCRIPTION:${about}
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