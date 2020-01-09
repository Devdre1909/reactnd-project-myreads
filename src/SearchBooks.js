import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';


class SearchBooks extends Component {

    state = {
      query: '',
      searchTerm: 'android',
      books: [],
      loading: true
    }

    handleTermChange = (e) => {
      this.setState(()=>({
        loading: true
      }))
      const term = e.target.value;
      BooksAPI.search(term)
        .then(books => {
          this.setState(()=>({
            books,
            searchTerm: term,
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

    updateQuery = (query) => {
      this.setState(()=>({
        query
      }))
    }

    searchBook(search_term){
      BooksAPI.search(search_term)
        .then((books) => {
          this.setState(()=>({
            books,
            loading: false
          }))
        })
    }

    componentDidMount(){
      this.searchBook(this.state.searchTerm)
    }

    render(){

        const SEARCH_TERMS = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
        const {loading, searchTerm, books, query} = this.state;

        const showingBooks = query === "" ? books : books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()) || (book.authors ? book.authors.toString().toLowerCase().includes(query.toLowerCase()) : book.publisher.toString().toLowerCase().includes(query.toLowerCase())) );

        return(
            <div className="search-books">
            <div className="search-books-bar" style={{backgroundColor: '#fff'}}>
              <Link className="close-search" to="/" >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input onChange={(e) => {this.updateQuery(e.target.value.trim())}} value={query} type="text" placeholder="Search by title or author"/>
              </div>
              <select className="search-books-terms" onChange={this.handleTermChange}>
                  {SEARCH_TERMS.map(search_term => (
                    <option key={search_term.toLowerCase()} value={search_term.toLowerCase()}>{search_term}</option>
                  ))}
                </select>
            </div>
            <div className="search-books-results" style={{marginTop: '1.5rem'}}>
              <ol className="books-grid">
              {(loading) ? (<h4>Loading result...</h4>) : (<Shelf onChangeShelf={(book, shelf) => {this.changeShelf(book, shelf)}} shelfTitle={`Showing ${showingBooks.length} result for ${searchTerm.toLocaleUpperCase()}`} books={showingBooks} />)}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks;