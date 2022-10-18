import axios from 'axios';
import { getKeyValue, EPARAMS } from './storage.service.js';

const getIcon = (icon) => {
    switch (icon.slice(0,-1)) {
        case '01': 
            return '🌞';
        case '02': 
            return '⛅';
        case '03' :
            return '☁️';
        case '04' :
            return '☁️';
        case '09' :
            return '🌧️';
        case '10' :
            return '🌦️';
        case '11' :
            return '⛈️';
        case '13' :
            return '🌨️';
        case '50' :
            return '🌫️';
    }
}

const getWeather = async () => {
    const token = process.env.TOKEN ?? await getKeyValue(EPARAMS.TOKEN);
    const city = process.env.CITY ?? await getKeyValue(EPARAMS.CITY);
    if(!token) {
        throw new Error('Не задан ключ api, задайте его через команду -t [API_KEY]');
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather',{
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metrics'
        }
    });
    return data;
}

export {getWeather, getIcon};

