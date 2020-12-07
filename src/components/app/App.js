import React from 'react';
import './App.css';
import { SearchBar } from '../Searchbar/Searchbar.js';
import { Playlist } from '../Playlist/Playlist.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import Spotify from '../util/Spotify.js';

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      searchResults: [],
      plyalistName: 'New Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);

  }

  search(searchTerm){
    console.log('spotifying');
    Spotify.SearchMethoad(searchTerm)
    .then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }

  addTrack(track) {
  
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTracks => savedTracks.id === track.id)) {
      return;
    }
      tracks.push(track);
      this.setState({ 
        playlistTracks: tracks
      });
      console.log(this.state.playlistTracks);

  }

  removeTrack(track) {
  
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ 
        playlistTracks: tracks
      });
  }

  updatePlayListName(newname) {
    this.setState({
      plyalistName: newname
     })
  }

  savePlayList() {
    const trackUris = this.state.playlistTracks.map(track => track.URI);
    const playlistname = this.state.plyalistName;
    Spotify.SaveUserPlaylist(playlistname, trackUris)
    .then(
      this.setState({
        searchResults: [],
        plyalistName: 'Give me New Playlist',
        playlistTracks: []
      })
    )
  }

  render(){
    return (  
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          
          <SearchResults searchResults={this.state.searchResults} 
                         onAdd={this.addTrack}
                         />
          <Playlist 
                    plyalistName={this.state.plyalistName}
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlayListName}
                    onSave={this.savePlayList}/>
        </div>
      </div>
    </div>
    )
  } 
}

export default App;