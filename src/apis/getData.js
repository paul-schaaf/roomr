import axios from 'axios';

const getData = async () => {
    const response = await axios.get('http://127.0.0.1:5000/');
    const data = response.data;
    return data;
}

export default getData;