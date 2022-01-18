import * as React from "react";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import styled from "@emotion/styled";
const { Search } = Input;

type CSearchProps = SearchProps;

export const CSearch: React.FC<CSearchProps> = (props) => {
  return <Search {...props} allowClear />;
};
