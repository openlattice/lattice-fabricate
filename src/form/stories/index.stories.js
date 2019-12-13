import React, { useRef } from 'react';

import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Button, Card, CardSegment } from 'lattice-ui-kit';

import FormContainer from './FormContainer';
import { schema as arraySchema, uiSchema as arrayUiSchema } from './constants/arraySchemas';
import { schema as filesSchema, uiSchema as filesUiSchema } from './constants/fileSchemas';
import { schemas, uiSchemas } from './constants/pagedSchemas';
import { schema as simpleSchema, uiSchema as simpleUiSchema } from './constants/simpleSchemas';

import Form from '..';
import Paged from '../src/components/Paged';

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 30px 30px;
`;

const ReviewBody = styled.div`
  padding: 30px 30px 30px;
`;

storiesOf('Form', module)
  .add('Simple', () => (
    <Card>
      <Form
          onSubmit={action('Submit Form')}
          schema={simpleSchema}
          uiSchema={simpleUiSchema} />
    </Card>
  ))
  .add('Array', () => (
    <Card>
      <Form
          onSubmit={action('Submit Form')}
          schema={arraySchema}
          uiSchema={arrayUiSchema} />
    </Card>
  ))
  .add('Data Processing w/ Edits & Delete', () => (
    <Card>
      <FormContainer submitAction={action('Submit Form')} />
    </Card>
  ))
  .add('Files', () => (
    <Card>
      <Form
          schema={filesSchema}
          uiSchema={filesUiSchema}
          onSubmit={action('Submit Form')} />
    </Card>
  ))
  .add('External Submit', () => {
    const formRef = useRef();
    return (
      <Card>
        <CardSegment>
          <Button mode="primary" onClick={() => formRef.current.submit()}>External Submit</Button>
        </CardSegment>
        <Form
            hideSubmit
            ref={formRef}
            schema={simpleSchema}
            uiSchema={simpleUiSchema}
            onSubmit={action('Submit Form')} />
      </Card>
    );
  })
  .add('Paged', () => (
    <Card>
      <Paged
          onPageChange={action('Page Change')}
          render={(props) => {
            const {
              formRef,
              pagedData,
              currentPage,
              onBack,
              onNext,
              validateAndSubmit,
            } = props;

            const totalPages = 4;
            const isLastPage = currentPage === totalPages - 1;

            const handleNext = isLastPage
              ? action('Submit Form')
              : validateAndSubmit;

            return (
              <>
                {
                  isLastPage
                    ? <ReviewBody>{JSON.stringify(pagedData)}</ReviewBody>
                    : (
                      <Form
                          formData={pagedData}
                          hideSubmit
                          ref={formRef}
                          onSubmit={onNext}
                          schema={schemas[currentPage]}
                          uiSchema={uiSchemas[currentPage]} />
                    )
                }
                <ActionRow>
                  <Button
                      disabled={!(currentPage > 0)}
                      onClick={onBack}>
                      Back
                  </Button>
                  <span>{`${currentPage + 1} of ${totalPages}`}</span>
                  <Button
                      mode="primary"
                      onClick={handleNext}>
                    { isLastPage ? 'Complete Survey' : 'Next' }
                  </Button>
                </ActionRow>
              </>
            );
          }} />
    </Card>
  ));
