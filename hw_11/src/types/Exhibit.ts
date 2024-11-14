import { User } from "./User";

export interface Exhibit {
  id: number;
  description: string;
  imageUrl: string;
  commentCount: number;
  user: User;
}

export interface CreateExhibitData {
  image: File;
  description: string;
}

export interface GetExhibitsResponse {
  data: Exhibit[];
  lastPage: number;
  page: number;
  total: number;
}
