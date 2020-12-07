let savedToken;
let userID;

const URI = 'http://spotjamming.surge.sh/';
const clientID = '0e73745845584546883ad1ac36e5262b';
const Spotify = {

    getAccessToken(){

        if (savedToken){
            return savedToken;  
        } 

        const accessToken = window.location.href.match(/access_token=([^&]*)/);
        const expiresToken = window.location.href.match(/expires_in=([^&]*)/);
        if (accessToken && expiresToken) {
            savedToken = accessToken[1];
            const expiresIn = Number(expiresToken[1]);
        //     window.setTimeout(() => savedToken = '', expiresIn * 1000).
        //     window.history.pushState('Access Token', null, '/');
            return savedToken 
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${URI}`;
            window.location = accessURL;
        };

    },

    SearchMethoad(searchterm) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchterm}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`     
            }
        })
        .then(response => {return response.json()})
        .then(jsonresponse => {
            if (!jsonresponse.tracks) {
                return [];
            } else {
            return jsonresponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    URI: track.uri
            }));
            }
        });
    },

    SaveUserPlaylist(name, URIarray) {
        if (!name || !URIarray){
            return
        } else {
            
            let AccessTokenAvailable = savedToken;
            let Headers = {
                Authorization: `Bearer ${AccessTokenAvailable}`     
            }
            return fetch(`https://api.spotify.com/v1/me`, {
                headers: Headers,
                method: "GET"
                })
                .then(response => response.json())
                .then(jsonresponse => {
                    userID = jsonresponse.id;
                return fetch(`https://api.spotify.com/v1/me/playlists`, {
                    headers: Headers,
                    method: "POST",
                    body: JSON.stringify({ name: name })
                })
                .then(response => response.json())
                .then(jsonresponse => {
                    const playlistID = jsonresponse.id;
                    return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                        headers: Headers,
                        method: "POST",
                        body: JSON.stringify({ uris: URIarray })
                    })
                })})
        }
    }
}

export default Spotify;