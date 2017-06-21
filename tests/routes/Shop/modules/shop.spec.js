import {
  LOAD_PRODUCTS,
  getProducts,
  default as shopReducer
} from 'routes/Shop/modules/shop'

describe('(Redux Module) productLoader', () => {
  let _globalState
  let _dispatchSpy
  let _getStateSpy

  beforeEach(() => {
    _globalState = {
      shop: {
        products: []
      }
    }
    _dispatchSpy = sinon.spy((action) => {
      _globalState = {
        ..._globalState,
        shop: {
          ..._globalState.shop,
          products: shopReducer(_globalState, action)
        }
      }
    })
    _getStateSpy = sinon.spy(() => {
      return _globalState
    })
  })

  it('Should export a function getProducts', () => {
    expect(getProducts).to.be.a('function')
  })

  it('Should return a function (is a thunk).', () => {
    expect(getProducts()).to.be.a('function')
  })

  it('Should return a promise from that thunk that gets fulfilled.', () => {
    return getProducts()(_dispatchSpy, _getStateSpy).should.eventually.be.fulfilled
  })
})
