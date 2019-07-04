// @flow
import React, { type ComponentType, Component } from 'react';

type Props = {
  description :string;
  DescriptionField :ComponentType<any>;
  idSchema :Object;
  properties :Object[];
  required :string;
  title :string;
  TitleField :ComponentType<any>;
  uiSchema :Object;
};

class ObjectFieldTemplate extends Component<Props> {

  renderTitleField = () => {
    const {
      uiSchema,
      title,
      TitleField,
      idSchema,
      required,
    } = this.props;
    if (uiSchema['ui:title'] || title) {
      // Title field renders 'legend'
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
      <div>
        { this.renderTitleField() }
        { this.renderDescriptionField() }
        {properties.map(prop => prop.content)}
      </div>
    );
  }
}

export default ObjectFieldTemplate;
