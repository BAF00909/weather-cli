import chalk from 'chalk';
import dedent from 'dedent';
import { convertTemp } from '../helpers/temperature.js';

const printError = (error) => {
    console.log(`${chalk.bgRed(' ERROR ')}: ${error}`);
}

const printSuccess = (message) => {
    console.log(`${chalk.bgGreen(' SUCCESS ')}: ${message}`);
}

const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] - для установки города
        -h для вывода помощи
        -t [API_KEY] лдя установки токена`)
        );
}

const printWeather = (res, icon) => {
    console.log(
        dedent(`${chalk.bgYellow(' Weather ')} Погода в городе ${res.name}
        ${icon} ${res.weather[0].description}
        Температура: ${convertTemp(res.main.temp)} (ощущается как ${convertTemp(res.main.feels_like)}) 
        Влажность: ${res.main.humidity}%
        Скорость ветра: ${res.wind.speed}m/c
        `));
}

export {printError, printSuccess, printHelp, printWeather};