import React from "react";

const SearchFilter = (props) => {
    return(
        <div>
            <h2>Phonebook</h2>
            filter shown with: <input type="text" value={props.filter} onChange={props.handleFilter}/>
        </div>
    )
}

export default SearchFilter

