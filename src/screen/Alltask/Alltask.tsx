import * as React from "react";
import { task,nameProps,contentProps,buttonProps } from "../Form/Form";
import { useState } from "react";
import Checkbox from "../../component/Task/Checkbox/Checkbox";
import Name from "../../component/Task/Name/Name";
import Content from "../../component/Task/Content/Content";
import Button from "../../component/Button/Button";
import { deleteTodo } from "/Users/shivamkawde/rectjs/todotype/src//graphql/mutations";
import { updateTodo } from "/Users/shivamkawde/rectjs/todotype/src//graphql/mutations";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsExports from "/Users/shivamkawde/rectjs/todotype/src/aws-exports.js";
import {
  listTodos,
  listCategories,
} from "/Users/shivamkawde/rectjs/todotype/src//graphql/queries";
import Category from "../../component/Task/Category/Category";
import { TailSpin } from "react-loader-spinner";
Amplify.configure(awsExports);
const Alltask = (props: any) => {
  const [categoryFlag, setCategoryFlag] = useState(false);
  const [taskCategoryId, setTaskCategoryId] = useState("");
  const [category, setCategory] = useState([]);
  const [deleteLoding, setDeleteLoading] = useState(false);
  const [ButtonId, setButtonId] = useState("");
  const deleteTask = async (e: any) => {
    console.log(e);
    const todoDetails = {
      id: e.id,
    };
    const newTodo = await API.graphql(
      graphqlOperation(deleteTodo, { input: todoDetails })
    );
    const todoData: any = await API.graphql(graphqlOperation(listTodos));
    console.log(todoData);
    const todos = todoData.data.listTodos.items;
    console.log(todos);
    props.setAllTasks(todos);
    console.log(newTodo);
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
      const todoData: any = await API.graphql(graphqlOperation(listTodos));
      console.log(todoData);
      const todos = todoData.data.listTodos.items;
      console.log(todos);
      props.setAllTasks(todos);
    };
    InputCheckApi().then(() => setDeleteLoading(false));
  };
  const allCategory = async () => {
    const category: any = await API.graphql(graphqlOperation(listCategories));
    console.log(category);
    setCategory(category.data.listCategories.items);
  };
  
  const setNameProps:nameProps={
   
    flag:"list",
    name:""
    
  }
  const setContentProps:contentProps={
    flag:"list",
    content:""
  }
  const setButtonProps:buttonProps={
    task:"",
    setButtonId:setButtonId,
    deleteTask:deleteTask,
    flag:"delete",
    setDeleteLoading:setDeleteLoading,

  }
  return (
    <>
      <b className="taskCount">All task({props.allTask.length})</b>
      {props.allTask.length == 0 ? (
        <h3>No Tasks</h3>
      ) : (
        props.allTask.map((e: any, i: number) => {
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
                  <Checkbox
                    check={e.check}
                    InputCheckBox={InputCheckBox}
                    setButtonId={setButtonId}
                    setDeleteLoading={setDeleteLoading}
                    task={e}
                    flag="allTask"
                  />
                  <br />
                  <Name 
                    {...setNameProps.name=e.name}
                    {...setNameProps}
                 />
                  <br />
                  <Content 
                  {...setContentProps.content=e.description}
                  {...setContentProps}
                   />
                  <br />
                  {deleteLoding && ButtonId === e.id ? (
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
                  {...setButtonProps.task=e}
                  {...setButtonProps}
                  />
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
export default Alltask;
