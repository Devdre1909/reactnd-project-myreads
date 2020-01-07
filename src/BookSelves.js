import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import Shelf from './Shelf';

class BookShelfs extends Component{

    static PropsTypes = {
      CurrentlyReading: PropsTypes.array.isRequired,
      WantToRead: PropsTypes.array.isRequired,
      Read: PropsTypes.array.isRequired,
      loading: PropsTypes.bool.isRequired
    }

    render(){

      const {CurrentlyReadingBook, loading, WantToRead, Read } = this.props;

        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {(loading) ? (<div style={{ margin: 'auto', fontWeight: 'bolder', textAlign: 'center' }}>Loading shelf...</div>) : (<Shelf shelfTitle="Currently Reading" books={CurrentlyReadingBook} />)}
                {(loading) ? (<div style={{ margin: 'auto', fontWeight: 'bolder', textAlign: 'center'  }}>Loading shelf...</div>) : (<Shelf shelfTitle="Want To Read" books={WantToRead} />)}
                {(loading) ? (<div style={{ margin: 'auto', fontWeight: 'bolder', textAlign: 'center'  }}>Loading shelf...</div>) : (<Shelf shelfTitle="Read" books={Read} />)}
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