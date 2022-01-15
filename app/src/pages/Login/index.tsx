import React, { useState } from "react";

import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { Button, Form, notification } from "antd";

import { useHistory } from "react-router";
import { ILogin } from "../../interfaces";
import { loginUser } from "../../redux/actions/loginActions";
import { CInput, CFormItem, CInputPassword } from "../../components/Custom";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  .ant-form-item-control-input-content {
    text-align: center;
  }
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values: ILogin) => {
    console.log(values);
    setLoading(true);

    dispatch(
      loginUser({
        ...values,
        onSuccess: () => {
          setLoading(false);
          notification.success({
            message: "Success",
            description: "Login successfully",
            duration: 2,
          });
          history.push("/contacts");
        },
      })
    );
  };

  return (
    <Wrapper>
      <Form form={form} onFinish={onFinish}>
        <CFormItem
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <CInput placeholder="Email" />
        </CFormItem>

        <CFormItem
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <CInputPassword placeholder="Password" />
        </CFormItem>

        <CFormItem>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </CFormItem>
      </Form>
    </Wrapper>
  );
};

export default Login;
