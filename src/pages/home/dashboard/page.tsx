import React from 'react';
import { useQuery } from 'react-query';
import { api, endpoints } from '../../../services/api';
import { Button, Layout, Table, Upload, Radio, TableColumnsType } from 'antd';
import RootLayout from '../../../components/layout/root';
import { PictureOutlined, FileOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './style.module.css';
import Search from 'antd/es/input/Search';

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
    title: 'Nome do arquivo',
    dataIndex: 'name',
    key: 'name',
    className: 'column-name', 
    render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, record: { type: string; }) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {record.type === 'image' && <PictureOutlined style={{ color: 'red', fontSize: '20px' }} />}
        {record.type === 'video' && <VideoCameraOutlined style={{ color: 'blue', fontSize: '20px' }} />}
        {record.type === 'audio' && <FileOutlined style={{ color: 'green', fontSize: '20px' }} />}
        <span style={{ marginLeft: '18px' }}>{text}</span>
      </div>
    ),
  },
  {
    title: 'Tamanho',
    dataIndex: 'size',
    key: 'size',
    className: 'column-hide', 
    hidden: true,
  },
  {
    title: 'Data de envio',
    dataIndex: 'upload_date',
    key: 'upload_date',
    className: 'column-hide', 
    hidden: true,
  },
];


const dataSource = [
  {
    key: '1',
    name: 'Paisagem.png',
    size: '1.5 MB',
    upload_date: '2021-09-01',
    type: 'image',
  },
  {
    key: '2',
    name: 'Festa.mp4',
    size: '2.5 MB',
    upload_date: '2021-09-02',
    type: 'video',
  },
  {
    key: '3',
    name: 'Musica.mp3',
    size: '3.5 MB',
    upload_date: '2021-09-03',
    type: 'audio',
  },
];

const DashboardPage = () => {
  const { data } = useQuery(
    ['user'],
    async () => {
      const response = await api.get(endpoints.user);
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div>
      <RootLayout>
        <Content className={styles.dashboardContent}>
          <h1>Dashboard</h1>
          <p style={{ fontSize: '18px' }}>
            Bem vindo, {data?.username}!
          </p>
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
          <Table dataSource={dataSource} columns={columns} />
        </Content>
      </RootLayout>
    </div>
  );
};

export default DashboardPage;