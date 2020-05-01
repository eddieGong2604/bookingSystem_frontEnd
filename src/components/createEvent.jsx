import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import Axios from "axios";
const CreateEvent = ({ user }) => {
  const [errorMessage, setError] = useState("");

  const onFinish = async (values) => {
    values.creator = user.sub;
    try {
      await Axios({
        method: "post",
        url: "http://localhost:8080/api/events/all",
        data: values,
        headers: {
          Authorization: `Bearer ${user.jwtCode}`,
        },
      }).then((res) => res);

      await Axios({
        method: "post",
        url: `http://localhost:8080/api/events/userEvent=${user.jti}`,
        data: values,
        headers: {
          Authorization: `Bearer ${user.jwtCode}`,
        },
      });

      window.location = "/";
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="container mt-4">
      <h3 style={{ color: "#4096e6" }}>Creating Event</h3>

      <div className="container mt-5 text-left d-flex justify-content-center">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <tr>
            {" "}
            <td>Event name: </td>
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
            <td>Event location:</td>

            <td>
              {" "}
              <Form.Item
                name="location"
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
            <td>Time (YYYY-MM-DD):</td>
            <td>
              <Form.Item
                name="dateTime"
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
            <td>Description:</td>
            <td>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </td>
          </tr>

          <tr>
            <td>Capacity:</td>
            <td>
              <Form.Item
                name="capacity"
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
            <td> </td>
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
    </div>
  );
};

export default CreateEvent;
