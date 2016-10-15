/* eslint import/no-extraneous-dependencies: 0 */

import chai from 'chai';
import soma from '../../lib/expense-transactions';

const assert = chai.assert;

describe('expense-transactions.js', () => {
  it('Should some 1 + 3', (done) => {
    assert.equal(soma(1, 3), 4);
    done();
  });
});

