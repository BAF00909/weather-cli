#!/usr/bin/env node
import { getArgs } from './helpers/args.js';

const initCLI = () => {
    const args = getArgs(process.argv)
    console.log(args);
    if (args.h) {
        console.log('help');
    }
    if (args.s) {
        console.log('city saved');
    }
    if (args.t) {
        console.log('token saved');
    }
};

initCLI();