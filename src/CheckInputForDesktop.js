import React, { useState } from 'react';

const CheckInputForDesktop = (props) => {
  const [isComposing, setIsComposing] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    if (isComposing) {
      setValue(event.target.value);
    } else {
      const filteredValue = event.target.value.replaceAll(/[\s。—-]/g, '');
      setValue(filteredValue);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  const handleCompositionEnd = (event) => {
    const filteredValue = event.data.replaceAll(/[\s。—-]/g, '');
    setValue((prev) => prev.replace(event.data, filteredValue));
    setIsComposing(false);
  };

  return (
    <>
      <h1>Check Input Text For Desktop</h1>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <p>can't not input `/[\s。—-]/g`.</p>
    </>
  );
};

CheckInputForDesktop.propTypes = {};

export default CheckInputForDesktop;
