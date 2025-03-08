
let handler = async (m, { conn, text }) => {
    let amount = parseInt(text.trim());

    if (isNaN(amount) || amount <= 0) {
        return conn.reply(m.chat, `${emoji} Por favor, ingrese una cantidad válida de ${moneda}.`, m);
    }

    let code = Math.random().toString(36).substring(2, 10).toUpperCase();

    if (!global.db.data.codes) global.db.data.codes = {};
    global.db.data.codes[code] = { coin: amount, claimedBy: [] };

    conn.reply(m.chat, `${emoji} Código generado: *${code}*\nEste código puede ser canjeado por ${amount} ${moneda} y puede ser utilizado por 50 personas.`, m);
}

handler.help = ['codigo <cantidad de llamas>'];
handler.tags = ['owner'];
handler.command = ['código']
handler.rowner = true;

export default handler;
