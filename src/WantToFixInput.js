import React, { useState } from 'react';

const WantToFixInput = () => {
  const [value, setValue] = useState('');
  const [eventTargetValue, setEventTargetValue] = useState('');
  const [traceEventTargetValue, setTraceEventTargetValue] = useState([]);
  const [traceEventKeydown, setTraceEventKeydown] = useState([]);
  // const [eventTargetValueLength, setEventTargetValueLength] = useState(0);

  const handleChange = (event) => {
    console.log('handleChange');

    const filteredValue = event.target.value.replaceAll(/[\sãâ-]/g, '');
    setValue(filteredValue);

    setEventTargetValue(event.target.value.replaceAll(' ', '\\s'));
    const newTraceValues = [...traceEventTargetValue];
    newTraceValues.push(event.target.value.replaceAll(' ', '\\s'));
    setTraceEventTargetValue(newTraceValues);
  };

  const handleKeyDown = (event) => {
    console.log('handleKeyDown');
    const newTraceValues = [...traceEventKeydown];
    newTraceValues.push(event.code + '; ' + event.key);
    setTraceEventKeydown(newTraceValues);
  };

  return (
    <div>
      <h1>Want To Fix Check Input Text</h1>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <p>can't not input `/[\sãâ-]/g`.</p>

      <p>event.target.value: {eventTargetValue}</p>
      <p>trace event.target.value:</p>
      <div>length: {traceEventTargetValue.length}</div>
      {traceEventTargetValue.map((value, idx) => (
        <div key={idx}>
          {idx + 1} {value}
        </div>
      ))}
      <p>trace Keydown event:</p>
      <div>length: {traceEventKeydown.length}</div>
      {traceEventKeydown.map((value, idx) => (
        <div key={idx}>
          {idx + 1} {value}
        </div>
      ))}
    </div>
  );
};

WantToFixInput.propTypes = {};

export default WantToFixInput;
