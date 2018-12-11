const UsersController = require('../controllers/users_controller');

module.exports = (app) => {
  
  app.get('/', UsersController.getAllRooms);

  app.post('/api/users/rooms', UsersController.createRoom);

  //TODO: implement deletion function, implement block time function

  /**
  * future function to delete room from app
  * app.delete('/api/users/rooms', UsersController.deleteRoom);
  **/

  /**
  * future function to block time in room in app
  * app.put('/api/users/rooms/times', UsersController.blockTime);
  **/
  
};