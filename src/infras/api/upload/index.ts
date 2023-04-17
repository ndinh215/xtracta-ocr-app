import Axios from 'Axios';
import { API_URL_UPLOAD_FILE, API_URL_GET_FILE } from './urls';

export default class UploadService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.VITE_BASE_API_URL || '';
  }

  uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return Axios({
      url: `${this.baseUrl}/${API_URL_UPLOAD_FILE}`,
      method: 'POST',
      data: formData,
    }).then((response) => {
      const imageName = response.data?.image_name;
      return { imageName };
    });
  };

  getImageUrl(imageName: string) {
    if (!imageName) {
      return null;
    }
    return `${this.baseUrl}/${API_URL_GET_FILE}/${imageName}`;
  }
}
