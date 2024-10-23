import { useState, useEffect } from "react";
import axios from "axios";

interface IUseFetchData {
  url: string;
  method?: "get" | "post" | "put" | "delete";
  payload?: any;
  headers?: Record<string, string>;
}

function useFetchData({ url, method = "get", payload = null }: IUseFetchData) {
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const options = {
          method: method,
          url: url,
          data: payload,
        };
        const result = await axios(options);
        setResponseData(result.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, method, payload]);

  return [responseData, isLoading, error];
}

export default useFetchData;
