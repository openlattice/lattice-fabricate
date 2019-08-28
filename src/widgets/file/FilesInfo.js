// @flow
import React from 'react';

const FilesInfo = (props :{ filesInfo :Object[] }) => {
  const { filesInfo } = props;
  if (filesInfo.length === 0) {
    return null;
  }

  return (
    <ul className="file-info">
      {filesInfo.map((fileInfo, key) => {
        const { name, size, type } = fileInfo;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li key={key}>
            <strong>{name}</strong>
            {` (${type}, ${size} bytes)`}
          </li>
        );
      })}
    </ul>
  );
};

export default FilesInfo;
