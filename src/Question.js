import withFocusable from '@noriginmedia/react-spatial-navigation/dist/withFocusable';
import React from 'react';
import AnswerFocusable from './Answer';
class Question extends React.PureComponent {
  componentDidMount() {
    this.props.setFocus();
  }

  validate({ val }, details) {
    this.props.onComplete(val, this.props.question.answer);
  }

  render() {
    this.props.setFocus();
    const { name, options } = this.props.question;
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
