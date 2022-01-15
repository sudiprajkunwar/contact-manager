import * as React from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import styled from '@emotion/styled';
const { Search } = Input;

type CustomSearchProps = SearchProps;

const CustomSearch: React.FC<CustomSearchProps> = (props) => {
  return <Search {...props} allowClear/>;
};

export default CustomSearch;
