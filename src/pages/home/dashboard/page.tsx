import { useRef, useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { api, endpoints } from "../../../services/api";
import { Button, Layout, Table, Radio, TableColumnsType, message, Progress } from "antd";
import RootLayout from "../../../components/layout/root";
import {
  PictureOutlined,
  FileOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import styles from "./style.module.css";
import Search from "antd/es/input/Search";

const { Content } = Layout;

interface File {
  id: number;
  name: string;
  size: number;
  upload_date: string;
  mime_type: string;
  description: string;
  tags: string[];
  processed: boolean;
}

const columns: TableColumnsType<File> = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
    // renderizar um icone de acordo com o tipo de arquivo (imagem, video, audio, etc)
    // dar um espaco entre o icone e o nome do arquivo
    render: (text, record) => {
      if (record.mime_type.includes("image")) {
        return (
          <a href={record.name} target="_blank" rel="noreferrer">
            <PictureOutlined />
            <span style={{ marginLeft: '18px' }}>{text}</span>
          </a>
        );
      } else if (record.mime_type.includes("video")) {
        return (
          <a href={record.name} target="_blank" rel="noreferrer">
            <VideoCameraOutlined />
            <span style={{ marginLeft: '18px' }}>{text}</span>
          </a>
        );
      }
      return (
        <a href={record.name} target="_blank" rel="noreferrer">
          <FileOutlined />
          <span style={{ marginLeft: '18px' }}>{text}</span>
        </a>
      );
    },
  },
  {
    title: "Tamanho",
    dataIndex: "size",
    key: "size",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Data de Upload",
    dataIndex: "upload_date",
    key: "upload_date",
    render: (text) => <p>{text.split("T")[0]}</p>,
  },
];

const DashboardPage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data } = useQuery(
    ["user"],
    async () => {
      const response = await api.get(endpoints.user);
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const { data: files, isLoading: loadingFiles } = useQuery(
    ["files", currentPage, pageSize],
    async () => {
      // const response = await api.get(endpoints.files);
      const response = await api.get(
        `${endpoints.files}?page=${currentPage}&page_size=${pageSize}`
      );
      console.log(response.data);
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const handleTableChange = (pagination: any) => {
    console.log(pagination);
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };


  const mutation = useMutation(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(endpoints.files, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // Calcula a porcentagem de upload concluída
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setPercentCompleted(percentCompleted);
          // Você pode atualizar um estado local aqui se quiser exibir o progresso no UI
        },
      });
      console.log(response);
    },
    {
      onSuccess: () => {
        setPercentCompleted(100)
        message.success("Arquivo enviado com sucesso!");
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
    <div>
      <RootLayout>
        <Content className={styles.dashboardContent}>
          <h1>Dashboard</h1>
          <p style={{ fontSize: "18px" }}>Bem vindo, {data?.username}!</p>
          <Search
            placeholder="Pesquisar no SimpleBox"
            onSearch={(value, _e, info) => console.log(info?.source, value)}
            enterButton
            style={{ marginBottom: 8 }}
            disabled
          />
          <div className={styles.flexContainer}>
            <Radio.Group value="all" disabled>
              <Radio.Button value="all">Todos</Radio.Button>
              <Radio.Button value="photos">Fotos</Radio.Button>
              <Radio.Button value="videos">Vídeos</Radio.Button>
              <Radio.Button value="audios">Áudios</Radio.Button>
            </Radio.Group>
            <div className={styles.uploadButtonContainer}>
              {percentCompleted > 0 && <Progress percent={percentCompleted} size="small" status={percentCompleted < 100 ? "active" : "success"} />}
              
              <input
                type="file"
                ref={fileInputRef}
                className={styles.fileInput} // Escondendo o input
                onChange={handleFileChange}
              />
              <Button
                type="primary"
                onClick={handleButtonClick}
                icon={<UploadOutlined />}
              >
                Enviar arquivo
              </Button>
            </div>
          </div>
          <Table
            dataSource={files?.results}
            columns={columns}
            onChange={handleTableChange}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: files?.count,
            }}
            rowKey="id"
          />
        </Content>
      </RootLayout>
    </div>
  );
};

export default DashboardPage;
