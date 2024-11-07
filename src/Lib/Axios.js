import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6969/",
});

export const axiosBaseQuery =
  () =>
  async ({ url, method, data }) => {
    try {
      const response = await api({ url, method, data });
      return { data: response.data };
    } catch (error) {
      console.error(error);
      return { message: error.response?.data?.message || error.message };
    }
  };
