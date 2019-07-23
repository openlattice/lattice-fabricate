// @flow
import React from 'react';
import { Button } from 'lattice-ui-kit';
import styled from 'styled-components';

import { ActionGroup, StyledForm } from './styled';
import { ArrayFieldTemplate, FieldTemplate, ObjectFieldTemplate } from '../../../templates';
import {
  BaseInput,
  CheckboxWidget,
  TextareaWidget
} from '../../../widgets';
import CustomSchemaField from '../../../templates/schema/SchemaField';

const widgets = {
  BaseInput,
  CheckboxWidget,
  TextareaWidget,
};

const fields = {
  SchemaField: CustomSchemaField
};

const HiddenButton = styled.button`
  display: none;
`;

type Props = {
  disabled :boolean;
  onSubmit :() => void;
  onChange :() => void;
  onDiscard :() => void;
};

const Form = (props :Props) => {

  const {
    disabled,
    onChange,
    onDiscard,
    onSubmit,
    ...restProps
  } = props;

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
              <Button mode="primary" type="submit">Submit</Button>
              <Button onClick={onDiscard}>Discard</Button>
            </ActionGroup>
          )
      }
    </StyledForm>
  );
};

export default Form;
