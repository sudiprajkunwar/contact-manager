import React, { useEffect } from "react";

import Cookies from "js-cookie";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import {
  Tooltip,
  Card,
  List,
  Avatar,
  Row,
  Col,
  Popconfirm,
  notification,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { IContact } from "../../interfaces";
import { CTable } from "../../components/Custom";
import TopHeader from "../../components/TopHeader";
import { getFirstLetter } from "../../utils/getFirstLetter";
import {
  deleteContact,
  getAllContacts,
} from "../../redux/actions/contactsAction";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";

export const TableWrapper = styled.div`
  padding: 16px 0px;
`;

const StyledCard = styled(Card)`
  border-radius: 20px;
  margin: 10px;
`;

const Icons = styled(Row)`
  justify-content: space-evenly;
`;

const Edit = styled(EditOutlined)`
  font-size: 18px;
`;

const Delete = styled(DeleteOutlined)`
  font-size: 18px;
`;

const Contacts = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoading, data } = useAppSelector((state) => state.contacts);
  const userId: any = Cookies.get("userId");

  useEffect(() => {
    dispatch(getAllContacts({ params: { user_id: userId } }));
  }, [dispatch]);

  const OnDelete = (id: string, userId: string) => {
    const rawData = {
      _id: id,
      user_id: userId,
    };

    dispatch(
      deleteContact({
        params: { ...rawData },
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: "Deleted contact successfully",
            duration: 2,
          });
          dispatch(getAllContacts({ params: { user_id: userId } }));
        },
      })
    );
  };

  const columns = [
    {
      title: "Contacts",
      key: "contacts",
      width: 300,
      render: (record: IContact) => {
        return (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {getFirstLetter(record.full_name)}
                </Avatar>
              }
              title={record.full_name}
              description={record.email}
            />
          </List.Item>
        );
      },
    },

    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "",
      key: "icons",
      render: (record: IContact) => {
        return (
          <Icons>
            <Col>
              <Tooltip placement="top" title={"Edit"}>
                <Edit onClick={() => history.push("/contact/edit", record)} />
              </Tooltip>
            </Col>
            <Col>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => OnDelete(record._id, userId)}
              >
                <Delete />
              </Popconfirm>
            </Col>
          </Icons>
        );
      },
    },
  ];

  return (
    <div>
      <TopHeader
        title="All Contacts"
        save="Add Contact"
        onSave={() => history.push("/contact/add")}
      />

      <StyledCard>
        <TableWrapper>
          <CTable
            dataSource={data && data}
            columns={columns}
            loading={isLoading}
            size="small"
            rowKey="Id"
          />
        </TableWrapper>
      </StyledCard>
    </div>
  );
};

export default Contacts;
