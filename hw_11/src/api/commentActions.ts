import axiosInstance from "./axiosInstance";

export const getCommentsByPostIdAPI = (exhibitId: number) => {
  return axiosInstance.get(`api/exhibits/${exhibitId}/comments`);
};

export const createCommentAPI = (exhibitId: number, text: string) => {
  return axiosInstance.post(`/api/exhibits/${exhibitId}/comments`, {
    text,
  });
};

export const deleteCommentAPI = (exhibitId: number, commentId: number) => {
  return axiosInstance.delete(
    `/api/exhibits/${exhibitId}/comments/${commentId}`
  );
};
