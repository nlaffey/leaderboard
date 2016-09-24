# Leaderboard
A leaderboard application to track win/loss game history.

Built with the MERN stack using Webpack for build/asset management.

## Authentication
Basic authentication is currently setup in `server.js`. 

Username: hire
Password: nickLaffey

## Database
Leaderboard uses MongoDB with the DB location configured in `/src/dbConnection`

## Assets
All CSS and JS are compiled down into `build/bundle.js` via Webpack.

## Building the project
Navigate to the root of the project and run `npm `

## Future improvements:

* Add login screen and authentication using passport
* Allow users to create/manage multiple leaderboards
* Track what users added game results.
* Player edit/delete feature
* Game results edit/delete feature
* Allow adding of multiple players to game results (teams)
* Some styling... (eek I know it's boring looking)
