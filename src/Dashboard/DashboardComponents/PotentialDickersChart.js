import React, { useState } from "react";
import { Chart } from "react-charts";
import ResizableBox from "./ResizableBox";
import { useGetData } from "../../api/useGetData";
import { Container, Row, Col, Spinner, Button, Table } from "reactstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// URL for Offers route
const offersUrl = "/api/offers";
// URL for Subcategories route
const subcategoriesURL = "/api/subcategories";

const PotentialDickersChart = ({
  filterStartDate,
  filterEndDate,
  filteredBusinesses,
}) => {
  const [drilldown, setDrilldown] = useState(false);
  const [offersData, offersDataIsLoading] = useGetData(offersUrl);
  // Pulling subcategory info from backend
  const [subcategories, subcategoriesIsLoading] = useGetData(subcategoriesURL);

  // Function filters out offers that are not from logged in merchants businesses
  const filterOffersByBusiness = () => {
    // final out arr holds all filtered offers
    let finalFilteredBusinessArr = [];
    try {
      // for each business that belongs to the merchant
      filteredBusinesses.forEach((business, index) => {
        // placeholder, wiped after every business search
        let currentBusiness = offersData.filter((offer) => {
          // if offer has business id then we know its one the the merchants businesses
          return offer.Business_FK === business.BusinessId;
        });
        // pushing all found offers to finalFilteredBusiness Arr
        currentBusiness.forEach((offer) => {
          finalFilteredBusinessArr.push(offer);
        });
        // wiping array
        currentBusiness = [];
      });
      return finalFilteredBusinessArr;
    } catch (err) {}
  };
  const offersDataFilteredByBusiness = filterOffersByBusiness();

  //  Function that prepares each subcategory for totals counting.
  //  Grabs each unique SubCategory ID from the offer set
  //  Filters the subcategory records by that set of unique values
  const prepCategories = (arr) => {
    let uniqueSubCatsInOffers = new Set();
    offersDataFilteredByBusiness.forEach((offer) => {
      uniqueSubCatsInOffers.add(offer.SubCategory_FK);
    });
    let filteredSubcategoryArr = arr.filter((subcat) => {
      return uniqueSubCatsInOffers.has(subcat.SubCategoryId);
    });

    filteredSubcategoryArr.forEach((cat) => {
      cat.SubCategoryTotal = 0;
    });
    return filteredSubcategoryArr;
  };

  // Function that builds and outputs the offers to the module chart
  const buildInputData = () => {
    // Holds relevant subcategories of merchant
    let filteredSubCategories;

    // Array of Objects that will hold various datum based upon selected time intervals.
    // Placeholder required to prevent app from crashing
    let inputData2 = [
      {
        label: "Direct DICKERs",
        data: [
          {
            primary: "placeholder",
            secondary: 0,
          },
        ],
      },
      {
        label: "Wildcard DICKERs",
        data: [
          {
            primary: "placeholder",
            secondary: 0,
          },
        ],
      },
      {
        label: "Competing DICKERs",
        data: [
          {
            primary: "placeholder",
            secondary: 0,
          },
        ],
      },
    ];

    // Filtering offer data into correct DICKER type buckets.
    try {
      // Dynamically adding relevant subcategory info into inputData array
      filteredSubCategories = prepCategories(subcategories);
      filteredSubCategories.forEach((cat) => {
        inputData2.forEach((type) => {
          type.data.push({
            primary: cat.SubCategoryName,
            secondary: 0,
          });
        });
      });

      // Removing placeholder datasets from inputData2
      // Placeholders are needed to prevent app crashing on login.
      if (filteredSubCategories.length !== 0) {
        inputData2.forEach((type) => {
          type.data.shift();
        });
      }

      // Filtering offer data by start/end date filter
      let startFilter = new Date(filterStartDate);
      let endFilter = new Date(filterEndDate);
      let offers = offersDataFilteredByBusiness.filter((offer) => {
        let offerDate = new Date(offer.StartingDate);
        return offerDate > startFilter && offerDate <= endFilter;
      });

      // Filtering each offer by subcategory
      // Need to ask client if Potential Dicker is (offer.InitialQuantity - offer.QuantityRemaining) or just Quantity Remaining or just Initial Quantity
      offers.forEach((offer) => {
        // forEach subcategory relevant to this merchant
        filteredSubCategories.forEach((cat, catIndex) => {
          // If offer is a direct dicker adding to that buckets total
          if (offer.DirectDICKER) {
            if (offer.SubCategory_FK === cat.SubCategoryId) {
              inputData2[0].data[catIndex].secondary +=
                offer.InitialQuantity;
            }
          }
          // If offer is a Wildcard dicker adding to that buckets total
          if (offer.Wildcard) {
            if (offer.SubCategory_FK === cat.SubCategoryId) {
              inputData2[1].data[catIndex].secondary +=
                offer.InitialQuantity;
            }
          }
          // If offer is a Competing dicker adding to that buckets total
          if (offer.InGrid) {
            if (offer.SubCategory_FK === cat.SubCategoryId) {
              inputData2[2].data[catIndex].secondary +=
                offer.InitialQuantity;
            }
          }
        });
      });
    } catch (err) {}

    return inputData2;
  };
  const displayData = buildInputData();

  // Calculating totals for all data within drilldown table
  const dataTotals = () => {
    // Variables to hold all DICKER datatypes and data
    const directDickers = displayData[0].data;
    const wildcardDickers = displayData[1].data;
    const selectedDickers = displayData[2].data;

    // Gathering all of the available DICKER type data into one place
    let totalDirect = 0;
    let totalWildcard = 0;
    let totalCompeting = 0;
    let dickerTypeTotalsArrOut = [];

    // Gathering totals of all individual DICKER types
    const countOfferTotals = (arr, total, out) => {
      arr.forEach((obj) => {
        total += obj.secondary;
      });
      out.push({ total });
      return total;
    };
    totalDirect = countOfferTotals(
      directDickers,
      totalDirect,
      dickerTypeTotalsArrOut
    );
    totalWildcard = countOfferTotals(
      wildcardDickers,
      totalWildcard,
      dickerTypeTotalsArrOut
    );
    totalCompeting = countOfferTotals(
      selectedDickers,
      totalCompeting,
      dickerTypeTotalsArrOut
    );

    // Gathering total count of all Potential DICKERs
    let totalPotentialDickers = 0;
    dickerTypeTotalsArrOut.forEach((total) => {
      totalPotentialDickers += total.total;
    });

    // Calculating percentages of each specific DICKER data type
    let percentageDirect;
    let percentageWildcard;
    let percentageSelected;
    let dickerTypePercentagesArrOut = [];

    // Calculates percentages of each dicker type compared to total potential dickers
    const calcOfferPercentages = (dickers, total, percentage, out) => {
      percentage = ((dickers / total) * 100).toFixed();
      out.push({ percentage });
    };
    calcOfferPercentages(
      totalDirect,
      totalPotentialDickers,
      percentageDirect,
      dickerTypePercentagesArrOut
    );
    calcOfferPercentages(
      totalWildcard,
      totalPotentialDickers,
      percentageWildcard,
      dickerTypePercentagesArrOut
    );
    calcOfferPercentages(
      totalCompeting,
      totalPotentialDickers,
      percentageSelected,
      dickerTypePercentagesArrOut
    );

    // Gathering specific data on which subcategories were most/least active
    let catsObj = {
      "Casual Dining": 0,
      "Fast Food": 0,
      "Restaurants General": 0,
      Specialty: 0,
      Hotels: 0,
      "Air Fare": 0,
      "Automotive General": 0,
    };

    // counting the totals of each subcategories
    const countCatTotals = (obj) => {
      for (let cat in obj) {
        try {
          offersDataFilteredByBusiness.forEach((row) => {
            if (row[cat] === true) obj[cat] += 1;
          });
        } catch (err) {}
      }
      return obj;
    };
    countCatTotals(catsObj);

    // finds and returns the most active subcategory
    const findMostActiveCat = (obj) => {
      let mostActive = Object.keys(obj)[0];
      let num = obj["Casual Dining"];
      for (let cat in obj) {
        if (obj[cat] > num) {
          num = obj[cat];
          mostActive = cat;
        }
      }
      return mostActive;
    };
    const mostActive = findMostActiveCat(catsObj);

    // finds and returns the least active subcategory
    const findLeastActiveCat = (obj) => {
      let leastActive = Object.keys(obj)[0];
      let num = obj["Casual Dining"];
      for (let cat in obj) {
        if (obj[cat] < num) {
          num = obj[cat];
          leastActive = cat;
        }
      }
      return leastActive;
    };
    const leastActive = findLeastActiveCat(catsObj);

    // Returning all filtered data
    return [
      totalPotentialDickers, // drilldownData[0]
      dickerTypeTotalsArrOut, // drilldownData[1]
      dickerTypePercentagesArrOut, // drilldownData[2]
      mostActive, // drilldownData[3]
      leastActive, // drilldownData[4]
    ];
  };

  // Calling Data Totals for the Drilldown Table Data
  const drilldownData = dataTotals();

  // Allows users to toggle display of drilldown table.
  const handleDrilldown = () => {
    setDrilldown(!drilldown);
  };

  // Primary Axis of Displayed Graph (X)
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  // Secondary Axis of display graph (Y)
  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  if (offersDataIsLoading || subcategoriesIsLoading || !filteredBusinesses)
    return (
      <Container>
        <Col>
          <Row></Row>
          <Row>
            <Spinner color={"warning"}></Spinner>Loading chart data...
          </Row>
          <Row></Row>
        </Col>
      </Container>
    );

  return (
    <Container>
      {/* Row that holds Chart */}
      <Row>
        <ResizableBox>
          <Chart
            options={{
              data: displayData,
              elementType: "line",
              primaryAxis,
              secondaryAxes,
            }}
          />
        </ResizableBox>
      </Row>
      {/* Drilldown Button Row */}
      <Row>
        <Col>
          <Button onClick={handleDrilldown} color="warning">
            Drilldown
          </Button>
        </Col>
      </Row>
      {drilldown && (
        <Row>
          <h5>Potential DICKER Totals</h5>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total Potential DICKERs</TableCell>
                <TableCell>Most Active SubCategory</TableCell>
                <TableCell>Least Active SubCategory</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {/* Total Potential DICKERs */}
                <TableCell>{drilldownData[0]}</TableCell>
                {/* Most Active Subcat */}
                <TableCell>{drilldownData[3]}</TableCell>
                {/* Least Active Subcat */}
                <TableCell>{drilldownData[4]}</TableCell>
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>Competing DICKER Count</TableCell>
                <TableCell>Competing DICKER %</TableCell>
                <TableCell>Wildcard DICKERs Count</TableCell>
                <TableCell>Wildcard DICKERs %</TableCell>
                <TableCell>Direct DICKERs Count</TableCell>
                <TableCell>Direct DICKERs %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {/* Competing Count */}
                <TableCell>{drilldownData[1][2].total}</TableCell>
                {/* Competing % */}
                <TableCell>
                  {isNaN(drilldownData[2][2].percentage)
                    ? "No Data"
                    : drilldownData[2][2].percentage + "%"}
                </TableCell>
                {/* Wildcard Count */}
                <TableCell>{drilldownData[1][1].total}</TableCell>
                {/* Wildcard % */}
                <TableCell>
                  {isNaN(drilldownData[2][1].percentage)
                    ? "No Data"
                    : drilldownData[2][1].percentage + "%"}
                </TableCell>
                {/* Direct Count */}
                <TableCell>{drilldownData[1][0].total}</TableCell>
                {/* Direct % */}
                <TableCell>
                  {isNaN(drilldownData[2][0].percentage)
                    ? "No Data"
                    : drilldownData[2][0].percentage + "%"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Row>
      )}
    </Container>
  );
};

export default PotentialDickersChart;
