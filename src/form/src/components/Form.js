// @flow
import React from 'react';
import type { ElementRef } from 'react';

import isFunction from 'lodash/isFunction';
import styled from 'styled-components';
import { Button } from 'lattice-ui-kit';

import { transformErrors } from './FormUtils';
import { ActionGroup, StyledForm } from './styled';

import SchemaField from '../../../templates/schema/SchemaField';
import { DescriptionField } from '../../../fields';
import { ArrayFieldTemplate, FieldTemplate, ObjectFieldTemplate } from '../../../templates';
import {
  BaseInput,
  CheckboxWidget,
  CheckboxesWidget,
  DateTimeWidget,
  DateWidget,
  FileWidget,
  RadioWidget,
  SelectWidget,
  TextareaWidget,
  TimeWidget,
} from '../../../widgets';

const widgets = {
  BaseInput,
  CheckboxWidget,
  CheckboxesWidget,
  DateWidget,
  DateTimeWidget,
  FileWidget,
  RadioWidget,
  SelectWidget,
  TextareaWidget,
  TimeWidget,
};

const fields = {
  DescriptionField,
  SchemaField,
};

const HiddenButton = styled.button`
  display: none;
`;

type Props = {
  disabled ?:boolean;
  hideSubmit ?:boolean;
  isSubmitting ?:boolean;
  onChange ?:() => void;
  onDiscard ?:() => void;
  onSubmit ?:() => void;
};

type FormProps = {
  ...Props,
  forwardedRef :ElementRef<typeof StyledForm>
};

const Form = (props :FormProps) => {

  const {
    disabled,
    forwardedRef,
    hideSubmit,
    isSubmitting,
    onChange,
    onDiscard,
    onSubmit,
    ...restProps
  } = props;

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <StyledForm
        ArrayFieldTemplate={ArrayFieldTemplate}
        FieldTemplate={FieldTemplate}
        ObjectFieldTemplate={ObjectFieldTemplate}
        disabled={disabled}
        fields={fields}
        onChange={onChange}
        onSubmit={onSubmit}
        ref={forwardedRef}
        showErrorList={false}
        transformErrors={transformErrors}
        widgets={widgets}
        // $FlowFixMe
        {...restProps}>
      {
        (disabled || hideSubmit)
          ? <HiddenButton type="submit" />
          : (
            <ActionGroup>
              <Button mode="primary" type="submit" isLoading={isSubmitting}>Submit</Button>
              { isFunction(onDiscard) && <Button onClick={onDiscard}>Discard</Button> }
            </ActionGroup>
          )
      }
    </StyledForm>
  );
  /* eslint-enable */
};

/* eslint-disable react/default-props-match-prop-types */
Form.defaultProps = {
  disabled: false,
  hideSubmit: false,
  isSubmitting: false,
  onChange: undefined,
  onDiscard: undefined,
  onSubmit: undefined
};

/* eslint-enable */

/* eslint-disable react/jsx-props-no-spreading */
export default React.forwardRef<Props, typeof StyledForm>((props, ref) => (
  <Form {...props} forwardedRef={ref} />
));
/* eslint-enable */
