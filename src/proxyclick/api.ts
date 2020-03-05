require('dotenv').config();

import axios from 'axios';
import qs from 'qs';

let token = '';

const {
  PROXYCLICK_OAUTH_ENDPOINT,
  PROXYCLICK_API_PREFIX,
  PROXYCLICK_CLIENT_ID,
  PROXYCLICK_CLIENT_SECRET,
  PROXYCLICK_USERNAME,
  PROXYCLICK_PASSWORD
} = process.env;

async function getToken() {
  const auth = qs.stringify({
    grant_type: 'password',
    client_id: PROXYCLICK_CLIENT_ID,
    client_secret: PROXYCLICK_CLIENT_SECRET,
    username: PROXYCLICK_USERNAME,
    password: PROXYCLICK_PASSWORD,
  });

  const { data: { access_token = null } = {} } = await axios.post(`${PROXYCLICK_OAUTH_ENDPOINT}/token`, auth);
  const { data: { audience = null } = {} } = await axios.get(`${PROXYCLICK_OAUTH_ENDPOINT}/verify?token=${access_token}`);

  if (audience !== PROXYCLICK_CLIENT_ID) {
    throw new Error('Error validating OAuth token');
  }

  return access_token;
}

async function getAxiosConfig() {
  if ('' === token) {
    token = await getToken();
  }

  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}

export default {
  get: async (uri: string) => {
    const config = await getAxiosConfig();

    return axios.get(`${PROXYCLICK_API_PREFIX}${uri}`, config);
  }
}