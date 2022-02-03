import React from "react"
import "../Checkbox/StyleCheckbox.css"
function Inputcheckbox(props:any)
{
  return(
      <>
         <input type="checkbox" className="check" checked={props.check} onChange={()=>{
           console.log(props);
             if(props.flag=="form")
             props.checkFlag();
             else
             props.InputCheckBox(props.task);     
              }} />

      </>
  )
}
export default Inputcheckbox;