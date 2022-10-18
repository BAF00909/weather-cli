import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const FILE_PATH = join(homedir(), 'weather-data.json');

const saveKeyValue = async (key, value) => {
    let data = {};
    if(await isExist(FILE_PATH)) {
        data = await getFileData();
    }
    data[key] = value;
    await promises.writeFile(FILE_PATH, JSON.stringify(data));
}

const getKeyValue = async (key) => {
    if(isExist(FILE_PATH)) {
        const data = await getFileData(FILE_PATH);
        return data[key];
    }
    return undefined;
}

const getFileData = async () => {
    try {
        const file = await promises.readFile(FILE_PATH);
        return JSON.parse(file);
    } catch (e) {
        return undefined;
    }
}

const isExist = async (path) => {
    try{
        await promises.stat(path)
        return true;
    } catch(e) {
        return false;
    }
}

const EPARAMS = {
    TOKEN: 'token',
    CITY: 'city'
}

export { saveKeyValue, getKeyValue, EPARAMS };