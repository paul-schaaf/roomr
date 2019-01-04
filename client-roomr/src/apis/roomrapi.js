import axios from 'axios';
import axiosErrorHandler from '../errorHandling/axiosErrorHandler';

/**
* defines axios functions that call roomrapi
* uses baseURL defined in roomrapiConfig.js
* exports roomrapi object that holds functions that are given to the axiosErrorHandler
* thereby avoiding writing try-catch for each function
* getRoomDataOnce: makes get request on first load of the app to get rooms
* getRoomDataLoop: makes get request every 10 seconds to update client
* getUserDataOnce: makes get request on first load to get user data if admin=true
* getUserDataLoop: same as getRoomDataLoop if admin=true and for users
*/

let roomInterval;
let userInterval;

const getRoomDataOnce = async (appState) => {
  const response = await axios.get('/api/entities/rooms');
  appState.setState({ rooms: response.data, getStatus: 'successful' });
};


/**
* this axios function requires a separate catch because
* the function is inside a setInterval function
* so the axiosErrorHandler.js handler will not work on it.
* The try block outside setInterval (from axiosErrorHandler) executes setRoomDataLoop
* but it does not care about async/await so it will conclude there were no errors because it already
* finished before the setInterval callback could get back onto the callstack.
* This is why we need a catch INSIDE
* the set interval function, the same goes for getUserDataLoop
* this is the only place I used then/catch, not async/await
* because the latter does not set errors correctly for some reason
*/
const getRoomDataLoop = (appState) => {
  roomInterval = setInterval(() => {
    axios.get('/api/entities/rooms')
      .then(response => appState.setState({ rooms: response.data, getStatus: 'successful' }))
      .catch((err) => {
        if (err.request) {
          appState.setState({ getStatus: 'failed', errorType: 'serverError' });
        }
        if (err.response) {
          appState.setState({
            responseMessage: err.response.data.message,
            errorType: err.response.type,
          });
        }
      });
  }, 10000);
};

const getUserDataOnce = async (appState) => {
  const response = await axios.get('/api/entities/users');
  const users = response.data.map(user => user.email);
  const admins = response.data
    .filter(user => user.isAdmin)
    .map(user => user.email);
  const usersWithoutAdmins = response.data
    .filter(user => !user.isAdmin)
    .map(user => user.email);
  appState.setState({
    users, admins, usersWithoutAdmins, getStatus: 'successful',
  });
};

const getUserDataLoop = (appState) => {
  userInterval = setInterval(() => {
    axios.get('/api/entities/users')
      .then((response) => {
        const users = response.data.map(user => user.email);
        const admins = response.data
          .filter(user => user.isAdmin)
          .map(user => user.email);
        const usersWithoutAdmins = response.data
          .filter(user => !user.isAdmin)
          .map(user => user.email);
        appState.setState({
          users, admins, usersWithoutAdmins, getStatus: 'successful',
        });
      })
      .catch((err) => {
        if (err.response) {
          appState.setState({
            responseMessage: err.response.data.message,
            errorType: err.response.data.type,
          });
        } else if (err.request) { // this error appears when there is no response from the server
          appState.setState({ getStatus: 'failed', errorType: 'serverError' });
        }
      });
  }, 10000);
};

const addRoom = async (appState, reqData) => {
  const { roomName } = reqData;
  if (roomName === '') {
    throw new Error('Please enter a room before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.post('/api/entities/rooms', { roomName });
  appState.setState({ responseMessage: `Successfully added room: ${roomName}` });
};

const deleteRoom = async (appState, reqData) => {
  const { roomName } = reqData;
  if (roomName === '') {
    throw new Error('Please enter a room before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.delete(`/api/entities/rooms/${roomName}`);
  appState.setState({ responseMessage: `Successfully deleted room: ${roomName}` });
};

const blockRoom = async (appState, reqData) => {
  const { roomName, start, end, day } = reqData;
  if (roomName === '') {
    throw new Error('Please enter a room before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.post('/api/entities/rooms/times-block', {
    roomName,
    start,
    end,
    day,
  });
  appState.setState({ responseMessage: `Successfully blocked room: ${roomName}` });
};


const unblockRoom = async (appState, reqData) => {
  const { roomName, start, end, day } = reqData;
  if (roomName === '') {
    throw new Error('Please enter a room before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.post('/api/entities/rooms/times-unblock', {
    roomName,
    start,
    end,
    day,
  });
  appState.setState({ responseMessage: `Successfully unblocked room: ${roomName}` });
};

const addUser = async (appState, reqData) => {
  const { email, password } = reqData;
  if (email === '') {
    throw new Error('Please enter an email before submitting!');
  }
  if (password === '') {
    throw new Error('Please enter a password before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.post('/api/entities/users', {
    email,
    password,
  });

  appState.setState({ responseMessage: `Successfully added user: ${email}` });
};

const deleteUser = async (appState, reqData) => {
  const { email } = reqData;
  if (email === '') {
    throw new Error('Please enter an email before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.delete(`/api/entities/users/${email}`);
  appState.setState({ responseMessage: `Successfully deleted user: ${email}` });
};

const makeAdmin = async (appState, reqData) => {
  const { email } = reqData;
  if (email === '') {
    throw new Error('Please enter an email before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.post('/api/entities/admins-add', {
    email,
  });
  appState.setState({ responseMessage: `Successfully made user: ${email} admin.` });
};

const unmakeAdmin = async (appState, reqData) => {
  const { email } = reqData;
  if (email === '') {
    throw new Error('Please enter an email before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.post('/api/entities/admins-remove', {
    email,
  });
  appState.setState({ responseMessage: `Successfully removed admin status from user: ${email}` });
};

const deleteEntity = async (appState, reqData) => {
  const { entity } = reqData;
  if (entity === '') {
    throw new Error('Please enter an entity name before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.delete(`/api/entities/${entity}`);
};

const roomrapi = {

  handledGetRoomDataOnce: async (appState) => {
    await axiosErrorHandler(getRoomDataOnce, appState);
  },

  handledGetRoomDataLoop: async (appState) => {
    await axiosErrorHandler(getRoomDataLoop, appState);
  },

  handledGetUserDataOnce: async (appState) => {
    await axiosErrorHandler(getUserDataOnce, appState);
  },

  handledGetUserDataLoop: async (appState) => {
    await axiosErrorHandler(getUserDataLoop, appState);
  },

  handledAddRoom: async (appState, reqData) => {
    await axiosErrorHandler(addRoom, appState, reqData);
  },

  handledDeleteRoom: async (appState, reqData) => {
    await axiosErrorHandler(deleteRoom, appState, reqData);
  },

  handledBlockRoom: async (appState, reqData) => {
    await axiosErrorHandler(blockRoom, appState, reqData);
  },

  handledUnblockRoom: async (appState, reqData) => {
    await axiosErrorHandler(unblockRoom, appState, reqData);
  },

  handledAddUser: async (appState, reqData) => {
    await axiosErrorHandler(addUser, appState, reqData);
  },

  handledDeleteUser: async (appState, reqData) => {
    await axiosErrorHandler(deleteUser, appState, reqData);
  },

  handledMakeAdmin: async (appState, reqData) => {
    await axiosErrorHandler(makeAdmin, appState, reqData);
  },

  handledUnmakeAdmin: async (appstate, reqData) => {
    await axiosErrorHandler(unmakeAdmin, appstate, reqData);
  },

  handledDeleteEntity: async (appState, reqData) => {
    await axiosErrorHandler(deleteEntity, appState, reqData);
  },
  /*
  * It is necessary to clear the intervals. Otherwise
  * it will try to keep running even with BookingApp Unmounted
  */
  clearRoomInterval: () => {
    clearInterval(roomInterval);
  },

  clearUserInterval: () => {
    clearInterval(userInterval);
  },
};

export default roomrapi;
