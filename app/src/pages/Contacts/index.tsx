import Cookies from "js-cookie";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import React, { useEffect, useMemo } from "react";

import {
  Tooltip,
  Card,
  List,
  Avatar,
  Row,
  Col,
  Popconfirm,
  notification,
  Rate,
  Empty,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { IContact } from "../../interfaces";
import { CTable } from "../../components/Custom";
import TopHeader from "../../components/TopHeader";
import {
  deleteContact,
  getAllContacts,
  updateFavouriteContact,
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

const ListItem = styled(List.Item)`
  .ant-list-item-meta-avatar {
    align-self: center;
    .ant-avatar {
      color: rgb(245, 106, 0);
      background-color: rgb(253, 227, 207);
    }
  }
`;

const Contacts = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoading, data } = useAppSelector((state) => state.contacts);

  const userId: any = Cookies.get("userId");

  const filterData: any = useMemo(() => {
    const favouriteData = data
      .filter((item: IContact) => item.favourite === 1)
      .sort();

    const normalData = data
      .filter((item: IContact) => item.favourite === 0)
      .sort();

    return [...favouriteData, ...normalData];
  }, [data]);

  useEffect(() => {
    dispatch(getAllContacts({ params: { user_id: userId } }));
  }, [dispatch, userId]);

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

  const onClickFavorite = (value: number, id: string, userId: string) => {
    const data = {
      user_id: userId,
      contact_id: id,
      favourite: value,
    };

    const favMessage = value ? "added" : "removed";
    dispatch(
      updateFavouriteContact({
        ...data,
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: `Favourite contact ${favMessage} successfully`,
            duration: 2,
          });
          dispatch(getAllContacts({ params: { user_id: userId } }));
        },
      })
    );
  };

  const columns = [
    {
      title: "",
      key: "fav",
      width: 30,
      render: (record: IContact) => {
        return (
          <Rate
            count={1}
            value={record.favourite}
            onChange={(value: number) =>
              onClickFavorite(value, record._id, userId)
            }
          />
        );
      },
    },
    {
      title: "Contacts",
      key: "contacts",
      width: 300,
      render: (record: IContact) => {
        return (
          <ListItem>
            <List.Item.Meta
              avatar={<Avatar src={record.image} />}
              title={record.full_name}
              description={record.email}
            />
          </ListItem>
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

  let locale = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_DEFAULT}
        description="User doesnot have any contact added"
      />
    ),
  };

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
            dataSource={filterData}
            columns={columns}
            loading={isLoading}
            size="small"
            rowKey="Id"
            locale={locale}
          />
        </TableWrapper>
      </StyledCard>
    </div>
  );
};

export default Contacts;
