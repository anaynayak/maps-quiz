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
import flatMap from 'lodash/flatMap';
import Sources from './Sources';
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { questions: [], source: Sources.WORLD };
  }

  componentDidMount() {
    return fetch(this.state.source.url)
      .then(r => r.json())
      .then(d =>
        flatMap(d.objects, a =>
          a.geometries.map(g => g.properties[this.state.source.prop])
        )
      )
      .then(names => {
        this.setState({
          questions: new Questions(names, this.state.source.question).allq()
        });
      });
  }
  onComplete(val, actual) {
    if (val === actual) {
      NotificationManager.success(`${val} is the correct answer!`, null, 500);
    } else {
      NotificationManager.warning(
        `${val} is incorrect. ${actual} is the right answer.`,
        null,
        500
      );
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
        <MapChart
          selected={question && question.answer}
          source={this.state.source}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
