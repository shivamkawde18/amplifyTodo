/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      check
      categoryId
      category {
        id
        type
        flag
        endingTime
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        check
        categoryId
        category {
          id
          type
          flag
          endingTime
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      type
      flag
      endingTime
      createdAt
      updatedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        flag
        endingTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;




export const listTodosQuery=`
query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken,filter:{check:{eq:true}}) {
    items {
      id
      name
      description
      check
      categoryId
      category {
        id
        type
        flag
        endingTime
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;

export const listTodosQuery_=`
query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken,filter:{check:{eq:false}}) {
    items {
      id
      name
      description
      check
      categoryId
      category {
        id
        type
        flag
        endingTime
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;

