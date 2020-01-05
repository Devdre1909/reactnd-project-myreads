import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchBooks from './SearchBooks';
import BookShelfs from './BookSelves'


class BooksApp extends Component {
  state = {
    books: [],
    loading: true,
    showSearchPage: false
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

 
  
  render() {  

    const {books, loading} = this.state;

    const booksReading = books === [] ? books : books.filter(book => (book.shelf === "currentlyReading"));
    const booksRead = books === [] ? books : books.filter(book => (book.shelf === "read"));
    
    console.log(booksRead);
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <BookShelfs 
            CurrentlyReadingBook={booksReading}
            bookRead={booksRead}
            loading={loading} />
        )
        }
    </div>
    )
  }
}

export default BooksApp;
