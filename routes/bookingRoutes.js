const entitiesController = require('../controllers/entities_controller');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

module.exports = app => {
  app.delete('/api/entities/rooms/:roomName', requireLogin, requireAdmin, entitiesController.deleteRoom);

  app.get('/api/entities/rooms', requireLogin, entitiesController.getAllRooms);

  app.post('/api/entities', entitiesController.createEntity);

  app.post('/api/entities/rooms', requireLogin, requireAdmin, entitiesController.createRoom);

  app.post('/api/entities/users', entitiesController.createUser);

  app.post('/api/entities/rooms/times-block', requireLogin, entitiesController.blockRoom);

  app.post('/api/entities/rooms/times-unblock', requireLogin, entitiesController.unblockRoom);
};
