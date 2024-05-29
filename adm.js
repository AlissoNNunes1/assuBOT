// adm.js

const kickUser = async (msg) => {
    const contact = await msg.getContact();
    const chat = await msg.getChat();
    if (chat.isGroup && chat.participants.some(participant => participant.id._serialized === contact.id._serialized && participant.isAdmin)) {
        const userToKick = msg.body.split(' ')[1] + '@c.us';
        chat.removeParticipants([userToKick]);
        msg.reply(`Usuário removido: ${userToKick}`);
    } else {
        msg.reply('Apenas administradores podem usar este comando.');
    }
};

const promoteUser = async (msg) => {
    const contact = await msg.getContact();
    const chat = await msg.getChat();
    if (chat.isGroup && chat.participants.some(participant => participant.id._serialized === contact.id._serialized && participant.isAdmin)) {
        const userToPromote = msg.body.split(' ')[1] + '@c.us';
        chat.promoteParticipants([userToPromote]);
        msg.reply(`Usuário promovido: ${userToPromote}`);
    } else {
        msg.reply('Apenas administradores podem usar este comando.');
    }
};

const demoteUser = async (msg) => {
    const contact = await msg.getContact();
    const chat = await msg.getChat();
    if (chat.isGroup && chat.participants.some(participant => participant.id._serialized === contact.id._serialized && participant.isAdmin)) {
        const userToDemote = msg.body.split(' ')[1] + '@c.us';
        chat.demoteParticipants([userToDemote]);
        msg.reply(`Usuário rebaixado: ${userToDemote}`);
    } else {
        msg.reply('Apenas administradores podem usar este comando.');
    }
};

module.exports = {
    kickUser,
    promoteUser,
    demoteUser
};
