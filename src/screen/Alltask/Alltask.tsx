import * as React from "react";
import { task } from "../Form/Form";
import {useState} from "react";
import Checkbox from "../../component/task/Checkbox/Checkbox";
import Name from "../../component/task/Name/Name";
import Content from "../../component/task/Content/Content";
import Button from "../../component/Button/Button";
function Alltask(props: any) {
  const deleteTask=(e:any)=>{
    console.log(props.task);
    let temp: any[];
    let alldataStore=localStorage.getItem("tasks");
    if(alldataStore!=null)
    {
        let alldataParse=JSON.parse(alldataStore);
        temp=alldataParse;
    }
    else
    {
      temp=[]
    }
  console.log(temp);
 let finalArr =temp.filter((ele)=>{
   
     return ele.id!==e.id;
   }

 )
  console.log(finalArr);
  localStorage.setItem("tasks",JSON.stringify(finalArr))
  props.setAllTasks(finalArr);
  }
  const InputCheckBox=(task:any)=>{
    //console.log(props.check);
    let temp: any[];
    let alldataStore=localStorage.getItem("tasks");
    if(alldataStore!=null)
    {
        let alldataParse=JSON.parse(alldataStore);
        temp=alldataParse;
    }
    else
    {
      temp=[]
    }
  console.log(temp);
for(let i=0;i<temp.length;i++)
{
  if(task.id==temp[i].id)
  {
    if(temp[i].check===true)
    {
      temp[i].check=false;
    }
    else{
      temp[i].check=true;
    }
  }
}
  console.log(temp);
  localStorage.setItem("tasks",JSON.stringify(temp))
  props.setAllTasks(temp);
  }
  return (
    <>
      {props.allTask.map((e: task ,i:number) => {
        return (
          <div key={i}>
            <div className="mainDiv">
              <Checkbox check={e.check} InputCheckBox={InputCheckBox} task={e} flag="allTask"/>
              <Name name={e.name} flag="list"/>
              <Content content={e.description} flag="list" /> 
              <Button task={e} mainArr={props.setAllTasks} deleteTask={deleteTask} flag={"delete"}/>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Alltask;
