import axios from 'axios';

export const url = 'http://nus-gso.constructdigital.net';
const apiURL = `${url}/wp-json/nus-gso/v1`;

export const getJourney = async () => {
  try {
    const { data } = await axios.get(`${apiURL}/journeys`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
