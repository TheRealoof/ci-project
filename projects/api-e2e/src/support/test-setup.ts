/* eslint-disable */
import axios from 'axios';
import environment from '../../../api/src/environment';

module.exports = async function () {
  // Configure axios for tests to use.
  axios.defaults.baseURL = environment.apiBaseUrl;
};
