import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/System/login',
    method: 'post',
    data
  });
}

export function getInfo() {
  return request({
    url: '/Account/get',
    method: 'post',
  });
}

export function logout(token) {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post',
    params: { token }
  });
}
