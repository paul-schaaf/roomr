import axios from 'axios';

const roomrapi = {
  setRoomDataInit: async (appState) => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/users/rooms');
      appState.setState({ data: response.data , status: "successful"});
    } catch(err) {
      appState.setState({ status: "failed"});
    }
  },

  setRoomDataLoop: async (appState) => {
    try {
      setInterval(async () => {
        const response = await axios.get('http://127.0.0.1:5000/api/users/rooms');
        appState.setState({ data: response.data , status: "successful"});
      }, 10000);
    } catch(err) {
      appState.setState({ status: "failed"});
    }
  }
}

export default roomrapi;