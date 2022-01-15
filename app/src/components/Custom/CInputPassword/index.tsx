import React from "react";
import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import styled from "@emotion/styled";
import { Color } from "../../../constants/Color";

const StyledInput = styled(Input.Password)`
  border: 1px solid #e9e9e9;
  box-shadow: 0px 4px 8px #2c27380a;
  padding: 12px 16px;
  height: 37px;
  border-radius: 6px;
  :hover {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 8px #1890ff33;
    border: 1px solid ${Color.primary};
  }
  .ant-input {
    :focus {
      box-shadow: none !important;
      border-color: transparent;
    }
    ::placeholder {
      color: ${Color.textGrey};
      font-size: 13px;
    }
    :focus {
      box-shadow: none !important;
    }
  }
`;

export const CInputPassword = React.forwardRef(
  (props: InputProps, ref: any) => {
    return <StyledInput ref={ref} {...props} />;
  }
);
