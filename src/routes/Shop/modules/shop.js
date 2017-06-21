import 'whatwg-fetch'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

export const getProducts = () => {
  return (dispatch) => {
    return fetch('/mock-data.json')
            .then((data) => data.json())
              .then((parsedData) => dispatch({
                  type    : LOAD_PRODUCTS,
                  payload : parsedData.products
                })
              )
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_PRODUCTS]    : (state, action) => Object.assign({}, state, {products: action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  products: []
}
export default function shopReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
