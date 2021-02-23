import { useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import api from '../../api';
import { CommentContext } from "../../contexts/comment-context";

const CommentForm = (props) => {
  const [state, dispatch] = useContext(CommentContext);
  const text = useRef()

  const handleSubmit = (e) => {
    // prevent default submission behaviour
    e.preventDefault()
    // post to the addNewFeedback endpoint
    const data = {
      text: text.current.value,
      userId: state.userID,
      userName: state.userName
    }
    // update user Credential stored in local Storage
    localStorage.setItem('user', JSON.stringify({ userID: state.userID, userName: state.userName }))
    api.post(`/projects/${state.projectID}/feedback`, data)
      .then(res => {
        // refresh current window
        // this is the fastest way to update latest global states
        window.location.reload()
      })
      .catch(e => console.log)
  }

  return (
    <div className="commentForm panel panel-default">
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
              // ref="userName"
              className="form-control"
              type="text"
              value={state.userName}
              onChange={(e) => {
                dispatch({
                  type: "SET_USER_NAME",
                  payload: e.target.value
                })
                // this.setState({ userName: e.target.value });
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
}

export default CommentForm;