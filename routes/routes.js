const UsersController = require('../controllers/users_controller');

module.exports = (app) => {
  
  app.get('/', UsersController.getAllRooms);

  app.post('/api/users/rooms', UsersController.createUser);
  
};