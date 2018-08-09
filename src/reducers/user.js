import * as t from '../actions/UserActions'

const initialState = {
  name: '',
  error: '',
  isFetching: false,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case t.LOGIN_REQUEST:
    case t.LOGIN_STATUS_REQUEST:
    case t.LOGOUT_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case t.LOGIN_SUCCESS:
    case t.LOGIN_STATUS_SUCCESS:
      return { ...state, isFetching: false, name: action.payload }

    case t.LOGIN_FAIL:
    case t.LOGOUT_FAIL:
      return { ...state, isFetching: false, error: action.payload.message }

    case t.LOGIN_STATUS_FAIL:
      return { ...state, isFetching: false }

    case t.LOGOUT_SUCCESS:
      return initialState

    default:
      return state
  }
}
