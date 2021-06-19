import request from '@/utils/request';

export type LoginParamsType = {
  email: string;
  password: string;
};

export async function accountLogin(params: LoginParamsType) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}
