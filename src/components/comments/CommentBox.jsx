import React, { useContext, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CommentContext } from "../../contexts/comment-context";
import CommentForm from './CommentForm';
import CommentList from './CommentList';

import { feedbackAPI, userAPI } from "../../api";

const CommentBox = (props) => {
  const [state, dispatch] = useContext(CommentContext);
  const [sortButtonText, setSortButtonText] = useState("Sort by Time");
  // get feedbacks
  useEffect(() => {
    // check if there is a user credential stored in localStorage
    // if not, create a new user credential
    const storedUserStr = localStorage.getItem('user');
    let userID = "";
    let userName = "";
    if (storedUserStr === null) {
      createAnonymousUser();
    } else {
      // get user credential from localStorage
      const storedUser = JSON.parse(storedUserStr);
      userID = storedUser.userID;
      userName = storedUser.userName;
      // get all votes for the existing user
      userAPI('GET', userID)
        .then((res) => {
          if (res.status == 200 && res.data.length > 0) {
            const voted = {};
            res.data.map((vote) => {
              voted[vote.feedbackId] = { voteID: vote.voteId, voteValue: vote.voteValue };
            });
            dispatch({
              type: "SET_VOTED_COMMENTS",
              payload: voted,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    // check if there's any vote associated to the current user
    // this.getVotesForUser()
    feedbackAPI('GET', props.projectID)
      .then((res) => {
        const parsed = res.data;
        // process the feedbacks and update it
        // const parsed = parseFeedbacks(res.data);
        // sort comments by time by default
        parsed.sort(sortByTime('timestamp'));
        dispatch({
          type: "INIT_COMMENT_STATE",
          payload: {
            projectID: props.projectID,
            userID,
            userName,
            feedbacks: parsed,
          },
        });
      })
      .catch((e) => console.log);
  }, []);

  const createAnonymousUser = async () => {
    // create an anonymous user
    console.log('Generating new user credential');
    const userName = 'Anonymous User';
    const userID = uuidv4();
    // send a request to the server
    await userAPI('POST', undefined, { userId: userID, userName })
      .then((res) => {
        if (res.data.success) {
          console.log('Setting up local Storage');
          // update localStorage
          localStorage.setItem('user', JSON.stringify({ userID, userName }));
          dispatch({
            type: "SET_USER_NAME",
            payload: userName,
          }, {
            type: "SET_USER_ID",
            payload: userID,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setFeedbacks = (feedbacks) => {
    dispatch({
      type: "SET_FEEDBACKS",
      payload: feedbacks,
    });
    // console.log(state.feedbacks)
  };

  /**
   * Sorts the feedback by the time they are committed
   */
  const sortByTime = (field) => function (a, b) {
    return b[field] - a[field];
  };

  /**
   * Sort the feedback by calculating it vote count.
   */
  const sortByVotes = (field) => function (a, b) {
    return b[field] - a[field];
  };

  const sortComments = (e) => {
    const allComments = state.feedbacks;
    let sortedArray = [];
    if (e == "1") {
      setSortButtonText("Sort By Time");
      sortedArray = allComments.sort(sortByTime('timestamp'));
    } else if (e == "2") {
      setSortButtonText("Sort By Votes Count");
      sortedArray = allComments.sort(sortByVotes('votes'));
    }
    setFeedbacks(sortedArray);
  };

  return (
    <div className="container">
      <br />
      <div className="commentBox panel panel-default">
        <div className="panel-body">
          <h4>Post Feedback / Vote on Feedback</h4>
          <span>
            In this section, you can post feedback about this project's prototype (see "Run App" tab for more details), and also view feedback posted from other people.
            You can also up vote/down vote comments to signify their importance.
          </span>
          <hr />

          <CommentForm
            // onCommentSubmit={handleCommentSubmit}
            projectID={state.projectID}
            userID={state.userID}
            userName={state.userName}
          />

          <Dropdown style={{
            top: "-40px", float: "right", height: "20px", position: "relative",
          }}
          >
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
};

export default CommentBox;
