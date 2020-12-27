import React from 'react';
import './App.css';
import MapChart from './MapChart';
import Question from './Question';
import {
  initNavigation,
  setKeyMap
} from '@noriginmedia/react-spatial-navigation';

function App() {
  initNavigation({
    debug: true,
    visualDebug: true
  });
  const question = {
    name: 'Identify the country',
    options: ['India', 'China', 'USA', 'Russia'],
    answer: 'India'
  };
  return (
    <div className="App">
      <Question question={question} />
      {/* <MapChart selected="India" /> */}
    </div>
  );
}

export default App;
