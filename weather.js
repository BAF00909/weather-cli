#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { outputWeather } from './services/output.service.js';
import { saveKeyValue, KEY_DICTIONARY, getKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен');
        return;
    }
    try {
        await saveKeyValue(KEY_DICTIONARY.TOKEN, token);
        printSuccess('Токен сохранен');
    } catch (error) {
        printError(error);
    }
}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город');
        return;
    }
    try {
        await saveKeyValue(KEY_DICTIONARY.CITY, city);
        return;
    } catch (error) {
        printError(error);
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(KEY_DICTIONARY.CITY);
        const weather = await getWeather(city);
        outputWeather(weather);
    } catch (error) {
        if (error?.response?.status == 404) {
            printError('Не верно указан город');
        } else if (error?.response?.status == 401) {
            printError('Не верно указан токен');
        } else {
            printError(error.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForcast();
};

initCLI();