import React from "react";

import { Button } from "antd";
import styled from "@emotion/styled";
import { ButtonProps } from "antd/lib/button";

import { Color } from "../../../constants/Color";

type Props = ButtonProps & {
  children: any;
  backgroundcolor?: string;
  color?: string;
};

const StyledButton = styled(Button)<Props>`
  width: 110px;
  background: ${(props) => props.backgroundcolor || Color.lightBlue};
  color: ${(props) => props.color || "#fff"};
  font-size: 12px;
  font-weight: 600;
  height: 35px;
  box-shadow: 0px 4px 8px #2c273814;
  border-radius: 6px;
  &:hover,
  &:focus {
    background: ${(props) => props.backgroundcolor || Color.lightBlue};
    color: ${(props) => props.color || "#fff"};
    border-color: ${(props) => props.color || "#fff"};
  }
`;

export const CButton = (props: Props) => {
  const { children, ...rest } = props;
  return <StyledButton {...rest}>{children}</StyledButton>;
};
