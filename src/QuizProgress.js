import React from 'react';

class QuizProgress extends React.PureComponent {
  render() {
    return (
      <div className="progress">
        <h3>
          Answered {this.props.answered} out of {this.props.completed}
        </h3>
      </div>
    );
  }
}

export default QuizProgress;