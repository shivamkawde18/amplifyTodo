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
    
      items{
        id
        name
        description
        check
        createdAt
        updatedAt
      }
      nextToken
    
    }
    
  }
`;
export const complete=`

query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken, filter:{check:{eq:true}}) {
  
    items{
      id
      name
      description
      check
      createdAt
      updatedAt
    }
    nextToken
  
  }
  
}
`;

export const uncomplete=`

query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken, filter:{check:{eq:false}}) {
  
    items{
      id
      name
      description
      check
      createdAt
      updatedAt
    }
    nextToken
  
  }
  
}
`;


