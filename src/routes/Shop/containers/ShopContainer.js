import { connect } from 'react-redux'
import { getProducts } from '../modules/shop'

import Counter from '../components/Shop'

import Shop from '../components/Shop'

const mapDispatchToProps = {
  getProducts
}

const mapStateToProps = (state) => ({
  shop : state.shop
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
