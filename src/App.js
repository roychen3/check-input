import React from 'react';

import WantToFixInput from './WantToFixInput';
import CheckInputForIOS from './CheckInputForIOS';
// import CheckInputForDesktop from './CheckInputForDesktop';

const App = () => {
  return (
    <>
      {/* <WantToFixInput /> */}
      <CheckInputForIOS />
      {/* <CheckInputForDesktop /> */}
    </>
  );
};

App.propTypes = {};

export default App;
