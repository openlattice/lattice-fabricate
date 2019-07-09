// @flow
import React from 'react';
import styled from 'styled-components';
import { Button } from 'lattice-ui-kit';

import StyledForm from './styled/StyledForm';
import { ArrayFieldTemplate, FieldTemplate, ObjectFieldTemplate } from '../../../templates';
import {
  BaseInput,
  CheckboxWidget,
  TextareaWidget
} from '../../../widgets';

const ActionGroup = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px 30px 30px;
`;

const widgets = {
  BaseInput,
  // CameraWidget,
  CheckboxWidget,
  // CounterWidget,
  // DateTimeWidget,
  // DateWidget,
  // DigestedInput,
  // FakeDateTimeWidget,
  // ImageWidget,
  // RadioWidget,
  // SelectWidget,
  // SignatureWidget,
  TextareaWidget,
  // TimeWidget,
};

const fields = {
  // BulletField,
  // CheckboxesField,
  // CheckboxField,
  // DateTimeField,
  // DescriptionField,
  // InformationField,
  // PrescriptionField,
  // VerticalTableField,
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
        fields={fields}
        FieldTemplate={FieldTemplate}
        ObjectFieldTemplate={ObjectFieldTemplate}
        onChange={onChange}
        onSubmit={onSubmit}
        showErrorList={false}
        widgets={widgets}
        {...restProps}>
      <ActionGroup>
        <Button mode="primary" type="submit">Submit</Button>
        <Button type="button" onClick={onDiscard}>Discard</Button>
      </ActionGroup>
    </StyledForm>
  );
};

export default Form;
