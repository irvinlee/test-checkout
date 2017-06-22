export const moneyFormat = (price = 0) => {
  let val = parseFloat(Math.round(price * 100) / 100).toFixed(2);

  return '$' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
