import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', pin: '', showErrorMsg: false, errorMsg: ''}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, pin} = this.state
    const userDetails = {user_id: username, pin}
    const loginApiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginForm = () => {
    const {username, pin, showErrorMsg, errorMsg} = this.state

    return (
      <form className="form-container" onSubmit={this.submitForm}>
        <h1 className="main-heading">Welcome Back!</h1>
        <div className="input-container">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            placeholder="Enter User Id"
            value={username}
            onChange={this.getUsername}
            className="input-type"
          />
        </div>
        <div className="input-container">
          <label htmlFor="pin">PIN</label>
          <input
            type="password"
            id="pin"
            placeholder="Enter PIN"
            value={pin}
            onChange={this.getPin}
            className="input-type"
          />
        </div>
        <div className="button-container">
          <input type="submit" value="Login" className="login-button" />
        </div>
        {showErrorMsg && <p>{errorMsg}</p>}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-background-container">
        <div className="website-login-container">
          <div className="website-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
              alt="website login"
              className="website-logo"
            />
          </div>
          <div className="login-container">{this.renderLoginForm()}</div>
        </div>
      </div>
    )
  }
}

export default Login
