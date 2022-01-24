import React, { useState } from "react";

import ImgCrop from "antd-img-crop";
import styled from "@emotion/styled";
import { message, Upload } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

import { getBase64 } from "../../utils/getbase64";

const UploadPic = styled(Upload)`
  .ant-upload {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border: 1px solid #ffffff;
    box-shadow: inset 0px 0px 19px #2c2e320d;
    background: white;
  }
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
`;

type uploadProfileProps = {
  imageurl: string;
  setImageurl: React.Dispatch<React.SetStateAction<string>>;
};

const UploadProfile = (props: uploadProfileProps) => {
  const { imageurl, setImageurl } = props;

  const [loading, setLoading] = useState(false);

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must smaller than 10MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setLoading(false);
        setImageurl(imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <ImgCrop rotate>
      <UploadPic
        name="image"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://api.imgbb.com/1/upload?key=72b1c75bddb96cc8976a573ab7c23ee5"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageurl ? <ProfilePic src={imageurl} alt="avatar" /> : uploadButton}
      </UploadPic>
    </ImgCrop>
  );
};

export default UploadProfile;
