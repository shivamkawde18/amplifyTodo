import React from "react";
import "./Style.css"
const Date=(props:any)=>{
    return(
        <>
        <div className="hideDiv">Task Completion Date</div>
        <input  type="date"  className="date" onChange={(e)=>{
            console.log(e.currentTarget.value);
            props.setDate(e.currentTarget.value);
            
        }}/>
        </>
    )

}
export default Date;