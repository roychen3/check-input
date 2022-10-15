import React, { useState } from 'react';

const CheckInputForIOS = () => {
  const [value, setValue] = useState('');
  const [isKedown, setIsKedown] = useState(false);
  const [keyDownKey, setKeyDownKey] = useState('');

  const handleChange = (event) => {
    setValue((prevValue) => {
      const re = new RegExp(
        /[^A-Za-z0-9\u4E00-\u9FFF\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/,
        'g'
      );
      if (isKedown && (event.target.value.match(re) || keyDownKey.match(re))) {
        if (prevValue.length - 1 === event.target.value.length) {
          return prevValue;
        }

        if (keyDownKey.match(re) && event.target.value.match(re)) {
          const filteredValue = event.target.value.replaceAll(re, '');
          return filteredValue;
        }

        const filteredValue = event.target.value.replaceAll(re, '');
        return filteredValue;
      } else {
        const filteredValue = event.target.value.replaceAll(re, '');
        return filteredValue;
      }
    });
  };

  const handleKeyDown = (event) => {
    setIsKedown(true);
    setKeyDownKey(event.key);
  };
  const handleKeyUp = () => {
    setIsKedown(false);
  };

  return (
    <>
      <h1>Check Input Text For IOS</h1>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <p>只能輸入中文、英文、數字</p>
    </>
  );
};

export default CheckInputForIOS;
