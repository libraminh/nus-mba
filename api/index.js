import axios from 'axios';

const isDevMod = process.env.NODE_ENV === 'development';
// export const url = isDevMod ? 'http://nus-gso.constructdigital.net' : window.location.origin;
export const url = 'http://nus-gso.constructdigital.net';
const apiURL = `${url}/wp-json/nus-gso/v1`;
export const assetsURL = `${url}/wp-content/plugins/construct-nus-gso/themes/build/static/media`;

export const getJourney = async () => {
  try {
    const { data } = await axios.get(`${apiURL}/journeys`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getJourneyDetail = async (id) => {
  try {
    const { data } = await axios.get(`${apiURL}/journey-details?jID=${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getJourneyOptions = async () => {
  try {
    const { data } = await axios.get(`${apiURL}/persona-options`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJourneyDetailByOptions = async ({
  shouldRedirect,
  location,
  journeyHash,
}) => {
  if (shouldRedirect) return;

  const optionsUrl = `${url}/wp-json/nus-gso/v1/journey-details?options[role]=${location?.state?.roles}&options[industry]=${location?.state?.industries}&options[interest]=${location?.state?.interests}`;

  const jIDUrl =
    location.state &&
    `${url}/wp-json/nus-gso/v1/journey-details?jID=${location.state.jID}`;

  let fetchURL = '';

  if (!!journeyHash) {
    fetchURL = `${url}/wp-json/nus-gso/v1/journey-details?hashtag=${journeyHash}`;
  } else {
    fetchURL = location.state.jID ? jIDUrl : optionsUrl;
  }

  try {
    const { data } = await axios.get(fetchURL);
    return data;
  } catch (error) {
    console.log(error);
  }
};
