import React from "react"
import "../Name/StyleName.css";
function Name(props:any){
    const nameInput = (e: any): void => {
        console.log(e.target.value);
        props.setName(e.target.value);
      };
    return(
         <>{props.flag==="list"?
            <input
                className="name"
                placeholder="Enter your name"
                value={props.name}
              ></input>
              :
              <input
              className="name"
              placeholder="Enter your name"
              onKeyUp={nameInput}
            ></input>
    
    }
         </>
    )
}
export default Name;