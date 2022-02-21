import React, { useState, useEffect } from 'react';
import ResizableBox from './ResizableBoxSmall';
import { ButtonDropdown, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';

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

const SuccessfulDickersChart = () => {
  const [newData, isLoading] = useGetData();
  const today = new Date();

  // Test function to check if data has loaded.
  const checkOffers = () => {
    newData.forEach((obj) => {
      console.log(obj);
      for(let key in obj) {
          let value = obj[key]
          console.log(key + ': ' + value);
      }
    });
    console.log('checking offers from successful chart');
  }

  // Filter Accepted Offer Data into YTD Offers
  const filterDataYTD = () => {
    let totalDickers = 0;
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 365);
    
    console.log(newData);
    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
          if (
            pastDate <= offerDate
          ) {
            totalDickers++;
          }
      });  
      console.log(newData);
    } catch (err) {
      console.log('err loading data');
    }
    
    return totalDickers;
  };

  // Output Filtered YTD Data
  const YTD = filterDataYTD();

  // Filter Accepted Offer Data into YTD Offers
  const filterDataMonth = () => {
    let totalDickers = 0;
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 31);

    try {
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (
          pastDate <= offerDate
        ) {
          totalDickers++;
        }
      });
    } catch (err) {
      console.log('err loading data');
    }
    

    return totalDickers;
  };

  // Output Filtered Month Data
  const monthOffers = filterDataMonth();

  // Filter Accepted Offer Data into Weekly Offers
  const filterDataWeek = () => {
    let totalDickers = 0;
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 7);

    try {
      newData.forEach((obj) => {
      const offerDate = new Date(obj.Created);
      console.log('offerdate: ' + offerDate + ' pastdate: ' + pastDate)
      if (
        pastDate <= offerDate
      ) {
        totalDickers++;
      }
    });
    } catch (err) {
      console.log('err loading data');
    }

    return totalDickers;
  };

  // Output Filtered Weekly Data
  const weeklyOffers = filterDataWeek();

  // Filter Accepted Offer Data into Todays Offers
  const filterDataToday = () => {
    let totalDickers = 0;

    try {
      newData.forEach((element) => {
        const offerDate = new Date(element.Created);
        if (today.getDate() === offerDate.getDate()) {
          totalDickers++;
        }
      });
    } catch (err) {
      console.log('err loading data');
    }


    return totalDickers;
  };

  // Output Filtered Today Data
  const todayOffers = filterDataToday();

  // Load Filtered data into output object
  let chartData = [
    {
      label: 'Dickers',
      datum: [
        {
          timeframe: 'YTD',
          deals: YTD,
        },
        {
          timeframe: 'Past Month',
          deals: monthOffers,
        },
        {
          timeframe: 'This Week',
          deals: weeklyOffers,
        },
        {
          timeframe: 'Today',
          deals: todayOffers,
        },
      ],
    },
  ];

  // Filter dropdown box logic
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [currentDataTimeFrame, setCurrentDataTimeFrame] = useState(chartData[0].datum[0].timeframe); // chartData[0].datum[0];
  const [currentDataDeals, setCurrentDataDeals] = useState(chartData[0].datum[0].deals);
  const handleClick = (e, currentData) => {
    let id = e.target.id;
    console.log(id);
    if (id === 'ytd') {
      setCurrentDataTimeFrame((prevState) => chartData[0].datum[0].timeframe);
      setCurrentDataDeals((prevState) => chartData[0].datum[0].deals);
    }
    if (id === 'month') {
      setCurrentDataTimeFrame((prevState) => chartData[0].datum[1].timeframe);
      setCurrentDataDeals((prevState) => chartData[0].datum[1].deals);
    }
    if (id === 'week') {
      setCurrentDataTimeFrame((prevState) => chartData[0].datum[2].timeframe);
      setCurrentDataDeals((prevState) => chartData[0].datum[2].deals);
    }
    if (id === 'today') {
      setCurrentDataTimeFrame((prevState) => chartData[0].datum[3].timeframe);
      setCurrentDataDeals((prevState) => chartData[0].datum[3].deals);
    }
  };
  
  if (isLoading) 
    return <div>Loading Chart Data...</div>
  return newData === undefined ? <div>Filtering Chart Data... </div> : (
    <Container>
      <Row>
        <ResizableBox>
          <Row>
            <Col>
              <h5>Successful DICKERs</h5>
            </Col>
            <Col> </Col>
          </Row>
          <Row fluid>
            <Col lg={0}>
              <h5>{currentDataTimeFrame}</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={4}> </Col>
            <Col lg={0}>
              <h1>{currentDataDeals}</h1>
            </Col>
            <Col xs={4}> </Col>
          </Row>
        </ResizableBox>
      </Row>
      <Row>
        <Col>{/*<button onClick={checkOffers}>click me</button>*/}</Col>
        <Col> </Col>
        <Col>
          <ButtonDropdown isOpen={dropdownOpen} onClick={toggle} id={'successDropdown'}>
            <DropdownToggle caret>Filter Timeline</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select Date Filter</DropdownItem>
              <DropdownItem onClick={handleClick} id={'ytd'} value={chartData[0].datum[0]}>
                YTD
              </DropdownItem>
              <DropdownItem onClick={handleClick} id={'month'} value={chartData[0].datum[1]}>
                This Month
              </DropdownItem>
              <DropdownItem onClick={handleClick} id={'week'} value={chartData[0].datum[2]}>
                This Week
              </DropdownItem>
              <DropdownItem onClick={handleClick} id={'today'} value={chartData[0].datum[3]}>
                Today
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessfulDickersChart;
