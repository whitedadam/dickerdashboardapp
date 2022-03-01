import { React, useEffect, useState } from 'react';

const getData = async () => {
    const url = '/accepted-offers';
    let myHeaders = new Headers({
      'Content-Type': 'application/json'
    });
    const resp = await fetch(url,{
      headers: myHeaders
    })
      .then(resp => resp.json())
      .then((json) => {
    //   console.log('This is data from accepted-offers', json)
      return json;
    });
  
    return resp;
  };
  
const useGetData = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getMyData = async () => {
        setIsLoading(true);
        const resp = await getData();
        setData(resp);
        setIsLoading(false);
        };

        getMyData();
    }, []);

return [data, isLoading];
};

const TestComponent = () => {
    const [data, isLoading] = useGetData();

    const checkData = () => {
        data.forEach((obj) => {
            console.log(obj);
            for(let key in obj) {
                let value = obj[key]
                console.log(key + ': ' + value);
            }
        });
    }

    if (isLoading) return <div>Loading...</div>
    return data ? <div>data loaded<button onClick={checkData}>Check Data?</button></div> : <div>no data..</div>
}

export default TestComponent;