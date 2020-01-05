import React, { Component } from 'react';
import PropsTypes from 'prop-types';

class BookState extends Component {

    static PropsTypes = {
        shelfState: PropsTypes.string.isRequired,
        onSelveChange: PropsTypes.func.isRequired
    }

    render(){

        const {shelfState} = this.props;

        return(
                 <div className="book-shelf-changer">
                     <select value={shelfState}>
                     <option value="move" disabled>Move to...</option>
                     <option value="currentlyReading">Currently Reading</option>
                     <option value="wantToRead" >Want to Read</option>
                     <option value="read" >Read</option>
                     <option value="none" defaultChecked="true">None</option>
                     </select>
                 </div>
             )        
    }
}

export default BookState;