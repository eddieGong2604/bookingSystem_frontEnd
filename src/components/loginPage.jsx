import React, { useState } from "react";

import { Input, Button, Form } from "antd";
import Axios from "axios";

const LoginPage = (props) => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    errorStatus: "",
  });
  const onFinish = async (values) => {
    try {
      const userData = await Axios({
        method: "post",
        url: "http://localhost:8080/api/authentication/signin",
        data: values,
      }).then((res) => res);
      console.log(userData);
      localStorage.setItem("token", userData.data.accessToken);
      window.location = "/";
    } catch (error) {
      setLoginDetails({ username: "", errorStatus: error.response });
      console.log(loginDetails.errorStatus);
    }
  };
  return (
    <div className="container mt-5 text-center d-flex justify-content-center">
      {" "}
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <tr>
          <td>Username: </td>
          <td>
            {" "}
            <Form.Item
              name="usernameOrEmail"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </td>
        </tr>

        <tr>
          <td>Password: </td>
          <td>
            {" "}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </td>
        </tr>

        <tr>
          <td></td>
          <td>
            {" "}
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

export default LoginPage;
