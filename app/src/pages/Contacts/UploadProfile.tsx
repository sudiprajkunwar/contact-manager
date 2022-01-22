import React, { useState } from "react";
import { Button, message, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

const UploadProfile = () => {
  const [fileList, setFileList] = useState();

  const onChange = ({ fileList }: any) => {
    console.log(fileList, "F");
    setFileList(fileList);
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <ImgCrop>
      <Upload
        action={
          "https://www.googleapis.com/upload/drive/v3/files?uploadType=media"
        }
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        showUploadList={false}
      >
        {uploadButton}
      </Upload>
    </ImgCrop>
  );
};

export default UploadProfile;
