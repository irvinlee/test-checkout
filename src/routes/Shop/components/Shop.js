import React from 'react'
import { moneyFormat } from '../../../modules/helpers'
import './shop.scss'
import { Link } from 'react-router'

const Product = ({id, price, name, description, onAddToCart}) => (
  <div className="product-box">
    <h3>{name}</h3>
    <p>{description}</p>
    <section className="bottom">
      <div className="price">{moneyFormat(price)}</div>
      <button
        className="add-to-cart"
        onClick={ () => onAddToCart( {product: {id, name, price}} ) }
      >
        Add To Cart
      </button>
    </section>
  </div>
)

export default class Shop extends React.Component{
  constructor(props){
    super(props);
    props.getProducts();
    props.getUsers();
  }

  componentDidUpdate(){
    if(this.props.state.shop.displayNotice){
      setTimeout(
        () => this.props.destroyNoticeMsg(),
        3500
      )
    }
  }

  selectUser = (e) => {
    const { users } = this.props.state.shop;

    for(let i = 0; i < users.length; i++){
      if(users[i].id === e.target.value){
        this.props.setActiveUser(users[i])
        break
      }
    }
  }

  render(){
    const {products, users, displayNotice, noticeMsg} = this.props.state.shop;
    // console.log(this.props.state.shop);

    return (
      <div className="shop">
        <div className="test-user-select">
          Test As:
          <select value={this.props.state.shop.user.id} onChange={ this.selectUser }>
            <option value="guest">Guest</option>
            {users.map( (user) => (
              <option key={user.id} value={ user.id }>{user.username}</option>
            ))}
          </select>
        </div>
        {displayNotice && (
          <div className="notice">{ noticeMsg }</div>
        )}
        <div className="checkout-wrapper">
          <Link to="/checkout" className="checkout-btn">Checkout Now</Link>
        </div>

        <div className="products-wrapper center-block">
          {products && products.map((p) => (
            <Product key={p.id} {...p} onAddToCart={ this.props.addToCart }/>
          ))}
        </div>
      </div>
    );
  }
}
