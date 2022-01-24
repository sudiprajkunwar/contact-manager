import React, { useEffect, useState } from "react";

import { Col, Form, notification, Row, Space } from "antd";
import styled from "@emotion/styled";

import TopHeader from "../../components/TopHeader";
import { CFormItem, CInput, CInputNumber } from "../../components/Custom";
import UploadProfile from "./UploadProfile";
import { useAppDispatch } from "../../utils/reduxHooks";
import {
  createContacts,
  updateContact,
} from "../../redux/actions/contactsAction";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import { IContact } from "../../interfaces";

const StyledForm = styled(Form)`
  .ant-form-item-label {
    padding: 0;
  }
`;

const FormWrapper = styled(Row)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 15px;
  box-shadow: 0px 4px 8px #0062ff0d;
  margin: 0 16px;
  padding: 20px;
`;

const UploadCol = styled(Col)`
  position: relative;
`;

const ContactForm = (props: any) => {
  const [imageurl, setImageurl] = useState<string>("");
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userId = Cookies.get("userId");
  const [form] = Form.useForm();

  const contactDetail = props.location.state;

  useEffect(() => {
    form.setFieldsValue({ ...contactDetail });
  }, [contactDetail]);

  const saveForm = (values: any) => {
    const data = { ...values, user_id: userId, image: imageurl };

    dispatch(
      createContacts({
        ...data,
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: "Contact created successfully",
            duration: 2,
          });
          history.goBack();
        },
      })
    );
  };

  const EditForm = (values: any) => {
    const data = {
      ...values,
      user_id: userId,
      _id: contactDetail._id,
      image: imageurl,
    };

    dispatch(
      updateContact({
        ...data,
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: "Edited successfully",
            duration: 2,
          });
          history.push("/contact");
        },
      })
    );
  };
  return (
    <StyledForm
      layout="vertical"
      form={form}
      onFinish={contactDetail ? EditForm : saveForm}
      hideRequiredMark
    >
      <TopHeader
        title={contactDetail ? "Edit Contact" : "Add Contact"}
        save={contactDetail ? "Edit Contact" : "Save Contact"}
        cancel="Back"
      />
      <FormWrapper>
        <UploadCol flex={2}>
          <UploadProfile setImageurl={setImageurl} imageurl={imageurl} />
        </UploadCol>

        <Col flex={1}>
          <Col span={16}>
            <CFormItem
              name="full_name"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your full name!",
                },
              ]}
            >
              <CInput placeholder="Enter Your Full Name" />
            </CFormItem>
          </Col>

          <Col span={16}>
            <CFormItem
              name="phone"
              label="Phone Number"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Please enter your phone number!",
                },
              ]}
            >
              <CInputNumber placeholder="Enter Your Number" />
            </CFormItem>
          </Col>

          <Col span={16}>
            <CFormItem
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <CInput placeholder="Enter your Email" />
            </CFormItem>
          </Col>

          <Col span={16}>
            <CFormItem
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please enter your address!",
                },
              ]}
            >
              <CInput placeholder="Enter your Address" />
            </CFormItem>
          </Col>
        </Col>
      </FormWrapper>
    </StyledForm>
  );
};

export default ContactForm;
