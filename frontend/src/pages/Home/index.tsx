import {Component, useEffect, useState} from "react";
import {Device, HomeStore} from "@/pages/Home/model";
import {inject, observer} from "mobx-react";
import {Card, Select} from "antd";
import ReactEcharts from "echarts-for-react"
import {Map, APILoader, Marker} from "@uiw/react-baidu-map";
import styles from "./styles.less"
import { Tag } from "antd";
import { Row } from "antd";
import { Col } from "antd";

const { Option } = Select;

interface HomeProps{
  homeStore: HomeStore;
}

type chartProps = {
  data: number[];
}

const StatusChart = (props: chartProps)=>{
  const [option,setOption] = useState(
    {
      xAxis:{type: 'category',data: ['total','online']},
    yAxis:{type: 'value'},
    series:[{type: 'bar',data:[] as number[]}]})

  useEffect(()=>{
    setOption(
      {
        xAxis:{type: 'category',data: ['total','online']},
        yAxis:{type: 'value'},
        series:[{type: 'bar',data: props.data}]})
  },[props.data]);

  return(
    <Card>
      <ReactEcharts option={option}/>
    </Card>
  )
}

const RecordChart = (props: chartProps)=>{
  const [option,setOption] = useState(
    {
      xAxis:{type: 'category',data: [5,4,3,2,1]},
    yAxis:{type: 'value'},
    series:[{type: 'line',data:[] as number[]}]})

  useEffect(()=>{
    setOption(
      {
        xAxis:{type: 'category',data: [5,4,3,2,1]},
        yAxis:{type: 'value'},
        series:[{type: 'line',data: props.data}]})
  },[props.data]);
  return(
    <Card>
      <ReactEcharts option={option}/>
    </Card>
  )
}

@inject('homeStore')
@observer
export default class Home extends Component<HomeProps,any>{
  componentDidMount() {
    const {homeStore} = this.props;
    homeStore.getStatistic();
    homeStore.getRecordIn5();
    homeStore.getDevice();
  }

  handleChooseDevice = (value: any)=>{
    this.props.homeStore.setChosenDevice(value);
    this.props.homeStore.getRecordByDevice();
  }

  render(){
    const {deviceList,getStatusData,getRecordIn5Data,getMapData} = this.props.homeStore;
    console.log(getMapData)
    return(
      <>
      <div className = {styles.chartBlock}>
        <span  className = {styles.chartCard}>
          <StatusChart data = {getStatusData}/>
        </span>
        <span  className={styles.chartCard}>
          <RecordChart data = {getRecordIn5Data}/>
        </span>
      </div>

      <div>
        <Card className={styles.card__map} size="small">
        <div className = {styles.block__tag__select}>
            <Tag color="blue">record of one device</Tag>
            <Select defaultValue={"select a device"} style={{ width: 200 }} onChange={this.handleChooseDevice.bind(this)}>
              {
                deviceList.map((item: Device) =>(
                  <Option value={item.devid} >{item.deviceName}</Option>
                ))
              }
            </Select>
          </div>
          <div style={{ width: '100%', height: '350px' }}>
            <APILoader akay="GTrnXa5hwXGwgQnTBG28SHBubErMKm3f">
              <Map widget={['NavigationControl']} zoom={0}>
                {getMapData?
                  getMapData.map((item) => (
                    <Marker
                      position={{lng: item.lng, lat:item.lat}}
                      type={item.alert===1?"loc_red":"loc_blue"}
                      title={item.info}
                    />
                  ))
                  : <></>}
              </Map>
            </APILoader>
          </div>
        </Card>
      </div>
      </>
    )
  }
}
