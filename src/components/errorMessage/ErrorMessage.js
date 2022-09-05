import React from 'react';
import error from './error.gif';

const ErrorMessage = () => {
  return (
    <div className="error__box">
      <img src={error} alt="error" />
    </div>
  );
};

export default ErrorMessage;
