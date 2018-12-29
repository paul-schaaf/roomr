const mongoose = require('mongoose');
const Entity = mongoose.model('entities');
const User = mongoose.model('users');
const validator = require('email-validator');

/**
 * There are two controller files for the two separate
 * database collections { entities, users }. However,
 * it may happen that a controller function in one
 * controller file edits BOTH collections
 */

 module.exports = {
  //expects json with {email, and password}
 createUser: async (req, res, next) => {
   const userProps = req.body;
   const entityName = req.user.activeEntity;
   try {
      if(!validator.validate(userProps.email)) {
        res.locals.type = 'clientError';
        throw new Error(`Please enter a valid email.`);
      }

      const entity = await Entity.findOne({ name: entityName });
      if(!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }

      const userDoesNotExist = entity.users.every(user => user.email !== userProps.email);
      if(!userDoesNotExist) {
       res.locals.type = 'clientError';
       throw new Error(`There already is a user called: ${userProps.email}.`);
      }
     
      await entity.users.push({email: userProps.email, password: userProps.password, entity: entityName});
      const user = await User.findOne({ email: userProps.email });
      if(user) {
        await user.entities.push({ name: entityName });
        await user.save();
      } else {
        await User.create({ email: userProps.email });
        const user = await User.findOne({ email: userProps.email });
        await user.entities.push({ name: entityName });
        await user.save();
      }
    await entity.save();
    res.send(`User: ${userProps.email} successfully added`);
     
  } catch (err) {
    next(err);
  }
 },
   //expects params with {user}
  deleteUser: async (req, res, next) => {
    const entityName = req.user.activeEntity;
    const userEmail = req.params.email;
    try{
      const entity = await Entity.findOne({ name: entityName });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }
      /**
       * userInEntity refers to the userSubSchema within
       * the entitySchema as as opposed to the userSchema
       * entityInUser works vice-versa
       */
      const userInEntity = entity.users.find(userObject => userObject.email === userEmail);
      if(!userInEntity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no user called: ${userEmail}.`);
      }
      
        /**
        * any entity needs at least 1 admin to add or delete users,
        * make others admins and delete the entity
        */
      if(userInEntity.isAdmin && entity.adminCount === 1) {
        res.locals.type = 'clientError';
        throw new Error('Every entity needs at least 1 admin.');
      }
      if(userInEntity.isAdmin) {
        entity.adminCount = entity.adminCount - 1;
      }
      const indexOfUser = entity.users.indexOf(userInEntity);
      entity.users.splice(indexOfUser, 1);
      /**
       * above the user was spliced from the user array
       * within its respective entity, below the entity
       * is spliced from the User in its user.entities
       * array. If the user has no more entities, the user
       * is deleted
       */
      const user = await User.findOne({ email: userEmail });
      const entityInUser = user.entities.find(entityObject => entityObject.name === entityName);
      const indexOfEntity = user.entities.indexOf(entityInUser);
      user.entities.splice(indexOfEntity, 1);
      await user.save();
      if (user.entities.length === 0) {
        await User.deleteOne({ email: userEmail });
      }
      await entity.save();
      res.send(`User: ${userEmail} successfully deleted`);
    } catch(err) {
      next(err);
    }

  },
  //expects json with {email}
  makeAdmin: async (req, res, next) => {
    const entityName = req.user.activeEntity;
    const userEmail = req.body.email;
    try{
      const entity = await Entity.findOne({ name: entityName });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }
      const userInEntity = entity.users.find(userObject => userObject.email === userEmail);
      if(!userInEntity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no user called: ${userEmail}.`);
      }
      if(userInEntity.isAdmin === true) {
        res.locals.type = 'clientError';
        throw new Error(`User: ${userEmail} is already admin.`);
      }
      userInEntity.isAdmin = true;
      entity.adminCount = entity.adminCount + 1;
      const user = await User.findOne({ email: userEmail });
      const entityInUser = user.entities.find((entityObject) => entityObject.name === entityName);
      entityInUser.isAdmin = true;
      await user.save();
      await entity.save();
      res.send(`User: ${userEmail} successfully made admin`);
    } catch(err) {
      next(err);
    }
  },
  //expects json with {email}
  unmakeAdmin: async (req, res, next) => {
    const entityName = req.user.activeEntity;
    const userEmail = req.body.email;
    try{
      const entity = await Entity.findOne({ name: entityName });
      if (!entity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no entity called:${entityName}`);
      }
      const userInEntity = entity.users.find(userObject => userObject.email === userEmail);
      if(!userInEntity) {
        res.locals.type = 'clientError';
        throw new Error(`There is no user called: ${userEmail}.`);
      }
      if(userInEntity.isAdmin === false) {
        res.locals.type = 'clientError';
        throw new Error(`User: ${userEmail} is not an admin.`);
      }
      if(userInEntity.isAdmin && entity.adminCount === 1) {
        res.locals.type = 'clientError';
        throw new Error('Every entity needs at least 1 admin.');
      }
      userInEntity.isAdmin = false;
      entity.adminCount = entity.adminCount - 1;
      const user = await User.findOne({ email: userEmail });
      const entityInUser = user.entities.find((entityObject) => entityObject.name === entityName);
      entityInUser.isAdmin = false;
      await user.save();
      await entity.save();
      res.send(`User: ${userEmail} successfully unmade admin`);   
    } catch(err) {
      next(err);
    }
  },
 }