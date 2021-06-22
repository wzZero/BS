emqx\bin：
启动 ./emqx start
用户名:admin
密码:public

API:

- 用户相关

/user/login

req:
email: string;
password: string;

res:
User {
    uid: string;
    name: string;
}