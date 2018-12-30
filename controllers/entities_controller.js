const mongoose = require('mongoose');

const Entity = mongoose.model('entities');
const User = mongoose.model('users');
const validator = require('email-validator');
const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * There are two controller files for the two separate
 * database collections { entities, users }. However,
 * it may happen that a controller function in one
 * controller file edits BOTH collections
 */

const timeArray = [
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
];

module.exports = {
  getRooms: async (req, res, next) => {
    const entityName = req.user.activeEntity;
    try {
      const entity = await Entity.findOne({ name: entityName });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }
      const rooms = entity.rooms.slice();
      // removes default property and just puts it into times[i].availability if not already done
      for (let i = 0; i < rooms.length; i += 1) {
        for (let j = 0; j < rooms[i].times.length; j += 1) {
          rooms[i].times[j].availability = (
            rooms[i].times[j].availability.default || rooms[i].times[j].availability
          );
        }
      }
      res.send(rooms);
    } catch (err) {
      next(err);
    }
  },

  getUsers: async (req, res, next) => {
    const entityName = req.user.activeEntity;
    try {
      const entity = await Entity.findOne({ name: entityName });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }
      const users = entity.users.slice();
      // only email and isAdmin should be sent to the client
      const usersSlim = users.map(userObject => ({
        isAdmin: userObject.isAdmin,
        email: userObject.email,
      }));
      res.send(usersSlim);
    } catch (err) {
      next(err);
    }
  },

  createEntity: async (req, res, next) => {
    const entityProps = req.body;
    if (entityProps.entity === '') {
      /*
      * 'return' is required here or node will throw an error
      * this is because it runs the rest of the code below the redirect
      * when it should just exit the function
      * 'return' makes sure this happens
      */
      return res.redirect('../../login/createNone');
    }
    if (!validator.validate(entityProps.email)) {
      return res.redirect('../../login/createFailEmail');
    }
    try {
      const entityExists = await Entity.findOne({ name: entityProps.entity });
      if (entityExists) {
        throw new Error();
      }
      // store user info in Entity collection
      await Entity.create({ name: entityProps.entity });
      const entity = await Entity.findOne({ name: entityProps.entity });
      const passwordHash = await bcrypt.hash(entityProps.password, saltRounds);
      await entity.users.push({
        email: entityProps.email,
        password: passwordHash,
        entity: entityProps.entity,
        isAdmin: true,
      });
      // store user info in User collection
      let user = await User.findOne({ email: entityProps.email });
      if (user) {
        await user.entities.push({ name: entityProps.entity, isAdmin: true });
        await user.save();
      } else {
        await User.create({ email: entityProps.email });
        user = await User.findOne({ email: entityProps.email });
        await user.entities.push({ name: entityProps.entity, isAdmin: true });
        await user.save();
      }
      await entity.save();
      return res.redirect('../../login/createSuccess');
    } catch (err) {
      return res.redirect('../../login/createFail');
    }
  },

  createRoom: async (req, res, next) => {
    const entityName = req.user.activeEntity;
    const roomProps = req.body;
    try {
      const entity = await Entity.findOne({ name: entityName });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }
      const roomDoesNotExist = entity.rooms.every(room => room.roomName !== roomProps.roomName);
      if (!roomDoesNotExist) {
        res.locals.type = 'clientError';
        throw new Error(`There already is a room called: ${roomProps.roomName}.`);
      }
      entity.rooms.push(roomProps);
      await entity.save();
      res.send(`Room: ${roomProps.roomName} successfully added`);
    } catch (err) {
      next(err);
    }
  },

  deleteRoom: async (req, res, next) => {
    const entityName = req.user.activeEntity;
    const roomProps = req.params;
    try {
      const entity = await Entity.findOne({ name: entityName });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }
      const room = entity.rooms.find(roomObject => roomObject.roomName === roomProps.roomName);
      if (!room) {
        res.locals.type = 'clientError';
        throw new Error(`There is no room called: ${roomProps.roomName}.`);
      }
      const index = entity.rooms.indexOf(room);
      entity.rooms.splice(index, 1);
      await entity.save();
      res.send(`Room: ${roomProps.roomName} successfully deleted`);
    } catch (err) {
      next(err);
    }
  },

  blockRoom: async (req, res, next) => {
    const entityName = req.user.activeEntity;
    const roomProps = req.body;
    try {
      const entity = await Entity.findOne({ name: entityName });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }
      const room = entity.rooms.find(roomObject => roomObject.roomName === roomProps.roomName);
      if (!room) {
        res.locals.type = 'clientError';
        throw new Error(`There is no room called ${roomProps.roomName}.`);
      }
      const indexStart = timeArray.indexOf(roomProps.start);
      const indexEnd = timeArray.indexOf(roomProps.end);
      for (let i = indexStart; i < indexEnd; i += 1) {
        if (room.times[i].availability === false) {
          res.locals.type = 'clientError';
          throw new Error('This room is already at least partly reserved for the timespan you selected.');
        }
      }
      for (let i = indexStart; i < indexEnd; i += 1) {
        room.times.set(i, { time: { default: timeArray[i] }, availability: false });
      }
      await entity.save();
      res.send(`Selected timespan ${roomProps.start}-${roomProps.end} for room ${roomProps.roomName} successfully reserved.`);
    } catch (err) {
      next(err);
    }
  },

  unblockRoom: async (req, res, next) => {
    const entityName = req.user.activeEntity;
    const roomProps = req.body;
    try {
      const entity = await Entity.findOne({ name: entityName });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }
      const room = entity.rooms.find(roomObject => roomObject.roomName === roomProps.roomName);
      if (!room) {
        res.locals.type = 'clientError';
        throw new Error(`There is no room called ${roomProps.roomName}.`);
      }
      const indexStart = timeArray.indexOf(roomProps.start);
      const indexEnd = timeArray.indexOf(roomProps.end);
      for (let i = indexStart; i < indexEnd; i += 1) {
        room.times.set(i, { time: { default: timeArray[i] }, availability: true });
      }
      await entity.save();
      res.send(`Selected timespan ${roomProps.start}-${roomProps.end} for room ${roomProps.roomName} successfully unblocked.`);
    } catch (err) {
      next(err);
    }
  },

  deleteEntity: async (req, res, next) => {
    const entityNameClient = req.params.entity;
    const entityNameServer = req.user.activeEntity;

    try {
      // User has to manually type entity name in client to confirm deletion
      if (entityNameClient !== entityNameServer) {
        res.locals.type = 'clientError';
        throw new Error('Incorrect Entity Name');
      }

      const entity = await Entity.findOne({ name: entityNameServer });
      const usersInEntity = entity.users.slice();
      // delete Entity in entityiescollection
      await Entity.deleteOne({ name: entityNameServer });
      // delete entity in entityArray of User in users collection
      await usersInEntity.map(async (userObject) => {
        const user = await User.findOne({ email: userObject.email });
        const entityInUser = user.entities
          .find(entityObject => entityObject.name === entityNameServer);
        const indexOfEntity = user.entities.indexOf(entityInUser);
        user.entities.splice(indexOfEntity, 1);
        await user.save();
        // if entityArray is empty, the user in users collection can be deleted too
        if (user.entities.length === 0) {
          await User.deleteOne({ email: userObject.email });
        }
      });
      // log out user after entity is deleted
      const user = req.user;
      user.activeEntity = 'none';
      user.isAdminNow = false;
      await user.save();
      await req.logout();
      res.send('Entity successfully deleted');
    } catch (err) {
      next(err);
    }
  },
};
