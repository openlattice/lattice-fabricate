// @flow
import { useRef, useState } from 'react';
import type { Node } from 'react';

import isFunction from 'lodash/isFunction';

type Props = {
  initialFormData ?:Object;
  page ?:number;
  render :(...props :any) => Node;
  onPageChange :(page :number) => void;
};

const Paged = (props :Props) => {
  const {
    initialFormData,
    onPageChange,
    page = 0,
    render,
  } = props;

  const [currentPage, setPage] = useState(page);
  const [pagedData, setFormData] = useState(initialFormData);
  const formRef = useRef();

  const onBack = () => {
    if (formRef.current) {
      const {
        state: {
          formData
        } = {}
      } = formRef.current;
      setFormData({ ...pagedData, ...formData });
    }
    const newPageNumber = currentPage - 1;
    setPage(newPageNumber);
    if (isFunction(onPageChange)) onPageChange(newPageNumber);
  };

  const onNext = ({ formData }) => {
    const newFormData = { ...pagedData, ...formData };
    const newPageNumber = currentPage + 1;

    setFormData(newFormData);
    setPage(newPageNumber);
    if (isFunction(onPageChange)) onPageChange(newPageNumber);
  };

  const validateAndSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return render({
    formRef,
    onBack,
    onNext,
    page: currentPage,
    pagedData,
    validateAndSubmit
  });
};

export default Paged;
