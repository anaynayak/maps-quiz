import React from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import MapChart from './MapChart';
import { initNavigation } from '@noriginmedia/react-spatial-navigation';
import QuestionFocusable from './Question';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';

function onComplete(val, success) {
  if (success) {
    NotificationManager.success(`${val} is the correct answer!`, null, 500);
  } else {
    NotificationManager.warning(`${val} is wrong answer!`, null, 500);
  }
}
function App() {
  initNavigation();
  const question = {
    name: 'Identify the country',
    options: ['India', 'China', 'USA', 'Russia'],
    answer: 'India'
  };
  return (
    <div className="App">
      <QuestionFocusable
        focusable={false}
        question={question}
        onComplete={onComplete}
      />
      <MapChart selected="India" />
      <NotificationContainer />
    </div>
  );
}

export default App;
