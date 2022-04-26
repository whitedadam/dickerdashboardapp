import React, { useState } from "react";
import ResizableBox from "./ResizableBoxSmall";
import { Col, Container, Row, Button, Table } from "reactstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const SuccessfulDickersChart = ({
  acceptedOffersData: newData,
  filterStartDate,
  filterEndDate,
}) => {
  const today = new Date();

  // Filter Accepted Offer Data into data Offers
  const filterData = () => {
    // Date variables for filtering
    let pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - 365);

    // Tracking Variables for Chart Data
    let totalAcceptedDickers = 0;
    let totalAcceptedWins = 0;

    // Competing (InGrid) DICKERs
    let totalPotentialDickers = 0;
    let totalPotentialDickersWins = 0;

    // Wildcard DICKERs
    let totalWildcardDickers = 0;
    let totalWildcardWins = 0;

    // Direct DICKERs
    let totalDirectDickers = 0;
    let totalDirectWins = 0;

    // Discount
    let avgDiscount = 0;

    try {
      // This block filters all offers by the user input start and end date.
      let startFilter = new Date(filterStartDate);
      let endFilter = new Date(filterEndDate);
      let offers = newData.filter((offer) => {
        let offerDate = new Date(offer.Created);
        return offerDate > startFilter && offerDate <= endFilter;
      });

      // forEach that parses available offers into Win, InGrid (Competing), Wildcard and Direct categories
      offers.forEach((obj) => {
        // Every offer within this dataset is in the Accepted Offers table.
        // Therefore, every record adds to the total.
        totalAcceptedDickers++;

        // If the accepted offer was a win, we increment the total number of wins.
        // We add this objects discount value to the avgDiscount so that we may divide it later for drilldown.
        if (obj.Win === true) {
          totalAcceptedWins++;
          avgDiscount += obj.Discount;
        }

        // If InGrid is true, then we increment the total potential dickers by 1
        // If win is also true, we increment the number of wins for this particular offer type.
        if (obj.InGrid === true) {
          totalPotentialDickers++;
          if (obj.Win === true) {
            totalPotentialDickersWins++;
          }
        }

        // If Wildcard is true, then we increment the total Wildcard dickers by 1
        // If win is also true, we increment the number of wins for this particular offer type.
        if (obj.Wildcard === true) {
          totalWildcardDickers++;
          if (obj.Win === true) {
            totalWildcardWins++;
          }
        }

        // If DirectDICKER is true, then we increment the total direct dickers by 1
        // If win is also true, we increment the number of wins for this particular offer type.
        if (obj.DirectDICKER === true && obj.Win === true) {
          totalDirectDickers++;
          if (obj.Win === true) {
            totalDirectWins++;
          }
        }
      });
      // Calculating the avgdiscount by dividing it by the number of totalAcceptedWins
      avgDiscount = avgDiscount / totalAcceptedWins;
    } catch (err) {
      // console.log('err loading data');
    }

    return [
      totalAcceptedDickers, // 0
      totalPotentialDickers, // 1
      totalWildcardDickers, // 2
      totalDirectDickers, // 3
      totalAcceptedWins, // 4
      totalPotentialDickersWins, // 5
      totalWildcardWins, // 6
      totalDirectWins, // 7
      avgDiscount, // 8
    ];
  };

  // Output Filtered data Data
  const data = filterData();

  // console.log(displayData, data);
  const [drilldown, setDrilldown] = useState(false);
  const handleDrilldown = () => {
    setDrilldown(!drilldown);
  };

  // If there is no data in newData, then we will return this filtering status message to prevent app crashing.
  return newData === undefined ? (
    <div>Filtering Chart Data... </div>
  ) : (
    <Container>
      <Row>
        <ResizableBox>
          <Col lg={0}>
            <p>
              <strong>Accepted Total: </strong>
            </p>
            <p>{data[0]}</p>
          </Col>
          <Col lg={0}>
            <p>
              <strong>Wildcard Wins: </strong>
            </p>
            <p>{data[2]}</p>
          </Col>
          <Col lg={0}>
            <p>
              <strong>Direct DICKER Wins: </strong>
            </p>
            <p>{data[3]}</p>
          </Col>
        </ResizableBox>
      </Row>
      <Row>
        {/* Button that activates drilldown table display */}
        <Button onClick={handleDrilldown} color={"warning"}>
          Drilldown
        </Button>
        {drilldown && (
          <Row>
            <h5>Accepted Dicker Drilldown</h5>
            <Table>
              <TableHead>
                <TableRow>
                  {/* 137. Changed from InGrid to Competing - Adam */}
                  <TableCell>DICKER Win % While Competing</TableCell>
                  <TableCell>Wildcard DICKER % of Total Wins</TableCell>
                  <TableCell>Direct DICKER Wins % of Total Wins</TableCell>
                  <TableCell>DICKER Win % Avg Discount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {isNaN((data[1] / data[0]) * 100)
                      ? "No Data"
                      : Math.round((data[1] / data[0]) * 100) + "%"}
                  </TableCell>
                  <TableCell>
                    {isNaN((data[5] / data[4]) * 100)
                      ? "No Data"
                      : Math.round((data[5] / data[4]) * 100) + "%"}
                  </TableCell>
                  <TableCell>
                    {isNaN((data[7] / data[4]) * 100)
                      ? "No Data"
                      : Math.round((data[7] / data[4]) * 100) + "%"}
                  </TableCell>
                  <TableCell>
                    {isNaN(Math.round((data[8] / 100) * 100))
                      ? "No Data"
                      : Math.round((data[8] / 100) * 100) + "%"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Row>
        )}
      </Row>
    </Container>
  );
};

export default SuccessfulDickersChart;
