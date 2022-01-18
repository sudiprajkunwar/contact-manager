import React from "react";

import styled from "@emotion/styled";
import { Col, Row, Space } from "antd";

import { Color } from "../../constants/Color";
import { CButton, CTitle } from "../../components/Custom";

type Props = {
  title: string;
  save?: string;
  cancel?: string;
  onSave?: () => void;
};

const Wrapper = styled.section`
  padding: 16px;
  line-height: 28px;
`;

const CancelButton = styled(CButton)`
  height: 30px;
  border: 1px solid #2e2e2e;
  border-radius: 6px;
  background: #f9fcff;
  :hover {
    box-shadow: inset 0px 0px 1px 0 #2e2e2e;
  }
`;

const SaveButton = styled(CButton)`
  height: 30px;
`;

const PageTitle = styled(CTitle)`
  letter-spacing: 0px;
  font-size: 18px;
`;

const TopHeader: React.FC<Props> = ({ title, save, cancel, onSave }) => {
  return (
    <Wrapper>
      <Row justify="space-between">
        <Col>
          <PageTitle level={3} color="#0f0f0f" margin="0">
            {title}
          </PageTitle>
        </Col>
        <Col>
          <Space>
            {cancel && (
              <CancelButton
                type="primary"
                backgroundcolor={Color.textLight}
                color={Color.textDark}
                onClick={() => window.history.back()}
              >
                {cancel}
              </CancelButton>
            )}
            {save && (
              <SaveButton type="primary" htmlType="submit" onClick={onSave}>
                {save}
              </SaveButton>
            )}
          </Space>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default TopHeader;
