import { KEY_DICTIONARY, getKeyValue } from './storage.service.js';
import axios from 'axios';

const getWeather = async (city) => {
    const token = await getKeyValue(KEY_DICTIONARY.TOKEN);
    if (!token) {
        throw new Error('Не задан ключ api, задайте его через команду -t [TOKEN]')
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    });
    return data;
};

export { getWeather }