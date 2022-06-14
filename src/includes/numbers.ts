export const toNumber = (num: string, fractionDigits = 2) => {
  const fixedExchangeRate = Number(num).toFixed(fractionDigits);
  return Number(fixedExchangeRate);
}

export const getNowSeconds = (): number => {
  return Date.now() / 1000;
}
