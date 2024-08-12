import React, { useState } from "react";
import { IFile } from "../../../types/IFiles";
import { Button, Modal } from "antd";
import { formatFileSize } from "../../../utils/formatSize";

interface FileInfoProps {
    file: IFile;
}

const FileInfo = ({ file }: FileInfoProps) => {
    const [isExifModalVisible, setIsExifModalVisible] = useState(false);

    const showExifModal = () => {
        setIsExifModalVisible(true);
    };

    const handleExifModalOk = () => {
        setIsExifModalVisible(false);
    };

    const handleExifModalCancel = () => {
        setIsExifModalVisible(false);
    };

    return (
        <div>
            {file.name && <p>Nome: {file.name}</p>}
            {file.description && <p>Descrição: {file.description}</p>}
            {file.size && <p>Tamanho: {formatFileSize(file.size)}</p>}
            {file.mime_type && <p>Mime Type: {file.mime_type}</p>}
            {file.tags && file.tags.length > 0 && <p>Tags: {file.tags.join(", ")}</p>}
            {file.genre && <p>Gênero: {file.genre}</p>}
            {file.processed !== null && file.processed !== undefined && (
                <p>Processado: {file.processed ? "Sim" : "Não"}</p>
            )}
            {file.upload_date && <p>Data de upload: {file.upload_date}</p>}
            {file.resolution && <p>Resolução: {file.resolution}</p>}
            {file.duration && <p>Duração: {file.duration} s</p>}
            {file.frame_rate && <p>Taxa de Quadros: {Math.trunc(file.frame_rate)}</p>}
            {file.video_codec && <p>Video Codec: {file.video_codec}</p>}
            {file.audio_codec && <p>Audio Codec: {file.audio_codec}</p>}
            {file.width && <p>Width: {file.width}</p>}
            {file.height && <p>Height: {file.height}</p>}
            {file.sample_rate && <p>Taxa de Amostragem: {file.sample_rate}</p>}
            {file.channels && <p>Canal: {file.channels}</p>}

            {/* Botão para abrir o modal dos dados EXIF */}
            {file.exif_data && Object.keys(file.exif_data).length > 0 && (
                <>
                    <Button type="primary" onClick={showExifModal}>
                        Ver Dados EXIF
                    </Button>

                    <Modal
                        title="Dados EXIF"
                        visible={isExifModalVisible}
                        onOk={handleExifModalOk}
                        onCancel={handleExifModalCancel}
                        footer={[
                            <Button key="ok" type="primary" onClick={handleExifModalOk}>
                                OK
                            </Button>,
                        ]}
                    >
                        {Object.entries(file.exif_data).map(([key, value]) => (
                            <p key={key}>{`${key}: ${value}`}</p>
                        ))}
                    </Modal>
                </>
            )}
        </div>
    );
}

export { FileInfo };
