
const getArgs = (argv) => {
    const conf = {};
    const [executor, file, ...rest] = argv;
    rest.forEach((value, index, array) => {
        if (value.charAt(0) === '-') {
            if (index === array.length - 1) {
                conf[value.substring(1)] = true;
            } else if (array[index + 1].charAt(0) !== '-') {
                conf[value.substring(1)] = array[index + 1];
            } else {
                conf[value.substring(1)] = true;
            }
        }
    });
    return conf;
};

export {
    getArgs
}