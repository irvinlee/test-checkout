export const ADD_TO_CART = 'ADD_TO_CART'

const ACTION_HANDLERS = {
  [ADD_TO_CART]    : (state, action) => {
    let cartItems = state.cartItems.slice();
    cartItems.push(action.payload)
    return Object.assign({}, state, { cartItems })
  },
}

export const addToCart = (param) => {
  return (dispatch) => {
    return dispatch({
            type    : ADD_TO_CART,
            payload : param.product
          })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  cartItems: [],
}

export default function cartReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
