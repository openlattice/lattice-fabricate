// @flow
import React from 'react';
import type { ElementRef } from 'react';

import isFunction from 'lodash/isFunction';
import styled from 'styled-components';
import { Button } from 'lattice-ui-kit';

import { transformErrors } from './FormUtils';
import { ActionGroup, StyledForm } from './styled';

import SchemaField from '../../../templates/schema/SchemaField';
import { CheckboxArrayField, DescriptionField } from '../../../fields';
import { ArrayFieldTemplate, FieldTemplate, ObjectFieldTemplate } from '../../../templates';
import {
  BaseInput,
  CheckboxWidget,
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
  DateWidget,
  FileWidget,
  RadioWidget,
  SelectWidget,
  TextareaWidget,
  TimeWidget,
};

const fields = {
  CheckboxArrayField,
  DescriptionField,
  SchemaField,
};

const HiddenButton = styled.button`
  display: none;
`;

type Props = {
  disabled :boolean;
  forwardedRef :ElementRef<typeof StyledForm>;
  hideSubmit :boolean;
  isSubmitting :boolean;
  onChange :() => void;
  onDiscard :() => void;
  onSubmit :() => void;
};

const Form = (props :Props) => {

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

/* eslint-disable react/jsx-props-no-spreading */
export default React.forwardRef<Props, typeof StyledForm>((props, ref) => (
  <Form {...props} forwardedRef={ref} />
));
/* eslint-enable */
