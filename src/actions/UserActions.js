export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCES = 'LOGIN_SUCCES'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_STATUS_REQUEST = 'LOGIN_STATUS_REQUEST'
export const LOGIN_STATUS_SUCCESS = 'LOGIN_STATUS_SUCCESS'
export const LOGIN_STATUS_FAIL = 'LOGIN_STATUS_FAIL'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

export function handleLogin() {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    })

    // eslint-disable-next-line no-undef
    VK.Auth.login(r => {
      if (r.session) {
        const username = r.session.user.first_name

        dispatch({
          type: LOGIN_SUCCES,
          payload: username,
        })
      } else {
        dispatch({
          type: LOGIN_FAIL,
          error: true,
          payload: new Error('Ошибка авторизации'),
        })
      }
    }, 4) // запрос прав на доступ к photo
  }
}

export function getLoginStatus() {
  return function(dispatch) {
    dispatch({
      type: LOGIN_STATUS_REQUEST,
    })

    // eslint-disable-next-line no-undef
    VK.Auth.getLoginStatus(r => {
      if (r.status === 'connected') {
        dispatch({
          type: LOGIN_STATUS_SUCCESS,
        })
      } else {
        dispatch({
          type: LOGIN_STATUS_FAIL,
        })
      }
    })
  }
}

export function handleLogout() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    })
    // eslint-disable-next-line no-undef
    VK.Auth.logout(r => {
      if (!r.session) {
        dispatch({
          type: LOGOUT_SUCCESS,
        })
      } else {
        dispatch({
          type: LOGOUT_FAIL,
          error: true,
          payload: new Error('Произошла ошибка'),
        })
      }
    })
  }
}
