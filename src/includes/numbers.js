/**
 * @param {number} num
 * @param fractionDigits
 * @returns {number}
 */
export const toNumber = (num, fractionDigits = 2) => {
    const fixedExchangeRate = Number(num).toFixed(fractionDigits);
    return Number(fixedExchangeRate);
}

/**
 * @returns {number}
 */
export const getNowSeconds = () => {
    return Date.now() / 1000;
}