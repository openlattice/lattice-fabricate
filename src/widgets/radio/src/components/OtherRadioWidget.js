// @flow

import React from 'react';

import {
  getWidget,
  retrieveSchema
} from 'react-jsonschema-form/lib/utils';

import OtherInput from '../../../shared/OtherInput';
import type { WidgetProps } from '../../../types';

const otherSchema = {
  type: 'string',
};

const OtherRadioWidget = (props :WidgetProps) => {

  const {
    autofocus,
    disabled,
    formContext,
    id,
    onBlur,
    onFocus,
    options,
    readonly,
    registry,
    schema,
    value,
    onChange
  } = props;
  const { definitions, widgets } = registry;

  const itemsSchema = retrieveSchema(schema.items, definitions, value);
  const Widget = getWidget(schema, 'RadioWidget', widgets);
  const showOther = value.includes('Other');

  const handleChange = (newValue) => {
    onChange([newValue]);
  };

  const handleOtherChange = (otherValue :string = '') => {
    const copyFormData = [...value];
    copyFormData[1] = otherValue;
    onChange(copyFormData);
  };

  return (
    <>
      <Widget
          id={id}
          formContext={formContext}
          autoFocus={autofocus}
          disabled={disabled || readonly}
          onBlur={onBlur}
          onChange={handleChange}
          onFocus={onFocus}
          schema={itemsSchema}
          options={{ ...options, withOther: true }}
          registry={registry}
          value={value[0]} />
      { showOther && (
        <OtherInput
            autofocus
            disabled={disabled}
            formContext={formContext}
            id={`${id}_other`}
            name="otherInput"
            onBlur={onBlur}
            onChange={handleOtherChange}
            onFocus={onFocus}
            options={options}
            readonly={readonly}
            registry={registry}
            required={false}
            schema={otherSchema}
            value={value[1]}
            type="text" />
      )}
    </>
  );
};

OtherRadioWidget.defaultProps = {
  autofocus: false,
  disabled: false,
  readonly: false,
  value: []
};

export default OtherRadioWidget;
