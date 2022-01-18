import styled from "@emotion/styled";
import { Layout, Image } from "antd";
import React from "react";
import Profile from "./Profile";
import { Route, Switch } from "react-router";
import { IRoutesType } from "../../interfaces";
import { routers } from "../../routes/routes";

import contactmanager from "../../asset/cm.png";
const { Header, Content } = Layout;

const Logo = styled.img``;

const PrimaryHeader = styled(Header)`
  background: #ffffff 0% 0% no-repeat padding-box;
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
`;
const StyledLayout = styled(Layout)`
  background: #f9fcff 0% 0% no-repeat padding-box;
`;

export const TableWrapper = styled.div`
  padding: 16px 200px;
`;

const AppLayout: React.FC = () => {
  return (
    <StyledLayout className="layout" style={{ height: "100vh" }}>
      <PrimaryHeader>
        <div>
          <Logo src={contactmanager} alt="logo" />
        </div>
        <Profile />
      </PrimaryHeader>
      <Content>
        <TableWrapper className="site-layout-content">
          <Switch>
            {routers.map((item: IRoutesType) => (
              <Route
                key={item.path}
                path={item.path}
                component={item.component}
                exact
              />
            ))}
          </Switch>
        </TableWrapper>
      </Content>
    </StyledLayout>
  );
};

export default AppLayout;
