import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import Shelf from './Shelf';

class BookShelfs extends Component{

    static PropsTypes = {
      CurrentlyReading: PropsTypes.array.isRequired,
      bookRead: PropsTypes.array.isRequired,
      loading: PropsTypes.bool.isRequired
    }

    render(){

      const {CurrentlyReadingBook, loading, bookRead } = this.props;

        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {(loading) ? (<div style={{ margin: 'auto', fontWeight: 'bolder'  }}>Loading shelf...</div>) : (<Shelf books={CurrentlyReadingBook} />)}
                <Shelf />
                {(loading) ? (<div style={{ margin: 'auto', fontWeight: 'bolder'  }}>Loading shelf...</div>) : (<Shelf books={bookRead} />)}
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
        )
    }
}


export default BookShelfs;