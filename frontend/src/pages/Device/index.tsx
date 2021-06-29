import {inject, observer} from "mobx-react";
import {Component} from "react";
import {Button, Card,Row,Col, Divider, List, Modal} from "antd";
import {
  AppstoreAddOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import type {DeviceStore} from "@/pages/Device/model";
import type {Device} from "@/pages/Home/model";
import styles from "./styles.less"
import CreateModal from "@/pages/Device/component/CreateModal";
import EditModal from "@/pages/Device/component/EditModal";
import {createDeviceParam} from "@/services/device";
import moment from "moment";

interface DeviceProps{
  deviceStore: DeviceStore;
}

@inject('deviceStore')
@observer
export default class Home extends Component<DeviceProps,any>{
  setPageNum = (value: number)=>{
    this.props.deviceStore.setPageNum(value);
  }

  async componentDidMount() {
    await this.props.deviceStore.getDevice();

    const {devid} = this.props.match.params;
    this.props.deviceStore.handleRoute(devid);
  }

  componentWillUnmount() {
    Modal.destroyAll();
  }

  onCreate = ()=>{
    this.props.deviceStore.setCreateModalVisible(true);
  }

  onCreateOk = (data: any)=>{
    this.props.deviceStore.createDevice(data as createDeviceParam);
    this.props.deviceStore.setCreateModalVisible(false);
  }

  onCreateCancel = ()=>{
    this.props.deviceStore.setCreateModalVisible(false);
  }

  onEdit = (id: number) => {
    const {deviceStore} = this.props;
    deviceStore.setIsEdit(id);
    deviceStore.setEditModalVisible(true);
  }

  onEditOk = (data: any) => {
    console.log('edit_data',data)
    const {deviceStore} = this.props;
    this.props.deviceStore.editDevice(data);
    deviceStore.setEditModalVisible(false);
    deviceStore.setIsEdit(undefined);
  }

  onEditCancel = () => {
    const {deviceStore} = this.props;
    deviceStore.setEditModalVisible(false);
    deviceStore.setIsEdit(undefined);
  }

  redirectToDevice = (id: number) => {
    this.props.deviceStore.redirectRoute(id);
  };

  alertOnly = (value: boolean)=>{
    this.props.deviceStore.setOnlyAlert(value);
  }

  render(){
    const {deviceList,
      dataToShow,
      dataToEdit,
      createModalVisible,
      editModalVisible,
      pagenum} = this.props.deviceStore;
    return(
      <>
        <Divider orientation={"left"}>
          <Button icon={<AppstoreAddOutlined />} onClick={this.onCreate.bind(this)} >
            create
          </Button>
          <Button icon={<MinusCircleOutlined />} onClick={this.alertOnly.bind(this,true)} >
            alert only
          </Button>
          <Button icon={<PlusCircleOutlined />} onClick={this.alertOnly.bind(this,false)} >
            all
          </Button>
        </Divider>
        <Row gutter={3}>
          <Col span={18}>
            <Card>
            <span className={styles.record_head}>
            <div className={styles.record_lng}>经度</div>
            <div className={styles.record_lat}>纬度</div>
            <span className={styles.record_time}>发送时间</span>
            <div className={styles.record_alert_0}>告警</div>
            <div className={styles.record_info}>发送信息</div>
            <div className={styles.record_value}>发送数值</div>
          </span>
          <List
            dataSource={dataToShow}
            pagination={{
              hideOnSinglePage:true,
              showSizeChanger: false,
              pageSize: pagenum,
            }}
            renderItem={(item)=>(
              <span className={styles.record_item}>
                <div className={styles.record_lng}>{item.lng.toPrecision(8)}</div>
                <div className={styles.record_lat}>{item.lat.toPrecision(8)}</div>
                <div className={styles.record_time}>{moment(item.moment).format("YYYY-MM-DD HH:mm:ss")}</div>
                <div className={item.alert===1?styles.record_alert_1:styles.record_alert_0}>{item.alert}</div>
                <div className={styles.record_info}>{item.info}</div>
                <div className={styles.record_value}>{item.value}</div>
              </span>
            )}
          />
            </Card>

          </Col>
          <Col span={6}>
            <Card>
              <List
                dataSource={deviceList}
                renderItem ={(item: Device)=>(
                  <div className={styles.device_item} onClick={this.redirectToDevice.bind(this,item.devid)}>
                    <span className={styles.device_item_box}>{item.deviceName}</span>
                    <span className={styles.device_item_box}>{item.deviceType}</span>
                    <span><Button type="link" icon={<EditOutlined onClick={this.onEdit.bind(this,item.devid)}/>} /> </span>
                  </div>
                )}
              />
            </Card>
          </Col>
        </Row>
          <CreateModal
              modalVisible={createModalVisible}
              onHandleOk={this.onCreateOk}
              onHandleCancel={this.onCreateCancel}
          />

          <EditModal
            modalVisible={editModalVisible}
            onHandleOk={this.onEditOk}
            onHandleCancel={this.onEditCancel}
            data={dataToEdit}
          />
      </>
    )
  }
}
