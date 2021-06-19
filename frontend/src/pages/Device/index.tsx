import {inject, observer} from "mobx-react";
import {Component} from "react";
import {DeviceStore} from "@/pages/Device/model";

interface DeviceProps{
  deviceStore: DeviceStore;
}

@inject('deviceStore')
@observer
export default class Home extends Component<DeviceProps,any>{
  render(){
    return(
      <div>device</div>
    )
  }
}
