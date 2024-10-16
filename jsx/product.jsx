const React = require('react')
const {
  Link
} = require('react-router')

class Product extends React.Component { // Товар
  constructor(props) {
    super(props)
    this.handleBuy = this.handleBuy.bind(this)
  }
  handleBuy (event) {
    this.props.route.addToCart(this.props.params.id)
  }
  render() {
    return (
      <div>
        <img src={this.props.route.products[this.props.params.id].src} style={{ height: '80%' }} />
        <p>{this.props.route.products[this.props.params.id].title}</p>
		<p>{this.props.route.products[this.props.params.id].info}</p>
        <Link
          to={{
            pathname: `/cart`,
            state: { productId: this.props.params.id}
          }}
          onClick={this.handleBuy}
          className="btn btn-primary">
          Купить
        </Link>
      </div>
    )
  }
}

module.exports = Product