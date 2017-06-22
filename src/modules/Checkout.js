function xForY(item, params){
  if(item.qty < params.requiredMinimumQty)
    return item.qty * item.price
  else{
    let itemsToPay = Math.ceil(item.qty * params.qtyToPay / params.requiredMinimumQty)
    return item.price * itemsToPay
  }
}

function fixedDiscount(item, params){
  return item.qty * params.specialPrice
}

function discountWithMinimum(item, params){
  if(item.qty >= params.requiredMinimumQty)
    return item.qty * params.specialPrice
  else
    return item.qty * item.price
}

export class Checkout{

  constructor(pricingRules){
    this.__products = {}
    this.__pricingRules = {}

    if(!!pricingRules)
      pricingRules.map((rule) => this.__pricingRules[rule.params.requiredProductId] = rule)
  }

  add = (item) => {
    if(!this.__products[item.id])
      this.__products[item.id] = {...item, qty: 1}
    else {
      this.__products[item.id].qty++
    }
  }

  getItems = () => {
    let ret = [];

    Object.keys(this.__products).map((k) => ret.push(this.__products[k]))

    return ret;
  }

  itemCount = () => {
    let count = 0

    Object.keys(this.__products).map((k) => {
      count += this.__products[k].qty
    })

    return count
  }

  _getTotalPriceForProduct = (product) => {
    if(!this.__pricingRules[product.id]){
      return product.price * product.qty
    }else{
      switch(this.__pricingRules[product.id].type){
        case 'xForY': return xForY(product, this.__pricingRules[product.id].params); break;
        case 'fixedDiscount': return fixedDiscount(product, this.__pricingRules[product.id].params); break;
        case 'discountWithMinimum': return discountWithMinimum(product, this.__pricingRules[product.id].params); break;
      }
    }
  }

  total = () => {
    let total = 0

    Object.keys(this.__products).map((k) => {
      total += this._getTotalPriceForProduct(this.__products[k])
    })

    return total
  }
}
