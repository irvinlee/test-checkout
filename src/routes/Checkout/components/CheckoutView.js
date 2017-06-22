import React from 'react'
import { moneyFormat } from '../../../modules/helpers'
import './checkout.scss'
import { Checkout as CheckoutModel } from '../../../modules/Checkout'

export default class CheckoutView extends React.Component{
  constructor(props){
    super(props)

    let productBundles;

    if(!!props.state.shop.user){
      productBundles = props.state.shop.user.productBundles
    }

    this.checkoutModel = new CheckoutModel(productBundles)
    props.state.cart.cartItems.map((item) => this.checkoutModel.add(item))
    console.log(this.checkoutModel.getItems());
  }

  render(){
    return (
      <div className="checkout">
        { this.checkoutModel.itemCount() > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              { this.checkoutModel.getItems().map((item, index) => (
                <tr key={ index }>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{ moneyFormat( this.checkoutModel.getTotalPriceForProduct(item)) }</td>
                </tr>
              )) }
              <tr>
                <td>Total: </td>
                <td>{moneyFormat(this.checkoutModel.total()) }</td>
              </tr>
            </tbody>
          </table>
        ) : (<div>Your Cart is Empty</div>)}
      </div>
    );
  }
}
