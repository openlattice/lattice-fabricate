// @flow
import React from 'react';
import StyledForm from './styled/StyledForm';
import { ArrayFieldTemplate, FieldTemplate, ObjectFieldTemplate } from '../../../templates';

import {
  BaseInput,
  CheckboxWidget,
  TextareaWidget
} from '../../../widgets';

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

};

const Form = (props :Props) => (
  <StyledForm
      FieldTemplate={FieldTemplate}
      ObjectFieldTemplate={ObjectFieldTemplate}
      ArrayFieldTemplate={ArrayFieldTemplate}
      widgets={widgets}
      fields={fields}
      {...props} />
);

export default Form;
