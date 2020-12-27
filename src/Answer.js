import React from 'react';
import { withFocusable } from '@noriginmedia/react-spatial-navigation';

const Answer = ({ answer }) => {
  return <div focusable="true">{answer}</div>;
};
const FocusableComponent = withFocusable({
  trackChildren: false,
  forgetLastFocusedChild: true
})(Answer);

export default FocusableComponent;
