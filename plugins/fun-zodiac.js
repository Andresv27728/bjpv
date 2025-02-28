let handler = (m, { usedPrefix, command, text, conn }) => {
    let mentionedJid = m.mentionedJid[0] || text;
    if (!mentionedJid) return conn.reply(m.chat, `⚠️ Menciona a alguien para asustarlo.\nEjemplo: ${usedPrefix + command} @usuario`, m);

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
    const enviarMensajes = async () => {
        for (let i = 0; i < progreso.length; i++) {
            await conn.reply(m.chat, progreso[i], m);
            await delay(1500);
        }

        // Mensaje final
        conn.reply(m.chat, `⚠️ *ATENCIÓN* ⚠️\n\n@${mentionedJid.replace(/@s.whatsapp.net/g, '')} tu cuenta de WhatsApp ha sido hackeada. Todos tus datos han sido enviados a un servidor remoto. No hay vuelta atrás...`, m, {
            mentions: [mentionedJid]
        });
    };

    enviarMensajes();
};

handler.help = ['asustar @usuario'];
handler.tags = ['diversion'];
handler.command = ['asustar', 'hackear'];

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));