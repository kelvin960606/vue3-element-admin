import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';
const BaseKey = 'Base-Token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getBase() {
  return Cookies.get(BaseKey);
}

export function setBase(base) {
  return Cookies.set(BaseKey, base);
}

export function removeBase() {
  return Cookies.remove(BaseKey);
}
