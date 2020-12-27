import withFocusable from '@noriginmedia/react-spatial-navigation/dist/withFocusable';
import React from 'react';
import AnswerFocusable from './Answer';
class Question extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onPressKey = this.onPressKey.bind(this);
  }

  componentDidMount() {
    this.props.setFocus();

    window.addEventListener('keydown', this.onPressKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressKey);
  }

  onPressKey(event) {
    if (event.keyCode === 8) {
      this.props.setFocus();
    }
  }

  validate({ val }, details) {
    console.log(
      `Clicked ${JSON.stringify(val)}, ${this.props.question.answer}`
    );
  }

  render() {
    const { name, options, answer } = this.props.question;
    const validate = this.validate.bind(this);
    return (
      <div className="questions">
        <h3>{name}</h3>
        {options.map((m, i) => (
          <AnswerFocusable
            key={m}
            focusKey={`MENU-${m}`}
            val={m}
            onEnterPress={validate}
          />
        ))}
      </div>
    );
  }
}

const QuestionFocusable = withFocusable({
  trackChildren: true
})(Question);

export default QuestionFocusable;
