import React from 'react'
import PropTypes from 'prop-types'

export class User extends React.Component {
  renderTemplate = () => {
    const { name, error, isFetching } = this.props

    if (error) {
      return <p>Во время запроса произошла ошибка, обновите страницу</p>
    }

    if (isFetching) {
      return <p>Загружаю...</p>
    }

    if (name) {
      return <p>Привет, {name}!</p>
    }
  }

  loginBtn = () => {
    const { authorized, handleLogout, handleLogin, isFetching } = this.props
    const btnName = authorized ? 'Выйти' : 'Войти'
    const onClick = authorized ? handleLogout : handleLogin

    return (
      <button disabled={isFetching} className="btn" onClick={onClick}>
        {btnName}
      </button>
    )
  }

  render() {
    return (
      <div className="ib user">
        {this.renderTemplate()}
        {this.loginBtn()}
      </div>
    )
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
}
