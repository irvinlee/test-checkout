import { connect } from 'react-redux'
import CheckoutView from '../components/CheckoutView'

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutView)
