import React from "react";
import Child2 from "./Child2";

const Child = (props) => {
  console.log("Child.js ran");
  return (
    <>
      <Child2></Child2>
    </>
  );
};

export default React.memo(Child);
