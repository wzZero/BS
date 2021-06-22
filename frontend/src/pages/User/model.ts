import {BaseStore} from "@/pages/store";
import {accountLogin,register, LoginParamsType, RegisterParamsType} from "@/services/login";
import {action, observable} from "mobx";
import {cloneDeep} from "lodash"
import {setAuthority} from '@/utils/authority'
import {message} from "antd";
import {history} from "umi";

export type StateType = {
  message?: 'ok' | 'error';
};

export class UserStore{
  @observable userLogin: StateType | undefined;
  @observable userRegister: StateType | undefined;
  @observable submitting?: boolean;
  @observable registering?: boolean;

  baseStore: BaseStore;
  constructor(baseStore: BaseStore) {
    this.baseStore = baseStore;
  }

  @action  setUserLogin = (userLogin: StateType)=>{
    this.userLogin = cloneDeep(userLogin);
  }

  @action login = async (params: LoginParamsType)=>{
    this.submitting = true;
    const response = await accountLogin(params);

    // const response = {uid:1,username:"wzl",email:"3180102262"};
    if(!response.status || `${response.status}`.indexOf('2') === 0){
      this.setUserLogin({message: 'ok'});
      this.baseStore.setBase({...response});
      setAuthority('user');
      message.success("🎇login successfully");
      history.replace('/')
    }
    else{
      message.error(response.message);
      this.setUserLogin({message: 'error'});
    }

    this.submitting = false;
  }

  @action logout = async ()=>{
    this.baseStore.clearBase();
    history.replace({
      pathname: '/login',
    })
  }

  @action register = async (params: RegisterParamsType)=>{
    this.registering = true;
    const response = await register(params);
    if(!response.status || `${response.status}`.indexOf('2') === 0){
      this.baseStore.setBase({...response});
      setAuthority('user');
      message.success("🎇register successfully");
      history.replace('/')
    }
    else{
      message.error(response.message);
    }
    this.registering = false;
  }
}
