/* eslint-disable import/no-named-as-default-member */

import PACKAGE from '../package.json';

import Index from './index';

describe('lattice-fabricate default export', () => {

  test('should export the correct version', () => {
    expect(Index.version).toEqual(PACKAGE.version);
  });

});
