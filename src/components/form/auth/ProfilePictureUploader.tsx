import { useState, useEffect, useRef } from "react";
import { Upload, Avatar, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { api, endpoints } from "../../../services/api";
import { useMutation, useQuery, useQueryClient } from "react-query";

import styles from "./styles/profilePictureUploader.module.css";

import type {
  RcFile,
  UploadRequestOption as RcCustomRequestOptions,
} from "rc-upload/lib/interface";

const ProfilePictureUploader = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const { data: pictureURL } = useQuery(
    ["profilePicture"],
    async () => {
      const response = await api.get(endpoints.profilePicture);
      return response.data.url;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 10, // 10 minutos
    }
  );

  const mutation = useMutation(
    async (file: File) => {
      const formData = new FormData();
      formData.append("picture", file);

      const response = await api.post(endpoints.profilePicture, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    },
    {
      onSuccess: (data) => {
        console.log("Mutação bem-sucedida!", data);

        // Atualize o cache da query, se necessário
        queryClient.resetQueries(["profilePicture"]);
      },
    }
  );

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // Chama a mutação para fazer o upload do arquivo
      mutation.mutate(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Dispara o clique no input de arquivo
  };

  return (
    <div className={styles.container}>
      <h1>{"Alterar foto de perfil"}</h1>
      <div className={styles.pictureAndButton}>
        <Avatar size={128} src={pictureURL} />
        <input
          type="file"
          ref={fileInputRef}
          className={styles.fileInput} // Escondendo o input
          onChange={handleFileChange}
        />
        <Button type="primary" onClick={handleButtonClick} icon={<UploadOutlined />}>
          Trocar foto de perfil
        </Button>
      </div>
    </div>
  );
};

export default ProfilePictureUploader;
