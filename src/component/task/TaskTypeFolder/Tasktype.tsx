import React from "react";
import "./Style.css";
const Tasktype = (props: any) => {
  return (
    <>
      <select
        className="typeOption"
        onChange={(e) => {
          console.log(e.currentTarget.value);
          props.flag === "taskType"
            ? props.setTaskType(e.currentTarget.value)
            : props.setTaskPriority(e.currentTarget.value);
        }}
      >
        {props.optionPlaceHolder.map((placeHolder: string) => {
          return <option>{placeHolder}</option>;
        })}
      </select>
    </>
  );
};
export default Tasktype;
