import { Request, Response } from 'express';

const record = [
  {id:1,lng:121.444017,lat:31.237787,moment:'2020-10-09 06:07:00',alert:1,info:'infosss',value:56},
  {id:1,lng:23.733,lat:31.237787,moment:'2020-1-09 06:07:00',alert:0,info:'infosss',value:56},
  {id:1,lng:87.733,lat:31.237787,moment:'2020-1-09 06:07:00',alert:0,info:'infosss',value:56},
  {id:1,lng:23.733,lat:31.237787,moment:'2020-1-09 06:07:00',alert:9,info:'infosss',value:56},
  {id:1,lng:35.733,lat:31.237787,moment:'2020-10-09 06:07:00',alert:1,info:'infosss',value:56},
  {id:2,lng:80.733,lat:89.232,moment:'2021-5-09 06:07:00',alert:1,info:'infosss',value:56},
  {id:2,lng:80.733,lat:35.232,moment:'2021-4-09 06:07:00',alert:1,info:'infosss',value:56},
  {id:3,lng:10.733,lat:89.232,moment:'2021-2-09 06:07:00',alert:1,info:'infosss',value:56},
  {id:4,lng:180.733,lat:40.232,moment:'2021-1-09 06:07:00',alert:1,info:'infosss',value:56},
  {id:5,lng:80.733,lat:20.232,moment:'2021-4-09 06:07:00',alert:1,info:'infosss',value:56},
]

const device = {
  id: 4,
  data:[
    {devid: 1,deviceName: 'xxx',deviceType: 'air_conditioner'},
    {devid: 2,deviceName: 'hhh',deviceType: 'phone'},
    {devid: 3,deviceName: 'sss',deviceType: 'laptop'},
    {devid: 4,deviceName: 'aaa',deviceType: 'phone'},
  ]
}

export default{
  'GET /api/record/status':
    {totalNum: 5,onlineNum: 2,receivedNum: 20},
  'GET /api/device/list':device.data,
  'GET /api/record/list': (req:Request,res:Response)=>{
    res.status(200).send({
      record: record.filter((item)=> item.id === 1)
    })
  },

  'POST /api/device/create': (req: Request,res:Response) => {
    const {deviceName,deviceType} =req.body;
    device.id += 1;
    device.data.push({devid:device.id,deviceName,deviceType})
    res.status(200).send({
      message: 'ok'
    })
  },

  'POST /api/device/edit': (req: Request,res:Response) => {
    const {id,device_name} =req.body;
    device.data.map((item)=>{
      if(item.devid === id){
        item.deviceName = device_name;
      }
    })
    res.status(200).send({
      message: 'ok'
    })
  }
}
