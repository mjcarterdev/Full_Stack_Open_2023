import axios from 'axios';

const api_key = '3b652131c8bd2ab5f62f1959b63267f3';
const weatherUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=`;

const getWeather = (capital) => {
  return axios.get(weatherUrl + capital).then((response) => response.data);
};

export default { getWeather };
