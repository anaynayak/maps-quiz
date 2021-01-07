import React from 'react';
import { Line } from 'rc-progress';

class QuizProgress extends React.PureComponent {
  render() {
    return (
      <div className="progress">
        <h3>
          <div>
            <Line
              percent={(this.props.answered * 100) / this.props.completed}
              strokeWidth="2"
              strokeColor="#3FC7FA"
            />
          </div>
          Score: {this.props.answered} / {this.props.completed}
          {this.props.done &&
            '⭐'.repeat(
              Math.round((this.props.answered * 5) / this.props.completed)
            )}
        </h3>
      </div>
    );
  }
}

export default QuizProgress;
