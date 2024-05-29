const { Client, LocalAuth , MessageType } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { setReminder, createPoll, getWeather, getNews, translateText } = require('./utils');
const { kickUser, promoteUser, demoteUser } = require('./adm');
const { sendHelpMessage } = require('./help');
const { getAnimeInfo, getRandomAnime, getCharacterInfo,identifyAnime,getRandomCharacter } = require('./anime');

const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
    authStrategy: new LocalAuth({
        dataPath: 'sessions'
    })
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    // Responder a '!ping'
    console.log(msg.body);
    if (msg.body === '!ping') {
        msg.reply('pong');
    }

    // Processar menções e avisar quem foi mencionado
    const mentions = await msg.getMentions();
    for (let user of mentions) {
        console.log(`${user.pushname} was mentioned`);
    }

    // Mencionar todos os participantes do chat, apenas se o remetente for administrador
    if (msg.body === '@all') {
        const chat = await msg.getChat();

        // Verificar se o remetente é administrador
        const sender = await msg.getContact();
        const isAdmin = chat.participants.some(participant => 
            participant.id._serialized === sender.id._serialized && participant.isAdmin
        );

        if (isAdmin) {
            let text = '';
            let mentions = [];

            for (let participant of chat.participants) {
                mentions.push(`${participant.id.user}@c.us`);
                text += `@${participant.id.user} `;
            }

            await chat.sendMessage(text, { mentions });
        } else {
            msg.reply('Somente administradores podem mencionar todos os participantes.');
        }
    }

    // Comando !reminder
    if (msg.body.startsWith('!reminder ')) {
        const [time, ...reminderMsg] = msg.body.split(' ').slice(1);
        const reminderText = reminderMsg.join(' ');
        await setReminder(msg, time, reminderText);
    }

    // Comando !poll
    if (msg.body.startsWith('!poll ')) {
        const args = msg.body.split(' ').slice(1);
        const question = args[0];
        const options = args.slice(1);
        createPoll(msg, question, options);
    }
    // Comando !weather
    if (msg.body.startsWith('!weather ')) {
        const location = msg.body.split(' ').slice(1).join(' ');
        await getWeather(msg, location);
    }

    // Comando !news
    if (msg.body === '!news') {
        await getNews(msg);
    }

    // Comando !translate
    if (msg.body.startsWith('!translate ')) {
        const [text, targetLang] = msg.body.split(' ').slice(1);
        await translateText(msg, text, targetLang);
    }
    // Comandos exclusivos para administradores
    if (msg.body.startsWith('!kick ')) {
      await kickUser(msg);
  }

  if (msg.body.startsWith('!promote ')) {
      await promoteUser(msg);
  }

  if (msg.body.startsWith('!demote ')) {
      await demoteUser(msg);
  }
// Comando !help
if (msg.body.startsWith('!help')) {
  const category = msg.body.split(' ')[1];
  sendHelpMessage(msg, category);
}

// Comando !anime
if (msg.body.startsWith('!anime ')) {
  const animeName = msg.body.split(' ')[1];
  await getAnimeInfo(msg, animeName);
}
// Comando !randomanime
if (msg.body === '!randomanime') {
  await getRandomAnime(msg);
}
// Comando !character
if (msg.body.startsWith('!character ')) {
  const characterName = msg.body.split(' ')[1];
  await getCharacterInfo(msg, characterName);
}
// Comando !randomcharacter
if (msg.body === '!randomcharacter') {
  await getRandomCharacter(msg);
}
// Comando !identifyanime
if (msg.hasQuotedMsg && msg.body === '!identifyanime') {
  const quotedMsg = await msg.getQuotedMessage();
  const image = await quotedMsg.downloadMedia();
  await identifyAnime(msg, image);
}

});

client.initialize();
