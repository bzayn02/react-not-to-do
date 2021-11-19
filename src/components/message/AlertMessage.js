import React from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const AlertMessage = () => {
  const { status, message } = useSelector((state) => state.task);

  return (
    message && (
      <Alert variant={status === 'success' ? 'success' : 'danger'}>
        {message}
      </Alert>
    )
  );
};
