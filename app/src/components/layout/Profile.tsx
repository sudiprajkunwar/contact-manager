import React, { useEffect } from "react";

import Cookies from "js-cookie";
import styled from "@emotion/styled";
import { useHistory } from "react-router";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Menu, Row } from "antd";

import { Color } from "../../constants/Color";

import { getFirstLetter } from "../../utils/getFirstLetter";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { getUserDetail } from "../../redux/actions/userAction";
import { IParamsUserId } from "../../interfaces";

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
  text-transform: capitalize;
`;

const Designation = styled("p")`
  font-size: 13px;
  letter-spacing: 0px;
  color: ${Color.textGrey};
  margin-bottom: 0;
  line-height: 12px;
`;

const ProfileSection = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.users);
  const userId: any = Cookies.get("userId");

  useEffect(() => {
    dispatch(getUserDetail({ params: { user_id: userId } }));
  }, [dispatch]);

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("userId");

    dispatch({
      type: "SIGNOUT_USER",
    });
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
    <Row justify="space-between" align="middle" gutter={16}>
      <Col>
        <FullName>{data?.full_name}</FullName>
        <Designation>{data?.email}</Designation>
      </Col>
      <Col style={{ lineHeight: 0 }}>
        <Dropdown
          overlay={menu}
          placement="bottomCenter"
          trigger={["click"]}
          arrow
        >
          <Avatar
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              cursor: "pointer",
            }}
          >
            {getFirstLetter(data?.full_name)}
          </Avatar>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default ProfileSection;
