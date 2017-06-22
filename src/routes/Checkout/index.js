export default (store) => ({
  path : 'checkout',

  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const Checkout = require('./containers/CheckoutContainer').default
      cb(null, Checkout)

    }, 'checkout')
  }
})
