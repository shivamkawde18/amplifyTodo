import React from "react"
import "./StyleName.css";
import { nameProps } from "../../../screen/Form/Form";
const Name=(props:nameProps)=>{
    const nameInput = (e: any): void => {
        console.log(e.target.value);
        props.setName(e.target.value);
      };
    return(
         <>{props.flag==="list"?
            <input
                className="name"
                placeholder={props.placeholder}
                value={props.name}
              ></input>
              :
              <input
              className="name"
              placeholder={props.placeholder}
              onKeyUp={nameInput}
            ></input>
    
    }
         </>
    )
}
export default Name;