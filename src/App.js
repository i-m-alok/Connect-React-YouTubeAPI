import React, {Component} from 'react';
import './App.css';


const CHANNEL_ID = "UCSos_jXdo44fiCBf_plqyLA";
// const REACT_API_KEY="***************************"
// const BASE_URL = "www.googleapis.com";

const BASE_URL =`https://www.googleapis.com/youtube/v3/playlists?part=snippet%2Cplayer&channelId=${CHANNEL_ID}&maxResults=50&access_token=${process.env.REACT_APP_API_KEY}&key=${process.env.REACT_APP_API_KEY}`
// Channels: `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${CHANNEL_ID}&access_token=${API_KEY}&key=${API_KEY}`
// Playlist-Items:  'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLzAcyLgUfwRGn47ZBHdeWOW0kB3Xr44e5&access_token=${API_KEY}&key=[YOUR_API_KEY]

class App extends Component {
  constructor() {
    super();
    this.state = {
      fetchData : []
    }
  }

  componentDidMount() {
    fetch(BASE_URL).then(result => result.json()).then(fetchData => {
      this.setState({ fetchData:fetchData.items })
    });
    // console.log(this.state.fetchData);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="text-light p-2 m-2">My Youtube Playlists</h1>
          <ul className="list-group d-flex flex-row flex-wrap justify-content-center">
          {this.state.fetchData.map((item) => {
            const { id, snippet = {} } = item;
            const { title,description, thumbnails = {}, resourceId } = snippet;
            const { medium = {} } = thumbnails;
            return (
              <li className="card card-width border-primary list-group-item m-3" key={id}>
                <a href={`https://www.youtube.com/playlist?list=${id}`}><img className="card-img-top" src={medium.url} alt="Card image cap" /></a>
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text description">{description}</p>
                </div>
              </li>
            )
          })
            }
        </ul>
        </header>
    </div>);
  }
}


export default App;