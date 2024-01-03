import React from 'react';
import { useToasts } from 'react-toast-notifications';

const TestToast = () => {
  const { addToast } = useToasts();

  const handleTestToast = () => {
    addToast('This is a test toast message!', { appearance: 'success' });
  };

  return (
    <div>
      <button onClick={handleTestToast}>Trigger Test Toast</button>
    </div>
  );
};

export default TestToast;
