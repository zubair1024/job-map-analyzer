import React from "react";

import { userService } from "../_services";

import "./LoginPage.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    userService.logout();

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password, returnUrl } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }

    this.setState({ loading: true });
    userService.login(username, password).then(
      user => {
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        this.props.history.push(from);
      },
      error => this.setState({ error, loading: false })
    );
  }

  render() {
    const { username, password, submitted, loading, error } = this.state;

    // return (
    //   <div className="login-page">
    //     <div className="form">
    //       <form className="register-form" onSubmit={this.handleSubmit}>
    //         <input
    //           type="text"
    //           className="form-control"
    //           name="username"
    //           value={username}
    //           onChange={this.handleChange}
    //         />
    //         <input
    //           type="password"
    //           className="form-control"
    //           name="password"
    //           value={password}
    //           onChange={this.handleChange}
    //         />
    //       </form>
    //       <form className="login-form">
    //         <input type="text" placeholder="username" />
    //         <input type="password" placeholder="password" />
    //         <div className="form-group">
    //           <button className="btn btn-primary" disabled={loading}>
    //             Login
    //           </button>
    //           {loading && (
    //             <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
    //           )}
    //         </div>
    //         {error && <div className={"alert alert-danger"}>{error}</div>}
    //         <p className="message">
    //           This is a private page. If you're not supposed to be here, walk
    //           away now!
    //         </p>
    //       </form>
    //     </div>
    //   </div>
    // );

    return (
      <div className="login-page">
        <div className="form">
          <h2>Map Analyzer</h2>
          <form name="form" onSubmit={this.handleSubmit}>
            <div
              className={
                "form-group" + (submitted && !username ? " has-error" : "")
              }
            >
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={this.handleChange}
                placeholder="Username"
              />
              {submitted && !username && (
                <div className="help-block">Username is required</div>
              )}
            </div>
            <div
              className={
                "form-group" + (submitted && !password ? " has-error" : "")
              }
            >
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
              />
              {submitted && !password && (
                <div className="help-block">Password is required</div>
              )}
            </div>
            <div className="form-group">
              <button className="btn btn-primary" disabled={loading}>
                Login
              </button>
              {loading && (
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              )}
            </div>
            {error && <div className={"alert alert-danger"}>{error}</div>}
          </form>
        </div>
      </div>
    );
  }
}

export { LoginPage };
