import { connect } from 'react-redux';
import React from 'react';
import './Login.css';
import * as actions from '../../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  handleOnChange = (event) => {
    this.setState({ userName: event.target.value });
  }
  handleLoginClick = () => {
    fetch(
      '/login',
      {
        method: 'POST',
        body: JSON.stringify({
          userName: this.state.userName,
          dummy: 'xyz',
        }),
      },
    )
      .then(res => res.json())
      .then((json) => {
        this.props.dispatchSetUserDetails(json.userDetails);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="loginArea">
        <div className="loginBox">
          <div className="loginWelcomeBox">
            <h2>Welcome</h2>
            <h2>to</h2>
            <h1>Quizzy</h1>
          </div>
          <div className="loginInputBox">
            <h2>Login</h2>
            <h3>Username</h3>
            <input
              className="userNameField"
              type="text"
              value={this.state.userName}
              onChange={this.handleOnChange}
            />
            <button
              className="loginButton"
              onClick={this.handleLoginClick}
            >Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetUserDetails: userDetails => dispatch(actions.setUserDetails(userDetails)),
  };
}

export default connect(null, mapDispatchToProps)(Login);

