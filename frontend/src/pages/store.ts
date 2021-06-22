import {HomeStore} from "@/pages/Home/model";
import {UserStore} from "@/pages/User/model";
import {DeviceStore} from "@/pages/Device/model";
import {action, observable} from "mobx";

export class BaseStore{
    @observable uid = undefined as number | undefined;
    @observable username = undefined as string | undefined;
    @observable email = undefined as string | undefined;
    @observable password = undefined as string | undefined;

    @action setBase(payload: any){
      this.uid = payload.uid;
      this.username = payload.username;
      this.email = payload.email;
    }

    @action clearBase(){
      this.uid = undefined;
      this.username = undefined;
      this.email = undefined;
    }
}

const baseStore = new BaseStore();
export default {
  baseStore,
  homeStore: new HomeStore(baseStore),
  loginStore: new UserStore(baseStore),
  deviceStore: new DeviceStore(baseStore)
}
