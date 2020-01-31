/*
 * @flow
 */

import React, { useCallback, useEffect, useRef } from 'react';

import SignatureCanvas from 'react-signature-canvas';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Colors, IconButton } from 'lattice-ui-kit';

import { DATA_URL_IMG_PNG_PREFIX, tryConvertingToDataURL } from './SignatureUtils';

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
  disabled :boolean;
  onChange :(data :string | void) => void;
  value :?string;
};

const SignatureWidget = (props :Props) => {

  const { disabled, onChange, value } = props;
  const signatureCanvasRef :{ current :?SignatureCanvas } = useRef();

  useEffect(() => {
    const { current } = signatureCanvasRef;
    if (current) {
      if (disabled) {
        current.off();
      }
      else {
        current.on();
      }
      if (value) {
        const valueAsDataURL = tryConvertingToDataURL(value);
        current.fromDataURL(valueAsDataURL);
      }
    }
  }, [disabled, signatureCanvasRef, value]);

  const handleOnChange = useCallback(() => {
    const { current } = signatureCanvasRef;
    if (current) {
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
      const dataUrl :string = current.toDataURL(); // default is "image/png"
      onChange(dataUrl.slice(DATA_URL_IMG_PNG_PREFIX.length));
    }
  }, [onChange, signatureCanvasRef]);

  const handleOnClear = useCallback(() => {
    const { current } = signatureCanvasRef;
    if (current) {
      current.clear();
      onChange();
    }
  }, [onChange, signatureCanvasRef]);

  return (
    <CanvasWrapper>
      <SignatureCanvas onEnd={handleOnChange} ref={signatureCanvasRef} />
      <ClearButton disabled={disabled} icon={ClearIcon} mode="subtle" onClick={handleOnClear} />
    </CanvasWrapper>
  );
};

export default SignatureWidget;
