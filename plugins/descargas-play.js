import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `${emoji} Por favor ingresa la música que deseas descargar.`;

  const isVideo = /vid|2|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  const body = `「🏓↛ძᥱsᥴᥲrgᥲᥒძ᥆ *<${videoInfo.title}>*\n\n> 🌷↛ ᥴᥲᥒᥲᥣ » *${videoInfo.author.name || 'Desconocido'}*\n*°♫彡｡.:・¤ﾟ♫彡｡.:・¤ﾟ♫彡°*\n> 🍡↛ ᥎іs𝗍ᥲs » *${videoInfo.views}*\n*°♫彡｡.:・¤ﾟ♫彡｡.:・¤ﾟ♫彡°*\n> 🌕↛ ძᥙrᥲᥴі᥆ᥒ » *${videoInfo.timestamp}*\n*°♫彡｡.:・¤ﾟ♫彡｡.:・¤ﾟ♫彡°*\n> 🏔️↛ ⍴ᥙᑲᥣіᥴᥲძ᥆ » *${videoInfo.ago}*\n*°♫彡｡.:・¤ﾟ♫彡｡.:・¤ﾟ♫彡°*\n> ⚡↛ ᥣіᥒk » ${videoInfo.url}\n`;

  if (command === 'play' || command === 'play2' || command === 'playvid') {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: dev,
      buttons: [
        {
          buttonId: `.yta ${videoInfo.url}`,
          buttonText: {
            displayText: '🌷 𝑨𝒖𝒅𝒊𝒐',
          },
        },
        {
          buttonId: `.ytv ${videoInfo.url}`,
          buttonText: {
            displayText: '🍡 𝑽𝒊𝒅𝒆𝒐',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: fkontak });
    m.react('🕒');

  } else if (command === 'yta' || command === 'ytmp3') {
    m.react(rwait);
    let audio;
    try {
      audio = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp3&apikey=Gata-Dios`)).json();
    } catch (error) {
      try {
        audio = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${videoInfo.url}`)).json();
      } catch (error) {
        audio = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${videoInfo.url}`)).json();
      }
    }
    
    if (!audio.data || !audio.data.url) throw "No se pudo obtener el audio.";
    conn.sendFile(m.chat, audio.data.url, videoInfo.title, '', m, null, { mimetype: "audio/mpeg", asDocument: false });
    m.react(done);
  
  } else if (command === 'ytv' || command === 'ytmp4') {
    m.react(rwait);
    let video;
    try {
      video = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp4&apikey=Gata-Dios`)).json();
    } catch (error) {
      try {
        video = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${videoInfo.url}`)).json();
      } catch (error) {
        video = await (await fetch(`https://api.vreden.my.id/api/ytmp4?url=${videoInfo.url}`)).json();
      }
    }
    
    if (!video.data || !video.data.url) throw "No se pudo obtener el video.";
    await conn.sendMessage(m.chat, {
      video: { url: video.data.url },
      mimetype: "video/mp4",
      caption: ``,
    }, { quoted: m });
    m.react(done);
  
  } else {
    throw "Comando no reconocido.";
  }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.register = true;

export default handler;

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).*/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};



/*global.play = {};
import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `${emoji} Por favor ingresa la música que deseás descargar.`;

  const isVideo = /vid|2|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  const body = `「✦」ძᥱsᥴᥲrgᥲᥒძ᥆ *<${videoInfo.title}>*\n\n> ✦ ᥴᥲᥒᥲᥣ » *${videoInfo.author.name || 'Desconocido'}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ✰ ᥎іs𝗍ᥲs » *${videoInfo.views}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ⴵ ძᥙrᥲᥴі᥆ᥒ » *${videoInfo.timestamp}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> ✐ ⍴ᥙᑲᥣіᥴᥲძ᥆ » *${videoInfo.ago}*\n*°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°*\n> 🜸 ᥣіᥒk » ${videoInfo.url}\n`;
  
  if (Object.keys(global.play).length >= 100) global.play = {};
  
    if (command === 'play' || command === 'play2' || command === 'playvid') {
      let msg = await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: dev,
      buttons: [
        {
          buttonId: `.ytmp3 ${videoInfo.url}`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ᥲᥙძі᥆',
          },
        },
        {
          buttonId: `.ytmp4 ${videoInfo.url}`,
          buttonText: {
            displayText: 'ᯓᡣ𐭩 ᥎іძᥱ᥆',
          },
        },
      ],
      viewOnce: true,
      headerType: 4,
    }, { quoted: fkontak });
    m.react('🕒');
    
    global.play[msg.key.id] = { url: videoInfo.url };

    } else if (command === 'yta' || command === 'ytmp3') {
    m.react(rwait)
      let audio = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp3&apikey=Gata-Dios`)).json()
      
      conn.sendFile(m.chat, audio.data.url, videoInfo.title, '', m, null, { mimetype: "audio/mpeg", asDocument: false })
    m.react(done)
    } else if (command === 'ytv' || command === 'ytmp4') {
    m.react(rwait)
      let video = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${videoInfo.url}&type=mp4&apikey=Gata-Dios`)).json()
    await conn.sendMessage(m.chat, {
      video: { url: video.data.url },
      mimetype: "video/mp4",
      caption: ``,
    }, { quoted: m });
    m.react(done)
    } else {
      throw "Comando no reconocido.";
    }
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['dl'];
handler.group = true;
handler.register = true;

export default handler;

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11}).;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};*/
