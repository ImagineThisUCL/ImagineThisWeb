import React, { useReducer, createContext } from 'react';

const CommentContext = createContext();

const commentState = {
  projectID: "",
  userID: "",
  userName: "",
  feedbacks: [],
  votes: [],
  votedComments: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_COMMENT_STATE":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_PROJECT_ID":
      return {
        ...state,
        projectID: action.payload,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userID: action.payload,
      };
    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.payload,
      };
    case "SET_FEEDBACKS":
      return {
        ...state,
        feedbacks: action.payload,
      };
    case "ADD_FEEDBACK":
      return {
        ...state,
        feedbacks: [...state.feedbacks, action.payload],
      };
    case "SET_VOTES":
      return {
        ...state,
        votes: action.payload,
      };
    case "ADD_VOTE":
      return {
        ...state,
        votes: [...state.feedbacks, action.payload],
      };
    case "SET_VOTED_COMMENTS":
      return {
        ...state,
        votedComments: action.payload,
      };
    default:
      throw new Error("Operation not supported.");
  }
};

const CommentContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, commentState);
  return <CommentContext.Provider value={[state, dispatch]}>{props.children}</CommentContext.Provider>;
};

export { CommentContext, CommentContextProvider };
