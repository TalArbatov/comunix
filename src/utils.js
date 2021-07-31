export const searchEndpoint = (search, type) => `https://api.spotify.com/v1/search?q=${search}&type=${type}`;

export const getHeaders = (tokenType, accessToken) => ({
  'Authorization': `${tokenType} ${accessToken}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});

export const dateToMilliseconds = date => {
  const dateObj = new Date(date);
  return dateObj.getTime();
};