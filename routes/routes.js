const UsersController = require('../controllers/users_controller');

module.exports = (app) => {

  app.delete('/api/users/rooms/:id', UsersController.deleteRoom);
  
  app.get('/api/users/rooms', UsersController.getAllRooms);

  app.post('/api/users/rooms', UsersController.createRoom);

  app.post('/api/users', UsersController.createUser);

  app.post('/api/users/rooms/times-block', UsersController.blockRoom);

  app.post('/api/users/rooms/times-unblock', UsersController.unblockRoom);
  
};