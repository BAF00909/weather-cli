const convertTemp = (temp) => {
    return `${Math.floor(Number(temp) - 273.15)}°C`;
}
export { convertTemp };