import axios from 'axios';

const roomrapi = {
  setRoomDataInit: async (appState) => {
      const response = await axios.get('http://127.0.0.1:5000/api/users/rooms');
      appState.setState({ data: response.data , status: "successful"});
  },

  setRoomDataLoop: async (appState) => {
      setInterval(async () => {
        const response = await axios.get('http://127.0.0.1:5000/api/users/rooms');
        appState.setState({ data: response.data , status: "successful"});
      }, 10000);
  }
}

export default roomrapi;