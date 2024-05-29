// help.js

const sendHelpMessage = (msg, category) => {
    let helpMessage = 'Comandos disponíveis:\n\n';

    if (!category || category === 'geral') {
        helpMessage += '!ping - responde pong\n' +
                       '@all - menciona todos os participantes (administradores apenas)\n' +
                       '!reminder <tempo> <mensagem> - define um lembrete\n' +
                       '!poll <pergunta> <opção1> <opção2> ... - cria uma enquete\n' +
                       '!help - exibe esta mensagem de ajuda\n\n';
                       '!weather <localização> - obtém a previsão do tempo para a localização\n' +
                       '!news - obtém as últimas notícias\n' +
                       '!translate <texto> <idioma> - traduz o texto para o idioma especificado\n';
    }

    if (!category || category === 'animes') {
        helpMessage += '!anime <nome do anime> - obtém informações sobre um anime específico\n' +
                       '!randomanime - obtém informações sobre um anime aleatório\n' +
                       '!character <nome do personagem> - obtém informações sobre um personagem de anime\n' +
                       '!randomcharacter - obtém informações sobre um personagem de anime aleatório\n' +
                       '!identifyanime - identifica o anime de uma cena enviada como imagem\n\n';
    }

    if (!category || category === 'administracao') {
        helpMessage += '!kick <usuário> - remove um usuário do grupo (administradores apenas)\n' +
                       '!promote <usuário> - promove um usuário a administrador (administradores apenas)\n' +
                       '!demote <usuário> - rebaixa um administrador a usuário (administradores apenas)\n\n';
    }

    msg.reply(helpMessage);
};

module.exports = {
    sendHelpMessage
};
