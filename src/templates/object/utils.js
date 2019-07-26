// @flow

const parseIdIndex = (idSchema :{ $id :string }) :number | void => {
  const { $id } = idSchema;
  const lastId = parseInt($id.split('_').pop(), 10);
  if (typeof lastId === 'number') {
    return lastId;
  }
  return undefined;
};

export {
  // eslint-disable-next-line import/prefer-default-export
  parseIdIndex
};
