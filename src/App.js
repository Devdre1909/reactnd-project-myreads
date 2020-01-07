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
    const wantToRead = books === [] ? books : books.filter(book => (book.shelf === "wantToRead"));
    const read = books === [] ? books : books.filter(book => (book.shelf === "read"));

    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <BookShelfs 
            CurrentlyReadingBook={booksReading}
            WantToRead={wantToRead}
            Read={read}
            loading={loading} />
        )
        }
    </div>
    )
  }
}

export default BooksApp;
