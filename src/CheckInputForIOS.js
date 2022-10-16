import React, { useState } from 'react';

const re = new RegExp(
  /[^A-Za-z0-9\u4E00-\u9FFF\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/,
  'g'
);

const CheckInputForIOS = () => {
  const [value, setValue] = useState('');
  const [isPrevValueMatch, setIsPrevValueMatch] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const handleChange = (event) => {
    if (isComposing) {
      setValue(event.target.value);
    } else {
      setValue((prevValue) => {
        if (
          isPrevValueMatch &&
          !event.target.value.match(re) &&
          prevValue.length - 1 === event.target.value.length
        ) {
          return prevValue;
        } else {
          const filteredValue = event.target.value.replaceAll(re, '');
          return filteredValue;
        }
      });
    }
    setIsPrevValueMatch(!!event.target.value.match(re));
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  const handleCompositionEnd = (event) => {
    const filteredValue = event.data.replaceAll(re, '');
    setValue((prev) => prev.replace(event.data, filteredValue));
    setIsComposing(false);
  };

  return (
    <>
      <h1>Check Input Text For IOS</h1>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <p>只能輸入中文、英文、數字</p>
    </>
  );
};

export default CheckInputForIOS;
