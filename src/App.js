import React from 'react';
import './App.css';
import 'react-notifications-component/dist/theme.css';
import MapChart from './MapChart';
import Question from './Question';
import ReactNotification, { store } from 'react-notifications-component';
import Questions from './Questions';
import Sources from './Sources';
import QuizProgress from './QuizProgress';

const notification = {
  type: 'success',
  insert: 'top',
  container: 'top-full',
  message: 'foo',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 1500
  }
};
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questions: [{ loading: true }],
      topo: [],
      source: Sources.default(),
      total: 1,
      stats: { answered: 0, completed: 0 }
    };
  }

  componentDidMount() {
    return fetch(this.state.source.url)
      .then(r => r.json())
      .then(d => {
        const questions = Questions.from(
          d,
          this.state.source.question,
          this.state.source.prop
        ).allq();
        this.setState({
          topo: d,
          questions: questions,
          total: questions.length
        });
      });
  }
  onComplete(val, actual) {
    let { answered, completed } = this.state.stats;
    if (val === actual) {
      answered += 1;
      this.notify({
        message: `${val} is the correct answer!`
      });
    } else {
      this.notify({
        type: 'warning',
        message: `${val} is incorrect. ${actual} is the right answer.`
      });
    }
    completed += 1;
    this.setState({
      stats: { answered: answered, completed: completed }
    });
  }

  notify(args) {
    store.addNotification({
      ...notification,
      ...args
    });
  }
  render() {
    const question = this.state.questions[this.state.stats.completed];
    const onComplete = this.onComplete.bind(this);
    return (
      <div className="App">
        <ReactNotification />
        {question && !question.loading && (
          <Question question={question} onComplete={onComplete} />
        )}
        {!question && <h3>Congratulations! You have completed the quiz</h3>}
        <MapChart
          selected={question && question.answer}
          topojson={this.state.topo}
          source={this.state.source}
        />
        <QuizProgress
          answered={this.state.stats.answered}
          completed={this.state.total}
          done={this.state.questions.length === 0}
        />
      </div>
    );
  }
}

export default App;
