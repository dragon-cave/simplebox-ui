import { useRef, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { api, endpoints } from "../../../services/api";
import {
  Button,
  Layout,
  Table,
  Radio,
  TableColumnsType,
  message,
  Progress,
  Flex,
} from "antd";
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

type DataType = {
  key: string;
  name: string;
  size: string;
  upload_date: string;
  type: string;
};

const columns: TableColumnsType<DataType> = [
  {
    title: "Nome do arquivo",
    dataIndex: "name",
    key: "name",
    className: "column-name",
    render: (
      text:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | null
        | undefined,
      record: { type: string }
    ) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {record.type === "image" && (
          <PictureOutlined style={{ color: "red", fontSize: "20px" }} />
        )}
        {record.type === "video" && (
          <VideoCameraOutlined style={{ color: "blue", fontSize: "20px" }} />
        )}
        {record.type === "audio" && (
          <FileOutlined style={{ color: "green", fontSize: "20px" }} />
        )}
        <span style={{ marginLeft: "18px" }}>{text}</span>
      </div>
    ),
  },
  {
    title: "Tamanho",
    dataIndex: "size",
    key: "size",
    className: "column-hide",
    hidden: true,
  },
  {
    title: "Data de envio",
    dataIndex: "upload_date",
    key: "upload_date",
    className: "column-hide",
    hidden: true,
  },
];

const dataSource = [
  {
    key: "1",
    name: "Paisagem.png",
    size: "1.5 MB",
    upload_date: "2021-09-01",
    type: "image",
  },
  {
    key: "2",
    name: "Festa.mp4",
    size: "2.5 MB",
    upload_date: "2021-09-02",
    type: "video",
  },
  {
    key: "3",
    name: "Musica.mp3",
    size: "3.5 MB",
    upload_date: "2021-09-03",
    type: "audio",
  },
];

const DashboardPage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [percentCompleted, setPercentCompleted] = useState(0);

  const { data } = useQuery(
    ["user"],
    async () => {
      const response = await api.get(endpoints.user);
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

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
          <Table dataSource={dataSource} columns={columns} />
        </Content>
      </RootLayout>
    </div>
  );
};

export default DashboardPage;
