import api from "./axios";
import { AxiosResponse } from "axios";

interface JoinPayload {
  id: string;
  password: string;
  nickname: string;
}

interface JoinResponse {
  message: string;
  success: boolean;
}

export const join = async (
  payload: JoinPayload
): Promise<AxiosResponse<JoinResponse>> => {
  return api.post<JoinResponse>("/register", payload);
};
