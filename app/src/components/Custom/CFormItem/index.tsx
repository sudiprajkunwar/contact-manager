import React from "react";
import styled from "@emotion/styled";
import { Form } from "antd";
import { FormItemProps } from "antd/lib/form";
import { Color } from "../../../constants/Color";

type Props = FormItemProps & {
  children: any;
};
const FormItem = styled(Form.Item)`
  margin-bottom: 15px;
  .ant-form-item-label {
    line-height: 30px;
    padding: 0;

    label {
      color: ${Color.textGrey};
      font-weight: 500;
      font-size: 12px;
      ::after {
        display: none;
      }
    }
  }
  .ant-form-explain {
    font-size: 12px;
    transform: translateY(5px);
  }
  .has-error .ant-select-open .ant-select-selection,
  .has-error .ant-select-focused .ant-select-selection {
    box-shadow: none !important;
  }
  .ant-select-selection--multiple > ul > li,
  .ant-select-selection--multiple .ant-select-selection__rendered > ul > li {
    margin-top: 7px !important;
  }
`;

export const CFormItem = (props: Props) => {
  const { children, ...rest } = props;
  return <FormItem {...rest}>{children}</FormItem>;
};
