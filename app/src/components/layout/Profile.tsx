import React from "react";
import { Button, Col, Dropdown, Menu, Row } from "antd";
import styled from "@emotion/styled";
import { Color } from "../../constants/Color";
import Cookies from "js-cookie";
import { LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const Image = styled("img")`
  width: 40px;
  height: 40px;
  box-shadow: 3px 10px 20px #363e931c;
  border-radius: 15px;
  cursor: pointer;
`;

const FullName = styled("p")`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0px;
  color: ${Color.textDark};
  margin-bottom: 0;
  line-height: 25px;
`;

const Designation = styled("p")`
  font-size: 13px;
  letter-spacing: 0px;
  color: ${Color.textGrey};
  margin-bottom: 0;
  line-height: 12px;
`;

const ProfileData = {
  imageUrl: "https://i.pravatar.cc/",
  firstName: "Json",
  lastName: "Statham",
  designation: "Actor",
};

const ProfileSection = () => {
  const history = useHistory();

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("inventoryId");
    // dispatch({
    //   type: "LOGOUT_USER",
    // });
    history.push("/");
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <Button type="text" onClick={logOut}>
          <LogoutOutlined />
          Sign Out
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Row
      justify="space-between"
      align="middle"
      gutter={16}
      // style={isSelected ? {} : { marginLeft: "auto" }}
    >
      <Col>
        <FullName>{`${ProfileData.firstName} ${ProfileData.lastName}`}</FullName>
        <Designation>{ProfileData.designation}</Designation>
      </Col>
      <Col style={{ lineHeight: 0 }}>
        <Dropdown
          overlay={menu}
          placement="bottomCenter"
          trigger={["click"]}
          arrow
        >
          <Image src={ProfileData.imageUrl} />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default ProfileSection;
