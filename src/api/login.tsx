import api from "./axios";
import { AxiosResponse } from "axios";

interface LoginPayload {
  id: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  userId: string;
  success: boolean;
  avatar: string;
  nickname: string;
}

export const login = async (
  payload: LoginPayload
): Promise<AxiosResponse<LoginResponse>> => {
  return api.post<LoginResponse>("/login", payload);
};
