const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

// Definir las variables no definidas
const packname = 'Mi Paquete'; // Cambia esto por el nombre de tu paquete
const dev = 'Desarrollador'; // Cambia esto por el nombre del desarrollador
const channel = 'https://example.com'; // Cambia esto por la URL de tu canal

var handler = async (m, { conn, text }) => {
    await conn.sendMessage(m.chat, { 
        text: '🍭 Buscando un facto, espere un momento...', 
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: packname || 'Título por defecto',
                body: dev || 'Desarrollador por defecto',
                previewType: 0,
                thumbnail: null,
                sourceUrl: channel || null
            }
        }
    });

    const randomFact = pickRandom(global.factos);

    const templateButtons = [
        { index: 1, quickReplyButton: { displayText: '😻 Gato', id: '.imgg gato' } },
        { index: 2, quickReplyButton: { displayText: '🐶 Perro', id: '.imgg perro' } }
    ];

    const buttonMessage = {
        text: `*📌 Facto:* \n\n"${randomFact}"\n\nElige una opción:`,
        footer: '🤖 Kirito-Bot',
        templateButtons: templateButtons
    };

    await conn.sendMessage(m.chat, buttonMessage);
};

handler.help = ['facto'];
handler.tags = ['fun'];
handler.command = ['facto'];
handler.fail = null;
handler.exp = 0;
handler.register = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

// Definir el array global de factos
global.factos = [
    "Eres la razón por la que hay instrucciones en los champús.",
    "Si fueras un libro, serías el que nadie quiere leer.",
    "Tu vida es como un programa de televisión que nadie ve.",
    "Eres como un error tipográfico: solo estás ahí para arruinarlo todo.",
    "Si fueras un producto, serías el que está en oferta porque no se vende.",
    "Eres un recordatorio de lo que no se debe hacer en la vida.",
    "Tu existencia es tan relevante como un archivo en la papelera de reciclaje.",
    "Si fueras un plato, serías uno que nadie quiere probar.",
    "Eres la razón por la que los hombres tienen miedo de comprometerse.",
    "Tu personalidad es como un antivirus: nadie lo quiere instalar.",
    "Eres la prueba de que la selección natural puede fallar.",
    "Si fueras un color, serías el gris: aburrido y sin vida.",
    "Tu vida es como una mala película: nadie quiere ver el final.",
    "Eres como un mal chiste: siempre haces que la gente se sienta incómoda.",
    "Si fueras un animal, serías la mascota que nadie quiere adoptar.",
    "Tu sentido del humor es como un mal Wi-Fi: no tiene conexión.",
    "Eres como una planta marchita: solo ocupas espacio.",
    "Si fueras un virus informático, serías uno que causa más problemas que soluciones.",
    "Tu imagen es la razón por la que los espejos están cubiertos.",
    "Eres el ejemplo perfecto de cómo no vivir la vida.",
    "Si fueras un día de la semana, serías un lunes: todos te odian.",
    "Eres la razón por la que las personas no creen en el amor verdadero.",
    "Tu vida es un meme, pero nadie se ríe.",
    "Si fueras una aplicación, serías una que nadie quiere descargar.",
    "Eres como una sombra: siempre estás ahí, pero no eres bienvenido.",
    "Tu cerebro es como un disco duro lleno: no puede almacenar más.",
    "Eres como un tren descarrilado: solo causan caos.",
    "Si fueras un clima, serías una tormenta: oscuro y destructivo.",
    "Eres como una cadena de mensajes: nadie te quiere, pero todos te reciben.",
    "Tu vida es como un rompecabezas con piezas que nunca encajan.",
    "Si fueras una película, serías una secuela que nadie pidió.",
    "Eres la razón por la que los gatos miran fijamente a la nada.",
    "Si fueras un meme, serías uno que nadie comparte.",
    "Tu vida es como un spoiler: nadie quiere saber cómo termina.",
    "Eres como una contraseña débil: fácil de olvidar.",
    "Si fueras un postre, serías uno sin azúcar.",
    "Eres como una nube: siempre estás ahí, pero no sirves para nada.",
    "Tu vida es como un error 404: no se encuentra.",
    "Si fueras un deporte, serías uno que nadie practica.",
    "Eres como una canción mal cantada: todos quieren que pares.",
    "Tu vida es como un mal sueño: todos quieren despertar.",
    "Si fueras un videojuego, serías uno que nadie juega.",
    "Eres como una película de terror: todos quieren evitarte.",
    "Tu vida es como un mal restaurante: nadie quiere volver.",
    "Si fueras un libro, serías uno que nadie recomienda.",
    "Eres como una película sin final: todos se aburren.",
    "Tu vida es como un mal chiste: nadie se ríe.",
    "Si fueras un día festivo, serías uno que nadie celebra.",
    "Eres como una mala señal de tráfico: todos te ignoran.",
    "Tu vida es como un mal café: nadie lo quiere tomar.",
    "Si fueras un superhéroe, serías uno sin poderes.",
    "Eres como una mala película: todos quieren salir del cine."
];