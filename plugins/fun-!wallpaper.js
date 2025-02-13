const axios = require('axios');

async function wallpaperCommand(client, message, args) {
    const query = args.length > 0 ? args.join(" ") : "anime";
    const apiKey = "TU_API_KEY_DE_PEXELS";
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;

    try {
        const response = await axios.get(url, { headers: { Authorization: apiKey } });
        if (response.data.photos.length > 0) {
            const imageUrl = response.data.photos[0].src.original;
            await client.sendMessage(message.from, { image: { url: imageUrl }, caption: `Aquí tienes tu wallpaper de ${query}` });
        } else {
            await client.sendMessage(message.from, { text: "No encontré imágenes para esa categoría." });
        }
    } catch (error) {
        console.error("Error al obtener wallpaper:", error);
        await client.sendMessage(message.from, { text: "Ocurrió un error al buscar el wallpaper." });
    }
}

handler.tags = ['fun'];
handler.help = ['wallpaper *[categoría]*'];
handler.command = ['wallpaper'];
handler.group = true;

export default handler;