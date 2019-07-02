// @flow
import React from 'react';
import StyledForm from './styled/StyledForm';
import { ObjectFieldTemplate } from '../../templates';

import { BaseInput, CheckboxWidget } from '../../widgets';

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
  // TextareaWidget,
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

};

const Form = (props :Props) => (
  <StyledForm
      ObjectFieldTemplate={ObjectFieldTemplate}
      widgets={widgets}
      fields={fields}
      {...props} />
);

export default Form;
