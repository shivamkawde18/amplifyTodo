import React from "react";
import { task } from "../../screen/Form/Form";
import "../CompleteTask/StyleCompleteTask.css";
import {useState,useEffect} from "react";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { uncomplete } from '/Users/shivamkawde/rectjs/todotype/src//graphql/queries';
import awsExports from "/Users/shivamkawde/rectjs/todotype/src/aws-exports.js";
import { Button } from "../Button";
import { deleteTodo } from '/Users/shivamkawde/rectjs/todotype/src//graphql/mutations';
import {listTodos } from '/Users/shivamkawde/rectjs/todotype/src//graphql/queries';
import Name from "../task/Name/Name";
import Content from "../task/Content/Content";
import Checkbox from "../task/Checkbox/Checkbox";
Amplify.configure(awsExports);
function Uncomplete(props:any){
  const [unCompleteTask,setUnCompleteTask]=useState([]);
  useEffect(()=>{
    let uncompleteTaskFun=async()=>{
      const todoData:any = await API.graphql(graphqlOperation(uncomplete)) 
      const todos = todoData.data.listTodos.items
      console.log(todoData);
      console.log(todos);
      setUnCompleteTask(todos)
      
    }
    uncompleteTaskFun()
  },[])
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
   setUnCompleteTask(todos)
   console.log(newTodo);
   }
   console.log(props);
   
    return(
        <>
      {unCompleteTask.map((e: task ,i:number) => {
         
        return (
          <div key={i}>
            <div className="mainDiv">
              <Checkbox check={e.check} task={e} flag="allTask"/>
              <Name name={e.name} flag="list"/>
              <Content content={e.description} flag="list"/>
              <Button task={e} deleteTask={deleteTask}  flag={"delete"}/> 
            </div>
          </div>
        );
            
      })}
        </>
    )
}
export default Uncomplete;