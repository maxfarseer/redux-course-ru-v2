import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

class App extends Component {
  render() {
    const { user, page } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Мой топ фото</h1>
        </header>
        <p>Привет, {user.name}!</p>
        <p>
          У тебя {page.photos.length} фото за {page.year} год
        </p>
      </div>
    )
  }
}

const mapStateToProps = store => {
  console.log(store)
  return {
    user: store.user,
    page: store.page,
  }
}

export default connect(mapStateToProps)(App)
