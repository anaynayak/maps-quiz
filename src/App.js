import React from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import MapChart from './MapChart';
import Question from './Question';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import Questions from './Questions';
import flatMap from 'lodash/flatMap';
import Sources from './Sources';
import QuizProgress from './QuizProgress';
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questions: [{ loading: true }],
      source: Sources.default(),
      stats: { answered: 0, completed: 0 }
    };
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
        const questions = new Questions(
          names,
          this.state.source.question
        ).allq();
        this.setState({
          questions: questions
        });
        console.table(questions);
      });
  }
  onComplete(val, actual) {
    let { answered, completed } = this.state.stats;
    if (val === actual) {
      answered += 1;
      NotificationManager.success(`${val} is the correct answer!`, null, 1500);
    } else {
      NotificationManager.warning(
        `${val} is incorrect. ${actual} is the right answer.`,
        null,
        1500
      );
    }
    completed += 1;
    this.setState({
      questions: this.state.questions.slice(1),
      stats: { answered: answered, completed: completed }
    });
  }

  render() {
    const question = this.state.questions[0];
    const onComplete = this.onComplete.bind(this);
    return (
      <div className="App">
        {question && !question.loading && (
          <Question question={question} onComplete={onComplete} />
        )}
        {!question && <h3>Congratulations! You have completed the quiz</h3>}
        <MapChart
          selected={question && question.answer}
          source={this.state.source}
        />
        <NotificationContainer />
        <QuizProgress
          answered={this.state.stats.answered}
          completed={this.state.stats.completed}
          done={this.state.questions.length === 0}
        />
      </div>
    );
  }
}

export default App;
