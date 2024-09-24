import { Button, Checkbox, Divider, Form, Input, Space } from 'antd';
import { DingtalkOutlined, InsuranceOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const Login = () => {
  const loginHandler = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="admin-login-body">
        <div className="admin-login-title">登录 / Sign in</div>
        <Divider className="admin-welcome">欢迎回来</Divider>
        <div className="admin-login-form">
          <Form
            name="login"
            initialValues={{
              remember: true
            }}
            onFinish={loginHandler}>
            <Form.Item
              name="account"
              rules={[
                {
                  required: true,
                  message: '请输入您的用户名!'
                }
              ]}>
              <Input autoComplete="off" className="admin-login-input"
                     prefix={<UserOutlined />} placeholder="工号 / 手机号 / Email" />
            </Form.Item>
            <Form.Item
              className="admin-login-form-item"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入您的密码!'
                }
              ]}>
              <Input.Password autoComplete="off" className="admin-login-input"
                              prefix={<LockOutlined />} type="password"
                              placeholder="密码" />
            </Form.Item>
            {/*手机令牌方式*/}
            <Form.Item
              className="admin-login-form-item"
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入您的验证码!'
                }
              ]}>
              <Input autoComplete="off" className="admin-login-input" prefix={<InsuranceOutlined />}
                     placeholder="手机令牌验证码" />
            </Form.Item>

            {/*邮件短信获取验证码方式*/}
            <Form.Item style={{ marginBottom: 15 }}>
              <Space direction="horizontal">
                <Input
                  autoComplete="off"
                  className="admin-login-input"
                  prefix={<MailOutlined className="site-forms-item-icon" />}
                  placeholder="邮件 / 短信验证码"
                  style={{
                    width: '200px'
                  }}
                />
                <Button type="primary" className="admin-login-code-button">获取验证码</Button>
              </Space>
            </Form.Item>
            <Form.Item className="admin-login-remember-item">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="">忘记密码？</a>
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
              <Button block type="primary" htmlType="submit" className="admin-login-form-button">
                登录
              </Button>
            </Form.Item>
            <Divider className="admin-login-change">或者使用钉钉扫码直接登录</Divider>
            <Button className="admin-login-form-button" block><DingtalkOutlined /> 切换到钉钉扫码登录</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
