# roomr
a (meeting) room management app

## Motivation
I have just learned javascript and made this app for my portfolio because the internet already has too many todo apps. Roomr is a room management app. It lets you add and delete rooms and lets you block (and unblock) desired timespans. This system allows everyone in a building to see which rooms are available at what times.

## List of Contents
- [How to install](#How-to-install)
- [Technologies used](#Technologies-used)
- [Possible Additions](#Possible-Additions)
### How to install
You will need node, npm, git, and the heroku cli for this.

*IMPORTANT:* The database schema is configured in a way that supports several users. This is because in the future an authorisation system will sit on top of the app.
Hence, when fetching rooms or making other requests to change rooms, you are actually finding a User in mongo first and then change the rooms of that user.
This means that upon first deploying your app, you need to send a post request with an app like postman with the content of ("email": "anemail@aprovider.com") to yourURL/api/users. This will create a user in the database. Then you ALSO need to change the code in users_controller.js to let mongoose find your e-mail address instead of the current used one.
The lines (PLURAL) you need to change all look like this: const user = await User.findOne({ email: 'paulsimonschaaf@gmail.com' });
#### Locally
1. clone the directory
2. add a dev.js file within the config folder of the server folder with the structure of prod.js - inside, use your own mongoDBURI for the key (get a free one a mlab)
3. "npm install" at terminal of server folder and client-roomr folder
4. "node index.js" at terminal of server folder
5. "npm start" at terminal of client-roomr folder inside server folder
#### On Heroku
1. clone the directory
2. get mlab account and make a database to get MongoURI - set your mongoURI as MONGO_URI in Heroku config variables for your heroku app
3. git push heroku master
### Technologies used
I have used the airbnb styleguide for linting this project.
#### Frontend
The frontend is built with Html, Css, JS, and React and using the newest JS such as import statements and export default with babel.
#### Backend
The backend is built with JS, node, and express. The data is stored in a MongoDB database and handled with Mongoose. 
### Possible Additions
- allow custom time ranges for rooms instead of 09-00 to 17:00
- add an authorisation system (I already thought of this while writing the app so the database is already structured in a way that allows for such a system)
- night and day mode
- room ordering according to space available, alphabetic, custom ordering
- better loading screen (currently only says "loading...")
- attach tags to rooms that allow for better searches (e.g. find rooms with a coffee machine that are free from 10:15-to 10:30)
  - possible tags:
    - wifi
    - coffee machine
    - "quiet room"
    - projector
    - big, medium, small room sizes
    - add custom tags
- add more days to app, currently the app only shows the one day
- ability to integrate with calendar
- ability to add info to room blockings (e.g. who the people who blocked this room are, what they are doing etc.)
- ability to block rooms by clicking on them instead of using the form
- add feature to bulk add rooms
- better UI/UX. On the browser it looks a little clunky because there is so much space next to the form. On mobile,
the form at the top is a little difficult to reach and use
