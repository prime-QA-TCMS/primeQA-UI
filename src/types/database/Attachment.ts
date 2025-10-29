export interface Attachment {
  _id?: string;
  fileName: string;
  fileType: string;
  size: number;
  uploadedBy?: string;
  uploadedAt?: string;
  url: string;
}
