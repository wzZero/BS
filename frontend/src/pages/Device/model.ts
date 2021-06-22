import type {BaseStore} from "@/pages/store";
import type {Device} from "@/pages/Home/model";
import type {createDeviceParam, editDeviceParam} from "@/services/device";
import {getDevice, createDevice, editDevice} from "@/services/device";
import {action, computed, observable} from "mobx";
import {cloneDeep} from "lodash";

export class DeviceStore{
  @observable deviceList = [] as Device[];

  @observable createModalVisible = false;
  @observable editModalVisible = false;
  @observable isEdit = undefined as number | undefined;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @computed get dataToEdit(){
      return this.isEdit?this.deviceList.filter((item)=> item.id === this.isEdit)[0]:undefined;
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

  getDevice = async ()=>{
    const response = await getDevice();
    this.setDeviceList(response);
  }

  createDevice = async (param: createDeviceParam)=>{
    const response = await createDevice(param);
    if(response.message === "ok"){
      await this.getDevice();
    }
  }

  editDevice = async (param: any) =>{
    const response = await editDevice({id:this.isEdit,...param});
    console.log(response)
    if(response.message === 'ok'){
      await this.getDevice();
    }
  }
}
