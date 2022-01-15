import React from "react";

import styled from "@emotion/styled";
import { InputNumber, InputNumberProps } from "antd";

import { Color } from "../../../constants/Color";

const StyledInput = styled(InputNumber)`
  border: 1px solid #e9e9e9;
  box-shadow: 0px 4px 8px #2c27380a;
  height: 37px;
  border-radius: 6px;
  width: 100%;

  .ant-input-number-handler-wrap {
    display: none;
  }
  .ant-input-number-input-wrap {
    height: 100%;

    input {
      height: 100%;
      ::placeholder {
        color: ${Color.textGrey};
        font-size: 13px;
      }
      :focus {
        box-shadow: none !important;
      }
    }
  }
  :hover {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 8px #1890ff33;
    border: 1px solid ${Color.primary};
  }
`;
export const CInputNumber = React.forwardRef(
  (props: InputNumberProps, ref: any) => {
    return <StyledInput ref={ref} {...props} />;
  }
);
