import React, { useState, useEffect } from "react";
import ResizableBox from "./ResizableBoxSmall";
import {
  ButtonDropdown,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";

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

const DickersRedeemedChart = () => {
  const [newData, isLoading] = useGetData();
  const today = new Date();

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
            obj.IsRedeemed &&
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
          obj.IsRedeemed &&
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
      if (
        obj.IsRedeemed &&
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
      newData.forEach((obj) => {
        const offerDate = new Date(obj.Created);
        if (
          obj.IsRedeemed &&
          today.getDate() === offerDate.getDate()
        ) {
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
  let data = [
    {
      label: "Dickers Redeemed",
      datum: [
        {
          timeframe: "YTD",
          deals: YTD,
        },
        {
          timeframe: "Past Month",
          deals: monthOffers,
        },
        {
          timeframe: "This Week",
          deals: weeklyOffers,
        },
        {
          timeframe: "Today",
          deals: todayOffers,
        },
      ],
    },
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [currentDataTimeFrame, setCurrentDataTimeFrame] = useState(
    data[0].datum[0].timeframe
  ); // data[0].datum[0];
  const [currentDataDeals, setCurrentDataDeals] = useState(
    data[0].datum[0].deals
  );
  const handleClick = (e, currentData) => {
    let id = e.target.id;
    console.log(id);
    if (id === "ytd") {
      setCurrentDataTimeFrame((prevState) => data[0].datum[0].timeframe);
      setCurrentDataDeals((prevState) => data[0].datum[0].deals);
    }
    if (id === "month") {
      setCurrentDataTimeFrame((prevState) => data[0].datum[1].timeframe);
      setCurrentDataDeals((prevState) => data[0].datum[1].deals);
    }
    if (id === "week") {
      setCurrentDataTimeFrame((prevState) => data[0].datum[2].timeframe);
      setCurrentDataDeals((prevState) => data[0].datum[2].deals);
    }
    if (id === "today") {
      setCurrentDataTimeFrame((prevState) => data[0].datum[3].timeframe);
      setCurrentDataDeals((prevState) => data[0].datum[3].deals);
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
              <h5>DICKERs Redeemed</h5>
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
        <Col> </Col>
        <Col> </Col>
        <Col>
          <ButtonDropdown
            isOpen={dropdownOpen}
            onClick={toggle}
            id={"successDropdown"}
          >
            <DropdownToggle caret>Filter Timeline</DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Select Date Filter</DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"ytd"}
                value={data[0].datum[0]}
              >
                YTD
              </DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"month"}
                value={data[0].datum[1]}
              >
                This Month
              </DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"week"}
                value={data[0].datum[2]}
              >
                This Week
              </DropdownItem>
              <DropdownItem
                onClick={handleClick}
                id={"today"}
                value={data[0].datum[3]}
              >
                Today
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default DickersRedeemedChart;
