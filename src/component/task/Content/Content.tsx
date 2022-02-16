import React from "react";
import "./StyleContent.css";
import { contentProps } from "../../../screen/Form/Form";
 const Content=(props:contentProps)=>
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
        placeholder={props.placeholder}
        value={props.content}
      />   
       :
       <input
       className="content"
       placeholder={props.placeholder}
       onKeyUp={taskInput}
     />}
      
       </>
   )
}
export default Content;