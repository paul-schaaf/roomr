import axiosRoomrapi from './roomrapiConfig';
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

const setRoomDataOnce = async (appState) => {
  const response = await axiosRoomrapi.get('/api/users/rooms');
  appState.setState({ data: response.data , getStatus: "successful"});
};


/*
* this axios function requires a separate try-catch because it is inside a setInterval function
* so the axiosErrorHandler.js handler will not work on it. The try block executes setRoomDataLoop 
* but it does not care about async/await so it will conclude there were no errors because it already
* finished before the setInterval callback could get back onto the callstack
*/
const setRoomDataLoop = async (appState) => {
  setInterval(async () => {
    try {
      const response = await axiosRoomrapi.get('/api/users/rooms')
      appState.setState({ data: response.data , getStatus: "successful"});
    } catch{
      appState.setState({ getStatus: "failed" })
    }
  }, 10000);
};

const addRoom = async (appState, reqData) => {
  const { roomName } = reqData;
  if (roomName === "") {
    throw new Error("Please enter a room before submitting!");
  }
  await axiosRoomrapi.post('/api/users/rooms', { "roomName": roomName });
  appState.setState({"errorMessage":""});
};

const deleteRoom = async (appState, reqData) => {
  const { roomName } = reqData;
  if (roomName === "") {
    throw new Error("Please enter a room before submitting!");
  }
  await axiosRoomrapi.delete('/api/users/rooms/' + roomName);
  appState.setState({"errorMessage":""});
};

const blockRoom = async (appState, reqData) => {
  const { roomName, start, end } = reqData;
  if (roomName === "") {
    throw new Error("Please enter a room before submitting!");
  }
  await axiosRoomrapi.post('/api/users/rooms/times-block', {
    "roomName": roomName,
    "start": start,
    "end": end
  });
  appState.setState({"errorMessage":""});
};


const unblockRoom = async (appState, reqData) => {
  const { roomName, start, end } = reqData;
  if (roomName === "") {
    throw new Error("Please enter a room before submitting!");
  }
  await axiosRoomrapi.post('/api/users/rooms/times-unblock', {
    "roomName": roomName,
    "start": start,
    "end": end
  });
  appState.setState({"errorMessage":""});
};

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
  }
}

export default roomrapi;