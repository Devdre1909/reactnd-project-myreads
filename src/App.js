import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchBooks from './SearchBooks';
import Shelf from './Shelf';
import {Route, Link} from 'react-router-dom';



class BooksApp extends Component {
  state = {
    books: [],
    loading: true,
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState(()=>({
          books,
          loading: false
        }))
      })
  }


  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((books) => {
        this.componentDidMount()
    })
  }
 
  
  render() {  

    const {books, loading} = this.state;

    const currentlyReading = books === [] ? books : books.filter(book => (book.shelf === "currentlyReading"));
    const wantToRead = books === [] ? books : books.filter(book => (book.shelf === "wantToRead"));
    const read = books === [] ? books : books.filter(book => (book.shelf === "read"));

    
    return (
      <div className="app">
        <Route
          excact
          path="/"
          render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {(loading) ? (<div style={{ margin: 'auto', fontWeight: 'bolder', textAlign: 'center' }}>Loading shelf...</div>) : (<Shelf onChangeShelf={(book, shelf) => {this.changeShelf(book, shelf)}} shelfTitle="Currently Reading" books={currentlyReading} />)}
                {(loading) ? (<div style={{ margin: 'auto', fontWeight: 'bolder', textAlign: 'center'  }}>Loading shelf...</div>) : (<Shelf onChangeShelf={(book, shelf) => {this.changeShelf(book, shelf)}} shelfTitle="Want To Read" books={wantToRead} />)}
                {(loading) ? (<div style={{ margin: 'auto', fontWeight: 'bolder', textAlign: 'center'  }}>Loading shelf...</div>) : (<Shelf onChangeShelf={(book, shelf) => {this.changeShelf(book, shelf)}} shelfTitle="Read" books={read} />)}
                </div>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (<SearchBooks />)}
        />
        <div className="open-search">
          <Link to="/search" className="button">Add a book</Link>
        </div>
    </div>
    )
  }
}

export default BooksApp;
