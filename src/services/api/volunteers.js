/**
 * Public Volunteers Service.
 *
 * @file Volunteers API service.
 *
 * @module volunteers
 */

/**
 * Import axios.
 *
 * @external "axios"
 * @see {@link https://www.npmjs.com/package/axios}
 */
import axios from 'axios';

/**
 * Base URL for volunteers service.
 *
 * @constant
 * @type {string}
 */
const baseURL = process.env.VUE_APP_BACKEND_ENDPOINT;

/**
 * Salesforce oAuth Axios instance.
 */
const volunteers = axios.create({
  baseURL: baseURL,
});

/**
 * Register new volunteer.
 *
 * @async
 *
 * @param {object} payload - Volunteer data payload.
 * @returns {Promise} - Axios Promise function response ('post').
 *
 * @example
 *   let response = await this.$services.volunteers.register({
 *     ...payload
 *   });
 */
const register = async payload => {
  try {
    const response = await volunteers({
      method: 'post',
      url: 'register',
      data: payload,
    });

    return response.data;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
};

/**
 * Get divisions data.
 *
 * @async
 *
 * @returns {Promise} - Axios Promise function response ('get').
 *
 * @example
 *   let response = await this.$services.volunteers.divisions();
 */
const divisions = async () => {
  try {
    let response = await volunteers({
      method: 'get',
      url: `divisions`,
    });

    return response.data;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
};

export default {
  register: register,
  divisions: divisions,
};
