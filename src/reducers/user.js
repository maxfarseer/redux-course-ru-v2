import * as t from '../actions/UserActions'

const initialState = {
  name: '',
  error: '',
  isFetching: false,
  authorized: false,
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case t.LOGIN_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case t.LOGIN_SUCCES:
      return {
        ...state,
        isFetching: false,
        name: action.payload,
        authorized: true,
      }

    case t.LOGIN_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
        authorized: false,
      }

    case t.LOGIN_STATUS_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case t.LOGIN_STATUS_SUCCESS:
      return { ...state, isFetching: false, authorized: true, error: '' }

    case t.LOGIN_STATUS_FAIL:
      return { ...state, isFetching: false, authorized: false }

    case t.LOGOUT_REQUEST:
      return { ...state, isFetching: true, error: '' }

    case t.LOGOUT_SUCCESS:
      return initialState

    case t.LOGOUT_FAIL:
      return { ...state, isFetching: false, error: action.payload.message }

    default:
      return state
  }
}
