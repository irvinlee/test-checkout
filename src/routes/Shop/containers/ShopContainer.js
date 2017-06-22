import { connect } from 'react-redux'
import { getProducts, getUsers, destroyNoticeMsg, setActiveUser } from '../modules/shop'
import { addToCart } from '../../../modules/Cart'

import Counter from '../components/Shop'

import Shop from '../components/Shop'

const mapDispatchToProps = {
  getProducts,
  getUsers,
  destroyNoticeMsg,
  setActiveUser,
  addToCart
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
