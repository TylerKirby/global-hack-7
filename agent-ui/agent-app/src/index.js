import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Keycloak from "keycloak-js";

import 'semantic-ui-css/semantic.min.css';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

const kc = Keycloak({
  "realm": 'stability',
  "url": 'http://localhost:8081/auth',
  "clientId": 'stability-client',
  "bearerOnly": true,
  "use-resource-role-mappings": true,
});


const token = localStorage.getItem('kc_token');
const refreshToken = localStorage.getItem('kc_refreshToken');

kc.init({onLoad: 'login-required', token, refreshToken})
    .then(authenticated => {
      if (authenticated) {
        updateLocalStorage();
        ReactDOM.render(<App />, document.getElementById('root'));
      }
    });

// axios.interceptors.request.use(config => (
//     kc.updateToken(5)
//         .then(refreshed => {
//           if (refreshed) {
//             updateLocalStorage()
//           }
//           config.headers.Authorization = 'Bearer ' + kc.token;
//           return Promise.resolve(config)
//         })
//         .catch(() => {
//           kc.login();
//         })
// ));

setInterval(()=> {
  //hax to key token alive :)
  //Because most of the code is loaded in an iframe and disconnected from this application :|
  console.log('keeping session alive!');
  kc.updateToken(5)
      .then(refreshed => {
        if (refreshed) {
          updateLocalStorage()
        }
      })
      .catch(() => {
        kc.login();
      });
}, 60000);

const updateLocalStorage = () => {
  localStorage.setItem('kc_role', fetchRole(kc));
  localStorage.setItem('kc_token', kc.token);
  localStorage.setItem('kc_refreshToken', kc.refreshToken);
};

function getNullSafetyJunk(tokenParsed, resourceAccess, alphaAdmin, roles) {
  const actualResource = tokenParsed['resource_access'] || resourceAccess;
  const actualAlphaAdminResource = actualResource['alpha-admin'] || alphaAdmin;
  return actualAlphaAdminResource.roles || roles;
}

const fetchRole = (keyCloak) => {
  const roles = ['noRole'];
  const alphaAdmin = {roles};
  const resourceAccess = {'alpha-admin': alphaAdmin};
  const tokenParsed = keyCloak.tokenParsed || {'resource_access': resourceAccess};
  const actualRoles = getNullSafetyJunk(tokenParsed, resourceAccess, alphaAdmin, roles);
  return fetchHighestRole(actualRoles);
};


const fetchHighestRole = (roleArray) => {
  const hasAlphaAdmin = roleArray.indexOf('admin') > -1;
  return hasAlphaAdmin ? 'admin' : 'noRole';
};
