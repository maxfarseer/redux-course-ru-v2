export const initialState = {
  user: {
    name: 'Василий',
    surname: 'Реактов',
    age: 27,
  },
}

export function rootReducer(state = initialState) {
  return state
}
