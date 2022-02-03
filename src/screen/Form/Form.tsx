import * as React from "react";
import { useState, useEffect } from "react";
import { KeyboardEvent } from "react";
import { json } from "stream/consumers";
import Alltask from "../Alltask/Alltask";
import Completetask from "../../component/CompleteTask/Completetask";
import "/Users/shivamkawde/rectjs/todotype/src/Style.css";
import Uncomplete from "../../component/CompleteTask/Uncomplete";
import Button from "../../component/Button/Button";
import Checkbox from "../../component/task/Checkbox/Checkbox";
import Name from "../../component/task/Name/Name";
import Content from "../../component/task/Content/Content";
import { createTodo } from '/Users/shivamkawde/rectjs/todotype/src//graphql/mutations';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '/Users/shivamkawde/rectjs/todotype/src//graphql/queries';
import awsExports from "/Users/shivamkawde/rectjs/todotype/src/aws-exports.js";
Amplify.configure(awsExports);
export interface task {
  name: string;
  description: string;
  check: boolean;
}
interface props {
  alltask: task;
}
function Form() {
  const [userName, setName] = useState("");
  const [userContent, setContent] = useState("");
  const [userCheck, setCheck] = useState(false);
  const [allTask, setAllTasks] = useState([] as any);
  const [allTaskFlag, setAllTaskFlag] = useState(false);
  const [completeTask, setCompleteTask] = useState(false);
  const [uncompleteFlag, setUncompleteFlag] = useState(false);
  const createTodoLocal = async() => {
    console.log(allTask.length);
    const myTask: task = {
      name: userName,
      description: userContent,
      check: userCheck,
    };
    const newTodo = await API.graphql(graphqlOperation(createTodo, {input: myTask}))
    console.log(newTodo);
   data()
  };
  useEffect(() => {
    
    data()
  
  }, []);
  const checkFLag = () => {
    if (userCheck) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };
  const data=async()=>{
    const todoData:any = await API.graphql(graphqlOperation(listTodos))   
    const todos = todoData.data.listTodos.items
     console.log(todos);
    setAllTasks(todos)
  }
  console.log(allTask);
  return (
    <div>
      <h3
        onClick={() => {
          setCompleteTask(false);
          setUncompleteFlag(false);
          setAllTaskFlag(false);
        }}
      >
        TODO
      </h3>
      <div className="completeDiv">
        <b
          className="cTask"
          onClick={() => {
            setCompleteTask(true);
            setUncompleteFlag(false);
            setAllTaskFlag(false);
          }}
        >
          Completed Task
        </b>
        <b
          className="aTask"
          onClick={() => {
            setAllTaskFlag(true);
            setUncompleteFlag(false);
            setCompleteTask(false);
          }}
        >
          {" "}
          All Task
        </b>
        <b
          className="uTask"
          onClick={() => {
            setUncompleteFlag(true);
            setCompleteTask(false);
            setAllTaskFlag(false);
          }}
        >
          Uncompleted Task
        </b>
      </div>
      {completeTask ? (
        <Completetask
          allTask={allTask}
          setAllTasks={setAllTasks}
        ></Completetask>
      ) : uncompleteFlag ? (
        <Uncomplete allTask={allTask} setAllTasks={setAllTasks}></Uncomplete>
      ) : allTaskFlag ? (
        <Alltask allTask={allTask} setAllTasks={setAllTasks}></Alltask>
      ) : (
        <>
          <div className="mainDiv">
            <Checkbox checkFlag={checkFLag} check={userCheck} flag="form" />
            <Name setName={setName} flag="form"/>
            <Content flag="from" setContent={setContent}/>
            <Button createTodoLocal={createTodoLocal} flag={"Add"}/>
          </div>
        </>
      )}
    </div>
  );
}
export default Form;
