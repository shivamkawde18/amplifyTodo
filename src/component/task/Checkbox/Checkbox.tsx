import React from "react";
import "./StyleCheckbox.css";
const Inputcheckbox=(props: any)=> {
  return (
    <>
      <input
        type="checkbox"
        className="check"
        checked={props.check}
        onChange={() => {
          console.log(props);
          props.setButtonId(props.task.id);
          props.setDeleteLoading(true);
          if (props.flag == "form") props.checkFlag();
          else props.InputCheckBox(props.task);
        }}
      />
    </>
  );
}
export default Inputcheckbox;
