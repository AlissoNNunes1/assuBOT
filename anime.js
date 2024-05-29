// anime.js

const fetch = require('node-fetch');

const identifyAnime = async (msg, imageUrl) => {
    try {
        const response = await fetch(`https://trace.moe/api/search?url=${encodeURIComponent(imageUrl)}`);
        const data = await response.json();

        if (data.docs.length > 0) {
            const animeInfo = data.docs[0];
            const title = animeInfo.title_romaji || animeInfo.title_english || animeInfo.title_native;
            const episode = animeInfo.episode;
            const similarity = (animeInfo.similarity * 100).toFixed(2);
            const similarityMessage = `Similarity: ${similarity}%`;

            msg.reply(`Essa cena é de ${title}, Episodio ${episode}. ${similarityMessage}`);
        } else {
            msg.reply('Não achamos nenhum anime com essa cena .');
        }
    } catch (error) {
        console.error('Error identifying anime:', error);
        msg.reply('Ocorreu um erro ao identificar o anime. Por favor, tente novamente mais tarde.');
    }
};

const getCharacterInfo = async (msg, characterName) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v3/search/character?q=${encodeURIComponent(characterName)}&limit=1`);
        const data = await response.json();

        if (data.results.length > 0) {
            const character = data.results[0];
            const characterInfo = `Nome: ${character.name}\nAnime: ${character.anime[0].name}\nMais informações: ${character.url}`;
            msg.reply(characterInfo);
        } else {
            msg.reply('Personagem não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao obter informações do personagem:', error);
        msg.reply('Ocorreu um erro ao obter informações do personagem. Por favor, tente novamente mais tarde.');
    }
}

const getAnimeInfo = async (msg, animeName) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(animeName)}&limit=1`);
        const data = await response.json();

        if (data.results.length > 0) {
            const anime = data.results[0];
            const animeInfo = `Título: ${anime.title}\nEpisódios: ${anime.episodes}\nNota: ${anime.score}\nSinopse: ${anime.synopsis}\nMais informações: ${anime.url}`;
            msg.reply(animeInfo);
        } else {
            msg.reply('Anime não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao obter informações do anime:', error);
        msg.reply('Ocorreu um erro ao obter informações do anime. Por favor, tente novamente mais tarde.');
    }
};

const getRandomAnime = async (msg) => {
    try {
        const response = await fetch('https://api.jikan.moe/v3/top/anime/1');
        const data = await response.json();

        if (data.top.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.top.length);
            const randomAnime = data.top[randomIndex];
            const animeInfo = `Título: ${randomAnime.title}\nEpisódios: ${randomAnime.episodes}\nNota: ${randomAnime.score}\nMais informações: ${randomAnime.url}`;
            msg.reply(animeInfo);
        } else {
            msg.reply('Nenhum anime encontrado.');
        }
    } catch (error) {
        console.error('Erro ao obter informações do anime aleatório:', error);
        msg.reply('Ocorreu um erro ao obter informações do anime aleatório. Por favor, tente novamente mais tarde.');
    }
};
const getRandomCharacter = async (msg, animeName) => {
    try {
        // Obter informações do anime
        const animeResponse = await fetch(`https://api.jikan.moe/v3/search/anime?q=${encodeURIComponent(animeName)}&limit=1`);
        const animeData = await animeResponse.json();

        if (animeData.results.length > 0) {
            const anime = animeData.results[0];
            const animeId = anime.mal_id;

            // Obter informações dos personagens do anime
            const charactersResponse = await fetch(`https://api.jikan.moe/v3/anime/${animeId}/characters_staff`);
            const charactersData = await charactersResponse.json();

            if (charactersData.characters.length > 0) {
                // Selecionar um personagem aleatório
                const randomIndex = Math.floor(Math.random() * charactersData.characters.length);
                const randomCharacter = charactersData.characters[randomIndex];

                const characterInfo = `Name: ${randomCharacter.name}\nRole: ${randomCharacter.role}\nMore info: ${randomCharacter.url}`;
                msg.reply(characterInfo);
            } else {
                msg.reply('No characters found for this anime.');
            }
        } else {
            msg.reply('Anime not found.');
        }
    } catch (error) {
        console.error('Error getting random character:', error);
        msg.reply('An error occurred while getting random character. Please try again later.');
    }
};


module.exports = {
    getAnimeInfo,
    getRandomAnime,
    getCharacterInfo,
    identifyAnime,
    getRandomCharacter
};
