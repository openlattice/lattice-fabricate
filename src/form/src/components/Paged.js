// @flow
import { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';

import isFunction from 'lodash/isFunction';

type Props = {
  initialFormData ?:Object;
  initialPage ?:number;
  render :(...props :any) => Node;
  onPageChange ?:(page :number) => void;
};

const Paged = (props :Props) => {
  const {
    initialFormData,
    onPageChange,
    initialPage = 0,
    render,
  } = props;

  const [page, setPage] = useState(initialPage);
  const [pagedData, setFormData] = useState(initialFormData);
  const formRef = useRef();

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage, onPageChange]);

  const onBack = () => {
    if (formRef.current) {
      const {
        state: {
          formData
        } = {}
      } = formRef.current;
      setFormData({ ...pagedData, ...formData });
    }
    const newPageNumber = page - 1;
    setPage(newPageNumber);
    if (isFunction(onPageChange)) onPageChange(newPageNumber);
  };

  const onNext = ({ formData }) => {
    const newFormData = { ...pagedData, ...formData };
    const newPageNumber = page + 1;

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
    pagedData,
    page,
    onBack,
    onNext,
    validateAndSubmit
  });
};

export default Paged;
