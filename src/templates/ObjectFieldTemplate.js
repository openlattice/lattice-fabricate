// @flow
import * as React from 'react';
import styled from 'styled-components';

const GridDiv = styled.div`
  display: grid;
`;

type Props = {
  description :string;
  DescriptionField :React.ElementType;
  idSchema :Object;
  properties :Object[];
  required :string;
  title :string;
  TitleField :React.ElementType;
  uiSchema :Object;
};

class ObjectFieldTemplate extends React.Component<Props> {

  renderTitleField = () => {
    const {
      uiSchema,
      title,
      TitleField,
      idSchema,
      required,
    } = this.props;
    if (uiSchema['ui:title'] || title) {
      return (
        <TitleField
            id={`${idSchema.$id}__title`}
            title={title || uiSchema['ui:title']}
            required={required} />
      );
    }
    return null;
  }

  renderDescriptionField = () => {
    const { description, DescriptionField, idSchema } = this.props;
    if (description) {
      return (
        <DescriptionField
            id={`${idSchema.$id}__description`}
            description={description} />
      );
    }

    return null;
  }

  render() {
    const { properties } = this.props;
    return (
      <GridDiv>
        { this.renderTitleField() }
        { this.renderDescriptionField() }
        {properties.map(prop => prop.content)}
      </GridDiv>
    );
  }
}

export default ObjectFieldTemplate;
