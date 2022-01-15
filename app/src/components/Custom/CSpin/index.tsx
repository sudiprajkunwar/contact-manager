import React from "react";
import { Spin, SpinProps } from "antd";
import styled from "@emotion/styled";

const Spinner = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const CSpin = (props: SpinProps) => {
  return <Spinner {...props} />;
};
