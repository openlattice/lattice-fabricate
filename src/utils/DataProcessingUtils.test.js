/*
 * @flow
 */

import { List, Map } from 'immutable';
import { Models } from 'lattice';

import {
  VALUE_MAPPERS,
  getEntityAddressKey,
  parseEntityAddressKey,
  processEntityData,
  processEntityValue
} from './DataProcessingUtils';
import {
  INVALID_PARAMS,
  INVALID_PARAMS_FOR_REQUIRED_INDEX_OR_SS,
  INVALID_PARAMS_SS,
} from './testing/Invalid';

import mockExternalFormData from '../form/stories/constants/mockExternalFormData';
import { entitySetIds, propertyTypeIds } from '../form/stories/constants/mockEDM';

const { FullyQualifiedName } = Models;

const MOCK_EKID = '9b93bc80-79c3-44c8-807c-ada1a8d6484f';
const MOCK_ESN = 'MockEntitySetName';
const MOCK_FQN = new FullyQualifiedName('ol.mock');

describe('DataProcessingUtils', () => {

  describe('getEntityAddressKey()', () => {

    test('should return a valid entity address key given an index', () => {
      for (let mockIndex = -3; mockIndex < 4; mockIndex += 1) {
        const eak = getEntityAddressKey(mockIndex, MOCK_ESN, MOCK_FQN);
        expect(eak).toEqual(`${mockIndex}__@@__${MOCK_ESN}__@@__${MOCK_FQN}`);
      }
    });

    test('should return a valid entity address key given an entity key id', () => {
      const eak = getEntityAddressKey(MOCK_EKID, MOCK_ESN, MOCK_FQN);
      expect(eak).toEqual(`${MOCK_EKID}__@@__${MOCK_ESN}__@@__${MOCK_FQN}`);
    });

    test('should throw given an invalid index or entity key id', () => {
      INVALID_PARAMS_FOR_REQUIRED_INDEX_OR_SS.forEach((invalidParam) => {
        expect(() => {
          getEntityAddressKey(invalidParam, MOCK_ESN, MOCK_FQN);
        }).toThrow();
      });
    });

    test('should throw given an invalid entity set name or fqn', () => {
      INVALID_PARAMS.forEach((invalidParam) => {
        expect(() => {
          getEntityAddressKey(MOCK_EKID, invalidParam, MOCK_FQN);
        }).toThrow();
      });
    });

    test('should throw given an invalid fqn', () => {
      INVALID_PARAMS_SS.forEach((invalidParam) => {
        expect(() => {
          getEntityAddressKey(MOCK_EKID, MOCK_ESN, invalidParam);
        }).toThrow();
      });
    });

  });

  describe('parseEntityAddressKey()', () => {

    test('should return the correct components of an entity address key given an index', () => {
      for (let mockIndex = -3; mockIndex < 4; mockIndex += 1) {
        const entityAddressKey = parseEntityAddressKey(`${mockIndex}__@@__${MOCK_ESN}__@@__${MOCK_FQN}`);
        expect(entityAddressKey).toEqual({
          entityIndex: mockIndex,
          entitySetName: MOCK_ESN,
          propertyTypeFQN: MOCK_FQN,
        });
      }
    });

    test('should return the correct components of an entity address key given an entity key id', () => {
      const entityAddressKey = parseEntityAddressKey(`${MOCK_EKID}__@@__${MOCK_ESN}__@@__${MOCK_FQN}`);
      expect(entityAddressKey).toEqual({
        entityKeyId: MOCK_EKID,
        entitySetName: MOCK_ESN,
        propertyTypeFQN: MOCK_FQN,
      });
    });

    test('should throw given an entity address key with invalid entity key id', () => {
      INVALID_PARAMS_FOR_REQUIRED_INDEX_OR_SS.forEach((invalidParam) => {
        expect(() => {
          parseEntityAddressKey(`${invalidParam}__@@__${MOCK_ESN}__@@__${MOCK_FQN}`);
        }).toThrow();
      });
    });

    test('should throw given an entity address key with invalid entity set name', () => {
      expect(() => {
        parseEntityAddressKey(`${MOCK_EKID}__@@__${''}__@@__${MOCK_FQN}`);
      }).toThrow();
      expect(() => {
        parseEntityAddressKey(`${MOCK_EKID}__@@__${' '}__@@__${MOCK_FQN}`);
      }).toThrow();
    });

    test('should throw given an entity address key with invalid fqn', () => {
      expect(() => {
        parseEntityAddressKey(`${MOCK_EKID}__@@__${MOCK_ESN}__@@__${''}`);
      }).toThrow();
      expect(() => {
        parseEntityAddressKey(`${MOCK_EKID}__@@__${MOCK_ESN}__@@__${' '}`);
      }).toThrow();
      expect(() => {
        parseEntityAddressKey(`${MOCK_EKID}__@@__${MOCK_ESN}__@@__${'invalid_fqn'}`);
      }).toThrow();
    });

  });

  describe('processEntityValue', () => {

    test('should return mapped value wrapped in array', () => {
      const mockMapper = jest.fn();
      const testMapper = (value) => {
        mockMapper(value);
        return value;
      };

      const mockMappers = {
        [VALUE_MAPPERS]: {
          test: testMapper
        }
      };

      const UNWRAPPED_VALUES = [
        'OpenLattice',
        ['OpenLattice'],
        List(['OpenLattice']),
        { Open: 'Lattice' },
        Map({ Open: 'Lattice' }),
        true,
        false,
        0,
        1,
      ];

      const WRAPPED_VALUES = [
        ['OpenLattice'],
        ['OpenLattice'],
        List(['OpenLattice']),
        [{ Open: 'Lattice' }],
        [Map({ Open: 'Lattice' })],
        [true],
        [false],
        [0],
        [1],
      ];

      for (let i = 0; i < UNWRAPPED_VALUES.length; i += 1) {
        const value = UNWRAPPED_VALUES[i];
        const processedValue = processEntityValue('test', value, mockMappers);
        expect(mockMapper).toHaveBeenLastCalledWith(value);
        expect(processedValue).toEqual(WRAPPED_VALUES[i]);
      }
    });
  });

  describe('processEntityData', () => {
    test('should process formData', () => {
      const processedValue = processEntityData(mockExternalFormData, entitySetIds, propertyTypeIds);
      expect(processedValue).toMatchSnapshot();
    });
  });

});
