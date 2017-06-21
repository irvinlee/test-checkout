import React from 'react'

export class Shop extends React.Component{
  constructor(props){
    super(props);
    props.getProducts();
  }

  render(){
    return (
      <div>
        {this.props.shop.products && this.props.shop.products.map((p) => (
          <h3>{p.name}</h3>
        ))}
      </div>
    );
  }
}

export default Shop
