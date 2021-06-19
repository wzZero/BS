import type {BaseStore} from "@/pages/store";
import {action, computed, observable} from "mobx";
import {cloneDeep} from "lodash"
import {getDevice, getRecord, getRecordByDevice, getStatus} from "@/services/device";
import {message} from "antd";

type Statistic = {
  totalNum: number,
  onlineNum: number,
  receivedNum: number
}

export type Device = {
  id: number,
  device_name: string
}

export type Record = {
  id: number,
  longitude: number,
  latitude: number,
  moment: string,
  alert: number,
  info: string,
}

export class HomeStore{
  // show statistic of current user
  @observable statistics = undefined as Statistic | undefined;
  // devices of current user
  @observable deviceList = [] as Device[];
  // records of a chosen device
  @observable recordList = [] as Record[];

  @observable chosenDevice = undefined as number | undefined;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @computed get getChartData(){

    if(this.statistics){
      const {totalNum,onlineNum,receivedNum} = this.statistics;
      return [totalNum,onlineNum,receivedNum];
    }

      message.error("no data");
      return [0,0,0];
  }

  @computed get getMapData(){
    if(this.recordList.length>0){
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

  getDevice = async ()=>{
    const response = await getDevice(this.baseStore.uid);
    this.setDeviceList(response);
  }

  getRecordByDevice = async ()=>{
    if(this.chosenDevice){
      const response = await getRecordByDevice(this.chosenDevice);
      console.log("record:",response)
      this.setRecordList(response.record);
    }
    else{
      message.error("please choose a device first!")
    }
  }
}
