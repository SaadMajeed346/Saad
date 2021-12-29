import {
    gql
  } from "@apollo/client";
const getdidQuery= gql`
  {
    users
    {
      userId
      id
    }
  }
`;
const addUserMutation = gql`
  mutation ($userId:String!){
    addUser(userId:$userId){
      userId
    }
  }
`
export {getdidQuery,addUserMutation};