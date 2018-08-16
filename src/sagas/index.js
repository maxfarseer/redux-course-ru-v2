import { all } from 'redux-saga/effects'
import { userSaga } from './userSaga'

export function* rootSaga() {
  yield all([userSaga()])
}
