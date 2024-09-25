import { Button, Col, Form, Input, Row, Select, Space, Table } from 'antd';
import { ClearOutlined, DownOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

const User = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>
    }
  ];

  const data = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    },
    {
      key: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable'
    },
    {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.'
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name
    })
  };

  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const getFields = () => {
    const count = expand ? 10 : 7;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={6} key={i}>
          {i % 3 !== 1 ? (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: 'Input something!'
                }
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          ) : (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: 'Select something!'
                }
              ]}
              initialValue="1"
            >
              <Select>
                <Option value="1">111</Option>
                <Option value="2">222</Option>
              </Select>
            </Form.Item>
          )}
        </Col>
      );
    }
    return children;
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <div className="admin-page-header admin-unselect">
        <div className="admin-page-title">用户中心 / USER MANAGEMENT.</div>
        <div className="admin-page-desc">
          <ul>
            <li>出于数据安全考虑，系统强制使用禁用用户替代删除用户。</li>
            <li>对于某些特殊的用户，例如老板或者高管，我们建议隐藏其联系方式，保护个人隐私。</li>
          </ul>
        </div>
      </div>
      <div className="admin-page-main">
        <div className="admin-page-search">
          <Form form={form} name="advanced_search" onFinish={onFinish}>
            <Row gutter={24}>
              {getFields()}
              <Col span={6} key="x" style={{ marginTop: '10px' }}>
                <Space>
                  <Button icon={<SearchOutlined />} htmlType="submit">搜索用户</Button>
                  <Button icon={<ClearOutlined />} onClick={() => {
                    form.resetFields();
                  }}>清理条件</Button>
                  <a
                    onClick={() => {
                      setExpand(!expand);
                    }}
                  >
                    <DownOutlined rotate={expand ? 180 : 0} /> {expand ? '收起条件' : '展开更多'}
                  </a>
                </Space>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="admin-page-list">
          <div className="admin-page-btn-group">
            <Button icon={<UserAddOutlined />}>添加用户</Button>
          </div>
          <Table
            size="small"
            rowSelection={{
              type: 'checkbox',
              ...rowSelection
            }}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0
                  }}
                >
                  {record.description}
                </p>
              ),
              rowExpandable: (record) => record.name !== 'Not Expandable'
            }}
            dataSource={data}
          />
        </div>
      </div>
    </>
  );
};

export default User;