import type {BaseStore} from "@/pages/store";
import {action, computed, observable} from "mobx";
import {cloneDeep} from "lodash"
import {getDevice, getRecordByDevice, getRecordIn5min, getStatus} from "@/services/device";
import {message} from "antd";

type Statistic = {
  total: number,
  online: number,
}

type RecordIn5 = {
  count: number[]
}

export type Device = {
  devid: number,
  deviceName: string,
  deviceType: 'e-cooker' | 'fridge' | 'washer'
}

export type Record = {
  recid: number,
  lng: number,
  lat: number,
  moment: string,
  alert: number,
  info: string,
  value: number
}

export class HomeStore{
  // show statistic of current user
  @observable statistics = undefined as Statistic | undefined;

  // show records statistic in 5 min
  @observable recordsIn5 = [] as number[];

  // devices of current user
  @observable deviceList = [] as Device[];
  // records of a chosen device
  @observable recordList = [] as Record[];

  @observable chosenDevice = undefined as number | undefined;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @computed get getStatusData(){

    if(this.statistics){
      const {total,online} = this.statistics;
      return [total,online];
    }

      return [0,0];
  }

  @computed get getRecordIn5Data(){
    if(this.recordsIn5){
      const count = this.recordsIn5.reverse();
      count.forEach((item,index)=>{
        if(index!==0)
        {
          item = item + count[index-1];
        }
      })
      console.log("getRecord&count",this.recordsIn5)
      return count;
    }
    return [0,0,0,0,0];
  }

  @computed get getMapData(){
    if(this.recordList?.length>0){
      return this.recordList;
    }
    return undefined;
  }

  @action setChosenDevice(value: number){
    this.chosenDevice = value;
  }

  @action setStatistic = (value: Statistic)=>{
    this.statistics=value;
  }

  @action setRecordIn5 = (value: number[]) => {
    this.recordsIn5 = cloneDeep(value);
  }

  @action setDeviceList = (value: Device[])=>{
    this.deviceList = cloneDeep(value);
  }

  @action setRecordList = (value: Record[])=>{
    this.recordList = cloneDeep(value);
  }

  getStatistic = async ()=>{
    const response = await getStatus(this.baseStore.uid);
    console.log("status:",response);
    this.setStatistic(response);
  }

  getRecordIn5 = async ()=>{
    const response = await getRecordIn5min(this.baseStore.uid);
    console.log("recordIn5:",response)
    this.setRecordIn5(response);
   }

  getDevice = async ()=>{
    const response = await getDevice(this.baseStore.uid);
    console.log("device",response)
    this.setDeviceList(response);
  }

  getRecordByDevice = async ()=>{
    if(this.chosenDevice){
      const response = await getRecordByDevice(this.chosenDevice);
      console.log("record:",response)
      this.setRecordList(response);
    }
    else{
      message.error("please choose a device first!")
    }
  }
}
