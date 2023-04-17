import UploadService from '$infras/api/upload';
import { useMutation } from '@tanstack/react-query';

export const useUploadFile = () => {
  const uploadService = new UploadService();
  const mutation = useMutation({
    mutationFn: uploadService.uploadFile,
  });

  return { ...mutation, upload: mutation.mutate };
};
