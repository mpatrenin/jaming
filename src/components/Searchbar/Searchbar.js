import React from 'react';
import './Searchbar.css'

export class SearchBar extends React.Component {
    constructor(props){
      super(props);
      this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event){
      this.props.onSearch(event.target.value)
    }

    render() {
        return (
          <div className="SearchBar">
              <h1>Find your favorite song here</h1>
             <input id="PlaceholderSearch" placeholder="Yes, here" 
                    onChange={this.handleSearch}/>
             <button className="SearchButton"> SEARCH</button>
          </div>
        )
    }
}

