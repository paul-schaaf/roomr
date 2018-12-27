import axios from 'axios';
import axiosErrorHandler from '../errorHandling/axiosErrorHandler';

/*
* defines axios functions that call roomrapi
* uses baseURL defined in roomrapiConfig.js
* exports roomrapi object that holds functions that are given to the axiosErrorHandler
* thereby avoiding writing try-catch for each function
* setRoomDataOnce: makes get request on first load of the app
* setRoomDataLoop: makes get request every 10 seconds to update client
* addRoom: adds room
* deleteRoom: deletes room
* blockRoom: reserves room
* unblockRoom: "un"-reserves room
*/

let roomInterval;

const setRoomDataOnce = async (appState) => {
  const response = await axios.get('/api/entities/rooms');
  appState.setState({ data: response.data, getStatus: 'successful' });
};


/**
* this axios function requires a separate try-catch because
* the function is inside a setInterval function
* so the axiosErrorHandler.js handler will not work on it.
* The try block outside setInterval executes setRoomDataLoop
* but it does not care about async/await so it will conclude there were no errors because it already
* finished before the setInterval callback could get back onto the callstack.
* This is why we need a try block INSIDE
* the set interval function
*/
const setRoomDataLoop = async (appState) => {
  roomInterval = setInterval(async () => {
    try {
      const response = await axios.get('/api/entities/rooms');
      appState.setState({ data: response.data, getStatus: 'successful' });
    } catch (err) {
      if (err.response) {
        appState.setState({ responseMessage: err.response.data.message, errorType: err.response.data.type });
      } else if (err.request) { // this error appears when there is no response from the server
        appState.setState({ getStatus: 'failed', errorType: 'serverError' });
      }
    }
  }, 10000);
};

const addRoom = async (appState, reqData) => {
  const { roomName } = reqData;
  if (roomName === '') {
    throw new Error('Please enter a room before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.post('/api/entities/rooms', { roomName });
  appState.setState({ responseMessage: 'Successfully added room: ' + roomName});
};

const deleteRoom = async (appState, reqData) => {
  const { roomName } = reqData;
  if (roomName === '') {
    throw new Error('Please enter a room before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.delete(`/api/entities/rooms/${roomName}`);
  appState.setState({ responseMessage: 'Successfully deleted room: ' + roomName});
};

const blockRoom = async (appState, reqData) => {
  const { roomName, start, end } = reqData;
  if (roomName === '') {
    throw new Error('Please enter a room before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.post('/api/entities/rooms/times-block', {
    roomName,
    start,
    end,
  });
  appState.setState({ responseMessage: 'Successfully blocked room: ' + roomName});
};


const unblockRoom = async (appState, reqData) => {
  const { roomName, start, end } = reqData;
  if (roomName === '') {
    throw new Error('Please enter a room before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.post('/api/entities/rooms/times-unblock', {
    roomName,
    start,
    end,
  });
  appState.setState({ responseMessage: 'Successfully unblocked room: ' + roomName});
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

  appState.setState({ responseMessage: 'Successfully added user: ' + email });
};

const deleteUser = async (appState, reqData) => {
  const { email } = reqData;
  if (email === '') {
    throw new Error('Please enter an email before submitting!');
  }
  appState.setState({ responseMessage: 'loading' });
  await axios.delete(`/api/entities/users/${email}`);
  appState.setState({ responseMessage: 'Successfully deleted user: ' + email });
}

const roomrapi = {

  handledSetRoomDataOnce: async (appState) => {
    await axiosErrorHandler(setRoomDataOnce, appState);
  },

  handledSetRoomDataLoop: async (appState) => {
    await axiosErrorHandler(setRoomDataLoop, appState);
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
  //It is necessary to clear the interval. Otherwise it will try to keep running even with BookingApp Unmounted
  clearRoomInterval: () => {
    clearInterval(roomInterval);
  }
};

export default roomrapi;
