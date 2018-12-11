const UsersController = require('../controllers/users_controller');

module.exports = (app) => {

  app.delete('/api/users/rooms/:id', UsersController.deleteRoom);
  
  app.get('/api/users/rooms', UsersController.getAllRooms);

  app.post('/api/users/rooms', UsersController.createRoom);

  app.post('/api/users', UsersController.createUser);

  

  //TODO: implement block time route, implement check time route

 

  /**
  * future function to block time in room in app
  * app.put('/api/users/rooms/times', UsersController.blockTime);
  **/

  /**
  * future function to check time in room in app
  * app.put('/api/users/rooms/times', UsersController.checkTime);
  **/
  
};