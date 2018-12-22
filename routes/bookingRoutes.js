const UsersController = require('../controllers/users_controller');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.delete('/api/users/rooms/:id', requireLogin,UsersController.deleteRoom);

  app.get('/api/users/rooms', requireLogin, UsersController.getAllRooms);

  app.post('/api/users/rooms', requireLogin, UsersController.createRoom);

  app.post('/api/users', requireLogin, UsersController.createUser);

  app.post('/api/users/rooms/times-block', requireLogin, UsersController.blockRoom);

  app.post('/api/users/rooms/times-unblock', requireLogin, UsersController.unblockRoom);
};
