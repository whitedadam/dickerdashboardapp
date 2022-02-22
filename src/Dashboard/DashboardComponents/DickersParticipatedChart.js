import React, { useState, useEffect } from "react";
import { Chart } from "react-charts";
import { Spinner } from "reactstrap";
import ResizableBox from "./ResizableBox";
import DickersParticipatedSampleData from './DickersParticipatedSampleData';
// import acceptedOffers from '../../acceptedOffer-data'
import testData from './sample-response.json'

const getData = async () => {
  const url = "/offers";
  let headers = new Headers({
    "Content-Type": "application/json",
  });
  const resp = await fetch(url, {
    headers,
  });

  console.log('getData', resp)

  const data = await resp.json();

  return data;
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

// const foo = [{label: 'Test', data: [{primary: 'primary', secondary: 1},{primary: 'foo', secondary: 2},{primary: 'bar', secondary: 3}]}]
const foo = [{label: 'Test', data: testData}]

const SampleChart = () => {
  const [data, isLoading] = useGetData();

  const { data: oldData } = DickersParticipatedSampleData({
      series: 3,
      dataType: "ordinal",
  });

  console.log(data, JSON.stringify(oldData))

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => String(datum.OfferId),
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.QuantityRemaining,
      },
    ],
    []
  );

  return (
    <ResizableBox>
      <h5>DICKERs Participated In</h5>
      {/* {isLoading || !data ? (
        <Spinner color="success" />
      ) : (
        <Chart
          options={{
            data: foo,
            primaryAxis,
            secondaryAxes,
          }}
        />
      )} */}
      <Chart
          options={{
            data: foo,
            primaryAxis,
            secondaryAxes,
          }}
        />
    </ResizableBox>
  );
};

export default SampleChart;
