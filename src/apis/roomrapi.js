import axios from 'axios';


const roomrapi = {
  setRoomDataInit: async (appState) => {
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
    await axios.post('http://127.0.0.1:5000/api/users/rooms', { "roomName": roomName });
    appState.setState({"errorMessage":""});
  }
}

export default roomrapi;