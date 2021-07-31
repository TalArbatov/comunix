import React, { useEffect } from 'react';
import { GlobalStyle } from '../styles';
import Content from './Content';
import config from '../config';

const { clientId, redirectionUrl } = config;

const App = () => {
  useEffect(() => {
    if (window.location.hash.length > 0) {
      const { access_token, token_type } = getReturnedParamsFromAuth(window.location.hash);
       localStorage.setItem('tokenType', token_type);
       localStorage.setItem('accessToken', access_token);
       history.pushState("", document.title, window.location.pathname + window.location.search);
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
      '&scope=' + encodeURIComponent(scopes) + 
      '&redirect_uri=' + encodeURIComponent(redirectionUrl)
  };

  return (
    <div className="application">
      <GlobalStyle />
      <Content />
    </div>
  );
};

export default App;