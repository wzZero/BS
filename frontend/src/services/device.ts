import request from '@/utils/request';

export type createDeviceParam = {
  uid: number;
  deviceName: string;
  deviceNype: 'phone' | 'laptop' | 'air-conditioner';
}

export type editDeviceParam = {
  devid: number,
  deviceName?: string;
}



export async function getRecordByDevice(devid: number | undefined) {
  return request('/api/record/list', {
    POST: 'GET',
    params: {devid}
  });
}



export async function  getDevice(uid: number | undefined){
  return request('/api/device/list',{
    method: 'GET',
    params: {uid}
  })
}

export async function createDevice(params: createDeviceParam){
  return request('/api/device/create',{
    method: 'POST',
    params: {uid: params.uid},
    data: params
  })
}

export async function editDevice(params: editDeviceParam){
  return request('/api/device/edit',{
    method: 'POST',
    params: {devid:params.devid},
    data: params
  })
}

export async function getStatus(uid: number | undefined) {
  return request('/api/device/status', {
    method: 'GET',
    params: {uid}
  });
}

export async function getRecordIn5min(uid: number | undefined) {
  return request('/api/record/5min', {
    POST: 'GET',
    params: {uid}
  });
}