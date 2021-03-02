import axios from 'axios';

export const fetchBinDays = async () => {
  return (await axios.get('https://u121ovudsh.execute-api.eu-west-2.amazonaws.com/test')).data;
}

