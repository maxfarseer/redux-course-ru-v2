import React from 'react'
import { connect } from 'react-redux'
import { User } from '../components/User'
import { handleLogin } from '../actions/UserActions'

class UserContainer extends React.Component {
  render() {
    const { user, handleLogin } = this.props
    return (
      <User
        name={user.name}
        error={user.error}
        isFetching={user.isFetching}
        handleLogin={handleLogin}
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer)
