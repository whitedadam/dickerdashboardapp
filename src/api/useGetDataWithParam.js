import { useState, useEffect } from "react";
import { getDataWithParam } from "./getDataWithParam";

export const useGetDataWithParam = (url, param) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMyData = async () => {
      setIsLoading(true);
      const resp = await getDataWithParam(url, param);
      setData(resp);
      setIsLoading(false);
    };

    getMyData();
  }, [url, param]);

  return [data, isLoading];
};
