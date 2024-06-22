
export function moneyCurrency(priceInCents){
    return (Math.round(priceInCents)/100).toFixed(2);
}