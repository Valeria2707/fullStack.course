import { CreateExhibitData, GetExhibitsResponse } from "../types/Exhibit";
import axiosInstance from "./axiosInstance";

export const getAllExhibitsAPI = async (
  page: number
): Promise<GetExhibitsResponse> => {
  const response = await axiosInstance.get<GetExhibitsResponse>(
    `/api/exhibits?page=${page}&limit=10`
  );
  return response.data;
};

export const createExhibitAPI = (data: CreateExhibitData) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("description", data.description);
  return axiosInstance.post("/api/exhibits", formData);
};

export const deleteExhibitAPI = async (id: number) => {
  await axiosInstance.delete(`/api/exhibits/${id}`);
  return id;
};
