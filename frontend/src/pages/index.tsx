import {Component} from "react";
import {Provider} from "mobx-react"
import stores from "./store"

export default class Base extends Component {
  render(){
    return <Provider {...stores}>{this.props.children}</Provider>
  }
}
