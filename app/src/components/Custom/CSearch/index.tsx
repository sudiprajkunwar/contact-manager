import { Input } from "antd";
import * as React from "react";
import { SearchProps } from "antd/es/input";

const { Search } = Input;

type CSearchProps = SearchProps;

export const CSearch: React.FC<CSearchProps> = (props) => {
  return <Search {...props} allowClear />;
};
