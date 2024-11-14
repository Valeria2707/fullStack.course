import { CreateExhibitData, GetExhibitsResponse } from "../types/Exhibit";
import axiosInstance from "./axiosInstance";

export const getAllExhibitsAPI = async (
  page: number
): Promise<GetExhibitsResponse> => {
  const response = await fetch(
    `http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/api/exhibits?page=${page}&limit=10`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: GetExhibitsResponse = await response.json();
  return data;
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
