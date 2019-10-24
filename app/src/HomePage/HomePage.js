import React from "react";
import { Link } from "react-router-dom";

import { userService } from "../_services";

import { Map } from "../_components";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      users: []
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user")),
      users: { loading: true }
    });
    userService.getAll().then(users => this.setState({ users }));
  }

  render() {
    const { user, users } = this.state;
    return <Map />;
  }
}

export { HomePage };
