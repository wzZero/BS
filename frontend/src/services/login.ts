import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
};

export type RegisterParamsType = {
  username: string;
  password: string;
  email: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function register(params: RegisterParamsType){
  return request('/api/user/register', {
    method: 'POST',
    data: params,
  });
}
