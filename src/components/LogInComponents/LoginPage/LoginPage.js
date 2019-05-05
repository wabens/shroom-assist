import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form className = {'login-form'} onSubmit={this.login}>
          <div className = {'login-box'}>
                  <TextField
                    type="text"
                    className={"login-field"}    
                    label={'username'}
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                    margin="dense"
                    variant='outlined'
                  />
                  <TextField
                    type="text"
                    className={"login-field"}    
                    label={'password'}
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                    margin="dense"
                    variant='outlined'
                  />
              <input
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              />
          </div>
        </form>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
