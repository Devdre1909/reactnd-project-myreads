import React, { Component } from 'react';
import BookState from './BookState';
import PropsTypes from 'prop-types';

class CurrentlyReading extends Component{

    static PropsTypes = {
        books: PropsTypes.array.isRequired
    }

    render(){

        const { books } = this.props;

        return(
            <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.title.toLowerCase()}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <BookState shelfState={book.shelf} />
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors.map((author) => (`${author} `))}</div>
                            </div>
                            </li>
                        ))}
                    </ol>
                    </div>
                </div>
        )
    }
}


export default CurrentlyReading;