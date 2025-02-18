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
END:VCARD`.trim();

    let businessProfile = {
        contacts: [{
            vcard
        }],
        businessProfile: {
            name: name,
            description: "Bienvenid@ al perfil de Deylin",
            website: ["https://www.tuempresa.com"], // Agrega tu sitio web si tienes
            email: "correo@empresa.com", // Agrega tu correo si deseas
            address: "Dirección de tu empresa",
        }
    };

    await conn.sendMessage(m.chat, businessProfile, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;

// Código creado por deylibaquedano801@gmail.com