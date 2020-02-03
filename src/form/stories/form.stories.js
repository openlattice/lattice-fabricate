import React, { useRef } from 'react';

import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Button, Card, CardSegment } from 'lattice-ui-kit';

import FormContainer from './FormContainer';
import { schema as arraySchema, uiSchema as arrayUiSchema } from './constants/arraySchemas';
import { schema as filesSchema, uiSchema as filesUiSchema } from './constants/fileSchemas';
import { machineOptions, pageMachine } from './constants/pageMachine';
import {
  schemas,
  uiSchemas,
  xschemas,
  xuiSchemas
} from './constants/pagedSchemas';
import { schema as simpleSchema, uiSchema as simpleUiSchema } from './constants/simpleSchemas';

import Form from '..';
import Paged from '../src/components/Paged';
import XPage from '../src/components/XPage';

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
  .addDecorator((storyFn) => (
    <Card>
      {storyFn()}
    </Card>
  ))
  .add('Simple', () => (
    <Form
        onSubmit={action('Submit Form')}
        schema={simpleSchema}
        uiSchema={simpleUiSchema} />
  ))
  .add('Array', () => (
    <Form
        onSubmit={action('Submit Form')}
        schema={arraySchema}
        uiSchema={arrayUiSchema} />
  ))
  .add('Data Processing w/ Edits & Delete', () => (
    <FormContainer submitAction={action('Submit Form')} />
  ))
  .add('Files', () => (
    <Form
        schema={filesSchema}
        uiSchema={filesUiSchema}
        onSubmit={action('Submit Form')} />
  ))
  .add('External Submit', () => {
    const formRef = useRef();
    return (
      <>
        <CardSegment>
          <Button mode="primary" onClick={() => formRef.current.submit()}>External Submit</Button>
        </CardSegment>
        <Form
            hideSubmit
            ref={formRef}
            schema={simpleSchema}
            uiSchema={simpleUiSchema}
            onSubmit={action('Submit Form')} />
      </>
    );
  })
  .add('Paged', () => (
    <Paged
        onPageChange={action('Page Change')}
        render={(props) => {
          const {
            formRef,
            pagedData,
            page,
            onBack,
            onNext,
            validateAndSubmit,
          } = props;

          const totalPages = 4;
          const isLastPage = page === totalPages - 1;

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
                        schema={schemas[page]}
                        uiSchema={uiSchemas[page]} />
                  )
              }
              <ActionRow>
                <Button
                    disabled={!(page > 0)}
                    onClick={onBack}>
                    Back
                </Button>
                <span>{`${page + 1} of ${totalPages}`}</span>
                <Button
                    mode="primary"
                    onClick={handleNext}>
                  { isLastPage ? 'Complete Survey' : 'Next' }
                </Button>
              </ActionRow>
            </>
          );
        }} />
  ))
  .add('XPage', () => (
    <XPage
        machine={pageMachine}
        machineOptions={machineOptions}
        onPageChange={action('Page Change')}
        render={(props) => {
          const {
            formRef,
            pagedData,
            page,
            onBack,
            onNext,
            validateAndSubmit,
          } = props;

          const isInitialPage = page === pageMachine.initialState.value;
          const isReviewPage = page === 'review';

          const handleNext = isReviewPage
            ? action('Submit Form')
            : validateAndSubmit;

          return (
            <>
              {
                isReviewPage
                  ? <ReviewBody>{JSON.stringify(pagedData)}</ReviewBody>
                  : (
                    <Form
                        formData={pagedData}
                        hideSubmit
                        ref={formRef}
                        onSubmit={onNext}
                        schema={xschemas[page]}
                        uiSchema={xuiSchemas[page]} />
                  )
              }
              <ActionRow>
                <Button
                    disabled={isInitialPage}
                    onClick={onBack}>
                    Back
                </Button>
                <Button
                    mode="primary"
                    onClick={handleNext}>
                  { isReviewPage ? 'Complete Survey' : 'Next' }
                </Button>
              </ActionRow>
            </>
          );
        }} />
  ));
