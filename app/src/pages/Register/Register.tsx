import React, { useState } from "react";

import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Form, notification } from "antd";
import { useHistory } from "react-router";
import { useForm } from "antd/lib/form/Form";

import { IRegister } from "../../interfaces";
import { signupUser } from "../../redux/actions/userAction";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import {
  CInput,
  CFormItem,
  CInputPassword,
  CButton,
} from "../../components/Custom";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  padding: 20px;
  border-radius: 8px;
  .ant-form-item-control-input-content {
    text-align: center;
  }
`;

const Login = styled.div`
  padding-top: 10px;
`;
const Register = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { isLoading } = useAppSelector((state) => state.users);

  const onFinish = (values: IRegister) => {
    dispatch(
      signupUser({
        ...values,
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: "Register successfully",
            duration: 2,
          });
          history.push("/");
        },
      })
    );
  };

  return (
    <Wrapper>
      <Form form={form} onFinish={onFinish}>
        <CFormItem
          name="full_name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <CInput placeholder="Full Name" />
        </CFormItem>

        <CFormItem
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
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
          <CButton type="primary" htmlType="submit" loading={isLoading}>
            Sign Up
          </CButton>
          <Login>
            Or <Link to="/">Sign in!</Link>
          </Login>
        </CFormItem>
      </Form>
    </Wrapper>
  );
};

export default Register;
