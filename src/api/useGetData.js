import {useState, useEffect} from 'react'
import {getData} from './getData'

export const useGetData = (url) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMyData = async () => {
      setIsLoading(true);
      const resp = await getData(url);
      setData(resp);
      setIsLoading(false);
    };

    getMyData();
  }, [url]);

  return [data, isLoading];
};