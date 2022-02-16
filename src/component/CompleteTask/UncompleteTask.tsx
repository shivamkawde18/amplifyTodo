import React from "react";
import { task,completeTaskProps } from "../../screen/Form/Form";
import "../CompleteTask/StyleCompleteTask.css";
import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listTodosQuery_ } from "/Users/shivamkawde/rectjs/todotype/src//graphql/queries";
import awsExports from "/Users/shivamkawde/rectjs/todotype/src/aws-exports.js";
import { Button } from "../Button";
import { deleteTodo,updateTodo } from "/Users/shivamkawde/rectjs/todotype/src//graphql/mutations";
import {
  listTodos,
  listCategories,
} from "/Users/shivamkawde/rectjs/todotype/src//graphql/queries";
import Name from "../Task/Name/Name";
import Content from "../Task/Content/Content";
import Checkbox from "../Task/Checkbox/Checkbox";
import Category from "../Task/Category/Category";
import { TailSpin } from "react-loader-spinner";
Amplify.configure(awsExports);
function Uncomplete(props:completeTaskProps ) {
  const [unCompleteTask, setUnCompleteTask] = useState([]);
  const [categoryFlag, setCategoryFlag] = useState(false);
  const [taskCategoryId, setTaskCategoryId] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, stopLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [ButtonId, setButtonId] = useState("");
  useEffect(() => {
    let uncompleteTaskFun = async () => {
      const todoData: any = await API.graphql(
        graphqlOperation(listTodosQuery_)
      );
      const todos = todoData.data.listTodos.items;
      console.log(todoData);
      console.log(todos);
      setUnCompleteTask(todos);
    };
    uncompleteTaskFun().then(() => stopLoading(true));
  }, []);
  const deleteTask = async (e: any) => {
    console.log(e);
    const deleteTaskApi = async () => {
      const todoDetails = {
        id: e.id,
      };
      const newTodo = await API.graphql(
        graphqlOperation(deleteTodo, { input: todoDetails })
      );
      const todoData: any = await API.graphql(
        graphqlOperation(listTodosQuery_)
      );
      console.log(todoData);
      const todos = todoData.data.listTodos.items;
      console.log(todos);
      setUnCompleteTask(todos);
      data();
      console.log(newTodo);
    };
    deleteTaskApi().then(() => {
      setDeleteLoading(false);
    });
  };
  console.log(props);
  const allCategory = async () => {
    const category: any = await API.graphql(graphqlOperation(listCategories));
    console.log(category);
    setCategory(category.data.listCategories.items);
  };
  const data = async () => {
    const todoData: any = await API.graphql(graphqlOperation(listTodos));
    console.log(todoData);
    const todos = todoData.data.listTodos.items;
    console.log(todos);
    props.setAllTasks(todos);
  };


  const InputCheckBox = async (task: any) => {
    const InputCheckApi = async () => {
      let Flag = false;
      if (!task.check) {
        Flag = true;
      }
      const todoDetails = {
        id: task.id,
        check: Flag,
      };
      const updatedTodo = await API.graphql(
        graphqlOperation(updateTodo, { input: todoDetails })
      );
      const todoData: any = await API.graphql(graphqlOperation(listTodosQuery_));
      console.log(todoData);
      const todos = todoData.data.listTodos.items;
      console.log(todos);
      setUnCompleteTask(todos);
    };
    InputCheckApi().then(() => setDeleteLoading(false));

  }

  return (
    <>
      {unCompleteTask.length === 0 && !loading ? (
        <div className="loadingDiv">
          <TailSpin color="red" />
        </div>
      ) : loading && unCompleteTask.length == 0 ? (
        <h3>No Tasks</h3>
      ) : (
        ""
      )}
       <b className="taskCount">Uncomplete task({unCompleteTask.length})</b>
      {unCompleteTask.map((e: any, i: number) => {
        return (
          <div key={i}>
            <div className="mainDiv">
              <div className="allFields">
                <b>Task Info</b>
                <div
                  className="taskCategory"
                  onClick={(ele) => {
                    if (categoryFlag) setCategoryFlag(false);
                    else setCategoryFlag(true);
                    setButtonId(e.id);
                    setDeleteLoading(true);
                    setTaskCategoryId(e.id);
                    allCategory().then(()=>setDeleteLoading(false));
                  }}
                >
                  Task Category
                </div>
                <Checkbox check={e.check} task={e} flag="allTask"   InputCheckBox={InputCheckBox}
                    setButtonId={setButtonId}
                    setDeleteLoading={setDeleteLoading} />
                <br />
                <Name name={e.name} flag="list" />
                <br />
                <Content content={e.description} flag="list" />
                <br />
                {deleteLoading && ButtonId === e.id ? (
                  <div className="loadingDiv">
                    <TailSpin color="red" />
                  </div>
                ) : (
                  ""
                )}
                {categoryFlag && taskCategoryId === e.id ? (
                  <Category category={category} task={e}></Category>
                ) : (
                  ""
                )}
                <Button
                  task={e}
                  //mainArr={props.setAllTasks}
                  setButtonId={setButtonId}
                  deleteTask={deleteTask}
                  flag={"delete"}
                  setDeleteLoading={setDeleteLoading}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Uncomplete;
