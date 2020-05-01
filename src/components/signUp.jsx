import React, { useState } from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import Axios from "axios";
const SignUp = (props) => {
  const [errorMessage, setError] = useState("");
  const onFinish = async (values) => {
    try {
      await Axios({
        method: "post",
        url: "http://localhost:8080/api/authentication/signup",
        data: values,
      }).then((res) => res);

      window.location = "/";
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5 text-left d-flex justify-content-center">
      {" "}
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <tr>
          {" "}
          <td>Username: </td>
          <td>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <td>Password:</td>

          <td>
            {" "}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </td>
        </tr>

        <tr>
          <td>Email:</td>
          <td>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </td>
        </tr>

        <tr>
          <td>Name:</td>
          <td>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </td>
        </tr>

        <tr>
          <td>Role:</td>
          <td>
            <Form.Item
              name="role"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select your role",
                },
              ]}
            >
              <Select placeholder="Please select a role">
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </Select>
            </Form.Item>
          </td>
        </tr>

        <tr>
          <td>
            {" "}
            <p className="text-danger">{errorMessage}</p>
          </td>
          <td>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </td>
        </tr>
      </Form>
    </div>
  );
};

export default SignUp;
