import axios from 'axios';

const getData = async () => {
    const response = await axios.get('http://192.168.188.24:5000/');
    const data = response.data;
    return data;
}

export default getData;