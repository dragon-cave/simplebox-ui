import React from "react";
import { useQuery } from "react-query";
import { api, endpoints } from "../../../services/api";
import { Button, Layout, Table, Upload, Radio } from "antd";
import RootLayout from "../../../components/layout/root";
import {
  PictureOutlined,
  FileOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./style.module.css";
import Search, { SearchProps } from "antd/es/input/Search";

const { Content } = Layout;

const columns = [
  {
    title: "Nome do arquivo",
    dataIndex: "name",
    key: "name",
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
  },
  {
    title: "Data de envio",
    dataIndex: "upload_date",
    key: "upload_date",
  },
];

const dataSource = [
  {
    key: "1",
    name: "Are you there?.png",
    size: "1.5 MB",
    upload_date: "2021-09-01",
    type: "image",
  },
  {
    key: "2",
    name: "No one will ever read this.mp4",
    size: "2.5 MB",
    upload_date: "2021-09-02",
    type: "video",
  },
  {
    key: "3",
    name: "Congratulations! You found me.mp3",
    size: "3.5 MB",
    upload_date: "2021-09-03",
    type: "audio",
  },
];

const DashboardPage = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const { data } = useQuery(
    ["user"],
    async () => {
      const response = await api.get(endpoints.user);
      return response;
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <div>
      <RootLayout>
        <Content
          style={{
            padding: "16px 48px",
          }}
        >
          <h1>Dashboard</h1>
          <p
            style={{
              fontSize: "18px",
            }}
          >
            Bem vindo, {data?.data?.username}!
          </p>
          <Search
            placeholder="Pesquisar no SimpleBox"
            onSearch={onSearch}
            enterButton
            style={{ marginBottom: 8 }}
            disabled
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Radio.Group
              // onChange={handleModeChange}
              value={"all"}
              style={{ marginBottom: 8 }}
              disabled
            >
              <Radio.Button value="all">Todos</Radio.Button>
              <Radio.Button value="photos">Fotos</Radio.Button>
              <Radio.Button value="videos">Vídeos</Radio.Button>
              <Radio.Button value="audios">Áudios</Radio.Button>
            </Radio.Group>
            <Upload disabled>
              <Button disabled type="primary" icon={<UploadOutlined />}>
                Enviar arquivo
              </Button>
            </Upload>
          </div>
          <Table dataSource={dataSource} columns={columns} />;
        </Content>
      </RootLayout>
    </div>
  );
};

export default DashboardPage;
