import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert } from 'antd';
import React, {Component} from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import type { LoginParamsType } from '@/services/login';

import styles from './index.less';
import type {LoginStore} from "@/pages/Login/model";
import {inject, observer} from "mobx-react";

const LoginMessage: React.FC<{
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

interface LoginProps{
  loginStore: LoginStore;
}

@inject("loginStore")
@observer
export default class Login extends Component<LoginProps,any>{
  handleSubmit = (values: LoginParamsType) => {
      const {login} = this.props.loginStore;
      login({...values});
  };

  render() {
    const { userLogin = {}, submitting } = this.props.loginStore;
    const { message } = userLogin;
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
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          this.handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >

        {message === 'error' && !submitting && (
          <LoginMessage content = {'Incorrect account or password'}/>
        )}

        {
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={"email"}
              rules={[
                {
                  required: true,
                  message: "Please enter email!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={"password"}
              rules={[
                {
                  required: true,
                  message: "Please enter password！",
                },
              ]}
            />
          </>
        }

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            Auto login
          </ProFormCheckbox>
        </div>
      </ProForm>
    </div>
  );}

};
