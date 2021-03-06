import React from "react";
import { task,completeTaskProps } from "../../screen/Form/Form";
import { useState, useEffect } from "react";
import "../CompleteTask/StyleCompleteTask.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listTodosQuery } from "/Users/shivamkawde/rectjs/todotype/src//graphql/queries";
import awsExports from "/Users/shivamkawde/rectjs/todotype/src/aws-exports.js";
import Name from "../Task/Name/Name";
import Content from "../Task/Content/Content";
import { deleteTodo ,updateTodo} from "/Users/shivamkawde/rectjs/todotype/src//graphql/mutations";
import {
  listTodos,
  listCategories,
} from "/Users/shivamkawde/rectjs/todotype/src//graphql/queries";
import { Button } from "../Button";
import Checkbox from "../Task/Checkbox/Checkbox";
import Category from "../Task/Category/Category";
import { TailSpin } from "react-loader-spinner";
Amplify.configure(awsExports);
function Completetask(props: completeTaskProps) {
  const [completeTask, setCompleteTask] = useState([]);
  const [categoryFlag, setCategoryFlag] = useState(false);
  const [taskCategoryId, setTaskCategoryId] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, stopLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [ButtonId, setButtonId] = useState("");
  useEffect(() => {
    let completeTaskFun = async () => {
      const todoData: any = await API.graphql(graphqlOperation(listTodosQuery));
      const todos = todoData.data.listTodos.items;
      console.log(todoData);
      console.log(todos);
      setCompleteTask(todos);
    };
    completeTaskFun().then((e) => stopLoading(true));
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
      const todoData: any = await API.graphql(graphqlOperation(listTodosQuery));
      console.log(todoData);
      const todos = todoData.data.listTodos.items;
      console.log(todos);
      setCompleteTask(todos);
      data();
      console.log(newTodo);
    };
    deleteTaskApi().then(() => setDeleteLoading(false));
  };
  const allCategory = async () => {
    const category: any = await API.graphql(graphqlOperation(listCategories));
    console.log(category);
    setCategory(category.data.listCategories.items);
  };
  console.log(completeTask);
  const data = async () => {
    const todoData: any = await API.graphql(graphqlOperation(listTodos));
    console.log(todoData);
    const todos = todoData.data.listTodos.items;
    console.log(todos);
    props.setAllTasks(todos);
  };
console.log(props);

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
      const todoData: any = await API.graphql(graphqlOperation(listTodosQuery));
      console.log(todoData);
      const todos = todoData.data.listTodos.items;
      console.log(todos);
      setCompleteTask(todos);
    };
    InputCheckApi().then(() => setDeleteLoading(false));

  }

  return (
    <>
      {completeTask.length === 0 && !loading ? (
        <div className="loadingDiv">
          <TailSpin color="red" />
        </div>
      ) : loading && completeTask.length == 0 ? (
        <h3>No Tasks</h3>
      ) : (
        ""
      )}

<b className="taskCount">Complete task({completeTask.length})</b>
      {completeTask.map((e: any, i: number) => {
        console.log(e);
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
                    setDeleteLoading={setDeleteLoading}/>
                <br />
                <Name name={e.name} flag="list" />
                <br />
                <Content content={e.description} flag="list" />
                <br />
                {deleteLoading && e.id == ButtonId ? (
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
                 // mainArr={props.setAllTasks}
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
export default Completetask;
