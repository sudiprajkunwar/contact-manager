import React from "react";

import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import { Form, notification } from "antd";

import { useHistory } from "react-router";
import { ILogin } from "../../interfaces";
import { signinUser } from "../../redux/actions/userAction";
import {
  CInput,
  CFormItem,
  CInputPassword,
  CButton,
} from "../../components/Custom";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";

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

const Register = styled.div`
  padding-top: 10px;
`;

const Login = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isLoading } = useAppSelector((state) => state.users);

  const onFinish = (values: ILogin) => {
    dispatch(
      signinUser({
        ...values,
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: "Login successfully",
            duration: 2,
          });
          history.push("/contact");
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
          <CButton type="primary" htmlType="submit" loading={isLoading}>
            Sign in
          </CButton>
          <Register>
            Or <Link to="/signup">Sign Up!</Link>
          </Register>
        </CFormItem>
      </Form>
    </Wrapper>
  );
};

export default Login;
