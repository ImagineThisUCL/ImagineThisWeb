import { useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { feedbackAPI } from "../../api";
import { FeedbackContext } from "../../contexts/feedback-context";

const FeedbackForm = (props) => {
  const [state, dispatch] = useContext(FeedbackContext);
  // useRef is the react hooks style ref property
  const text = useRef();

  const handleSubmit = (e) => {
    // prevent default submission behaviour
    e.preventDefault();
    // post to the addNewFeedback endpoint
    const data = {
      text: text.current.value,
      userId: state.userID,
      userName: state.userName,
    };
    // update user Credential stored in local Storage
    localStorage.setItem('user', JSON.stringify({ userID: state.userID, userName: state.userName }));
    feedbackAPI('POST', state.projectID, undefined, data)
      .then((res) => {
        // get feedbacks again
        feedbackAPI('GET', state.projectID)
          .then((resp) => {
            const parsed = resp.data.sort((a, b) => (b.timestamp - a.timestamp));
            dispatch({
              type: "SET_FEEDBACKS",
              payload: parsed,
            });
          })
          .catch(console.log);
      })
      .catch((e) => console.log);
  };

  return (
    <div className="feedbackForm panel panel-default">
      <div className="panel-body">
        <br />
        <Form className="form" onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              input
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              className="form-control"
              type="text"
              value={state.userName}
              onChange={(e) => {
                dispatch({
                  type: "SET_USER_NAME",
                  payload: e.target.value,
                });
              }}
            />
          </InputGroup>

          <InputGroup>
            <FormControl
              rows={4}
              input
              className="form-control"
              type="text"
              placeholder="Leave your feedback here.."
              ref={text}
              as="textarea"
              aria-label="With textarea"
            />
          </InputGroup>
          <br />
          <Button input variant="primary" type="submit" value="Post">
            Post
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FeedbackForm;
