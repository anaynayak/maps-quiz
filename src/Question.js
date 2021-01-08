import React from 'react';
import Answer from './Answer';
import SpatialNavigation, { Focusable } from 'react-js-spatial-navigation';

class Question extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focus: ''
    };
  }
  validate(val) {
    this.props.onComplete(val, this.props.question.answer);
  }

  onFocus(val) {
    this.setState({ focus: val });
  }

  render() {
    const { name, options } = this.props.question;
    const validate = this.validate.bind(this);
    const onFocus = this.onFocus.bind(this);
    return (
      <SpatialNavigation>
        <div className="questions">
          <h3>{name}</h3>
          {options.map((m, i) => (
            <Focusable
              key={`${name}-${m}`}
              onFocus={() => onFocus(m)}
              onClickEnter={() => validate(m)}
            >
              <Answer
                onClick={() => validate(m)}
                val={m}
                focused={this.state.focus === m}
              />
            </Focusable>
          ))}
        </div>
      </SpatialNavigation>
    );
  }
}
export default Question;
