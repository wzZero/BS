import {inject, observer} from "mobx-react";
import {Component} from "react";
import {Button, Card, Divider, List, Modal} from "antd";
import {AppstoreAddOutlined} from "@ant-design/icons";
import type {DeviceStore} from "@/pages/Device/model";
import type {Device} from "@/pages/Home/model";
import styles from "./styles.less"
import CreateModal from "@/pages/Device/component/CreateModal";
import EditModal from "@/pages/Device/component/EditModal";
import {createDeviceParam} from "@/services/device";

interface DeviceProps{
  deviceStore: DeviceStore;
}

@inject('deviceStore')
@observer
export default class Home extends Component<DeviceProps,any>{
  componentDidMount() {
    this.props.deviceStore.getDevice();
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

  render(){
    const {deviceList,dataToEdit,createModalVisible,editModalVisible} = this.props.deviceStore;
    return(
      <>
        <Divider orientation={"left"}>
          <Button icon={<AppstoreAddOutlined />} onClick={this.onCreate.bind(this)} >
            create
          </Button>
        </Divider>
        <Card>
          <List
            dataSource={deviceList}
            renderItem ={(item: Device)=>(
              <div className={styles.device_item} onClick={this.onEdit.bind(this,item.id)}>
                <span>{item.device_name}</span>
                <span>{item.device_type}</span>
              </div>
            )}
          />
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

        </Card>
      </>
    )
  }
}
