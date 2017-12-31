//import axios from 'axios';

import axios from 'axios/index';
import auth from './auth';

const API_URL = 'http://localhost:3000/';

function getHeaders() {
  return { headers: auth.getAuthHeader() };
}

function processForError(_e, _reject) {
  if (_e.response.data.error) {
    if (_e.response.data.error.status === 401) {
      return auth.error401();
    }
  }

  return _reject(
    new Error(_e.response.data.message || _e.response.data.msg));
}

function processForInternalSuccess(response, _accept, _reject) {
  if (response.data.success === false) {
    return _reject(new Error(response.data.msg));
  }

  return _accept(response.data.payload);
}

export default {
  API_URL: API_URL,
  getPortfolio: portfolioId => {
    return new Promise((_accept, _reject) => {
      axios.get(API_URL + 'portfolio/' + portfolioId, getHeaders())
        .then(response => {
          return processForInternalSuccess(response, _accept, _reject);
        })
        .catch(_e => {
          processForError(_e, _reject);
        });
    });
  },
  addEntry: (portfolioId, id, value) => {
    return new Promise((_accept, _reject) => {
      axios.post(API_URL + 'portfolio/' + portfolioId,
        {
          portfolioId: portfolioId,
          id: id,
          value: value
        }, getHeaders())
        .then(response => {
          return processForInternalSuccess(response, _accept, _reject);
        })
        .catch(_e => {
          processForError(_e, _reject);
        });
    });
  },
  updateEntry: (portfolioId, id, value) => {
    return new Promise((_accept, _reject) => {
      axios.put(API_URL + 'portfolio/' + portfolioId + '/' + id,
        { value: value }, getHeaders())
        .then(response => {
          return processForInternalSuccess(response, _accept, _reject);
        })
        .catch(_e => {
          processForError(_e, _reject);
        });
    });
  },
  deleteEntry: (portfolioId, id) => {
    return new Promise((_accept, _reject) => {
      axios.delete(API_URL + 'portfolio/' + portfolioId + '/' + id, getHeaders())
        .then(response => {
          if (response.data.success === false) {
            return _reject(new Error(response.data.msg));
          }

          return _accept(response.data.payload);
        })
        .catch(_e => {
          processForError(_e, _reject);
        });
    });
  }
};
