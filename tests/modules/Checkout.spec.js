import {
  Checkout
} from 'modules/Checkout'

describe('(JS Module) Checkout', () => {
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
          "requiredMinimumQty": 3,
          "qtyToPay": 2
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

    cartObj = new Checkout(pricingRules)
  })

  it('Should be able to add items', () => {
    cartObj.add(Object.assign({}, classicAd))
    expect(cartObj.itemCount()).to.equal(1)
    cartObj.add(Object.assign({}, classicAd))
    expect(cartObj.itemCount()).to.equal(2)
  })

  it('Should be able to compute the correct regular price', () => {
    cartObj.add(Object.assign({}, classicAd))
    cartObj.add(Object.assign({}, classicAd))
    expect(cartObj.total()).to.equal(classicAd.price * 2)
    cartObj.add(Object.assign({}, premiumAd))
    expect(cartObj.total()).to.equal(classicAd.price * 2 + premiumAd.price)
  })

  it('Should be able to handle X for Y promo bundles', () => {
    cartObj.add(Object.assign({}, classicAd))
    cartObj.add(Object.assign({}, classicAd))
    cartObj.add(Object.assign({}, classicAd))
    expect(cartObj.total()).to.equal(classicAd.price * 2)
    cartObj.add(Object.assign({}, classicAd))
    expect(cartObj.total()).to.equal(classicAd.price * 3) //4 for 3 since (3 for 2) + 1
    cartObj.add(Object.assign({}, classicAd))
    expect(cartObj.total()).to.equal(classicAd.price * 4) //5 for 4 since (3 for 2) + 2
    cartObj.add(Object.assign({}, classicAd))
    expect(cartObj.total()).to.equal(classicAd.price * 4) //6 for 4 since it's equal to 2(3 for 2)
  })

  it('Should be able to handle Fixed Discount promo bundles', () => {
    cartObj.add(Object.assign({}, standoutAd))
    cartObj.add(Object.assign({}, standoutAd))
    expect(cartObj.total()).to.equal(309.99 * 2)
    expect(cartObj.total()).not.to.equal(standoutAd.price * 2)
  })

  it('Should be able to handle Fixed Discount (with minimum purchase) promo bundles', () => {
    cartObj.add(Object.assign({}, premiumAd))
    cartObj.add(Object.assign({}, premiumAd))
    expect(cartObj.total()).to.equal(premiumAd.price * 2)
    cartObj.add(Object.assign({}, premiumAd))
    expect(cartObj.total()).to.equal(389.99 * 3)
  })

  it('Should be able to handle mixed promo bundles', () => {
    cartObj.add(Object.assign({}, premiumAd))
    cartObj.add(Object.assign({}, premiumAd))
    cartObj.add(Object.assign({}, premiumAd))

    cartObj.add(Object.assign({}, classicAd))
    cartObj.add(Object.assign({}, classicAd))
    cartObj.add(Object.assign({}, classicAd))

    cartObj.add(Object.assign({}, standoutAd))
    cartObj.add(Object.assign({}, standoutAd))

    let premiumAdTotalPrice = 389.99 * 3
    let standoutAdTotalPrice = 309.99 * 2
    let classicAdTotalPrice = classicAd.price * 2

    expect(cartObj.total()).to.equal( premiumAdTotalPrice + standoutAdTotalPrice + classicAdTotalPrice )
  })
})
