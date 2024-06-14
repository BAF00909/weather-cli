#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue, KEY_DICTIONARY } from './services/storage.service.js';

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

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.s) {
        saveKeyValue(KEY_DICTIONARY.CITY, args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    
};

initCLI();