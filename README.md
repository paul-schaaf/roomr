#ROOMR

I have just learned javascript and made this app for my portfolio because the internet already has too many todo apps. Roomr is a room management app. It lets you add and delete rooms and lets you block (and unblock) desired timespans. This system allows everyone in a building to see which rooms are available at what times. The app is currently split between two servers, the create-react-app(port 3000) server and the nodejs-express server(port 5000). In the future they will be put together and deployed on heroku. If you do not wish to install it yourself, I have included screenshots of the app.

##List of contents

- How to install
- Technologies used
- Comments
- Bugs
- Screenshots
- Schemata
- Possible Additions

##How to install

1. clone both the server folder and the client folder
2. make mlab account (it's free) and database and connect it with mongooose in app.js inside the server folder
3. run "npm install" on both folders terminals
4. run "nodemon app" or "node app" at the server folder terminal
5. run "npm start" at the client folder terminal
6. You're ready to go - go to localhost:3000 if window doesnt open automatically

##Technologies used

For the backend I used node and express to create the server and mongoDB and mongoose to handle the Database and Database queries. I use mlab to host my MongoDB database.

For the frontend I used Javascript(ES6 and above e.g. async/await), axios, and React(using create-react-app).

##Comments

Instead of explaining the code in great detail in the readme, I have left comments whenever they were required. The schemata below will provide you with further insight into how the app works.

##Bugs

There is one bug that is currently in the app although it does not crash it. It gives an error because the server tries to set http headers after they were already set. I am yet to find out why this is happening.