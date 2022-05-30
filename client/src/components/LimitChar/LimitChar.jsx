import React from "react";

const LimitChar = (props) => {
  return (
    <div>
      {props.word && props.word.length > props.limit
        ? props.word.substring(0, props.limit) + "..."
        : props.word}
    </div>
  );
};

export default LimitChar;
