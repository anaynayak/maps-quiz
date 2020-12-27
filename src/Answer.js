import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

class Answer extends React.PureComponent {
  render() {
    return (
      <button className={this.props.focused ? 'button' : 'button-outline'}>
        {this.props.val}
      </button>
    );
  }
}

const AnswerFocusable = withFocusable()(Answer);

export default AnswerFocusable;
