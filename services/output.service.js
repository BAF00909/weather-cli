import chalk from "chalk";
import dedent from "dedent-js";

const getWeatherIcon = (status) => {
    switch(status) {
        case 'Rain': return '🌧️';
        case 'Clouds': return '⛅';
        case 'Snow': return '🌨️';
        case 'Clear': return '☀️';
        case 'Thunderstorm': return '⛈️';
        case 'Mist': return '🌫️';
        default: return '⛅';
    }
}

const outputWeather = (weather) => {
    console.log(dedent(
        `
            ${chalk.bgCyan(weather.name)}
            Погода: ${weather.weather[0].description} ${getWeatherIcon(weather.weather[0].main)}
            🌡️ Температура воздуха: ${Math.floor(weather.main.temp)}°C
            Ощущается как: ${Math.floor(weather.main.feels_like)}°C
            Ветер: ${weather.wind.speed}м/с
        `
    ));
}

export { outputWeather };