// @flow

import React, { Component } from 'react';

import styled, { css } from 'styled-components';
import {
  getWidget,
  optionsList,
  retrieveSchema
} from 'react-jsonschema-form/lib/utils';

import OtherInput from './OtherInput';

const selectValue = (value, selected) => selected.concat(value);

const deselectValue = (value, selected :any[]) => selected.filter((v) => v !== value);

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.columns ? css`repeat(${props.columns}, 1fr)` : '1fr')};
`;

type Props = {
  autofocus ? :boolean;
  disabled ? :boolean;
  id :any;
  onChange :(Array<string>) => void;
  readonly ? :boolean;
  registry :any;
  value :Array<string>;
  schema :any;
  onBlur :() => void;
  onFocus :() => void;
};

class CheckboxesWidget extends Component<Props> {

  static defaultProps = {
    autofocus: false,
    disabled: false,
    readonly: false,
    value: []
  };

  componentDidUpdate(prevProps :Props) {
    const {
      value,
      registry,
      schema,
      onChange
    } = this.props;
    const { value: prevFormData } = prevProps;
    const { definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, prevFormData);
    const enumOptions = optionsList(itemsSchema);
    const otherValueIndex = this.getOtherValueIndex(value, enumOptions);

    if (prevFormData.includes('Other') && !value.includes('Other') && otherValueIndex !== -1) {
      const copyFormData = [...value];
      copyFormData.splice(otherValueIndex, 1);
      onChange(copyFormData);
    }
  }

  getHandleChange = (option :HTMLOptionElement) => (checked :boolean) => {
    const { onChange, value } = this.props;
    if (checked) {
      onChange(selectValue(option.value, value));
    }
    else {
      onChange(deselectValue(option.value, value));
    }
  }

  handleOtherChange = (otherValue :string = '') => {
    const {
      value,
      registry,
      schema,
      onChange
    } = this.props;
    const copyFormData = [...value];
    const { definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, otherValue);
    const enumOptions = optionsList(itemsSchema);
    const otherIndex = this.getOtherValueIndex(value, enumOptions);

    if (otherIndex !== -1) {
      copyFormData[otherIndex] = otherValue;
      onChange(copyFormData);
    }
    else {
      onChange([...copyFormData, otherValue]);
    }
  }

  getOtherValueIndex = (value :Array<string>, enumOptions :Array<HTMLOptionElement>) :number => {
    const index = value.findIndex((v) => {
      return !enumOptions.find((option) => option.value === v);
    });
    return index;
  }

  render() {
    const {
      autofocus,
      disabled,
      id,
      readonly,
      registry,
      schema,
      value,
      onBlur,
      onFocus,
      options,
    } = this.props;
    const { widgets, definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, value);
    const enumOptions = optionsList(itemsSchema);
    const {
      widget = 'CheckboxWidget',
      columns,
      withOther
    } = options;
    // const label = uiSchema['ui:title'] || schema.title;
    const Widget = getWidget(schema, widget, widgets);
    const otherValueIndex :number = this.getOtherValueIndex(value, enumOptions);
    const otherValue = value[otherValueIndex];
    const showOther = withOther && value.includes('Other');
    return (
      <>
        <GridDiv className="checkboxes" id={id} columns={columns}>
          {enumOptions.map((option, index) => {
            const checked = value.indexOf(option.value) !== -1;
            return (
              <Widget
                  id={`${id}_${index}`}
                  key={`checkboxes${index}`} // eslint-disable-line react/no-array-index-key
                  autoFocus={autofocus}
                  disabled={disabled || readonly}
                  label={option.label}
                  onBlur={onBlur}
                  onChange={this.getHandleChange(option)}
                  onFocus={onFocus}
                  schema={itemsSchema}
                  value={checked} />
            );
          })}
          { showOther && (
            <OtherInput
                value={otherValue}
                id={id}
                onBlur={onBlur}
                onChange={this.handleOtherChange}
                onFocus={onFocus}
                registry={registry}
                schema={schema} />
          )}
        </GridDiv>
      </>
    );
  }
}

export default CheckboxesWidget;
