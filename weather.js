#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printError, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, EPARAMS } from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

const saveToken = async (token) => {
    if(!token.length) {
        printError('Не передан токен!')
        return;
    }
    try {
        await saveKeyValue(EPARAMS.TOKEN, token);
        printSuccess('Токен сохранен');
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if(!city.length) {
        printError('Не указан город!');
        return;
    }
    try{
        await saveKeyValue(EPARAMS.CITY, city);
        printSuccess('Город сохранен')
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try{
        const weather = await getWeather(process.env.CITY);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Не верно указан город')
        } else if (e?.response?.status == 401) {
            printError('Не верно указан токен')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if(args.h) {
        return printHelp();
    }
    if(args.s) {
        return saveCity(args.s);
    }
    if(args.t) {
       return saveToken(args.t);
    }
    return getForecast();
}

initCLI();