import {
  Cart
} from 'modules/cart'

describe('(JS Module) Cart', () => {
  let cartObj

  let classicAd = {
    "id": "SEeT49PYp6SzHKjRb",
    "name": "Classic Ad",
    "price": 269.99
  }

  let standoutAd = {
    "id": "XhrStR2pHaBkHBy9E",
    "name": "Standout Ad",
    "price": 322.99
  }

  let premiumAd = {
    "id": "nbddoiFeshMWQn4YY",
    "name": "Premium Ad",
    "price": 394.99
  }

  beforeEach(() => {
    const pricingRules = [
      {
        "type": "xForY",
        "params": {
          "requiredProductId": "SEeT49PYp6SzHKjRb",
          "requiredMinimumQty": 5,
          "qtyToPay": 4
        }
      },
      {
        "type": "fixedDiscount",
        "params": {
          "requiredProductId": "XhrStR2pHaBkHBy9E",
          "specialPrice": 309.99
        }
      },
      {
        "type": "discountWithMinimum",
        "params": {
          "requiredProductId": "nbddoiFeshMWQn4YY",
          "requiredMinimumQty": 3,
          "specialPrice": 389.99
        }
      }
    ];

    cartObj = new Cart(pricingRules)
  })

  it('Should be able to add items', () => {
    cartObj.add(Object.assign({}, classicAd))
    expect(cartObj.items().length).to.equal(1)
    cartObj.add(Object.assign({}, classicAd))
    expect(cartObj.items().length).to.equal(2)
  })

  it('Should be able to compute the correct regular price', () => {
    expect(cartObj.total()).to.equal(classicAd.price * 2)
  })
})
