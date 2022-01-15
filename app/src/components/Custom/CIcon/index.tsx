import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { IconFontProps } from "@ant-design/icons/lib/components/IconFont";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2707466_a7yv4ucyqkj.js",
});

export const CIcon = (props: IconFontProps) => {
  return <IconFont {...props} />;
};
