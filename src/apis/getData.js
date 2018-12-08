import axios from 'axios';

const getData = async () => {
  try {
  const response = await axios.get('http://127.0.0.1:5000/');
  return response;
  } catch (err) {
    return err.message;
  }
}

export default getData;