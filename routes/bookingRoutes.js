const entitiesController = require('../controllers/entities_controller');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.delete('/api/entities/rooms/:roomName', requireLogin, entitiesController.deleteRoom);

  app.get('/api/entities/rooms', requireLogin, entitiesController.getAllRooms);

  app.post('/api/entities', entitiesController.createEntity);

  app.post('/api/entities/rooms', requireLogin, entitiesController.createRoom);

  app.post('/api/entities/users', requireLogin, entitiesController.createUser);

  app.post('/api/entities/rooms/times-block', requireLogin, entitiesController.blockRoom);

  app.post('/api/entities/rooms/times-unblock', requireLogin, entitiesController.unblockRoom);
};
