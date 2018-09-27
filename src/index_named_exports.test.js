import PACKAGE from '../package.json';

import * as LatticeFabricate from './index';

describe('lattice-fabricate named exports', () => {

  test('should export the correct version', () => {
    expect(LatticeFabricate.version).toEqual(PACKAGE.version);
  });

});
