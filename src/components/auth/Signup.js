import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Alert, Select } from 'antd'
import { signUp } from '../../store/actions'
import professions from '../../utils/professions'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}
const { Option } = Select

const Signup = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const authError = auth.authError
  const onFinish = ({
    firstName,
    lastName,
    username,
    email,
    password,
    profession
  }) => {
    dispatch(
      signUp({ firstName, lastName, username, email, password, profession })
    )
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="">
      {authError && (
        <Alert
          style={{ marginBottom: '20px' }}
          message="Error"
          description={authError}
          type="error"
          showIcon
        />
      )}
      <Form
        {...layout}
        style={{ paddingRight: '10%' }}
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="profession"
          label="Profession"
          rules={[{ required: true }]}>
          <Select placeholder="Select your professional" allowClear>
            {professions.map(profession => (
              <Option key={profession} value={profession}>
                {profession}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Signup
