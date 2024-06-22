import {moneyCurrency} from '../scripts/utils/money.js'

console.log('Test Suite Money Currency')
console.log('Converts the centavos into peso.')
if(moneyCurrency(2095) === "20.95"){
    console.log('Test passed');
} else {
    console.log(`Test failed ${moneyCurrency(2095)}`);
}

console.log('Converts the 0.')
if(moneyCurrency(0) === '0.00'){
    console.log('Test Passed');
} else {
    console.log(`Test failed ${moneyCurrency(0)}`);
}

console.log('Rounds to the nearest hundredths')
if(moneyCurrency(2000.5) === '20.01'){
    console.log('Test Passed');
} else {
    console.log(`Test failed ${moneyCurrency(2000.5)}`);
}
