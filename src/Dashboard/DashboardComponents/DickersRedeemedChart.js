import React, { useState } from "react";
import ResizableBox from "./ResizableBoxSmall";
import { Col, Container, Row, Button, Table } from "reactstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import subcategories from "./SampleData/subcategory.json";

const DickersRedeemedChart = ({
  acceptedOffersData: newData,
  filterStartDate,
  filterEndDate,
}) => {
  const prepCategories = (arr) => {
    arr.forEach((cat) => {
      cat.SubCategoryTotal = 0;
    });
    return arr;
  };
  prepCategories(subcategories);

  // Filter Accepted Offer Data into YTD Offers
  const filterData = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;

    let categories = JSON.parse(JSON.stringify(subcategories));

    try {

      let startFilter = new Date(filterStartDate);
      let endFilter = new Date(filterEndDate);
      let offers = newData.filter((offer) => {
        let offerDate = new Date(offer.Created);
        return offerDate > startFilter && offerDate <= endFilter;
      });

      offers.forEach((obj) => {
        totalDickersWon++;
        if (obj.IsRedeemed) {
          totalRedeemedDickers++;
          categories.forEach((cat) => {
            if (cat.SubCategoryId === obj.SubCategory_FK) {
              cat.SubCategoryTotal += 1;
            }
          });
        }
      });
    } catch (err) {}

    return [totalRedeemedDickers, totalDickersWon, categories];
  };

  // Output Filtered YTD Data
  const data = filterData();

  const [drilldown, setDrilldown] = useState(false);
  const handleDrilldown = () => {
    setDrilldown(!drilldown);
  };

  // console.log(displayData, displayData.deals);

  return newData === undefined ? (
    <div>Filtering Chart Data... </div>
  ) : (
    <Container>
      <Row>
        <ResizableBox>
          <Col lg={0}>
            <p>
              <strong>Redeemed Total: </strong>
            </p>
            <p>{data[0]}</p>
          </Col>
          <Col>
            <p>
              <strong>Redeemed % of Won: </strong>
            </p>
            <p>
              {isNaN(Math.round((data[0] / data[1]) * 100))
                ? "No Data"
                : Math.round((data[0] / data[1]) * 100) + "%"}
            </p>
          </Col>
        </ResizableBox>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleDrilldown} color={"warning"}>
            Drilldown
          </Button>
          {drilldown && (
            <Row>
              <h5>SubCategory Count</h5>
              <Table>
                <TableHead>
                  <TableRow>
                    {data[2].map((cat) => (
                      <TableCell>{cat.SubCategoryName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {data[2].map((cat) => (
                      <TableCell>{cat.SubCategoryTotal}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DickersRedeemedChart;
