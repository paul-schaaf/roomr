# roomr
a (meeting) room management app

## Motivation
Roomr allows everyone in a building (or any kind of entity) to see which rooms are available at what times, so workers don't have to spend valuable time looking for available space. It lets users add and delete rooms and reserve rooms for specific times.

## List of Contents
- [Using the demo](#Using-the-demo)
- [Technologies used](#Technologies-used)
- [Possible Additions](#Possible-Additions)
## Using the demo
First go to roomr-demo.herokuapp.com

### Using the premade account
  You can log into an existing entity with {Ecorp, rick@demo.com, 123 or Ecorp, morty@demo.com, 123}
### Creating an account yourself
  You can create your own entity by going to the create tab and putting in your desired info. You will then be able to log in as an admin, which gives you additional rights (to avoid mobile screen cluttering, you need to be on a >1000px screen for additional rights button to appear).
### Using the forms
  The forms are all self evident but you can also intentionally make errors to see what happens e.g.
  - type in an invalid email for add user
  - delete yourself if you are the only admin
  - add a user that is already there
  - block a timespan that is already blocked

  You can also create users, log out and log in with their accounts. If you have created one more admin by adding them and then making them admin, you can even delete yourself and see what happens (spoiler: you'll be kicked).

  Finally, once you are done, type in your entity name to delete your entity again.
## Technologies used
I have used the airbnb styleguide for linting this project.
#### Frontend
The frontend is built with Html, CSS, JS, and React and using the newest JS such as import statements and export default with babel.
#### Backend
The backend is built with JS, node, and express. The data is stored in a MongoDB database and handled with Mongoose. Authentication is done with passport.js (passport-local) and passwords are hashed/compared with bcrypt.
## Possible Additions
- allow custom time ranges for rooms instead of 09-00 to 17:00
- night and day mode
- room ordering according to space available, alphabetic, custom ordering
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
- better UI/UX. On the browser it looks a little clunky because there is so much space next to the form. On mobile,the form at the top is a little difficult to reach and use
