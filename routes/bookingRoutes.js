const UsersController = require('../controllers/users_controller');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.delete('/api/entities/rooms/:roomName', UsersController.deleteRoom);

  app.get('/api/entities/rooms', requireLogin, UsersController.getAllRooms);

  app.post('/api/entities', UsersController.createEntity);

  app.post('/api/entities/rooms', requireLogin, UsersController.createRoom);

  app.post('/api/entities/users', requireLogin, UsersController.createUser);

  app.post('/api/entities/rooms/times-block', requireLogin, UsersController.blockRoom);

  app.post('/api/entities/rooms/times-unblock', requireLogin, UsersController.unblockRoom);
};
