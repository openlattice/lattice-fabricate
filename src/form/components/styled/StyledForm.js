import styled from 'styled-components';
import Form from 'react-jsonschema-form';
import { Colors } from 'lattice-ui-kit';

const { NEUTRALS, WHITE } = Colors;

const StyledForm = styled(Form)`
  position: relative;
  background-color: ${WHITE};
  border: solid 1px ${NEUTRALS[4]};
  border-radius: 5px;
  margin: 20px 0;
  /* styles for default nested elements provided by RJSF */

  legend {
    line-height: normal;
    font-size: 16px;
    grid-column: 1 / -1;
  }

  label.control-label {
    font-size: 14px;
    line-height: normal;
    margin-bottom: 10px;
  }

  /*
    parent object is a grid container
    cannot normally assign through uiSchema
  */

  > div.form-group.field.field-object > :first-child {
    display: grid;
    grid-template-columns: repeat(12, 1fr);

    & > * {
      border-bottom: 1px solid ${NEUTRALS[4]};
      padding: 30px;
    }

    & > *:last-child {
      border-bottom: 0;
    }

    & > legend {
      line-height: normal;
      font-size: 18px;
      border-bottom: 0;
      padding-bottom: 0;
      margin: 0;
    }
  }

  .column-span-1 {
    grid-column: auto / span 1;
  }

  .column-span-2 {
    grid-column: auto / span 2;
  }

  .column-span-3 {
    grid-column: auto / span 3;
  }

  .column-span-4 {
    grid-column: auto / span 4;
  }

  .column-span-5 {
    grid-column: auto / span 5;
  }

  .column-span-6 {
    grid-column: auto / span 6;
  }

  .column-span-7 {
    grid-column: auto / span 7;
  }

  .column-span-8 {
    grid-column: auto / span 8;
  }

  .column-span-9 {
    grid-column: auto / span 9;
  }

  .column-span-10 {
    grid-column: auto / span 10;
  }

  .column-span-11 {
    grid-column: auto / span 11;
  }

  .column-span-12 {
    grid-column: auto / span 12;
  }

  .grid-container {
    display: flex;

    > :first-child {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-gap: 20px 30px;
      width: 100%;
    }
  }
`;

export default StyledForm;
