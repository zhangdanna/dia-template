import { request } from '@/utils/request';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
}

export interface UserInfo {
  id: number;
  username: string;
  roles: string[];
  avatar?: string;
}

export function login(data: LoginParams) {
  return request<LoginResult>({ url: '/auth/login', method: 'post', data });
}

export function getUserInfo() {
  return request<UserInfo>({ url: '/auth/userinfo', method: 'get' });
}

export function logout() {
  return request<unknown>({ url: '/auth/logout', method: 'post' });
}
