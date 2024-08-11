import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, endpoints } from "../../../services/api";
import {
  Button,
  Layout,
  Table,
  Radio,
  TableColumnsType,
  message,
  Progress,
  Modal,
} from "antd";
import RootLayout from "../../../components/layout/root";
import {
  UploadOutlined,
  LoadingOutlined,
  SoundOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./style.module.css";
import Search from "antd/es/input/Search";
import { FileForm } from "../../../components/form/file/fileForm";
import { IFile } from "../../../types/IFiles";
import { FileInfo } from "../../../components/form/file/fileInfo";
const { Content } = Layout;



const DashboardPage = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [percentCompleted, setPercentCompleted] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<number>();
  const [fileToEdit, setFileToEdit] = useState<IFile>();
  const [fileSelected, setFileSelected] = useState<IFile>();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await api.get(endpoints.user);
      return response.data;
    },
  });

  const { data: files } = useQuery({
    queryKey: ["files", currentPage, pageSize],
    queryFn: async () => {
      const response = await api.get(
        `${endpoints.files}?page=${currentPage}&page_size=${pageSize}`
      );
      return response.data;
    },
  });

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const deleteFile = async (id: number) => {
    try {
      await api.delete(`${endpoints.files}${id}/`);
      queryClient.invalidateQueries({ queryKey: ["files"] });
      message.success("Arquivo deletado com sucesso!");
    } catch (error) {
      message.error("Falha ao deletar arquivo");
    }
  };

  const editFile = async (id: number, values: any) => {
    try {
      await api.patch(`${endpoints.files}${id}/`, values);
      queryClient.invalidateQueries({ queryKey: ["files"] });
    } catch (error) {
      message.error("Falha ao editar arquivo");
    }
  };

  const mutation = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(endpoints.files, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setPercentCompleted(percentCompleted);
        },
      });
      return response.data;
    },
    onSuccess: () => {
      setPercentCompleted(100);
      queryClient.invalidateQueries({ queryKey: ["files"] });
      message.success("Arquivo enviado com sucesso!");
    },
  });

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      mutation.mutate(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteClick = (id: number) => {
    setFileToDelete(id);
    setConfirmDeleteModal(true);
  };

  const handleOk = () => {
    if (fileToDelete !== null) {
      deleteFile(fileToDelete as number);
    }
    setConfirmDeleteModal(false);
  };

  const handleCancel = () => {
    setConfirmDeleteModal(false);
    setFileToDelete(undefined);
  };

  const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} Bytes`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (sizeInBytes < 1024 * 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024 * 1024 * 1024)).toFixed(2)} TB`;
    }
  };

  const columns: TableColumnsType<IFile> = [
    {
      title: "Pre-visualização",
      dataIndex: "url",
      key: "url",
      width: "15%",
      render: (_text, record) => {
        if (!record.processed) {
          return (
            <div className={styles.centerIcon}>
              <LoadingOutlined style={{ fontSize: "25px" }} />
            </div>
          );
        }
        if (
          record.mime_type.includes("image") ||
          record.mime_type.includes("video")
        ) {
          return (
            <div className={styles.centerIcon}>
              <img
                src={record.thumbnail_url}
                alt={record.name}
                style={{ width: "100px" }}
              />
            </div>
          );
        } else if (record.mime_type.includes("audio")) {
          return (
            <div className={styles.centerIcon}>
              <SoundOutlined style={{ fontSize: "25px" }} />
            </div>
          );
        }
        return null;
      },
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: "25%",
      render: (text, record) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Tamanho",
      dataIndex: "size",
      key: "size",
      render: (text) => {
        const size = Number(text);
        return <p>{formatFileSize(size)}</p>;
      },
    },
    {
      title: "Data de Upload",
      dataIndex: "upload_date",
      key: "upload_date",
      render: (text) => <p>{text.split("T")[0]}</p>,
    },
    {
      title: "Ações",
      key: "actions",
      width: "15%",
      render: (record) => (
        <div>
          <Button
            type="link"
            size="small"
            style={{ color: "black" }}
            onClick={() => {
              setFileSelected(record);
              setViewModalVisible(true);
            }}
          >
            {/* Visualizar */}
            <EyeOutlined />
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => handleEditClick(record.id)}
          >
            <EditOutlined />
          </Button>
          <Button
            type="link"
            size="small"
            style={{ color: "red" }}
            onClick={() => handleDeleteClick(record.id)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const handleOkEdit = async (values: any) => {
    if (fileToEdit) {
      try {
        await editFile(fileToEdit.id, values);
        message.success("Arquivo editado com sucesso!");
        setEditModalVisible(false);
        queryClient.invalidateQueries({ queryKey: ["files"] }); // Recarrega os arquivos
      } catch (error) {
        message.error("Falha ao editar arquivo");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setFileToEdit(undefined);
  };

  const handleEditClick = (id: number) => {
    setFileToEdit(
      files?.results.find((file: { id: number }) => file.id === id)
    );
    setEditModalVisible(true);
  };

  return (
    <div>
      <Modal
        title="Confirmação de exclusão"
        open={confirmDeleteModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Deletar"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir o arquivo?</p>
      </Modal>
      <Modal
        title={`Editar ${fileToEdit?.name}`}
        open={editModalVisible}
        onCancel={handleCancelEdit}
        footer={null} // Removendo o footer padrão para usar o submit do form
      >
        <FileForm
          onSubmit={handleOkEdit}
          initialValues={
            fileToEdit
              ? { description: fileToEdit.description, tags: fileToEdit.tags }
              : {}
          }
        />
      </Modal>
      <Modal
        title="Visualização"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
      >
        {fileSelected?.mime_type.includes("image") && (
          <img
            src={fileSelected?.url}
            alt={fileSelected?.name}
            style={{ width: "100%" }}
          />
        )}
        {fileSelected?.mime_type.includes("video") && (
          <video src={fileSelected?.url} controls style={{ width: "100%" }} />
        )}
        {fileSelected?.mime_type.includes("audio") && (
          <audio src={fileSelected?.url} controls />
        )}
        <FileInfo file={fileSelected as IFile} />
      </Modal>
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
              {percentCompleted > 0 && (
                <Progress
                  percent={percentCompleted}
                  size="small"
                  status={percentCompleted < 100 ? "active" : "success"}
                />
              )}

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
