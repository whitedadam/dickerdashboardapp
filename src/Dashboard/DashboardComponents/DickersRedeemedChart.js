import React, { useState } from "react";
import ResizableBox from "./ResizableBoxSmall";
import { Col, Container, Row, Button, Table, Spinner } from "reactstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useGetData } from "../../api/useGetData";

// URL for Subcategories route
const subcategoriesURL = "/api/subcategories";

const DickersRedeemedChart = ({
  acceptedOffersData: newData,
  filterStartDate,
  filterEndDate,
}) => {
  // Pulling subcategory info from backend
  const [subcategories, subcategoriesIsLoading] = useGetData(subcategoriesURL);

  //  Function that prepares each subcategory for totals counting.
  //  Grabs each unique SubCategory ID from the offer set
  //  Filters the subcategory records by that set of unique values
  const prepCategories = (arr) => {
    let uniqueSubCatsInOffers = new Set();
    newData.forEach((offer) => {
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

  // Filter Accepted Offer Data into YTD Offers
  const filterData = () => {
    let totalRedeemedDickers = 0;
    let totalDickersWon = 0;
    let categories;
    let filteredCategories;

    try {
      prepCategories(subcategories);

      categories = JSON.parse(JSON.stringify(subcategories));

      // Filtering out offers that are not within specified date range
      let startFilter = new Date(filterStartDate);
      let endFilter = new Date(filterEndDate);
      let offers = newData.filter((offer) => {
        let offerDate = new Date(offer.Created);
        return offerDate > startFilter && offerDate <= endFilter;
      });

      // Calculating totals for Redeemed DICKERs
      offers.forEach((obj) => {
        totalDickersWon++;
        if (obj.IsRedeemed) {
          totalRedeemedDickers++;
          // Adding to unique subcategory totals
          categories.forEach((cat) => {
            if (cat.SubCategoryId === obj.SubCategory_FK) {
              cat.SubCategoryTotal += 1;
            }
          });
        }
      });

      // Removing categories that have no data so that output is clean.
      filteredCategories = categories.filter((category) => {
        return category.SubCategoryTotal !== undefined;
      });
    } catch (err) {}

    return [
      totalRedeemedDickers, // data[0]
      totalDickersWon, // data[1]
      filteredCategories, // data[2]
    ];
  };

  // Output Filtered YTD Data
  const data = filterData();

  // Allows the user to toggle display of drilldown table
  const [drilldown, setDrilldown] = useState(false);
  const handleDrilldown = () => {
    setDrilldown(!drilldown);
  };

  if (subcategoriesIsLoading)
    return (
      <Container>
        <Col>
          <Row></Row>
          <Row>
            <p>Hello, we're grabbing your data!</p>
            <Spinner color={"warning"}></Spinner>Loading chart data...
          </Row>
          <Row></Row>
        </Col>
      </Container>
    );

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
            <br />
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
