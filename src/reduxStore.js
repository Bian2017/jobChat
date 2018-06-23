const ADD_OPER = 'add'
const REDUCE_OPER = 'reduce'

//Reducer
export function counter(state, action) {
  switch (action.type) {
    case ADD_OPER:
      return state + 1
    case REDUCE_OPER:
      return state - 1
    default:
      return 0
  }
}

// Action creator
export function addNumber() {
  return { type: ADD_OPER }
}

export function reduceNumber() {
  return { type: REDUCE_OPER }
}

