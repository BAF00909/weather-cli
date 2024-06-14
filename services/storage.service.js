import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const FILE_PATH = join(homedir(), 'weather-data.json');

const KEY_DICTIONARY = {
    TOKEN: 'token',
    CITY: 'city'
}

const saveKeyValue = async (key, value) => {
    let data = {};

    if (await isExist(FILE_PATH)) {
        const file = await promises.readFile(FILE_PATH);
        data = JSON.parse(file);
    }

    data[key] = value;
    await promises.writeFile(FILE_PATH, JSON.stringify(data));
};

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (error) {
        return false;
    }
}

const getKeyValue = async (key) => {
    if (await isExist(FILE_PATH)) {
        const file = await promises.readFile(FILE_PATH);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
}

export { saveKeyValue, getKeyValue, KEY_DICTIONARY }