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
    updateMessage: <LoadingShelf />
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState(()=>({
          books,
          loading: false
        }))
      })
      .catch((e) => {
        this.setState(() => ({
          updateMessage: <LoadingShelf error={true} />
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

    const {books, loading, updateMessage} = this.state;

    const currentlyReading = books === [] ? books : books.filter(book => (book.shelf === "currentlyReading"));
    const wantToRead = books === [] ? books : books.filter(book => (book.shelf === "wantToRead"));
    const read = books === [] ? books : books.filter(book => (book.shelf === "read"));

    
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {(loading) ? (<div style={{ margin: 'auto', fontWeight: '400', textAlign: 'center' }}>{updateMessage}</div>):(<Shelf onChangeShelf={(book, shelf) => {this.changeShelf(book, shelf)}} shelfTitle="Currently Reading" books={currentlyReading} />)}
                {(loading) ? (()=>{}) : (<Shelf onChangeShelf={(book, shelf) => {this.changeShelf(book, shelf)}} shelfTitle="Want To Read" books={wantToRead} />)}
                {(loading) ? (()=>{}) : (<Shelf onChangeShelf={(book, shelf) => {this.changeShelf(book, shelf)}} shelfTitle="Read" books={read} />)}
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


class LoadingShelf extends Component{

  render(){
    return(
      (this.props.error) ? (<div className="spinner-container">
        <h3 style={{maxWidth: '540px'}}>Unable you get your books, please check your internet connection and refresh</h3>
      </div>) : (
        <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      )
    )
  }
}




export default BooksApp;
