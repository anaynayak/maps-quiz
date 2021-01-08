import React from 'react';

class Answer extends React.PureComponent {
  render() {
    return (
      <button
        className={this.props.focused ? 'button' : 'button-outline'}
        onClick={this.props.onClick}
      >
        {this.props.val}
      </button>
    );
  }
}

export default Answer;
