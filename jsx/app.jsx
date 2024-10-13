const React = require('react')
const ReactDOM = require('react-dom') // Импорт библиотек
const { hashHistory,
  Router,
  Route,
  IndexRoute,
  Link
} = require('react-router')

const Modal = require('./modal.jsx') // Импорт компонентов
const Cart = require('./cart.jsx')
const Checkout = require('./checkout.jsx')
const Product = require('./product.jsx')
const Info = require('./info.jsx')

const PRODUCTS = [
  { id: 0, src: 'images/Anna Karenina.jpg', title: '"Анна Каренина"', cost: 600, info: Info.info1.join('\n') }, // Массив товаров
  { id: 1, src: 'images/Fathers and children.jpg', title: '"Отцы и дети"', cost: 300, info: Info.info2.join('\n') },
  { id: 2, src: 'images/Breakage.jpg', title: '"Обрыв"', cost: 500, info: Info.info3.join('\n') },
  { id: 3, src: 'images/Evgeny Onegin.jpg', title: '"Евгений Онегин"', cost: 200, info: Info.info4.join('\n') },
  { id: 4, src: 'images/Life of Arsenyev.jpg', title: '"Жизнь Арсеньева"', cost: 300, info: Info.info5.join('\n') }
]

const Heading = () => {
  return <h1>Книжный магазин</h1> // Заголовок
}

const Introduction = () => { 
  return <p>Пожалуйста, нажмите на книгу, чтобы купить ее.</p> // Вводная информация
}


class App extends React.Component { // Главный компонент
  componentWillReceiveProps(nextProps) {
    this.isModal = (nextProps.location.state &&
      nextProps.location.state.modal)
    if (this.isModal &&
      nextProps.location.key !== this.props.location.key) {
      this.previousChildren = this.props.children
    }
  }
  render() {
    console.log('Modal: ', this.isModal)
    return (
      <div className="well">
        <Heading/>
        <div>
          {(this.isModal)?this.previousChildren:this.props.children}
          {(this.isModal)?
            <Modal isOpen={true} returnTo={this.props.location.state.returnTo}>
              {this.props.children}
            </Modal> : ''
          }
        </div>
      </div>
    )
  }
}

class Index extends React.Component { //Компонент оформления ключевой страницы
  render() {
    return (
      <div>
        <Introduction/>
        <p><Link to="/cart" className="btn btn-danger">Корзина</Link></p>
        <div>
          {PRODUCTS.map(picture => (
            <Link key={picture.id}
              to={{pathname: `/products/${picture.id}`,
                state: { modal: true,
                  returnTo: this.props.location.pathname }
                }
              }>
              <img style={{ margin: 10 }} src={picture.src} height="100" />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
let cartItems = {} // Состав корзины
const addToCart = (id) => {
  if (cartItems[id])
    cartItems[id] += 1
  else
    cartItems[id] = 1
}
const clearCart = () => {
	for (var id in cartItems) delete cartItems[id]
}

ReactDOM.render(( //Маршрутизация
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/products/:id" component={Product}
        addToCart={addToCart}
        products={PRODUCTS} />
      <Route path="/cart" component={Cart}
      cartItems={cartItems} products={PRODUCTS}/>
    </Route>
    <Route path="/checkout" component={Checkout}
      cartItems={cartItems} clearCart={clearCart} products={PRODUCTS}/>
  </Router>
), document.getElementById('content'))