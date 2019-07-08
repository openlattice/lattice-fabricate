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

class Form extends React.Component<Props> {
  
  state = {
    data: {}
  };

  render() {
    const {
      onChange,
      onDiscard,
      onSubmit,
      ...restProps
    } = this.props;
    const { data } = this.state;

    return (
      <StyledForm
          ArrayFieldTemplate={ArrayFieldTemplate}
          fields={fields}
          FieldTemplate={FieldTemplate}
          ObjectFieldTemplate={ObjectFieldTemplate}
          onChange={onChange}
          showErrorList={false}
          widgets={widgets}
          formData={data}
          {...restProps}>
        <ActionGroup>
          <Button mode="primary" type="submit" onClick={onSubmit}>Submit</Button>
          <Button type="button" onClick={onDiscard}>Discard</Button>
        </ActionGroup>
      </StyledForm>
    );
  }
}


export default Form;
