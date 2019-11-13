// @flow
import React, { useRef, useImperativeHandle } from 'react';
import { Button } from 'lattice-ui-kit';
import styled from 'styled-components';
import isFunction from 'lodash/isFunction';
import type { ElementRef } from 'react';

import { ActionGroup, StyledForm } from './styled';
import { ArrayFieldTemplate, FieldTemplate, ObjectFieldTemplate } from '../../../templates';
import { DescriptionField } from '../../../fields';
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
import SchemaField from '../../../templates/schema/SchemaField';

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
  DescriptionField,
  SchemaField
};

const HiddenButton = styled.button`
  display: none;
`;

type Props = {
  disabled :boolean;
  hideSubmit :boolean;
  isSubmitting :boolean;
  onChange :() => void;
  onDiscard :() => void;
  onSubmit :() => void;
  ref :ElementRef<typeof StyledForm>;
};

const Form = (props :Props, ref) => {

  const {
    disabled,
    hideSubmit,
    isSubmitting,
    onChange,
    onDiscard,
    onSubmit,
    ...restProps
  } = props;

  const formRef = useRef<typeof StyledForm>();

  // https://reactjs.org/docs/hooks-reference.html#useimperativehandle
  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) {
        formRef.current.submit();
      }
    }
  }));

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
        ref={formRef}
        showErrorList={false}
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

export default React.forwardRef<Props, typeof StyledForm>(Form);
