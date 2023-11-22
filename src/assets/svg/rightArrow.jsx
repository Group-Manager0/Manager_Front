import * as React from "react";

function RightArrow(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={props.color ? props.color : "black"}
      height={props.width ? props.width : "30px"}
      width={props.width ? props.width : "30px"}
      {...props}
    >
      <path d="M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2zm4 6h5V7l5 5-5 5v-4H7v-2z" />
    </svg>
  );
}

export default RightArrow;
