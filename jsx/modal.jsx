const React = require('react')
const {
  Link
} = require('react-router')

class Modal extends React.Component { // Модальное окно
  constructor(props) {
    super(props)
    this.styles = {
      position: 'fixed',
      top: '20%',
      right: '20%',
      bottom: '20%',
      left: '20%',
      width: 850,
      height: 620,
      padding: 20,
      boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
      overflow: 'auto',
      background: '#fff'
    }
  }
  render() {
    return (
      <div style={this.styles}>
        <p><Link to={this.props.returnTo}>Назад</Link></p>
        {this.props.children}
      </div>
    )
  }
}

module.exports = Modal