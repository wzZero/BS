import {HomeStore} from "@/pages/Home/model";
import {LoginStore} from "@/pages/Login/model";
import {DeviceStore} from "@/pages/Device/model";
import {action, observable} from "mobx";

export class BaseStore{
    @observable uid = undefined as string | undefined;
    @observable username = undefined as string | undefined;
    @observable email = undefined as string | undefined;
    @observable password = undefined as string | undefined;

    @action setBase(payload: any){
      this.uid = payload.uid;
      this.username = payload.username;
      this.email = payload.email;
      this.password = payload.password;
    }

    @action clearBase(){
      this.uid = undefined;
      this.username = undefined;
      this.email = undefined;
      this.password = undefined;
    }
}

const baseStore = new BaseStore();
export default {
  baseStore,
  homeStore: new HomeStore(baseStore),
  loginStore: new LoginStore(baseStore),
  deviceStore: new DeviceStore(baseStore)
}
