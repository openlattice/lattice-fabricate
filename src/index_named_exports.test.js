import { Set } from 'immutable';
import PACKAGE from '../package.json';

import * as LatticeFabricate from './index';

const EXPECTED_OBJ_EXPORTS = Set([
  'DataProcessingUtils',
  'Form'
]);

describe('lattice-fabricate named exports', () => {

  EXPECTED_OBJ_EXPORTS.forEach((component) => {
    test(`should export "${component}"`, () => {
      expect(LatticeFabricate).toHaveProperty(component);
    });
  });

  test('should export the correct version', () => {
    expect(LatticeFabricate.version).toEqual(PACKAGE.version);
  });

});
