import type {BaseStore} from "@/pages/store";
import type {Device,Record} from "@/pages/Home/model";
import {getDevice, createDevice, editDevice, getRecordByDevice} from "@/services/device";
import {action, computed, observable} from "mobx";
import {cloneDeep} from "lodash";
import { message } from "antd";
import {history} from 'umi';

export class DeviceStore{
  @observable deviceList = [] as Device[];
  @observable recordList = [] as Record[];
  @observable createModalVisible = false;
  @observable editModalVisible = false;
  @observable isEdit = undefined as number | undefined;
  @observable pagenum = 20;
  @observable currentDevice = undefined as number | undefined;
  @observable onlyAlert = false;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  requestAgain = async () => {
    if (this.currentDevice) {
      await this.getRecordByDevice();
    }
  };

  redirectRoute = (devid: number) => {
    history.push({
      pathname: `/device/${devid.toString()}`,
    });
    this.setCurrentDevice(devid);
    this.requestAgain();
  };

  handleRoute = (devid: string | undefined) => {
    console.log("handleRoute:",devid);
    if (devid === undefined || devid === ':devid') {
      if (this.deviceList.length > 0) {
        const defaultID = this.deviceList[0].devid;
        this.redirectRoute(defaultID);
      }
    } else {
      const id = parseInt(devid, 10);
      this.setCurrentDevice(id);
      this.requestAgain();
    }
  };

  @computed get dataToEdit(){
      return this.isEdit?this.deviceList.filter((item)=> item.devid === this.isEdit)[0]:undefined;
  }

  @computed get dataToShow(){
    return this.onlyAlert?this.recordList.filter((item)=>item.alert === 1):this.recordList;
  }

  @action setPageNum(value: number){
    this.pagenum = value;
  }

  @action setCurrentDevice(value: number | undefined){
    this.currentDevice = value;
  }

  @action setCreateModalVisible(value: boolean){
    this.createModalVisible = value;
  }

  @action setEditModalVisible(value: boolean){
    this.editModalVisible = value;
  }

  @action setIsEdit(value: number | undefined){
    this.isEdit = value;
  }

  @action setDeviceList = (value: Device[])=>{
    this.deviceList = cloneDeep(value);
  }

  @action setRecordList = (value: Record[])=>{
    this.recordList = cloneDeep(value);
  }

  @action setOnlyAlert = (value: boolean)=>{
    this.onlyAlert = value;
}

  getDevice = async ()=>{
    const response = await getDevice(this.baseStore.uid);
    this.setDeviceList(response);
  }

  getRecordByDevice = async ()=>{
    if(this.currentDevice){
      const response = await getRecordByDevice(this.currentDevice);
      this.setRecordList(response);
    }
    else{
      message.error("not choose a device");
    }
  }

  createDevice = async (param: any)=>{
    const response = await createDevice({uid:this.baseStore.uid,...param});
    if(!response.status || response.status.indexOf(2)!==0){
      await this.getDevice();
    }
  }

  editDevice = async (param: any) =>{
    const response = await editDevice({devid:this.isEdit,...param});
    console.log(response)
    if(!response.status || response.status.indexOf(2)!==0){
      await this.getDevice();
    }
  }
}
