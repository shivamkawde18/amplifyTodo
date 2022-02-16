import * as React from "react";
import { useState, useEffect } from "react";
import { KeyboardEvent } from "react";
import { json } from "stream/consumers";
import Alltask from "../Alltask/Alltask";
import Completetask from "../../component/CompleteTask/CompleteTask";
import "/Users/shivamkawde/rectjs/todotype/src/Style.css";
import Uncomplete from "../../component/CompleteTask/UncompleteTask";
import Button from "../../component/Button/Button";
import Checkbox from "../../component/Task/Checkbox/Checkbox";
import Name from "../../component/Task/Name/Name";
import Content from "../../component/Task/Content/Content";
import {
  createTodo,
  createCategory,
} from "/Users/shivamkawde/rectjs/todotype/src//graphql/mutations";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {
  listTodosQuery,
  listTodos,
} from "/Users/shivamkawde/rectjs/todotype/src//graphql/queries";
import awsExports from "/Users/shivamkawde/rectjs/todotype/src/aws-exports.js";
import Tasktype from "../../component/Task/TaskTypeFolder/Tasktype";
import Date from "../../component/Task/Date/Date";
import { TailSpin } from "react-loader-spinner";
Amplify.configure(awsExports);
export interface task {
  name: string;
  description: string;
  check: boolean;
  categoryId: String;
}
interface props {
  alltask: task;
}
export interface completeTaskProps{
  allTask:[task], 
  setAllTasks:any
}
export interface nameProps{
  setName?:any
  flag:string
  placeholder?:string
  name?:string
}
export interface contentProps{
  setContent?:any
  flag:string
  placeholder?:string
  content?:string
}
export interface buttonProps{
  userName?:string,
  userContent?:string,
  userCheck?:boolean,
  taskType?:string,
  taskPriority?:string,
  date?:string
  createTodoLocal?:any
  flag:string
  setButtonId?:any
  setTaskCreateLoading?:any
  task:any
  deleteTask:any,
  setDeleteLoading:any
}
const Form = () => {
  const [userName, setName] = useState("");
  const [userContent, setContent] = useState("");
  const [userCheck, setCheck] = useState(false);
  const [allTask, setAllTasks] = useState([] as any);
  const [allTaskFlag, setAllTaskFlag] = useState(false);
  const [completeTask, setCompleteTask] = useState(false);
  const [uncompleteFlag, setUncompleteFlag] = useState(false);
  const [taskType, setTaskType] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [date, setDate] = useState("");
  const [taskCreateLoading, setTaskCreateLoading] = useState(false);
  const [ButtonId, setButtonId] = useState("");
 
  const completeAllProps:completeTaskProps={
    allTask:allTask,
    setAllTasks:setAllTasks
  }
  const setNameProps:nameProps={
    setName:setName,
    flag:"form",
    placeholder:"what is your name ?"
    
  }
  const setContentProps:contentProps={
    setContent:setContent,
    flag:"form",
    placeholder:"what is your task ?",
  }

  const createTodoLocal = async () => {
    console.log(allTask.length);
    const category = {
      type: taskType,
      flag: taskPriority,
      endingTime: date,
    };
    createCategoryAws(category).then(async (e: any) => {
      console.log(e);
      const myTask: task = {
        name: userName,
        description: userContent,
        check: userCheck,
        categoryId: e.data.createCategory.id,
      };
      const newTodo = await API.graphql(
        graphqlOperation(createTodo, { input: myTask })
      );
      console.log(newTodo);
      data();
      setTaskCreateLoading(false);
    });

    data();
  };
  useEffect(() => {
    data();
  }, []);
  const checkFLag = () => {
    if (userCheck) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };
  const data = async () => {
    const todoData: any = await API.graphql(graphqlOperation(listTodos));
    console.log(todoData);
    const todos = todoData.data.listTodos.items;
    console.log(todos);
    setAllTasks(todos);
  };
  console.log(allTask);

  const createTodoAws = async (data: any) => {
    const newTodo: any = await API.graphql(
      graphqlOperation(createTodo, { input: data })
    );
    return newTodo;
  };
  const createCategoryAws = async (category: any) => {
    const newCategory = await API.graphql(
      graphqlOperation(createCategory, { input: category })
    );
    return newCategory;
  };
  const setButtonProps:buttonProps={

    userName:userName,
    userContent:userContent,
    userCheck:userCheck,
    taskType:taskType,
    taskPriority:taskPriority,
    date:date,
    createTodoLocal:createTodoLocal,
    flag:"AddTask",
    setButtonId:setButtonId,
    setTaskCreateLoading:setTaskCreateLoading  ,            
    task:"",
    deleteTask:"",
    setDeleteLoading:""
  }
  return (
    <div>
      <h3
        className="refreshTodo"
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
          className={completeTask ? "onCompleteTask" : "cTask"}
          onClick={() => {
            setCompleteTask(true);
            setUncompleteFlag(false);
            setAllTaskFlag(false);
          }}
        >
          Completed Task
        </b>
        <b
          className={allTaskFlag ? "onAllTask" : "aTask"}
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
          className={uncompleteFlag ? "onUncompeteTask" : "uTask"}
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
          {...completeAllProps}
        ></Completetask>
      ) : uncompleteFlag ? (
        <Uncomplete 
        {...completeAllProps}
        ></Uncomplete>
      ) : allTaskFlag ? (
        <Alltask {...completeAllProps}></Alltask>
      ) : (
        <>
          <div className="mainDiv">
            <div className="allFields">
              <h3 className="taskInfoHeading">Task Info</h3>
              {taskCreateLoading ? (
                <div className="loadingDiv">
                  <TailSpin color="red" />
                </div>
              ) : (
                <>
                  <Name
                     {...setNameProps}
                  />
                  <br />
                  <Content
                    {...setContentProps}
                  />
                  <br />
                  <div className="optionDiv">
                    <Tasktype
                      flag={"taskType"}
                      optionPlaceHolder={[
                        "Select Type",
                        "Study",
                        "Daily Routine",
                        "Technology",
                      ]}
                      setTaskType={setTaskType}
                    ></Tasktype>
                    <Tasktype
                      flag={"taskPriorty"}
                      optionPlaceHolder={[
                        "Select Priority",
                        "Important",
                        "Very Important",
                        "Normal",
                      ]}
                      setTaskPriority={setTaskPriority}
                    ></Tasktype>
                  </div>
                  <br />
                  <Date setDate={setDate}></Date>
                  <Button
                    {...setButtonProps}
                  />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Form;
