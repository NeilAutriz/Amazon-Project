import {moneyCurrency} from '../../scripts/utils/money.js'

describe('Test Suite: Money Currency', () => {
    it('Converts the Centavos into Peso', () => {
        expect(moneyCurrency(2095)).toEqual('20.95')
    });

    it('Converts 0', () => {
        expect(moneyCurrency(0)).toEqual('0.00');
    })

    it('Rounds to the nearest hundredth', () => {
        expect(moneyCurrency(2000.5)).toEqual('20.01');
    })

})