//Adapting from https://github.com/stefanjarina/vue2-jwt-authentication/blob/master/src/index.js

import router from './router/index';
import portfolioAPIConnector from './portfolioAPIConnector';
import axios from 'axios';

const LOGIN_URL = portfolioAPIConnector.API_URL + 'auth/login';
const REGISTER_URL = portfolioAPIConnector.API_URL + 'auth/register';

export default {
  user: { authenticated: false },

  loginOrRegister: function login(action, context, data, redirect) {
    axios.post(action === 'login' ? LOGIN_URL : REGISTER_URL, data)
      .then(response => {
        if (response.data.success === false) {
          context.error = response.data.msg;

          return;
        }

        if (response.data.payload.token) {
          localStorage.setItem('token', response.data.payload.token);
          this.user.authenticated = true;
        }

        if (redirect) {
          router.push(redirect);
        }
      })
      .catch(err => {
        context.error = err.response.data.msg;
      });
  },

  logout: function logout() {
    localStorage.removeItem('token');
    this.user.authenticated = false;
  },

  checkAuth: function checkAuth() {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      this.user.authenticated = true;
    } else {
      this.user.authenticated = false;
    }
  },

  getAuthHeader: function getAuthHeader() {
    return { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
  },

  redirectToLogin: function redirectToLogin() {
    router.push('/user/login');
  }
};
