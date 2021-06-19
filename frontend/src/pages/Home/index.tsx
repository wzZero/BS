import {Component} from "react";
import {HomeStore} from "@/pages/Home/model";
import {inject, observer} from "mobx-react";

interface HomeProps{
  homeStore: HomeStore;
}

@inject('homeStore')
@observer
export default class Home extends Component<HomeProps,any>{
  render(){
    return(
      <div>home</div>
    )
  }
}
