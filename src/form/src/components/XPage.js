// @flow
import {
  useEffect,
  useReducer,
  useRef
} from 'react';
import type { Node } from 'react';

import isFunction from 'lodash/isFunction';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

type Props = {
  initialFormData ?:Object;
  machine :Machine;
  machineOptions ?:Object;
  page ?:string;
  render :(...props :any) => Node;
  onPageChange ?:(pageName :string, formData :Object) => void;
};

const getCurrentFormData = (formRef :Object, defaultFormData :Object) => {
  let newPagedData = defaultFormData;
  if (formRef.current) {
    const {
      state: {
        formData
      } = {}
    } = formRef.current;
    newPagedData = formData;
  }

  return newPagedData;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'page': {
      const { formData } = action;
      return { ...state, pagedData: formData };
    }

    default:
      return state;
  }
};

const XPage = (props :Props) => {
  const {
    initialFormData,
    machine,
    machineOptions,
    onPageChange,
    render,
  } = props;

  const [state, dispatch] = useReducer(reducer, { pagedData: initialFormData });
  const [machineState, send] = useMachine(machine, machineOptions);
  const formRef = useRef();

  useEffect(() => {
    if (isFunction(onPageChange)) onPageChange(machineState.value, state.pagedData);
  }, [machineState.value, state.pagedData, onPageChange]);

  const { pagedData } = state;

  const onBack = () => {
    const formData = getCurrentFormData(formRef, pagedData);
    dispatch({ type: 'page', formData });
    send('PREV');
    if (formRef.current) {
      const { formElement } = formRef.current;
      if (formElement.scrollIntoView) formElement.scrollIntoView();
    }
  };

  const onNext = () => {
    const formData = getCurrentFormData(formRef, pagedData);
    dispatch({ type: 'page', formData });
    send('NEXT');
    if (formRef.current) {
      const { formElement } = formRef.current;
      if (formElement.scrollIntoView) formElement.scrollIntoView();
    }
  };

  const validateAndSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return render({
    formRef,
    machineState,
    onBack,
    onNext,
    page: machineState.value,
    pagedData,
    validateAndSubmit
  });
};

export default XPage;
