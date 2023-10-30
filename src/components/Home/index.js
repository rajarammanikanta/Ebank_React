import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  clickToLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    return (
      <div className="home-container">
        <div className="website-logo-logout">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
            alt="website logo"
          />
          <button
            type="button"
            onClick={this.clickToLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
        <div className="card-container">
          <h1 className="card-heading">Your Flexibility, Our Excellence</h1>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
              alt="digital card"
              className="digital-card"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
