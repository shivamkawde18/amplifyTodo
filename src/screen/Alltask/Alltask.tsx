import * as React from "react";
import { task } from "../Form/Form";
import {useState} from "react";
import Checkbox from "../../component/task/Checkbox/Checkbox";
import Name from "../../component/task/Name/Name";
import Content from "../../component/task/Content/Content";
import Button from "../../component/Button/Button";
import { deleteTodo} from '/Users/shivamkawde/rectjs/todotype/src//graphql/mutations';
import { updateTodo } from "/Users/shivamkawde/rectjs/todotype/src//graphql/mutations";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from "/Users/shivamkawde/rectjs/todotype/src/aws-exports.js";
import {listTodos} from '/Users/shivamkawde/rectjs/todotype/src//graphql/queries';
Amplify.configure(awsExports);
function Alltask(props: any) {
  const deleteTask=async(e:any)=>{
 console.log(e);
 const todoDetails = {
  id: e.id,
}
const newTodo = await API.graphql(graphqlOperation(deleteTodo,{input:todoDetails} ));
const todoData:any = await API.graphql(graphqlOperation(listTodos))   
console.log(todoData);
const todos = todoData.data.listTodos.items
console.log(todos);
props.setAllTasks(todos)
console.log(newTodo);
}
  const InputCheckBox=async(task:any)=>{
    //console.log(props.check);
//     let temp: any[];
//     let alldataStore=localStorage.getItem("tasks");
//     if(alldataStore!=null)
//     {
//         let alldataParse=JSON.parse(alldataStore);
//         temp=alldataParse;
//     }
//     else
//     {
//       temp=[]
//     }
//   console.log(temp);
// for(let i=0;i<temp.length;i++)
// {
//   if(task.id==temp[i].id)
//   {
//     if(temp[i].check===true)
//     {
//       temp[i].check=false;
//     }
//     else{
//       temp[i].check=true;
//     }
//   }
// }
//   console.log(temp);
//   localStorage.setItem("tasks",JSON.stringify(temp))
  //props.setAllTasks(temp);
  let Flag=false;
  if(!task.check)
  {
    Flag=true;
  }
  const todoDetails = {
    id: task.id,
    check:Flag
  };
  const updatedTodo =  await API.graphql(graphqlOperation(updateTodo, {input: todoDetails}))
  const todoData:any = await API.graphql(graphqlOperation(listTodos))   
   console.log(todoData);
   const todos = todoData.data.listTodos.items
   console.log(todos);
   props.setAllTasks(todos)
   
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
