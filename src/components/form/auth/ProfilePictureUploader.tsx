import { useRef } from "react";
import { Avatar, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { api, endpoints } from "../../../services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./styles/profilePictureUploader.module.css";


const ProfilePictureUploader = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const { data: pictureURL } = useQuery({
    queryKey: ["profilePicture"],
    queryFn: async () => {
      const response = await api.get(endpoints.profilePicture);
      return response.data.url;
    },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("picture", file);

      await api.post(endpoints.profilePicture, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["profilePicture"]});
      },

});

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
