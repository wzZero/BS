import {useEffect, useState} from "react";
import {Form, Input, Modal} from "antd";
import { Radio } from "antd";

type IProps = {
  onHandleOk: any;
  onHandleCancel: any;
  modalVisible: boolean;
}

const CreateModal = (props:IProps)=>{
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
      <Form form = {form}>
        <Form.Item label={'device_name'} name={"device_name"} rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item label={'device_type'} name={"device_type"} rules={[{required: true}]}>
          <Radio.Group>
            <Radio value="phone">phone</Radio>
            <Radio value="laptop">laptop</Radio>
            <Radio value="air-conditioner">air-conditioner</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateModal;
