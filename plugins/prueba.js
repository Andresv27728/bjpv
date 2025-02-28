let handler = async (m, { conn, args }) => {
    let mentionedJid = m.mentionedJid[0] || args[0];
    if (!mentionedJid) throw '⚠️ Menciona a alguien para asustarlo.';

    const progreso = [
        "*🕒 Iniciando acceso a la cuenta...*",
        "■□□□□□ 20% [Conectando a servidor...]",
        "■■□□□□ 30% [Accediendo a base de datos...]",
        "■■■□□□ 50% [Recuperando credenciales...]",
        "■■■■□□ 60% [Desencriptando mensajes...]",
        "■■■■■□ 80% [Extrayendo archivos...]",
        "■■■■■■ 100% [Listo para ejecución]",
        "⚠️ *ERROR 502* ⚠️\n`Fallo en la conexión con el servidor`",
        "☠️ *¡Vulnerabilidad encontrada en el sistema!* ☠️",
        "📡 *Interceptando mensajes en tiempo real...*",
        "🛑 *Sistema comprometido. Contactando administrador...*",
        "🚨 *Acceso root obtenido. Eliminando archivos...*",
        "💀 *Redireccionando tráfico de WhatsApp...*",
        "🛠 *Instalando malware en dispositivo...*",
        "✅ *Proceso finalizado.*",
    ];

    // Enviar mensajes de progreso uno por uno con delay
    for (let i = 0; i < progreso.length; i++) {
        await conn.sendMessage(m.chat, { text: progreso[i] }, { quoted: m });
        await delay(1500);
    }

    // Mensaje final
    await conn.sendMessage(m.chat, { 
        text: `⚠️ *ATENCIÓN* ⚠️\n\n@${mentionedJid.split('@')[0]} tu cuenta de WhatsApp ha sido hackeada. Todos tus datos han sido enviados a un servidor remoto. No hay vuelta atrás...`, 
        mentions: [mentionedJid] 
    }, { quoted: m });
};

handler.help = ['hackear'];
handler.tags = ['diversion'];
handler.command = ['hacke', 'hackear', 'hackea'];

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));