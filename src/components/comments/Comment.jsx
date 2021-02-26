import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { CommentContext } from "../../contexts/comment-context";
import { feedbackAPI, userAPI, voteAPI } from "../../api";

const Comment = (props) => {
  const [state, dispatch] = useContext(CommentContext);

  const voteFeedback = (voteCount, requestType) => {
    const { projectID, feedbackID } = props;
    let url = `/projects/${projectID}/feedback/${feedbackID}/vote`;
    const data = { userId: state.userID, voteValue: voteCount };

    voteAPI(requestType, projectID, feedbackID, props.voteID, data)
      .then((res) => {
        // window.location.reload();
        // get all feedbacks again
        feedbackAPI('GET', state.projectID)
          .then((resp) => {
            const parsed = resp.data.sort((a, b) => (b.timestamp - a.timestamp));
            dispatch({
              type: "SET_FEEDBACKS",
              payload: parsed,
            });
          })
          .catch(console.log);
        // get user votes again
        userAPI('GET', state.userID)
          .then((resp) => {
            const voted = {};
            resp.data.map((vote) => {
              voted[vote.feedbackId] = { voteID: vote.voteId, voteValue: vote.voteValue };
            });
            dispatch({
              type: "SET_VOTED_COMMENTS",
              payload: voted,
            });
          })
          .catch(e => {
            console.log(e);
            // reset user voted comments
            dispatch({
              type: "SET_VOTED_COMMENTS",
              payload: {},
            });
          });
      })
      .catch((err) => console.log({ err }));
  };

  const setVoteState = (upvote, downvote, voteCount, requestType) => {
    const voteValue = voteCount - props.votes < 0 ? -1 : 1;
    voteFeedback(voteValue, requestType);
  };

  const toggle = (vote) => {
    const upvote = props.upvoted;
    const downvote = props.downvoted;
    const voteCount = props.votes;

    if (vote === "upvote") {
      if (!upvote && !downvote) {
        setVoteState(!upvote, false, voteCount + 1, "post");
      } else if (downvote && !upvote) {
        setVoteState(!upvote, false, voteCount + 2, "patch");
      } else {
        setVoteState(false, false, voteCount - 1, "delete");
      }
    } else if (!downvote && !upvote) {
      setVoteState(false, !downvote, voteCount - 1, "post");
    } else if (!downvote && upvote) {
      setVoteState(false, !downvote, voteCount - 2, "patch");
    } else {
      setVoteState(false, false, voteCount + 1, "delete");
    }
  };

  return (
    <div>
      <br />
      <Card bg="light">
        <Card.Header>
          <b>
            {' '}
            {props.userName}
            {' '}
          </b>
          {' '}
          -
          {' '}
          {props.created ?? "just now"}
          {' '}
          <span>
            <i
              className={`icon icon-downvote ${props.downvoted ? "voted" : null
              }`}
              onClick={() => toggle("downvote")}
            />
          </span>
          <span>{props.votes}</span>
          <span>
            <i
              className={`icon icon-upvote ${props.upvoted ? "voted" : null
              }`}
              onClick={() => toggle("upvote")}
            />
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Text>{props.children}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Comment;
