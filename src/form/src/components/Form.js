// @flow
import React from 'react';
import { Button } from 'lattice-ui-kit';

import { ActionGroup, StyledForm } from './styled';
import { ArrayFieldTemplate, FieldTemplate, ObjectFieldTemplate } from '../../../templates';
import {
  BaseInput,
  CheckboxWidget,
  RadioWidget,
  SelectWidget,
  TextareaWidget
} from '../../../widgets';

const widgets = {
  BaseInput,
  CheckboxWidget,
  RadioWidget,
  SelectWidget,
  TextareaWidget,
};

type Props = {
  onSubmit :() => void;
  onChange :() => void;
  onDiscard :() => void;
};

const Form = (props :Props) => {

  const {
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
        onChange={onChange}
        onSubmit={onSubmit}
        showErrorList={false}
        widgets={widgets}
        {...restProps}>
      <ActionGroup>
        <Button mode="primary" type="submit">Submit</Button>
        <Button onClick={onDiscard}>Discard</Button>
      </ActionGroup>
    </StyledForm>
  );
};

export default Form;
