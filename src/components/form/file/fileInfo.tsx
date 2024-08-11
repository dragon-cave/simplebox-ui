import { IFile } from "../../../types/IFiles";

interface FileInfoProps {
    file: IFile;
}

const FileInfo = ({ file } : FileInfoProps) => {
    return (
        <div>
            <p>Nome: {file.name}</p>
            <p>Descrição: {file.description}</p>
            <p>Tamanho: {file.size}</p>
            <p>Mime Type: {file.mime_type}</p>
            <p>Tags: {file.tags.join(", ")}</p>
            <p>Processado: {file.processed ? "Sim" : "Não"}</p>
            <p>Data de upload: {file.upload_date}</p>
            <p>Resolução: {file.resolution}</p>
            <p>Duração: {file.duration} s</p>
            <p>Taxa de Quadros: {Math.trunc(file.frame_rate)}</p>
            <p>Video Codec: {file.video_codec}</p>
            <p>Audio Codec: {file.audio_codec}</p>
            <p>Width: {file.width}</p>
            <p>Height: {file.height}</p>
        </div>
    );
}

export { FileInfo };