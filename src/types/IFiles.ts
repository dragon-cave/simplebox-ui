interface IFile {
  id: number;
  name: string;
  size: number;
  upload_date: string;
  mime_type: string;
  description: string;
  tags: string[];
  processed: boolean;
  url: string;
  thumbnail_url: string;
  resolution: string;
  duration: number;
  frame_rate: number;
  video_codec: string;
  audio_codec: string;
  width: number;
  height: number;
}

export type { IFile };
