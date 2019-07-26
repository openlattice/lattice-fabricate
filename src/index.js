/*
 * @flow
 */

import * as DataProcessingUtils from './utils/DataProcessingUtils';
// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;


export {
  DataProcessingUtils,
  version
};

export { default as Form } from './form';

export default {
  version,
};
