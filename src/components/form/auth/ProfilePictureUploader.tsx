import { useState, useEffect } from "react";
import { Upload, Avatar, Button } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { api, endpoints } from "../../../services/api";

import styles from "./styles/profilePictureUploader.module.css";

import type {
  RcFile,
  UploadRequestOption as RcCustomRequestOptions,
} from "rc-upload/lib/interface";

const ProfilePictureUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState("");

  const getUserProfilePicture = async () => {
    const response = await api.get(endpoints.profilePicture);
    setProfilePictureURL(response.data.url);
  };

  useEffect(() => {
    getUserProfilePicture();
  });

  const handleUpload = async (options: RcCustomRequestOptions) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    formData.append("picture", file as RcFile);
    setUploading(true);

    try {
      const response = await api.post(endpoints.profilePicture, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (onProgress) {
            onProgress({ percent: (event.loaded / event.total) * 100 });
          }
        },
      });

      if (onSuccess) {
        onSuccess(response.data, file);
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      }
    }
    finally {
      setUploading(false);
      getUserProfilePicture();
    }
  };

  return (
    <div className={styles.container}>
      <h1>{"Alterar foto de perfil"}</h1>
      <div className={styles.pictureAndButton}>
        <Avatar size={128} src={profilePictureURL} />
        <Upload customRequest={handleUpload} showUploadList={false}>
          <Button loading={uploading} icon={<UploadOutlined />}>Trocar foto de perfil</Button>
        </Upload>
      </div>
    </div>
  );
};

export default ProfilePictureUploader;
