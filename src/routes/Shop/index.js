import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'shop',

  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const Shop = require('./containers/ShopContainer').default
      const reducer = require('./modules/shop').default

      injectReducer(store, { key: 'shop', reducer })

      cb(null, Shop)

  }, 'shop')
  }
})
