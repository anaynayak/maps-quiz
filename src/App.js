import React from 'react';
import './App.css';
import MapChart from './MapChart';
import { initNavigation } from '@noriginmedia/react-spatial-navigation';
import QuestionFocusable from './Question';

function App() {
  initNavigation({
    // debug: true,
    // visualDebug: true
  });
  const question = {
    name: 'Identify the country',
    options: ['India', 'China', 'USA', 'Russia'],
    answer: 'India'
  };
  return (
    <div className="App">
      <QuestionFocusable focusable={false} question={question} />
      <MapChart selected="India" />
    </div>
  );
}

export default App;
