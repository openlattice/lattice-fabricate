// @flow
import React from 'react';
import { Label } from 'lattice-ui-kit';
import type { ChildrenArray, Element } from 'react';

type Props = {
  children :ChildrenArray<any>;
  classNames :string;
  description :Element<any>;
  displayLabel ? :boolean;
  errors :Element<any>;
  // fields :Object;
  formContext :Object;
  help :Element<any>;
  hidden ? :boolean;
  id :string;
  label :string;
  // rawDescription :string | Element<any>;
  // rawErrors :string[];
  // rawHelp :string | Element<any>;
  readonly ? :boolean;
  required ? :boolean;
};

const FieldTemplate = (props :Props) => {
  const {
    children,
    classNames,
    description,
    displayLabel,
    errors,
    help,
    hidden,
    id,
    label,
    required,
    ...restProps
  } = props;

  if (hidden) {
    return <div className="hidden">{children}</div>;
  }

  return (
    <div className={classNames} {...restProps}>
      {displayLabel && label && <Label className="control-label" htmlFor={id} required={required}>{label}</Label>}
      {displayLabel && description ? description : null}
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
};

FieldTemplate.defaultProps = {
  displayLabel: true,
  hidden: false,
  readonly: false,
  required: false
};

export default FieldTemplate;
