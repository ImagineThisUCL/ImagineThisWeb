import React, {Component} from "react";
import Button from "react-bootstrap/Button";

class DownloadTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>To download the source code of the prototype press the "Download" button below.</p>
        <p>Then follow the instructions in the <a href="https://imaginethisucl.github.io/getting%20started/how%20to%20use.html#5-running-generated-project">
               quick start guide
          </a> to learn how to run the prototype locally.</p>
        <Button input variant="primary" type="" value="Download">
          Download
        </Button>
      </div>
    );
  }
}

export default DownloadTab;
