import React from "react";
import "./Style.css"
const Category=(props:any)=>{
    return(
        <>
         <b>Task Category</b>
        {props.category.map((e:any)=>{
                  if(props.task.categoryId===e.id)
                  {
                    return(
                    <div className="categoryDiv">
                      <p>Task Type: {e.type}</p>
                      <p>Task Priority: {e.flag}</p>
                      <p>Completion Date: {e.endingTime}</p>
                    </div>
                    )
                  }
                })}
           
        </>
    )

}
export default Category;