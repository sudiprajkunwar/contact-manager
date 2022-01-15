import React from "react";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { Color } from "../../../constants/Color";
import { TitleProps } from "antd/lib/typography/Title";

const { Title } = Typography;

type Props = TitleProps & {
  children: any;
  color?: string;
  fontWeight?: number;
  textalign?: string;
  margin?: string;
};

const StyledTitle = styled(Title)<Props>`
  &.ant-typography {
    color: ${(props) => props.color || Color.textDark};
    font-weight: ${(props) => props.fontWeight};
    text-align: ${(props) => props.textalign};
    margin: ${(props) => props.margin};
  }
`;
export const CTitle = (props: Props) => {
  const { children, ...rest } = props;
  return <StyledTitle {...rest}>{children}</StyledTitle>;
};
