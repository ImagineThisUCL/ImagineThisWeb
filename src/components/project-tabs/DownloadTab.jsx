import React, { useContext, useEffect, useState } from "react";
import { FeedbackContext } from "../../contexts/feedback-context";
import Button from "react-bootstrap/Button";
import api from "../../api";
import { saveAs } from 'file-saver';

const DownloadTab = (props) => {

  const downloadCode = () => {
    api.get(`/projects/${props.projectID}/download`, {responseType: 'blob'})
      .then((res) => saveAs(res.data, 'OutputApp.zip'))
      .catch((err) => { console.log(err) })
  }

  return (
    <div>
      <div className="panel-body">
        <h4>Download Source Code</h4>
        <hr/>
      <p>To download the source code of the prototype press the "Download" button below.</p>
      <p>Then follow the instructions in the <a href="https://imaginethisucl.github.io/getting%20started/how%20to%20use.html#5-running-generated-project">
              quick start guide
        </a> to learn how to run the prototype locally.</p>
      <Button onClick={downloadCode} input variant="primary" type="" value="Download">
        Download
      </Button>
      </div>
    </div>
  );
}

export default DownloadTab;
