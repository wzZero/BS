import request from '@/utils/request';

export async function getStatus(uid: number | undefined) {
  return request('/api/status', {
    method: 'GET',
    data: {uid}
  });
}

export async function getRecordByDevice(devid: number | undefined) {
  return request('/api/records', {
    POST: 'GET',
    data: {devid}
  });
}

export async function  getDevice(){
  return request('/api/device',{
    method: 'GET',
  })
}
