import { Request, Response } from 'express';

const record = [
  {id:1,lng:121.444017,lat:31.237787,moment:'2020-10-09 06:07:00',alert:1,info:'infosss'},
  {id:1,lng:23.733,lat:31.237787,moment:'2020-1-09 06:07:00',alert:0,info:'infosss'},
  {id:1,lng:87.733,lat:31.237787,moment:'2020-1-09 06:07:00',alert:0,info:'infosss'},
  {id:1,lng:23.733,lat:31.237787,moment:'2020-1-09 06:07:00',alert:9,info:'infosss'},
  {id:1,lng:35.733,lat:31.237787,moment:'2020-10-09 06:07:00',alert:1,info:'infosss'},
  {id:2,lng:80.733,lat:89.232,moment:'2021-5-09 06:07:00',alert:1,info:'infosss'},
  {id:2,lng:80.733,lat:35.232,moment:'2021-4-09 06:07:00',alert:1,info:'infosss'},
  {id:3,lng:10.733,lat:89.232,moment:'2021-2-09 06:07:00',alert:1,info:'infosss'},
  {id:4,lng:180.733,lat:40.232,moment:'2021-1-09 06:07:00',alert:1,info:'infosss'},
  {id:5,lng:80.733,lat:20.232,moment:'2021-4-09 06:07:00',alert:1,info:'infosss'},
]

const device = {
  id: 4,
  data:[
    {id: 1,device_name: 'xxx',device_type: 'air_conditioner'},
    {id: 2,device_name: 'hhh',device_type: 'phone'},
    {id: 3,device_name: 'sss',device_type: 'laptop'},
    {id: 4,device_name: 'aaa',device_type: 'phone'},
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
    const {device_name,device_type} =req.body;
    device.id += 1;
    device.data.push({id:device.id,device_name,device_type})
    res.status(200).send({
      message: 'ok'
    })
  },

  'POST /api/device/edit': (req: Request,res:Response) => {
    const {id,device_name} =req.body;
    device.data.map((item)=>{
      if(item.id === id){
        item.device_name = device_name;
      }
    })
    res.status(200).send({
      message: 'ok'
    })
  }
}
