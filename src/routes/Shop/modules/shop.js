import 'whatwg-fetch'
import { ADD_TO_CART } from '../../../modules/Cart'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER'
export const LOAD_USERS = 'LOAD_USERS'
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
export const DESTROY_NOTICE_MSG = 'DESTROY_NOTICE_MSG'

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

export const getUsers = () => {
  return (dispatch) => {
    return fetch('/mock-data.json')
            .then((data) => data.json())
              .then((parsedData) => dispatch({
                  type    : LOAD_USERS,
                  payload : parsedData.users
                })
              )
  }
}

export const destroyNoticeMsg = () => {
  return (dispatch) => {
    dispatch({
      type: DESTROY_NOTICE_MSG
    })
  }
}

export const setActiveUser = (user) => {
  return (dispatch) => {
    dispatch({
      type    : SET_ACTIVE_USER,
      payload : user
    })
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_ACTIVE_USER]  : (state, action) => Object.assign({}, state, {user: action.payload}),
  [LOAD_USERS]       : (state, action) => Object.assign({}, state, {users: action.payload}),
  [LOAD_PRODUCTS]    : (state, action) => Object.assign({}, state, {products: action.payload}),
  [ADD_TO_CART]      : (state, action) => Object.assign({}, state, {displayNotice: true, noticeMsg: action.payload.name + ' has been added to your cart!'}),
  [DESTROY_NOTICE_MSG]: (state, action) => Object.assign({}, state, {displayNotice: false, noticeMsg: ''}),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  products: [],
  displayNotice: false,
  noticeMsg: '',
  user: {
    id: 'guest'
  }
}
export default function shopReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
