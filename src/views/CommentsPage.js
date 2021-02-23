import React, { Component, Fragment } from "react";
import Navigation from "../components/Navigation";
// import CommentBox from "../components/comments/CommentBox";
import CommentBox from "../components/comments/CommentBox";
import { CommentContextProvider } from "../contexts/comment-context";
import api from '../api';

export class CommentsPage extends Component {
  constructor() {
    super()
    
  }
  componentDidMount() {}

  render() {
    return (
      <>
        <Navigation />
        <CommentContextProvider>
          <CommentBox projectID={this.props.match.params.projectID} />
        </CommentContextProvider>
        ,
      </>
    );
  }
}

export default CommentsPage;
