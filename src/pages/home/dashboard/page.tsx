import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api, endpoints } from "../../../services/api";
import { Button, Layout, Table, Upload, Radio, TableColumnsType } from "antd";
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
  // {
  //   title: 'Tipo',
  //   dataIndex: 'mime_type',
  //   key: 'mime_type',
  //   render: (text) => {
  //     if (text.includes('image')) {
  //       return <PictureOutlined />;
  //     } else if (text.includes('video')) {
  //       return <VideoCameraOutlined />;
  //     } else {
  //       return <FileOutlined />;
  //     }
  //   },
  // },
  // {
  //   title: 'Descrição',
  //   dataIndex: 'description',
  //   key: 'description',
  //   render: (text) => <p>{text}</p>,
  // },
  // {
  //   title: 'Tags',
  //   dataIndex: 'tags',
  //   key: 'tags',
  //   render: (text) => <p>{text.join(', ')}</p>,
  // },
  // {
  //   title: 'Processado',
  //   dataIndex: 'processed',
  //   key: 'processed',
  //   render: (text) => <p>{text ? 'Sim' : 'Não'}</p>,
  // },
];

const DashboardPage = () => {
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
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const handleTableChange = (pagination: any) => {
    console.log(pagination);
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  if (loadingFiles) {
    return <p>Carregando...</p>;
  }

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
            <Upload disabled>
              <Button type="primary" icon={<UploadOutlined />} disabled>
                Enviar arquivo
              </Button>
            </Upload>
          </div>
          <Table
            dataSource={files.results ?? []}
            columns={columns}
            onChange={handleTableChange}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: files.count,
            }}
          />
        </Content>
      </RootLayout>
    </div>
  );
};

export default DashboardPage;
