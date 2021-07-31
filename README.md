# comunix
## Improvements
* API results are saved aside in case we need to reset the state of sorting/filter without creating a redundant API request. ogResults simulates a database/in-memory cache which we can retrieve data from. in a real world solution, we'd  want to find a better solution such as caching/API pagination to avoid storing large data on the client-side state.
* Solutions such as Redis can be a good option as well, alternatively we can use the built-in pagination that comes with the Spotify API.
* The authorization phase to the API can use a refactor, lots of different parameters are hardcoded and the code is not very readable.
* The connection and query to the API is implemented directly on the client side (which is served via webpack-dev-server), the client should only be able to access the server that fetches it's files. The server will be able to handle Authorization and API fetching on it's side.
* Had issues fetching and rendering audio files and an audio player, will implemented if I'll have more time.
* Some functions need to be exported into a utility file and set as helper functions.




![alt text](https://i.imgur.com/PA0zrsF.png)
