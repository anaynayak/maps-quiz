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
import Questions from './Questions';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { questions: new Questions().countries() };
  }

  onComplete(val, success) {
    if (success) {
      NotificationManager.success(`${val} is the correct answer!`, null, 500);
    } else {
      NotificationManager.warning(`${val} is wrong answer!`, null, 500);
    }
    this.setState({ questions: this.state.questions.slice(1) });
  }

  render() {
    initNavigation();

    const question = this.state.questions[0];
    const onComplete = this.onComplete.bind(this);
    return (
      <div className="App">
        {question && (
          <QuestionFocusable
            focusable={false}
            question={question}
            onComplete={onComplete}
          />
        )}
        {!question && <h3>Congratulations! You have completed the quiz</h3>}
        <MapChart selected={question && question.answer} />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
