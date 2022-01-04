import { Component } from "react";

import classes from "./User.module.css";

class User extends Component {
  // inititialization stuff goes here
  // constructor() {}

  // runs right before the component ends
  componentWillUnmount() {
    console.log("User will unmount");
  }

  // equivalent to a return
  render() {
    // to use props you must include this.props
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
