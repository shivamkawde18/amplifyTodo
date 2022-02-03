import React from "react";
import "../Content/StyleContent.css";
function Content(props:any)
{
  const taskInput = (e: any): void => {
    console.log(e.target.value);
    props.setContent(e.target.value);
  };
   return(
       <>
       {props.flag==="list"?
        <input
        className="content"
        placeholder="what is your task ? "
        value={props.content}
      />   
       :
       <input
       className="content"
       placeholder="what is your task ? "
       onKeyUp={taskInput}
     />}
      
       </>
   )
}
export default Content;