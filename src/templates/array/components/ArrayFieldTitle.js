// @flow
import React from 'react';

type ArrayFieldTitleProps = {
  required ? :boolean;
  TitleField :Class<React.Component<*, *>> | React.StatelessFunctionalComponent<*>;
  idSchema :{ $id :string };
  title :string;
};

const ArrayFieldTitle = ({
  TitleField,
  idSchema,
  title,
  required
} :ArrayFieldTitleProps) => {
  if (!title) {
    return null;
  }
  const id = `${idSchema.$id}__title`;
  return <TitleField id={id} title={title} required={required} />;
};

ArrayFieldTitle.defaultProps = {
  required: false
};

export default ArrayFieldTitle;
