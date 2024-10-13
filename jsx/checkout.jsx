const React = require('react')
const {
  Link
} = require('react-router')


class Checkout extends React.Component { // Подсчет суммы
  constructor(props) {
    super(props)
    this.handlePay = this.handlePay.bind(this)
  }
  handlePay (event) {
	this.props.route.clearCart()
	alert("Оплачено!")
  }
  render() {
    let count = 0
	let final_sum = 0
    return <div>
	<h1>Счет</h1><table className="table table-bordered"><tbody>
      {Object.keys(this.props.route.cartItems).map((item, index, list)=>{
        count += this.props.route.cartItems[item]
		final_sum += this.props.route.products[item].cost * this.props.route.cartItems[item]
        return <tr key={item}>
          <td>{this.props.route.products[item].title}</td>
          <td>{this.props.route.cartItems[item]}</td>
		  <td>{this.props.route.products[item].cost}</td>
        </tr>
      })}
    </tbody></table><p>Всего: {count} шт</p><p>Сумма: {final_sum} руб</p>
	<Link
		to={{
            pathname: `/cart`,
            state: { productId: this.props.params.id}
        }}
        onClick={this.handlePay}
        className="btn btn-primary">
        Оплатить
    </Link>
	</div>
  }
}

module.exports = Checkout