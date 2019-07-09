
/*
 * @flow
 */

import isFunction from 'lodash/isFunction';
import isInteger from 'lodash/isInteger';
import Immutable, {
  get,
  getIn,
  hasIn,
  List,
  Map,
  set,
  setIn,
} from 'immutable';
import { Models } from 'lattice';
import type { FQN } from 'lattice';

import Logger from './Logger';
import { isDefined, isDigitOnlyString, isNonEmptyString } from './LangUtils';
import {
  isValidDataPrimitive,
  isValidDataPrimitiveArray,
  isValidUUID,
} from './ValidationUtils';

const LOG :Logger = new Logger('DataProcessingUtils');

const ATAT :string = '__@@__';
const KEY_MAPPERS :'KEY_MAPPERS' = 'KEY_MAPPERS';
const INDEX_MAPPERS :'INDEX_MAPPERS' = 'INDEX_MAPPERS';
const VALUE_MAPPERS :'VALUE_MAPPERS' = 'VALUE_MAPPERS';

const { FullyQualifiedName } = Models;

function getPageSectionKey(page :number, section :number) :string {
  return `page${page}_section${section}`;
}

declare type UUID = string;

export type EntityAddress = {|
  entityIndex ? :number;
  entityKeyId ? :UUID;
  entitySetName :string;
  propertyTypeFQN :FQN;
|};

function getEntityAddressKey(
  indexOrEntityKeyId :number | UUID,
  entitySetName :string,
  fqn :FQN | string
) :string {

  let errorMsg :string = '';

  if (!isInteger(indexOrEntityKeyId) && !isValidUUID(indexOrEntityKeyId)) {
    errorMsg = 'invalid param: indexOrEntityKeyId must be either an integer or a UUID';
    LOG.error(errorMsg, indexOrEntityKeyId);
    throw new Error(errorMsg);
  }

  if (!isNonEmptyString(entitySetName)) {
    errorMsg = 'invalid param: entitySetName must be a non-empty string';
    LOG.error(errorMsg, entitySetName);
    throw new Error(errorMsg);
  }

  if (!FullyQualifiedName.isValid(fqn)) {
    errorMsg = 'invalid param: fqn must be a valid FullyQualifiedName';
    LOG.error(errorMsg, fqn);
    throw new Error(errorMsg);
  }

  return `${indexOrEntityKeyId}${ATAT}${entitySetName}${ATAT}${fqn.toString()}`;
}

function parseEntityAddressKey(entityAddressKey :string) :EntityAddress {

  const split :string[] = entityAddressKey.split(ATAT);

  if (split && split.length === 3) {
    // NOTE: be careful! parseInt() will incorrectly return a number when given certain UUID strings
    const entityIndex :number = parseInt(split[0], 10);
    const entityKeyId :UUID = split[0];
    const entitySetName :string = split[1];
    const propertyTypeFQN :string = split[2];
    if (isNonEmptyString(entitySetName) && FullyQualifiedName.isValid(propertyTypeFQN)) {
      if (isValidUUID(entityKeyId)) {
        return {
          entityKeyId,
          entitySetName,
          propertyTypeFQN: new FullyQualifiedName(propertyTypeFQN),
        };
      }
      if (entityIndex < 0 || (isDigitOnlyString(split[0]) && isInteger(entityIndex))) {
        return {
          entityIndex,
          entitySetName,
          propertyTypeFQN: new FullyQualifiedName(propertyTypeFQN),
        };
      }
    }
  }

  const errorMsg :string = 'unable to parse entity address key';
  LOG.error(errorMsg, entityAddressKey);
  throw new Error(errorMsg);
}

function isValidEntityAddressKey(value :any) :boolean {

  if (!isNonEmptyString(value)) {
    return false;
  }

  const split :string[] = value.split(ATAT);

  if (split && split.length === 3) {
    // NOTE: be careful! parseInt() will incorrectly return a number when given certain UUID strings
    const entityIndex :number = parseInt(split[0], 10);
    const entityKeyId :UUID = split[0];
    const entitySetName :string = split[1];
    const propertyTypeFQN :string = split[2];
    if (!isNonEmptyString(entitySetName)) {
      return false;
    }
    if (FullyQualifiedName.isValid(propertyTypeFQN)) {
      if (isValidUUID(entityKeyId)) {
        return true;
      }
      if (entityIndex < 0 || (isDigitOnlyString(split[0]) && isInteger(entityIndex))) {
        return true;
      }
    }
  }

  return false;
}

function processEntityIndex(key :string, index :?number, mappers :Map | Object) :number {

  let { entityIndex } = parseEntityAddressKey(key);

  if (typeof entityIndex === 'number' && entityIndex >= 0) {
    return entityIndex;
  }

  if (typeof index === 'number' && index >= 0) {
    entityIndex = index;
  }

  if (hasIn(mappers, [INDEX_MAPPERS, key])) {
    const indexMapper = getIn(mappers, [INDEX_MAPPERS, key]);
    if (isFunction(indexMapper)) {
      entityIndex = indexMapper(index);
    }
    else {
      LOG.warn('processEntityIndex() - mapper is not a function', key);
    }
  }

  if (typeof entityIndex !== 'number') {
    LOG.error('processEntityIndex() - unable to process entity index', key);
    return -1;
  }

  return entityIndex;
}

function processEntityValue(key :string, value :any, mappers :Map | Object) :any {

  let processedValue :any = value;

  if (hasIn(mappers, [VALUE_MAPPERS, key])) {
    const valueMapper = getIn(mappers, [VALUE_MAPPERS, key]);
    if (isFunction(valueMapper)) {
      // TODO: what params should be passed along to the mapper?
      processedValue = valueMapper(processedValue);
    }
    else {
      LOG.warn('processEntityValue() - mapper is not a function');
    }
  }

  if (isDefined(processedValue)) {
    if (isValidDataPrimitive(processedValue)) {
      return [processedValue];
    }
    if (isValidDataPrimitiveArray(processedValue)) {
      return processedValue;
    }
    if (Immutable.isList(processedValue)) {
      LOG.error('entity values as immutable lists are not supported', processedValue);
    }
    if (Immutable.isMap(processedValue)) {
      LOG.error('entity values as immutable maps are not supported', processedValue);
    }
    LOG.warn('processEntityValue() - unable to process value', processedValue);
  }

  // TODO: what should be returned here?
  return undefined;
}

function processEntityValueMap(
  edm :Map,
  mappers :Map,
  processedData :Map,
  valueMap :Map,
  listIndex :?number,
) {

  if (!Immutable.isMap(valueMap)) {
    LOG.warn('processEntityValueMap() - expected value to be an immutable map', valueMap);
    return processedData;
  }

  if (valueMap.isEmpty()) {
    return processedData;
  }

  let localProcessedData :Map = processedData;

  valueMap.forEach((valueInMap :any, key :string) => {
    let localValue = valueInMap;
    if (isValidEntityAddressKey(key) && hasIn(mappers, [KEY_MAPPERS, key])) {
      const mapper = getIn(mappers, [KEY_MAPPERS, key]);
      if (isFunction(mapper)) {
        localValue = mapper(valueInMap);
      }
      else {
        LOG.warn('processEntityValueMap() - mapper is not a function');
      }
    }

    if (Immutable.isMap(localValue)) {
      if (typeof listIndex === 'number') {
        // NOTE: we pass along the list index for nested maps
        // TODO: this behavior needs to be better defined for deeply nested structures
        localProcessedData = processEntityValueMap(edm, mappers, localProcessedData, localValue, listIndex);
      }
      else {
        localProcessedData = processEntityValueMap(edm, mappers, localProcessedData, localValue, undefined);
      }
    }
    else if (Immutable.isList(localValue)) {
      localValue.forEach((valueInList :Map, index :number) => {
        // NOTE: the index is meant to represent the entity index, but it's not guaranteed to be the correct index
        // TODO: this behavior needs to be better defined for deeply nested structures
        localProcessedData = processEntityValueMap(edm, mappers, localProcessedData, valueInList, index);
      });
    }
    else {

      const { entitySetName, propertyTypeFQN } = parseEntityAddressKey(key);
      const entitySetId :UUID = edm.getIn(['entitySetIdsByName', entitySetName]);
      const propertyTypeId :UUID = edm.getIn(['typeIdsByFqn', propertyTypeFQN]);

      const entityIndex :number = processEntityIndex(key, listIndex, mappers);
      const processedValue :any = processEntityValue(key, localValue, mappers);
      let entities :List = localProcessedData.get(entitySetId, List());
      let entity :Map = entities.get(entityIndex, Map());

      // NOTE: entity is "undefined" when the data gets processed in a random order
      if (!isDefined(entity)) {
        entity = Map();
      }

      if (isDefined(processedValue)) {
        entity = entity.set(propertyTypeId, processedValue);
      }

      entities = entities.set(entityIndex, entity);
      localProcessedData = localProcessedData.set(entitySetId, entities);
    }
  });

  return localProcessedData;
}

/*
 * the given data is expected to structured similarly to this:
 *
 *   {
 *     "page1_section1": {
 *       "0__@@__ESN1__@@__FQN1": "value1",
 *       "0__@@__ESN1__@@__FQN2": "value2",
 *     },
 *     "page1_section2": {
 *       "0__@@__ESN2__@@__FQN3": "value3",
 *       "0__@@__ESN2__@@__FQN4": "value4",
 *     },
 *     "page1_section3": [
 *       {
 *         "-1__@@__ESN3__@@__FQN5": "value5",
 *         "-1__@@__ESN3__@@__FQN6": "value6",
 *       }
 *     ],
 *   }
 *
 * the "page1_section1" keys are ignored. the "__@@__" keys are the hacky strings that hold hints for correctly
 * processing the entity data.
 */
function processEntityData(data :Map, edm :Map, mappers :Map = Map()) :{} {

  if (!Immutable.isMap(data) || data.isEmpty()) {
    const errorMsg :string = '"data" param must be a non-empty immutable map';
    LOG.error(errorMsg, data);
    throw new Error(errorMsg);
  }

  if (!Immutable.isMap(edm) || edm.isEmpty()) {
    const errorMsg :string = '"edm" param must be a non-empty immutable map';
    LOG.error(errorMsg, edm);
    throw new Error(errorMsg);
  }

  if (!Immutable.isMap(mappers)) {
    const errorMsg :string = '"mappers" param must be an immutable map';
    LOG.error(errorMsg, mappers);
    throw new Error(errorMsg);
  }

  let processedData :Map = Map();

  data
    .valueSeq()
    .forEach((value :any) => {
      if (Immutable.isList(value)) {
        value.forEach((valueMap :Map, index :number) => {
          processedData = processEntityValueMap(edm, mappers, processedData, valueMap, index);
        });
      }
      else {
        processedData = processEntityValueMap(edm, mappers, processedData, value, undefined);
      }
    });

  return processedData.toJS();
}

function processAssociationEntityData(data :List, edm :Map) :{} {

  let processedData :Map = Map();

  data.forEach((parts) => {

    const edgeEntitySetName :string = parts.get(0);
    const edgeEntitySetId :UUID = edm.getIn(['entitySetIdsByName', edgeEntitySetName]);

    const sourceIndexOrId :number | UUID = parts.get(1);
    const sourceEntitySetName :string = parts.get(2);
    const sourceEntitySetId :UUID = edm.getIn(['entitySetIdsByName', sourceEntitySetName]);

    const destinationIndexOrId :number | UUID = parts.get(3);
    const destinationEntitySetName :string = parts.get(4);
    const destinationEntitySetId :UUID = edm.getIn(['entitySetIdsByName', destinationEntitySetName]);

    const associationData :Map = parts.get(5, Map()).mapKeys((key :FQN) => edm.getIn(['typeIdsByFqn', key]));

    const associationEntity :Map = Map().asMutable();
    associationEntity.set('data', associationData);
    associationEntity.set('srcEntitySetId', sourceEntitySetId);
    associationEntity.set('dstEntitySetId', destinationEntitySetId);

    if (isValidUUID(sourceIndexOrId)) {
      associationEntity.set('srcEntityKeyId', sourceIndexOrId);
    }
    else if (isInteger(sourceIndexOrId) && sourceIndexOrId >= 0) {
      associationEntity.set('srcEntityIndex', sourceIndexOrId);
    }
    else {
      LOG.error('unable to set neither "srcEntityIndex" nor "srcEntityKeyId"', sourceIndexOrId);
    }

    if (isValidUUID(destinationIndexOrId)) {
      associationEntity.set('dstEntityKeyId', destinationIndexOrId);
    }
    else if (isInteger(destinationIndexOrId) && destinationIndexOrId >= 0) {
      associationEntity.set('dstEntityIndex', destinationIndexOrId);
    }
    else {
      LOG.error('unable to set neither "dstEntityIndex" nor "dstEntityKeyId"', destinationIndexOrId);
    }

    let associations :List = processedData.get(edgeEntitySetId, List());
    associations = associations.push(associationEntity.asImmutable());
    processedData = processedData.set(edgeEntitySetId, associations);
  });

  return processedData.toJS();
}

function processEntityDataForPartialReplace(data :Map, originalData :Map, edm :Map, mappers :Map = Map()) :{} {

  // NOTE: not yet ready to use for more general cases

  let processedData :Map = Map();

  const mutatedData :Map = Map().withMutations((map :Map) => {
    data
      .filter((entityData :?Map) => Immutable.isImmutable(entityData))
      .forEach((entityData :Map, pageSectionKey :string) => {
        entityData.forEach((value :any, entityAddressKey :string) => {
          const key = [pageSectionKey, entityAddressKey];
          const originalValue :any = originalData.getIn(key);
          // TODO: need a more robust way of checking for a change in value
          if (value !== originalValue) {
            map.set(entityAddressKey, value);
          }
        });
      });
  });

  mutatedData.forEach((valueInMap :any, key :string) => {

    let localValue = valueInMap;
    if (isValidEntityAddressKey(key)) {
      if (mappers.hasIn([KEY_MAPPERS, key])) {
        const mapper = mappers.getIn([KEY_MAPPERS, key]);
        if (isFunction(mapper)) {
          localValue = mapper(valueInMap);
        }
        else {
          LOG.warn('processEntityValueMap() - mapper is not a function');
        }
      }

      const {
        entityIndex,
        entityKeyId,
        entitySetName,
        propertyTypeFQN,
      } = parseEntityAddressKey(key);
      const indexOrId = entityKeyId || entityIndex;
      const entitySetId :UUID = edm.getIn(['entitySetIdsByName', entitySetName]);
      const propertyTypeId :UUID = edm.getIn(['typeIdsByFqn', propertyTypeFQN]);

      const processedValue :any = processEntityValue(key, localValue, mappers);
      let entitySetData :Map = processedData.get(entitySetId, Map());
      let entity :Map = entitySetData.get(indexOrId, Map());

      if (isDefined(processedValue)) {
        entity = entity.set(propertyTypeId, processedValue);
      }
      else {
        entity = entity.set(propertyTypeId, []);
      }

      entitySetData = entitySetData.set(indexOrId, entity);
      processedData = processedData.set(entitySetId, entitySetData);
    }
  });

  return processedData.toJS();
}

type Replacer = (key :string) => string;

const replaceEntityAddressKeys = (input :Map, replacer :Replacer) => {
  if (!Immutable.isMap(input)) {
    return input;
  }

  return input.mapEntries(([key, value]) => [
    replacer(key),
    replaceEntityAddressKeys(value, replacer)
  ]);

};
export {
  ATAT,
  INDEX_MAPPERS,
  KEY_MAPPERS,
  VALUE_MAPPERS,
  getEntityAddressKey,
  getPageSectionKey,
  isValidEntityAddressKey,
  parseEntityAddressKey,
  processAssociationEntityData,
  processEntityData,
  processEntityDataForPartialReplace,
  replaceEntityAddressKeys,
};
