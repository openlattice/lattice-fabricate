// @flow

import React, { Component } from 'react';

import styled, { css } from 'styled-components';
import {
  getUiOptions,
  getWidget,
  optionsList,
  retrieveSchema
} from 'react-jsonschema-form/lib/utils';

import OtherInput from './OtherInput';

const selectValue = (value, selected :any[]) => selected.concat(value);

const deselectValue = (value, selected :any[]) => selected.filter((v) => v !== value);

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.columns ? css`repeat(${props.columns}, 1fr)` : '1fr')};
`;

const StyledLabel = styled.label.attrs({
  className: 'control-label'
})``;

type Props = {
  autofocus ? :boolean;
  disabled ? :boolean;
  idSchema :any;
  onChange :(Array<string>) => void;
  readonly ? :boolean;
  registry :any;
  formData :Array<string>;
  schema :any;
  uiSchema :any;
  onBlur :() => void;
  onFocus :() => void;
};

class CheckboxArrayField extends Component<Props> {

  static defaultProps = {
    autofocus: false,
    disabled: false,
    readonly: false,
    formData: []
  };

  componentDidUpdate(prevProps :Props) {
    const {
      formData,
      registry,
      schema,
      onChange
    } = this.props;
    const { formData: prevFormData } = prevProps;
    const { definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, prevFormData);
    const enumOptions = optionsList(itemsSchema);
    const otherValueIndex = this.getOtherValueIndex(formData, enumOptions);

    if (prevFormData.includes('Other') && !formData.includes('Other') && otherValueIndex !== -1) {
      const copyFormData = [...formData];
      copyFormData.splice(otherValueIndex, 1);
      onChange(copyFormData);
    }
  }

  getHandleChange = (option :HTMLOptionElement) => (checked :boolean) => {
    const { onChange, formData } = this.props;
    if (checked) {
      onChange(selectValue(option.value, formData));
    }
    else {
      onChange(deselectValue(option.value, formData));
    }
  }

  handleOtherChange = (value :string = '') => {
    const {
      formData,
      registry,
      schema,
      onChange
    } = this.props;
    const copyFormData = [...formData];
    const { definitions } = registry;
    const itemsSchema = retrieveSchema(schema.items, definitions, formData);
    const enumOptions = optionsList(itemsSchema);
    const otherIndex = this.getOtherValueIndex(formData, enumOptions);

    if (otherIndex !== -1) {
      copyFormData[otherIndex] = value;
      onChange(copyFormData);
    }
    else {
      onChange([...copyFormData, value]);
    }
  }

  getOtherValueIndex = (formData :Array<string>, enumOptions :Array<HTMLOptionElement>) :number => {
    const index = formData.findIndex((value) => {
      return !enumOptions.find((option) => option.value === value);
    });
    return index;
  }

  render() {
    const {
      autofocus,
      disabled,
      idSchema,
      readonly,
      registry,
      schema,
      uiSchema,
      formData,
      onBlur,
      onFocus
    } = this.props;
    const { widgets, definitions } = registry;
    const { $id: id } = idSchema;
    const itemsSchema = retrieveSchema(schema.items, definitions, formData);
    const enumOptions = optionsList(itemsSchema);
    const {
      widget = 'CheckboxWidget',
      columns,
      withOther
    } = getUiOptions(uiSchema);
    const label = uiSchema['ui:title'] || schema.title;
    const Widget = getWidget(schema, widget, widgets);
    const otherValueIndex :number = this.getOtherValueIndex(formData, enumOptions);

    return (
      <>
        {
          label
            ? (
              <StyledLabel>
                {label}
              </StyledLabel>
            )
            : null
        }
        <GridDiv className="checkboxes" id={id} columns={columns}>
          {enumOptions.map((option, index) => {
            const checked = formData.indexOf(option.value) !== -1;
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
          <OtherInput
              formData={formData}
              idSchema={idSchema}
              onBlur={onBlur}
              onChange={this.handleOtherChange}
              onFocus={onFocus}
              otherValueIndex={otherValueIndex}
              registry={registry}
              schema={schema}
              withOther={withOther} />
        </GridDiv>
      </>
    );
  }
}

export default CheckboxArrayField;
