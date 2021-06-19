import { Request, Response } from 'express';

const record = [
  {id:1,longitude:121.444017,latitude:31.237787,moment:'2020-10-09 06:07:00',alert:1,info:'infosss'},
  {id:1,longitude:23.733,latitude:31.237787,moment:'2020-1-09 06:07:00',alert:0,info:'infosss'},
  {id:1,longitude:87.733,latitude:31.237787,moment:'2020-1-09 06:07:00',alert:0,info:'infosss'},
  {id:1,longitude:23.733,latitude:31.237787,moment:'2020-1-09 06:07:00',alert:9,info:'infosss'},
  {id:1,longitude:35.733,latitude:31.237787,moment:'2020-10-09 06:07:00',alert:1,info:'infosss'},
  {id:2,longitude:80.733,latitude:89.232,moment:'2021-5-09 06:07:00',alert:1,info:'infosss'},
  {id:2,longitude:80.733,latitude:35.232,moment:'2021-4-09 06:07:00',alert:1,info:'infosss'},
  {id:3,longitude:10.733,latitude:89.232,moment:'2021-2-09 06:07:00',alert:1,info:'infosss'},
  {id:4,longitude:180.733,latitude:40.232,moment:'2021-1-09 06:07:00',alert:1,info:'infosss'},
  {id:5,longitude:80.733,latitude:20.232,moment:'2021-4-09 06:07:00',alert:1,info:'infosss'},
]

export default{
  'GET /api/status':
    {totalNum: 5,onlineNum: 2,receivedNum: 20},
  'GET /api/device':
    [
      {id: 1,device_name: 'xxx'},
      {id: 2,device_name: 'hhh'},
      {id: 3,device_name: 'sss'},
      {id: 4,device_name: 'aaa'},
    ],
  'GET /api/records': (req:Request,res:Response)=>{
    res.status(200).send({
      record: record.filter((item)=> item.id === 1)
    })
  }

}
