import React, { FunctionComponent, SyntheticEvent, useCallback } from 'react';

interface Form {
  onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
}

export const Form: FunctionComponent<Form> = (props) => {
  const { onSubmit, children } = props;
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(e);
    },
    [onSubmit]
  );

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default Form;
