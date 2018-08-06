import { LOGIN_REQUEST, LOGIN_SUCCES, LOGIN_FAIL } from '../actions/UserActions'

const initialState = {
  name: '',
  error: '',
  isFetching: false,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case LOGIN_SUCCES:
      return { ...state, isFetching: false, name: action.payload }

    case LOGIN_FAIL:
      return { ...state, isFetching: false, error: action.payload.message }

    default:
      return state
  }
}
