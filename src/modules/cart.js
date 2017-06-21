export class Cart{
  constructor(pricingRules){
    this.__pricingRules = !!pricingRules && pricingRules.length !== undefined ? pricingRules : []
    this.__items = []
  }

  add = (item) => {
    this.__items.push(item)
  }

  xForY = (items, params) => {
    let total = 0

    let promoItems = []

    items.map((item, index) => {
      if(item.id === params.requiredProductId){
        promoItems.push( items.splice(index, 1) )
      }
    })

    if(promoItems.length < params.requiredMinimumQty){
      total = promoItems[0].price * promoItems.length //didn't meet minimum requirement; use regular price
    }else{
      total = Math.ceil(promoItems[0].price * params.qtyToPay / params.requiredMinimumQty)
    }

    return { items, total }
  }

  fixedDiscount = (items, params) => {
    let total = 0

    items.map((item, index) => {
      if(item.id === params.requiredProductId){
        total += params.specialPrice
        items.splice(index, 1)
      }
    })

    return { items, total }
  }

  discountWithMinimum = (items, params) => {
    let total = 0
    let promoItems = []

    items.map((item, index) => {
      if(item.id === params.requiredProductId){
        promoItems.push( items.splice(index, 1) )
      }
    })

    if(promoItems.length >= params.requiredMinimumQty)
      total = params.specialPrice * promoItems.length
    else
      total = promoItems[0].price * promoItems.length //didn't meet minimum requirement; use regular price

    return { items, total }
  }

  getCartTotal = (items, pricingRules, total) => {
    if(pricingRules.length === 0){
      items.each((i) => total += i.price )
      return total
    }

    if(items.length === 0){
      return total
    }

    const currentRule = pricingRules.splice(0, 1)

    switch(currentRule.type){
      case 'xForY':
          let xForYResult = this.xForY(items, currentRule.params)
          return this.getCartTotal(xForYResult.items, pricingRules, total + xForYResult.total)
          break

      case 'fixedDiscount':
          let fixedDiscountResult = this.fixedDiscount(items, currentRule.params)
          return this.getCartTotal(fixedDiscountResult.items, pricingRules, total + fixedDiscountResult.total)
          break

      case 'discountWithMinimum':
          let discountWithMinimumResult = this.discountWithMinimum(items, currentRule.params)
          return this.getCartTotal(discountWithMinimumResult.items, pricingRules, total + discountWithMinimumResult.total)
          break
    }
  }

  total = () => {
    return this.getCartTotal(this.__items.slice(), this.__pricingRules.slice(), 0)
  }

  items = () => {
    return this.__items
  }
}
