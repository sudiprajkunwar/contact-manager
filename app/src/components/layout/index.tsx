import styled from "@emotion/styled";
import { Layout } from "antd";
import React from "react";
import Profile from "./Profile";
import { Route, Switch } from "react-router";
import { IRoutesType } from "../../interfaces";
import { routers } from "../../routes/routes";

const { Header, Content } = Layout;

const Logo = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 14px 0;
  background: rgb(80 70 70 / 20%);
`;

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
const AppLayout: React.FC = () => {
  return (
    <StyledLayout className="layout" style={{ height: "100vh" }}>
      <PrimaryHeader>
        <Logo />
        <Profile />
      </PrimaryHeader>
      <Content>
        <div className="site-layout-content">
          <Switch>
            {routers.map((item: IRoutesType) => (
              <Route
                key={item.path}
                path={item.path}
                component={item.component}
              />
            ))}
          </Switch>
        </div>
      </Content>
    </StyledLayout>
  );
};

export default AppLayout;
