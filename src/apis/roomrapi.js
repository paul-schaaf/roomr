import axios from 'axios';


const roomrapi = {
  setRoomDataOnce: async (appState) => {
      const response = await axios.get('http://127.0.0.1:5000/api/users/rooms');
      appState.setState({ data: response.data , getStatus: "successful"});
  },

  setRoomDataLoop: async (appState) => {
      setInterval(async () => {
        const response = await axios.get('http://127.0.0.1:5000/api/users/rooms');
        appState.setState({ data: response.data , getStatus: "successful"});
      }, 10000);
  },

  addRoom: async (appState, roomName) => {
    if (roomName === "") {
      throw new Error("Please enter a room before submitting");
    }
    await axios.post('http://127.0.0.1:5000/api/users/rooms', { "roomName": roomName });
    appState.setState({"errorMessage":""});
  },

  deleteRoom: async (appState, roomName) => {
    if (roomName === "") {
      throw new Error("Please enter a room before submitting");
    }
    await axios.delete('http://127.0.0.1:5000/api/users/rooms/' + roomName);
    appState.setState({"errorMessage":""});
  },

  blockRoom: async (appState, reqData) => {
    const { roomName, start, end } = reqData;
    if (roomName === "") {
      throw new Error("Please enter a room before submitting");
    }
    await axios.post('http://127.0.0.1:5000/api/users/rooms/times-block', {
      "roomName": roomName,
      "start": start,
      "end": end
    });
    appState.setState({"errorMessage":""});
  },

  unblockRoom: async (appState, reqData) => {
    const { roomName, start, end } = reqData;
    if (roomName === "") {
      throw new Error("Please enter a room before submitting");
    }
    await axios.post('http://127.0.0.1:5000/api/users/rooms/times-unblock', {
      "roomName": roomName,
      "start": start,
      "end": end
    });
    appState.setState({"errorMessage":""});
  }

}

export default roomrapi;