import {Component, useEffect, useState} from "react";
import {Device, HomeStore} from "@/pages/Home/model";
import {inject, observer} from "mobx-react";
import {Card, Select} from "antd";
import ReactEcharts from "echarts-for-react"
import {Map, APILoader, Marker} from "@uiw/react-baidu-map";

const { Option } = Select;

interface HomeProps{
  homeStore: HomeStore;
}

type chartProps = {
  data: number[];
}

const Chart = (props: chartProps)=>{
  const [option,setOption] = useState(
    {
    xAxis:{type: 'category',data: ['total','online','received']},
    yAxis:{type: 'value'},
    series:[{type: 'bar',data:[] as number[]}]})
  useEffect(()=>{
    setOption(
      {
        xAxis:{type: 'category',data: ['total','online','received']},
        yAxis:{type: 'value'},
        series:[{type: 'bar',data: props.data}]})
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
    homeStore.getDevice();
  }

  handleChooseDevice = (value: any)=>{
    this.props.homeStore.setChosenDevice(value);
    this.props.homeStore.getRecordByDevice();
  }

  render(){
    const {deviceList,getChartData,getMapData} = this.props.homeStore;
    console.log(getMapData)
    return(
      <>
        <Chart data = {getChartData}/>
        <Select defaultValue={"select a device"} style={{ width: 200 }} onChange={this.handleChooseDevice.bind(this)}>
          {
            deviceList.map((item: Device) =>(
              <Option value={item.id} >{item.device_name}</Option>
            ))
          }
        </Select>
        <Card>
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
      </>
    )
  }
}
