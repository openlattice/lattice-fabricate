// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Colors, Label } from 'lattice-ui-kit';
import type { ChildrenArray, Element } from 'react';

const { RED_1 } = Colors;

const Error = styled.div`
  color: ${RED_1};
  font-size: 12px;
  margin-top: 3px;
`;

type Props = {
  children :ChildrenArray<any>;
  classNames :string;
  description :Element<any>;
  displayLabel ?:boolean;
  // errors :Element<any>;
  // fields :Object;
  // formContext :Object;
  help :Element<any>;
  hidden ?:boolean;
  id :string;
  label :string;
  // rawDescription :string | Element<any>;
  rawErrors :string[];
  // rawHelp :string | Element<any>;
  // readonly ?:boolean;
  required ?:boolean;
};

class FieldTemplate extends Component<Props> {

  static defaultProps = {
    displayLabel: true,
    hidden: false,
    required: false
  };

  renderErrors = () :Element<'div'>[] | null => {
    const { rawErrors } = this.props;

    if (Array.isArray(rawErrors)) {
      return rawErrors.map((error) => (
        <Error>{error}</Error>
      ));
    }

    return null;
  }

  render() {
    const {
      children,
      classNames,
      description,
      displayLabel,
      help,
      hidden,
      id,
      label,
      required
    } = this.props;

    if (hidden) {
      return <div className="hidden">{children}</div>;
    }

    return (
      <div className={classNames}>
        {displayLabel && label && <Label htmlFor={id} required={required}>{label}</Label>}
        {description}
        {children}
        { this.renderErrors() }
        {help}
      </div>
    );
  }
}

export default FieldTemplate;
