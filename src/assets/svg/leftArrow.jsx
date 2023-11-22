import * as React from "react";

function LeftArrow(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={props.color ? props.color : "black"}
      height={props.width ? props.width : "30px"}
      width={props.width ? props.width : "30px"}
      {...props}
    >
      <path d="M19 21a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14zM12 7v4h5v2h-5v4l-5-5 5-5z" />
    </svg>
  );
}

export default LeftArrow;
