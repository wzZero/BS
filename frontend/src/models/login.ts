import type { Reducer, Effect } from 'umi';
import {StateType} from "@/pages/User/model";



export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};


