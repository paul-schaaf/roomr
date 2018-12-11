import axios from 'axios';

export default {
  getAllRooms: async () => {
    const response = await axios.get('http://127.0.0.1:5000/api/users/rooms');
    const data = response.data;
    return data;
  }
};