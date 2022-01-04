import { useState, Component } from "react";
import User from "./User";

import classes from "./Users.module.css";

class Users extends Component {
  // use constructor to define state
  // with class based components your state is ALWAYS an object
  // it also ALWAYS needs to be this.state
  // also need to group all states in the object
  constructor() {
    // must include this super()
    // super returns a temporary object of the superclass that allows access to all
    // of its methods to its child class
    super();
    this.state = {
      showUsers: true,
    };
  }

  // dummy prop to demonstrate error boundaries
  componentDidUpdate() {
    // try {
    //   someCodeWhichMightFail()
    // } catch (err) {
    //   handle error
    // }

    if (this.props.users.length === 0) {
      throw new Error("no users provided!");
    }
  }

  // standard way is to write a method
  toggleUsersHandler() {
    // this.state.showUsers = false; // WRONG METHOD!
    // this.setState({}) always contains an object
    this.setState((currState) => {
      return { showUsers: !currState.showUsers };
    });
  }

  render() {
    // we can define helper constants like this in the render method
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/* bind(this) is used to pass the data as an argument to the function of a class
        based component. */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
