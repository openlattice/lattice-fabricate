/*
 * @flow
 */

import React, { Component } from 'react';

import SignatureCanvas from 'react-signature-canvas';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Colors, IconButton } from 'lattice-ui-kit';

import { DATA_URL_IMG_PNG_PREFIX, tryConvertingToDataURL } from './SignatureUtils';

import { isNonEmptyString } from '../../utils/LangUtils';

const { NEUTRALS } = Colors;

const CanvasWrapper = styled.div`
  height: 250px;
  position: relative;

  canvas {
    background-color: ${NEUTRALS[8]};
    border-radius: 3px;
    border: solid 1px ${NEUTRALS[4]};
    height: 100%;
    position: absolute;
    width: 100%;
  }
`;

const ClearIcon = (
  <FontAwesomeIcon icon={faTimes} />
);

const ClearButton = styled(IconButton)`
  color: ${NEUTRALS[0]};
  padding: 8px 10px; /* chosen specifically to produce 36x36 button */
  position: absolute;
  right: 10px;
  top: 10px;
`;

type Props = {
  disabled :boolean,
  value :string,
  onChange :(data :string | void) => void
};

class SignatureWidget extends Component<Props> {

  signatureCanvasRef :{ current :?SignatureCanvas } = React.createRef();

  componentDidUpdate(prevProps :Props) {
    const { disabled, value } = this.props;
    const { current } = this.signatureCanvasRef;
    if (disabled && current) {
      current.off();
    }
    else if (current) {
      current.on();
    }

    if (isNonEmptyString(value)) {
      const newCanvasValue :string = tryConvertingToDataURL(value);
      const prevCanvasValue :string = tryConvertingToDataURL(prevProps.value);
      if (newCanvasValue !== prevCanvasValue) {
        this.setCanvas(newCanvasValue);
      }
    }
  }

  handleClear = () => {
    const { onChange } = this.props;
    const { current } = this.signatureCanvasRef;
    if (current) {
      current.clear();
      onChange();
    }
  }

  setCanvas = (data :string) => {
    const { current } = this.signatureCanvasRef;
    if (current) {
      current.fromDataURL(data);
    }
  }

  handleChange = () => {
    const { onChange } = this.props;
    const { current } = this.signatureCanvasRef;
    if (current) {
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
      const dataUrl :string = current.toDataURL(); // default is "image/png"
      onChange(dataUrl.slice(DATA_URL_IMG_PNG_PREFIX.length));
    }
  }

  render() {

    const { disabled } = this.props;
    return (
      <CanvasWrapper>
        <SignatureCanvas onEnd={this.handleChange} ref={this.signatureCanvasRef} />
        <ClearButton disabled={disabled} icon={ClearIcon} mode="subtle" onClick={this.handleClear} />
      </CanvasWrapper>
    );
  }
}

export default SignatureWidget;
