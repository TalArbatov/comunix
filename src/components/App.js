import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Wrapper from './components/Wrapper';
import { GlobalStyle } from '../styles';
import Content from './Content';

const clientId = '652fd53d0cc34dc2a950e39a95cc18b6';
const clientSecret = '95330fa075944ec4b0b7efec2cd6e046';
const redirectionUrl = 'https://comunix-assignment.herokuapp.com/';

const searchEndpoint = (query) => `https://api.spotify.com/v1/search?q=${query}&type=artist`;

const App = () => {
  const [search, setSearch] = useState('');
  const [api, setApi] = useState({});
  
  useEffect(() => {
    if (window.location.hash.length > 0) {
      console.log(getReturnedParamsFromAuth(window.location.hash));
      const { access_token, token_type, expires_in } = getReturnedParamsFromAuth(window.location.hash);
      setApi({ 
        accessToken: access_token,
        tokenType: token_type,
        expiresIn: expires_in
       });
       localStorage.setItem('tokenType', token_type);
       localStorage.setItem('accessToken', access_token);
    } else {
      authorize();
    }
  }, [])

  const getReturnedParamsFromAuth = hash => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split('&');
    return paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split('=');
      accumulater[key] = value;
      return accumulater
    }, {})

  }

  const authorize = () => {
    const scopes = 'user-read-private user-read-email';
    window.location.href = 'https://accounts.spotify.com/authorize' + 
      '?response_type=token' + // code for for another step with user data access
      '&client_id=' +  clientId + 
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') + 
      '&redirect_uri=' + encodeURIComponent(redirectionUrl)
  };

  const onSearch = () => {
    axios.get(searchEndpoint(search), {
      headers: {
        'Authorization': `${api.tokenType} ${api.accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res.data);
    })
  }
  
  return (
    <div className="application">
      <GlobalStyle />
      {/* <div>
        <button onClick={ authorize }>Authorize</button>
        <input type="text" placeholder="search Spotify..." onChange={ e => setSearch(e.target.value) }/>
        <button onClick={ onSearch }>Search</button>
      </div> */}
      {/* <button onClick={ authorize }>authorize</button> */}
      <Content />
    </div>
  );
};

export default App;