import request from '@/utils/request';

export type createDeviceParam = {
  device_name: string;
  device_type: 'phone' | 'laptop' | 'air-conditioner';
}

export type editDeviceParam = {
  id: number,
  device_name?: string;
}

export async function getStatus(uid: number | undefined) {
  return request('/api/record/status', {
    method: 'GET',
    data: {uid}
  });
}

export async function getRecordByDevice(devid: number | undefined) {
  return request('/api/record/list', {
    POST: 'GET',
    param: {devid}
  });
}

export async function  getDevice(){
  return request('/api/device/list',{
    method: 'GET',
  })
}

export async function createDevice(params: createDeviceParam){
  return request('/api/device/create',{
    method: 'POST',
    data: params
  })
}

export async function editDevice(params: editDeviceParam){
  return request('/api/device/edit',{
    method: 'POST',
    data: params
  })
}
