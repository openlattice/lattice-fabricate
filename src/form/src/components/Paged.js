// @flow
import {
  useReducer,
  useRef
} from 'react';
import type { Node } from 'react';

import isFunction from 'lodash/isFunction';

type Props = {
  initialFormData ?:Object;
  page ?:number;
  render :(...props :any) => Node;
  onPageChange ?:(currentPage :number, formData :Object) => void;
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
      const { page, formData } = action;
      return { ...state, page, pagedData: formData };
    }

    default:
      return state;
  }
};

const Paged = (props :Props) => {
  const {
    initialFormData,
    onPageChange,
    page = 0,
    render,
  } = props;

  const [state, dispatch] = useReducer(reducer, { page, pagedData: initialFormData });
  const formRef = useRef();

  const { page: currentPage, pagedData } = state;

  const onBack = () => {
    const newPageNumber = currentPage - 1;
    const formData = getCurrentFormData(formRef, pagedData);
    dispatch({ type: 'page', page: newPageNumber, formData });
    if (isFunction(onPageChange)) onPageChange(newPageNumber, formData);
  };

  const onNext = () => {
    const newPageNumber = currentPage + 1;
    const formData = getCurrentFormData(formRef, pagedData);
    dispatch({ type: 'page', page: newPageNumber, formData });
    if (isFunction(onPageChange)) onPageChange(newPageNumber, formData);
  };

  const validateAndSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return render({
    formRef,
    pagedData,
    page: currentPage,
    onBack,
    onNext,
    validateAndSubmit
  });
};

export default Paged;
