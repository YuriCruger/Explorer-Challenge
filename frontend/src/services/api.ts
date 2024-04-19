import axios from "axios";

export interface AxiosError extends Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const api = axios.create({
  baseURL: "https://explorer-challenge.onrender.com",
});
