import React from 'react';
import Answer from './Answer';

const Question = ({ question }) => {
  const { name, options, answer } = question;
  function validate(m) {
    console.log(`Clicked ${m} ${answer}`);
  }
  return (
    <div className="questions">
      <p>{name}</p>
      {options.map((m, i) => (
        <Answer key={m} focusable="true" focusKey={m} answer={m} />
      ))}
    </div>
  );
};

export default Question;
