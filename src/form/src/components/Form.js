// @flow
import React from 'react';
import { Button } from 'lattice-ui-kit';
import styled from 'styled-components';
import isFunction from 'lodash/isFunction';

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
  onSubmit :() => void;
  onChange :() => void;
  onDiscard ? :() => void;
  isSubmitting ? :boolean;
};

const Form = (props :Props) => {

  const {
    disabled,
    onChange,
    onDiscard,
    onSubmit,
    isSubmitting,
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
        showErrorList={false}
        widgets={widgets}
        {...restProps}>
      {
        disabled
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

Form.defaultProps = {
  isSubmitting: false,
  onDiscard: undefined,
};

export default Form;
