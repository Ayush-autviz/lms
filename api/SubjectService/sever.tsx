import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { baseUrl, KEYS } from "../../utils";
import { Storage } from "../../utils/LocalStorage";

const server = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

server.interceptors.request.use(
  async function (config) {
    config.headers = config.headers ?? {};

    const accessToken = await Storage.getItem(KEYS.ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer  ${accessToken}`;
    }
    return config;

  },
  function (error) {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(function (response) {
  return response;
});

interface axiosBaseQueryParams {
  endPoint: string;
  method: AxiosRequestConfig["method"];
}
interface response {
  data: any | null;
  status: number;
}

const getData = async (
  endPoint: string,
  id?: number
): Promise<response | any> => {
  try {
    console.log('hi');
    const result = await server.get(endPoint, { params: { id } });
    console.log(result?.data?.result,"result")
    return { data: result?.data?.result, status: result?.status } as response;


    
  } catch (axiosError) {
    let err = axiosError as AxiosError;
    console.log(err);
    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
};

const deleteData = async (endPoint: string, id?: number): Promise<any> => {
  try {
    const result = await server.delete(endPoint, { params: { id } });
    console.log("apiHitSuceesFull", endPoint);
    return { data: result.data.result, status: result.status };
  } catch (axiosError) {
    console.log("error", endPoint, axiosError);
    let err = axiosError as AxiosError;
    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
};
const putData = (endPoint: string, data: any) => {
  try {
    console.log("data", data);
    const result = server.put(endPoint, data);
    return result;
  } catch (axiosError) {
    console.log("error", endPoint, axiosError);
    let err = axiosError as AxiosError;
    console.log("userAswerAPi Failed");
  }
};

export { getData, deleteData, putData };
