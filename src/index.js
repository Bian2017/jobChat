
import { createStore } from 'redux'

function counter(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'reduce':
      return state - 1
    default:
      return 10
  }
}


const store = createStore(counter)

const init = store.getState()

console.log(init)

function listener() {
  const current = store.getState()
  console.log('Current count', current)
}

store.subscribe(listener)

store.dispatch({
  type: 'add'
})

store.dispatch({
  type: 'add'
})

