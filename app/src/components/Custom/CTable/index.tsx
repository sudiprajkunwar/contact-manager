import React from "react";
import { Table } from "antd";
import styled from "@emotion/styled";
import { Color } from "../../../constants/Color";

const StyledTable = styled(Table)`
  width: 100%;
  .ant-table {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 25px 40px #0000000d;
    border-radius: 10px;
  }
  table {
    thead {
      tr {
        background: #fdfdfd;
        th {
          background: #ffffff;
          letter-spacing: 0.14px;
          color: ${Color.textDark};
          font-size: 13px;
          font-weight: 500;
          &:before {
            display: none;
          }
        }
      }
    }
    tbody {
      .ant-table-row {
        color: ${Color.textDark};
        font-weight: 500;
        &:last-child {
          td {
            &:first-of-type {
              border-top-left-radius: 10px !important;
              border-bottom-left-radius: 10px !important;
            }
            &:last-child {
              border-top-right-radius: 10px !important;
              border-bottom-right-radius: 10px !important;
            }
          }
        }
        td {
          background: #fff;
          padding: 8px 16px;
          font-size: 12px;
          :hover {
            background: #2e4dd40d !important;
          }
        }
        :hover {
          cursor: pointer;
        }
      }
    }
  }
  .ant-table-empty {
    .ant-table-placeholder {
      .ant-table-cell {
        border-bottom: none;
      }
      :hover {
        .ant-table-cell {
          border-bottom: none;
        }
      }
    }
  }
`;

export const CTable = React.forwardRef((props: any, ref: any) => {
  return <StyledTable size="large" {...props} />;
});
