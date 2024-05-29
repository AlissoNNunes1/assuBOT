// utils.js
const fs = require('fs');
const { MessageType } = require('whatsapp-web.js');

//comando !reminder
const setReminder = async (msg, time, reminderText) => {
    setTimeout(() => {
        msg.reply(`Lembrete: ${reminderText}`);
    }, parseInt(time) * 1000); // Tempo em segundos
    msg.reply(`Lembrete definido para ${time} segundos.`);
};
//comando !poll
const createPoll = (msg, question, options) => {
    let pollText = `Enquete: ${question}\n`;
    options.forEach((option, index) => {
        pollText += `${index + 1}. ${option}\n`;
    });
    msg.reply(pollText);
};
// Comando !weather
const getWeather = async (msg, location) => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${encodeURIComponent(location)}`);
        const data = await response.json();
        if (data) {
            const weatherInfo = `Previsão do tempo para ${data.location.name}, ${data.location.region}, ${data.location.country}:\n` +
                                `Temperatura: ${data.current.temp_c}°C\n` +
                                `Condição: ${data.current.condition.text}\n` +
                                `Humidade: ${data.current.humidity}%\n` +
                                `Vento: ${data.current.wind_kph} km/h\n`;
            msg.reply(weatherInfo);
        } else {
            msg.reply('Localização não encontrada.');
        }
    } catch (error) {
        console.error('Erro ao obter a previsão do tempo:', error);
        msg.reply('Ocorreu um erro ao obter a previsão do tempo. Por favor, tente novamente mais tarde.');
    }
};

// Comando !news
const getNews = async (msg) => {
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=br&apiKey=YOUR_API_KEY');
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
            let newsText = 'Últimas notícias:\n';
            data.articles.slice(0, 5).forEach((article, index) => {
                newsText += `${index + 1}. ${article.title} - ${article.source.name}\n`;
                newsText += `${article.url}\n\n`;
            });
            msg.reply(newsText);
        } else {
            msg.reply('Não foram encontradas notícias.');
        }
    } catch (error) {
        console.error('Erro ao obter as notícias:', error);
        msg.reply('Ocorreu um erro ao obter as notícias. Por favor, tente novamente mais tarde.');
    }
};

// Comando !translate
const translateText = async (msg, text, targetLang) => {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pt|${targetLang}`);
        const data = await response.json();
        if (data.responseData) {
            msg.reply(`Tradução: ${data.responseData.translatedText}`);
        } else {
            msg.reply('Não foi possível traduzir o texto.');
        }
    } catch (error) {
        console.error('Erro ao traduzir o texto:', error);
        msg.reply('Ocorreu um erro ao traduzir o texto. Por favor, tente novamente mais tarde.');
    }
};
// Comando !currency
const convertCurrency = async (msg, amount, fromCurrency, toCurrency) => {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.rates[toCurrency]) {
            const convertedAmount = amount * data.rates[toCurrency];
            msg.reply(`Conversão: ${amount} ${fromCurrency} é igual a ${convertedAmount.toFixed(2)} ${toCurrency}`);
        } else {
            msg.reply('Moeda inválida.');
        }
    } catch (error) {
        console.error('Erro ao converter moeda:', error);
        msg.reply('Ocorreu um erro ao converter a moeda. Por favor, tente novamente mais tarde.');
    };
// Comando !movie
const searchMovie = async (msg, movieName) => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=YOUR_API_KEY`);
            const data = await response.json();
    
            if (data.Response === 'True') {
                const movieInfo = `Título: ${data.Title}\nAno: ${data.Year}\nGênero: ${data.Genre}\nSinopse: ${data.Plot}\nAvaliação: ${data.imdbRating}\nMais informações: ${data.imdbID}`;
                msg.reply(movieInfo);
            } else {
                msg.reply('Filme não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar filme:', error);
            msg.reply('Ocorreu um erro ao buscar o filme. Por favor, tente novamente mais tarde.');
        }
    };
// Comando !book
const searchBook = async (msg, bookName) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookName)}&key=YOUR_API_KEY`);
            const data = await response.json();
    
            if (data.items && data.items.length > 0) {
                const book = data.items[0].volumeInfo;
                const bookInfo = `Título: ${book.title}\nAutor(es): ${book.authors.join(', ')}\nPublicado em: ${book.publishedDate}\nSinopse: ${book.description}\nMais informações: ${book.infoLink}`;
                msg.reply(bookInfo);
            } else {
                msg.reply('Livro não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar livro:', error);
            msg.reply('Ocorreu um erro ao buscar o livro. Por favor, tente novamente mais tarde.');
        }
    };
};
// Comando !meme    
const generateMeme = async (msg, template, topText, bottomText) => {
    try {
        const response = await fetch(`https://api.imgflip.com/caption_image?template_id=${template}&text0=${encodeURIComponent(topText)}&text1=${encodeURIComponent(bottomText)}&username=YOUR_IMGFLIP_USERNAME&password=YOUR_IMGFLIP_PASSWORD`);
        const data = await response.json();

        if (data.success) {
            msg.reply(`Aqui está seu meme: ${data.data.url}`);
        } else {
            msg.reply('Erro ao gerar meme.');
        }
    } catch (error) {
        console.error('Erro ao gerar meme:', error);
        msg.reply('Ocorreu um erro ao gerar o meme. Por favor, tente novamente mais tarde.');
    }
};

module.exports = {
    setReminder,
    createPoll,
    getWeather,
    getNews,
    translateText,
    convertCurrency,
    searchMovie,
    searchBook,
    generateMeme
};
