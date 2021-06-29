import {useEffect, useState} from "react";
import {Card, Form, Input, Modal} from "antd";

type IProps = {
  onHandleOk: any;
  onHandleCancel: any;
  modalVisible: boolean;
  data: any;
}

const EditModal = (props: IProps)=>{
  const [modalVisible, setModalVisible] = useState(props.modalVisible);
  useEffect(()=>{setModalVisible(props.modalVisible)},[props.modalVisible])

  const [form] = Form.useForm();

  const handleOk = ()=>{
    form.validateFields().then(
      (r)=>{
        props.onHandleOk({...r})
      }
    )
  }

  return (
    <Modal
      visible={modalVisible}
      onOk={handleOk}
      onCancel={props.onHandleCancel}
    >
      <Card>
        <Form form = {form}>
          <Form.Item label={'DeviceName'} name={"deviceName"} initialValue={props.data?.device_name} rules={[{required: true}]}>
            <Input/>
          </Form.Item>
        </Form>
        <div>{props.data?.device_type}</div>
      </Card>
    </Modal>
  )
}

export default EditModal;
