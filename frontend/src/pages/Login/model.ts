import {BaseStore} from "@/pages/store";
import {accountLogin, LoginParamsType} from "@/services/login";
import {action, observable} from "mobx";
import {cloneDeep} from "lodash"
import {setAuthority} from '@/utils/authority'
import {message} from "antd";
import {history} from "umi";

export type StateType = {
  message?: 'ok' | 'error';
};

export class LoginStore{
  @observable userLogin: StateType | undefined;
  @observable submitting?: boolean;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action  setUserLogin = (userLogin: StateType)=>{
    this.userLogin = cloneDeep(userLogin);
  }

  @action login = async (params: LoginParamsType)=>{
    this.submitting = true;
    // const response = await accountLogin(params);

    const response = {uid:1,username:"wzl",email:"3180102262"};

    this.setUserLogin({message: 'ok'});
    this.baseStore.setBase({...response});
    setAuthority('user');
    message.success("🎇login successfully");
    history.replace('/')
    // if(!response.status || `${response.status}`.indexOf('2') === 0){
    //
    // }
    // else{
    //   this.setUserLogin({message: 'error'});
    // }

    this.submitting = false;
  }

  @action logout = async ()=>{
    this.baseStore.clearBase();
    history.replace({
      pathname: '/login',
    })
  }
}
