import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FAIL,
} from '../constants/Photos'

import { call, put, take } from 'redux-saga/effects'

let cachedPhotos = []

function makeYearPhotos(photos, selectedYear) {
  let createdYear,
    yearPhotos = []

  photos.forEach(item => {
    createdYear = new Date(item.date * 1000).getFullYear()
    if (createdYear === selectedYear) {
      yearPhotos.push(item)
    }
  })

  yearPhotos.sort((a, b) => b.likes.count - a.likes.count)

  return yearPhotos
}

function getMorePhotos(offset, count, year) {
  return new Promise((resolve, reject) => {
    return Promise.resolve().then(() => {
      //eslint-disable-next-line no-undef
      VK.Api.call(
        'photos.getAll',
        { extended: 1, count: count, offset: offset, v: '5.80' },
        r => {
          try {
            cachedPhotos = cachedPhotos.concat(r.response.items)
            offset += 200
            if (offset <= r.response.count) {
              resolve(getMorePhotos(offset, 200, year))
            }
            resolve(makeYearPhotos(cachedPhotos, year))
          } catch (e) {
            reject({
              type: GET_PHOTOS_FAIL,
              error: true,
              payload: new Error(e),
            })
          }
        }
      )
    })
  })
}

function vkPhotosRequest(year) {
  return new Promise((resolve, reject) => {
    if (!cachedPhotos.length) {
      getMorePhotos(0, 200, year)
        .then(photos => {
          resolve(photos)
        })
        .catch(e => {
          reject(e)
        })
    } else {
      resolve(makeYearPhotos(cachedPhotos, year))
    }
  })
}

function* handlePhotos(year) {
  try {
    const photos = yield call(vkPhotosRequest, year)
    yield put({ type: GET_PHOTOS_SUCCESS, payload: photos })
  } catch (e) {
    yield put({
      type: GET_PHOTOS_FAIL,
      error: true,
      payload: new Error('Ошибка получения фото'),
    })
  }
}

export function* photosSaga() {
  while (true) {
    // payload = year
    // TODO: improve -> takeLatest or improve reducer
    const { payload } = yield take(GET_PHOTOS_REQUEST)
    yield call(handlePhotos, payload)
  }
}
