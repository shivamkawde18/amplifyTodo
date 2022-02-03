import React from "react";
function Button(props:any)
{
     console.log(props);
     
    return(
        <>
          <button className="addTask" onClick={()=>{
                 if(props.flag=="delete")
                 props.deleteTask(props.task)
                 else
                 props.createTodoLocal();
              }}>{props.flag}</button>
        </>

    );

}
export default Button;