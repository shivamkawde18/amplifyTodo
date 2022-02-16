import React from "react";
import { buttonProps } from "../../screen/Form/Form";
const Button=(props:buttonProps)=>
{
     console.log(props);
    return(
        <>
          <button className="addTask" onClick={()=>{
           
                 if(props.flag==="delete"){
                 props.setButtonId(props.task.id);
                 props.deleteTask(props.task)
                 props.setDeleteLoading(true);
                 }
                 else if(props.flag==="AddTask")
                  {
                     if(props.userName==""||props.userContent==""||props.date==""||props.taskType==""||props.taskPriority=="")
                     alert("Please Fill All Fields ");
                     else{
                    props.setTaskCreateLoading(true)
                    props.createTodoLocal();
                     }
                  }
                  
              }}>{props.flag}</button> 
        </>

    );

}
export default Button;