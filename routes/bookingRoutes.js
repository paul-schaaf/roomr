const UsersController = require('../controllers/users_controller');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.delete('/api/entities/rooms/:entity/:roomName', UsersController.deleteRoom);

  app.get('/api/entities/rooms/:entity', requireLogin, UsersController.getAllRooms);

  app.post('/api/entities', UsersController.createEntity);

  app.post('/api/entities/rooms', UsersController.createRoom);

  app.post('/api/entities/users', UsersController.createUser);

  app.post('/api/entities/rooms/times-block', UsersController.blockRoom);

  app.post('/api/entities/rooms/times-unblock', UsersController.unblockRoom);
};
