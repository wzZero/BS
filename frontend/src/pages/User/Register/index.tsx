import {UserStore} from "@/pages/User/model";
import {inject, observer} from "mobx-react";
import React, {Component} from "react";
import {RegisterParamsType} from "@/services/login";
import styles from "@/pages/User/Login/index.less";
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Alert} from "antd";
import {Link} from "react-router-dom"

interface RegisterProps{
  loginStore: UserStore;
}


const patterns = {
  "username":"^[a-zA-Z_][0-9a-zA-Z_]{0,}$",
  "email":"^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
  "pwd":"^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\\(\\)])+$)([^(0-9a-zA-Z)]|[\\(\\)]|[a-z]|[A-Z]|[0-9]){8,}$",
}

const patternMsg = {
  "username": "start with letter and underline, including of digits letter and underline",
  "email": "invalid email",
  "pwd": "密码至少由8位包含字母、数字、特殊字符两种组合",
}

const pattern = (name: string,para='g') =>{
  return {
    pattern:new RegExp(patterns[name],para),
    message:patternMsg[name]
  }
}


const RegisterMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

@inject("loginStore")
@observer
export default class Login extends Component<RegisterProps,any>{
  handleSubmit = (values: RegisterParamsType) => {
    const {register} = this.props.loginStore;
    register({...values});
  };

  render() {
    const { userRegister = {}, registering } = this.props.loginStore;
    const { message } = userRegister;
    return (
      <div className={styles.main}>
        <ProForm
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              name: 'Login',
              loading: registering,
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
          onFinish={(values) => {
            this.handleSubmit(values as RegisterParamsType);
            return Promise.resolve();
          }}
        >
          {message === 'error' && !registering && (
            <RegisterMessage content = {'repeated email!'}/>
          )}
          {
            <>
              <ProFormText
                name="username"
                label ="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={"username"}
                rules={[
                  {required: true,message: "Please enter username!"},
                  {min: 6, message: "username no less then 6 letters"},
                  {max: 20, message: "username no more than 20 letters"},
                  pattern('name'),
                ]}
              />
              <ProFormText
                name="email"
                label="email"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={"email"}
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: "Please enter email!",
                  },
                  pattern("email")
                ]}
              />
              <ProFormText.Password
                name="password"
                label = "password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={"password"}
                rules={[
                  {required: true,message: "Please enter password！",},
                  {min: 6,message: "password no less than 6 letters"},
                  {max: 20,message: "password no more than 20 letters"},
                  pattern("password")
                ]}
              />
            </>
          }
          <Link
            style={{
              float: 'right',
            }}
            to = {'/user/login'}
          >
            back to login
          </Link>
        </ProForm>
        
      </div>
    );}

};
