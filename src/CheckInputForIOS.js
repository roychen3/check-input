import React, { useState, useRef, useEffect } from 'react';

const re = new RegExp(
  /[^A-Za-z0-9\u4E00-\u9FFF\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/,
  'g'
);

const CheckInputForIOS = () => {
  const inputRef = useRef();

  const [selectionStart, setSelectionStart] = useState(-1);
  const [keyDownKey, setKeyDownKey] = useState('');
  const [isPaste, setIsPaste] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [value, setValue] = useState('');

  const handleKeyDown = (event) => {
    setKeyDownKey(event.key);
  };

  const handlePaste = () => {
    setIsPaste(true);
  };

  const handleBeforeInput = (event) => {
    if (
      !isPaste &&
      !isComposing &&
      (keyDownKey.match(re) || event.data.match(re))
    ) {
      event.preventDefault();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  const handleCompositionEnd = (event) => {
    const filteredValue = event.data.replaceAll(re, '');
    const newSelectionStart =
      event.target.selectionStart - (event.data.length - filteredValue.length);
    setSelectionStart(newSelectionStart);
    setValue((prev) => prev.replace(event.data, filteredValue));
    setIsComposing(false);
  };

  const handleChange = (event) => {
    if (isComposing) {
      setSelectionStart(-1);
      setValue(event.target.value);
    } else {
      setValue((prevValue) => {
        if (
          !isPaste &&
          keyDownKey.match(re) &&
          prevValue.length - 1 === event.target.value.length
        ) {
          setSelectionStart(-1);
          return prevValue;
        } else {
          const filteredValue = event.target.value.replaceAll(re, '');
          const newSelectionStart =
            event.target.selectionStart -
            (event.target.value.length - filteredValue.length);
          setSelectionStart(newSelectionStart);
          return filteredValue;
        }
      });
    }
    setIsPaste(false);
  };

  useEffect(() => {
    if (value && !isComposing && selectionStart >= 0) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(selectionStart, selectionStart);
    }
  }, [value, isComposing, selectionStart]);

  return (
    <div>
      <h1>Check Input Text For IOS</h1>
      <input
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBeforeInput={handleBeforeInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onChange={handleChange}
        ref={inputRef}
      />
      <p>只能輸入中文、英文、數字</p>
    </div>
  );
};

export default CheckInputForIOS;
