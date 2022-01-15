import React from "react";
import { Select } from "antd";
import styled from "@emotion/styled";
import { Color } from "../../../constants/Color";
import { CIcon } from "../CIcon";

const StyledSelect = styled(Select)`
  .ant-select-selector {
    border: 1px solid #e9e9e9 !important;
    box-shadow: 0px 4px 8px #2c27380a !important;
    padding: 2px 16px !important;
    height: 37px !important;
    border-radius: 6px !important;
    .ant-select-selection-placeholder {
      color: ${Color.textGrey};
      font-size: 13px;
    }
    :hover {
      background: #ffffff 0% 0% no-repeat padding-box;
      box-shadow: 0px 4px 8px #1890ff33 !important;
      border: 1px solid #0257ff !important;
    }
    .ant-select-selection-search {
      input {
        height: 100% !important;
      }
    }
  }
  .ant-select-focused:focus {
    box-shadow: 0px 4px 8px #2c27380a !important;
  }
`;

export const CSelect = (props: any) => {
  const { children } = props;

  return (
    <StyledSelect
      {...props}
      suffixIcon={
        <CIcon
          type="caret-down"
          style={{ fontSize: "15px", color: "#373737" }}
        />
      }
    >
      {children}
    </StyledSelect>
  );
};
