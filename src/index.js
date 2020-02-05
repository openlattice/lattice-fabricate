/*
 * @flow
 */

import Form, { Paged, PagedByMachine } from './form';
import * as DataProcessingUtils from './utils/DataProcessingUtils';
// injected by Webpack.DefinePlugin
declare var __VERSION__ :string;
const version :string = __VERSION__;

export {
  DataProcessingUtils,
  Form,
  Paged,
  PagedByMachine,
  version,
};


export default {
  version,
};
