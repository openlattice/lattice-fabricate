// @flow
import { dataURItoBlob } from 'react-jsonschema-form/lib/utils';
import { isNonEmptyString } from '../../utils/LangUtils';

function addNameToDataURL(dataURL :string, name :string) {
  return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`);
}

function processFile(file :File) :Promise<any> {
  const { name, size, type } = file;
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      resolve({
        dataURL: addNameToDataURL(event.target.result, name),
        name,
        size,
        type,
      });
    };
    reader.readAsDataURL(file);
  });
}

function processFiles(files :FileList) {
  return Promise.all([].map.call(files, processFile));
}

function extractFileInfo(dataURLs :string[]) :Object[] {
  return dataURLs
    .filter((dataURL) => isNonEmptyString(dataURL))
    .map((dataURL) => {
      const { blob, name } = dataURItoBlob(dataURL);
      return {
        name,
        size: blob.size,
        type: blob.type,
      };
    });
}

export {
  addNameToDataURL,
  extractFileInfo,
  processFile,
  processFiles,
};
