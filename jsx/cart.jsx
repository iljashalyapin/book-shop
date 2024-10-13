const React = require('react')
const {
  Link
} = require('react-router')

class Cart extends React.Component { // Корзина
  render() {
    return <div>
      {(Object.keys(this.props.route.cartItems).length == 0) ? <p>Ваша корзина пуста</p> : '' }
       <ul>
        {Object.keys(this.props.route.cartItems).map((item, index, list)=>{
          return <li key={item}>{this.props.route.products[item].title} - {this.props.route.cartItems[item] + " шт"} - {this.props.route.products[item].cost+ " руб"}</li>
        })}
      </ul>
      {(Object.keys(this.props.route.cartItems).length == 0) ? '' : <Link to="/checkout" className="btn btn-primary">Подсчитать сумму</Link> }
      <Link to="/" className="btn btn-info">Домой</Link>
    </div>
  }
}

module.exports = Cart