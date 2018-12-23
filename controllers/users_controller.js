const mongoose = require('mongoose');
const Entity = mongoose.model('entities');
const User = mongoose.model('users');

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
  //expects params with object {entity}
  getAllRooms: async (req, res, next) => {
    const entityName = req.params.entity;
    try {
      const entity = await Entity.findOne({ name: entityName });
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
  //expects json with {name, email, and password}
  createEntity: async (req, res, next) => {
    const entityProps = req.body;
    try {
      const previousEntity = await Entity.findOne({ name: entityProps.entity });
      if(previousEntity) {
        throw new Error();
      }
      await Entity.create({ name: entityProps.entity });
      const entity = await Entity.findOne({ name: entityProps.entity });
      await entity.users.push({
        email: entityProps.email,
        password: entityProps.password,
        entity: entityProps.entity,
        isAdmin: true
      });
      const user = await User.findOne({ email: entityProps.email });
      if(user) {
        await user.entities.push({ name: entityProps.entity, isAdmin: true });
        await user.save();
      } else {
        await User.create({ email: entityProps.email });
        const user = await User.findOne({ email: entityProps.email });
        await user.entities.push({ name: entityProps.entity, isAdmin: true });
        await user.save();
      }
      await entity.save();
      
    } catch(err) {
      res.locals.type = 'clientError'
      err.message = `There already is an entity called ${entityProps.entity}`;
      next(err);
    }
  },
  //expects json with {entity, email, and password}
  createUser: async (req, res, next) => {
    const userProps = req.body;
    try {
      const entity = await Entity.findOne({ name: userProps.entity });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${userProps.entity}`);
      }
      const userDoesNotExist = entity.users.every(user => user.email !== userProps.email);
      if (userDoesNotExist) {
        await entity.users.push(userProps);
        const user = await User.findOne({ email: userProps.email });
        if(user) {
          await user.entities.push({ name: userProps.entity });
          await user.save();
        } else {
          await User.create({ email: userProps.email });
          const user = await User.findOne({ email: userProps.email });
          await user.entities.push({ name: userProps.entity });
          await user.save();
        }
        await entity.save();
        res.send(`User: ${userProps.email} successfully added`);
      } else {
        res.locals.type = 'clientError';
        throw new Error(`There already is a user called: ${userProps.email}.`);
      }
    } catch (err) {
      next(err);
    }
  },
  // expects json with {roomName and entity}
  createRoom: async (req, res, next) => {
    const roomProps = req.body;
    try {
      const entity = await Entity.findOne({ name: roomProps.entity });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${roomProps.entity}`);
      }
      const roomDoesNotExist = entity.rooms.every(room => room.roomName !== roomProps.roomName);
      if (roomDoesNotExist) {
        entity.rooms.push(roomProps);
        await entity.save();
        res.send(`Room: ${roomProps.roomName} successfully added`);
      } else {
        res.locals.type = 'clientError';
        throw new Error(`There already is a room called: ${roomProps.roomName}.`);
      }
    } catch (err) {
      next(err);
    }
  },

  //expects params with {entity and roomName}
  deleteRoom: async (req, res, next) => {
    const roomProps = req.params;
    try {
      const entity = await Entity.findOne({ name: roomProps.entity});
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${roomProps.entity}`);
      }
      const room = entity.rooms.find(roomObject => roomObject.roomName === roomProps.roomName);
      if (room) {
        const index = entity.rooms.indexOf(room);
        entity.rooms.splice(index, 1);
        await entity.save();
        res.send(`Room: ${roomProps.roomName} successfully deleted`);
      } else {
        res.locals.type = 'clientError';
        throw new Error(`There is no room called: ${roomProps.roomName}.`);
      }
    } catch (err) {
      next(err);
    }
  },
  //expects json with {entity, roomName, start, end}
  blockRoom: async (req, res, next) => {
    const roomProps = req.body;
    try {
      const entity = await Entity.findOne({ name: roomProps.entity });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${roomProps.entity}`);
      }
      const room = entity.rooms.find(roomObject => roomObject.roomName === roomProps.roomName);
      if (room) {
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
      } else {
        res.locals.type = 'clientError';
        throw new Error(`There is no room called ${roomProps.roomName}.`);
      }
    } catch (err) {
      next(err);
    }
  },

  //expects json with {entity, roomName, start, end}
  unblockRoom: async (req, res, next) => {
    const roomProps = req.body;
    try {
      const entity = await Entity.findOne({ name: roomProps.entity });
      const room = entity.rooms.find(roomObject => roomObject.roomName === roomProps.roomName);
      if (room) {
        const indexStart = timeArray.indexOf(roomProps.start);
        const indexEnd = timeArray.indexOf(roomProps.end);

        for (let i = indexStart; i < indexEnd; i += 1) {
          room.times.set(i, { time: { default: timeArray[i] }, availability: true });
        }
        await entity.save();
        res.send(`Selected timespan ${roomProps.start}-${roomProps.end} for room ${roomProps.roomName} successfully unblocked.`);
      } else {
        res.locals.type = 'clientError';
        throw new Error(`There is no room called ${roomProps.roomName}.`);
      }
    } catch (err) {
      next(err);
    }
  },
};
