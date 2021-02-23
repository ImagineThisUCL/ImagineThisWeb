import React, { useContext, useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import { CommentContext } from "../../contexts/comment-context";
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import moment from 'moment';

import api from '../../api';
const CommentBox = (props) => {
  const [state, dispatch] = useContext(CommentContext);
  const [votedComments, setVotedComments] = useState({});
  const [sortButtonText, setSortButtonText] = useState("Sort by Time")
  // get feedbacks
  useEffect(() => {
    // check if there is a user credential stored in localStorage
    // if not, create a new user credential
    let storedUserStr = localStorage.getItem('user');
    let userID = ""
    let userName = ""
    if (storedUserStr === null) {
      createAnonymousUser();
    } else {
      // get user credential from localStorage
      let storedUser = JSON.parse(storedUserStr);
      userID = storedUser.userID
      userName = storedUser.userName
      // get all votes for the existing user
      api.get(`/users/${userID}/votes`)
        .then(res => {
          if (res.status == 200 && res.data.length > 0) {
            let voted = {}
            res.data.map(vote => {
              voted[vote.feedbackId] = { voteID: vote.voteId, voteValue: vote.voteValue }
            })
            setVotedComments(voted)
            dispatch({
              type: "SET_VOTED_COMMENTS",
              payload: voted
            })
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
    // check if there's any vote associated to the current user
    // this.getVotesForUser()
    api.get(`/projects/${props.projectID}/feedback`)
      .then(res => {
        // process the feedbacks and update it
        const parsed = parseFeedbacks(res.data)
        // sort comments by time by default
        parsed.sort(sortByTime('timestamp'))
        dispatch({
          type: "INIT_COMMENT_STATE",
          payload: {
            projectID: props.projectID,
            userID,
            userName,
            feedbacks: parsed,
          }
        })
      })
      .catch(e => console.log)
  }, [])

  const parseFeedbacks = data => {
    let feedbackList = []
    data.forEach(feedback => {
      const {
        userId,
        projectId,
        feedbackId,
        downvotes,
        text,
        timestamp,
        upvotes,
        userName,
      } = feedback

      const parsedFeedback = {
        userID: userId,
        projectID: projectId,
        feedbackID: feedbackId,
        userName,
        created: moment(timestamp).format("DD/MM/YY HH:mm"),
        timestamp,
        text,
        votes: upvotes - downvotes,
      };
      feedbackList.push(parsedFeedback)
    })
    return feedbackList;
  }

  const createAnonymousUser = async () => {
    // create an anonymous user
    console.log('Generating new user credential');
    let userName = 'Anonymous User';
    let userID = uuidv4();
    // send a request to the server
    await api
      .post(`/users`, { userId: userID, userName })
      .then(res => {
        if (res.data.success) {
          console.log('Setting up local Storage');
          // update localStorage
          localStorage.setItem('user', JSON.stringify({ userID, userName }));
          dispatch({
            type: "SET_USER_NAME",
            payload: userName
          }, {
            type: "SET_USER_ID",
            payload: userID
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const setFeedbacks = feedbacks => {
    dispatch({
      type: "SET_FEEDBACKS",
      payload: feedbacks
    })
    // console.log(state.feedbacks)
  }

  /**
   * Sorts the feedback by the time they are committed
   */
  const sortByTime = (field) => {
    return function (a, b) {
      return b[field] - a[field]
    }
  }


  /**
   * Sort the feedback by calculating it vote count.
   */
  const sortByVotes = (field) => {
    return function (a, b) {
      return b[field] - a[field];
    }
  }

  /**
   * Sorts the feedback based on two attribute, including the time and voting count.
   */
  const sortByTwoFields = (field1, field2) => {
    return function (a, b) {

      if (a[field1] == b[field1]) {
        return b[field2] - a[field2];
      }
      else {
        return b[field1] - a[field1];
      }
    }
  }

  const sortComments = e => {
    const allComments = state.feedbacks;
    let sortedArray = []
    if (e == "1") {
      setSortButtonText("Sort By Time")
      sortedArray = allComments.sort(sortByTime('timestamp'));
    } else if (e == "2") {
      setSortButtonText("Sort By Votes Count")
      sortedArray = allComments.sort(sortByVotes('votes'));
    }
    setFeedbacks(sortedArray)
  }

  return (
    <div className="container">
      <br />
      <div className="commentBox panel panel-default">
        <div className="panel-body">
          <h3>
            Feedback Board for the Project ID:{" "}
            <Badge variant="primary" id="projectID">
              {props.projectID}
            </Badge>

          </h3>

          <CommentForm
            // onCommentSubmit={handleCommentSubmit}
            projectID={state.projectID}
            userID={state.userID}
            userName={state.userName}
          />

          <Dropdown style={{ top: "-40px", float: "right", height: "20px", position: "relative" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {sortButtonText}
                </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={sortComments.bind(this, "1")}>Sort by Time</Dropdown.Item>
              <Dropdown.Item onClick={sortComments.bind(this, "2")}>Sort by Votes Count</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>


          <CommentList comments={state.feedbacks} votedComments={state.votedComments ?? {}} />
        </div>
      </div>
    </div>
  );
}

export default CommentBox;