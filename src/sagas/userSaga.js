import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants/User'

import { call, put, take } from 'redux-saga/effects'

function vkLoginRequest() {
  return new Promise((resolve, reject) => {
    //eslint-disable-next-line no-undef
    VK.Auth.login(function(r) {
      if (r.session) {
        const username = r.session.user.first_name
        resolve(username)
      } else {
        reject({ errorText: 'Ошибка авторизации' })
      }
    }, 4)
  })
}

function* handleLogin(callback) {
  // TODO: add callback or saga run for 2018 photos
  try {
    const username = yield call(vkLoginRequest)
    yield put({ type: LOGIN_SUCCESS, payload: username })
  } catch (e) {
    yield put({
      type: LOGIN_FAIL,
      error: true,
      payload: new Error('Ошибка авторизации'),
    })
  }
}

export function* userSaga() {
  //TODO: add logout and refactor this
  while (yield take(LOGIN_REQUEST)) {
    yield call(handleLogin)
  }
}
