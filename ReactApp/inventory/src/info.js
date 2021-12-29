import React from "react";
import { PropTypes } from "prop-types";

class Info extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const title = this.props.title;
    const showTitle = true;

    return (
      <div>
        <h1>{showTitle ? title : "No title"}</h1>
        <p>Manage ur stuff here..</p>
      </div>
    );
  }
}

Info.defaultProps = {
  title: "Default"
};

Info.propTypes = {
  title: PropTypes.string,
}

export default Info;
