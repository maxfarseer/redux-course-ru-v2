import React from 'react'
import { connect } from 'react-redux'
import { User } from '../components/User'
import {
  handleLogin,
  getLoginStatus,
  handleLogout,
} from '../actions/UserActions'

class UserContainer extends React.Component {
  componentDidMount() {
    this.props.getLoginStatus()
  }

  render() {
    const { user, handleLogin, handleLogout } = this.props
    return (
      <User
        name={user.name}
        error={user.error}
        isFetching={user.isFetching}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        authorized={user.authorized}
      />
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: () => dispatch(handleLogin()),
    getLoginStatus: () => dispatch(getLoginStatus()),
    handleLogout: () => dispatch(handleLogout()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer)
