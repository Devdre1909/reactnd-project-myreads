import React, { Component } from 'react';
import PropsTypes from 'prop-types';

class Shelf extends Component{

    static PropsTypes = {
        books: PropsTypes.array.isRequired,
        shelfTitle: PropsTypes.string.isRequired,
        onChangeShelf: PropsTypes.func.isRequired
    }

    handleOnChangeShelf = (book, shelf) => {
        if(this.props.onChangeShelf) this.props.onChangeShelf(book, shelf);
    }

    render(){

        const { books, shelfTitle } = this.props;

        return(
            <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelfTitle}</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.title.toLowerCase()}>
                            <div className="book">
                                <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <form >
                                        <select onChange={(e) => {
                                            this.handleOnChangeShelf(book, e.target.value)
                                        }} value={book.shelf}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead" >Want to Read</option>
                                            <option value="read" >Read</option>
                                            <option value="none" defaultChecked="true">None</option>
                                        </select>
                                    </form>
                                </div>
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


export default Shelf;