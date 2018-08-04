import { createStore } from 'redux'
import { rootReducer } from '../reducers'

// удалили "начальное состояние = initial state"
// так как теперь наш редьюсер составной,
// и нам нужны initialState каждого редьюсера.
// Это будет сделано автоматически.
export const store = createStore(rootReducer)
