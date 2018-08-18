import { all } from 'redux-saga/effects'
import { userSaga } from './userSaga'
import { photosSaga } from './photosSaga'

export function* rootSaga() {
  yield all([userSaga(), photosSaga()])
}
