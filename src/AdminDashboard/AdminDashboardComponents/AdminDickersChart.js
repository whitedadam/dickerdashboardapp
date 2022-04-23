import React from "react";
import { Chart } from "react-charts";
import { Row, Container, } from "reactstrap";
import ResizableBox from "./ResizableBox";
import subcategories from "./SampleData/subcategory.json";

const AdminDickers = ({
  filterStartDate,
  filterEndDate,
  acceptedOffersData,
}) => {

  // Constructs input data into form that is consumable by chart
  const buildInputData = () => {
    // Array of Objects that will hold various datum based upon selected time intervals.
    let inputData = [
      {
        label: "SubCategoryTotals",
        data: [],
      },
    ];

    // Building Data arr that will hold displayed data within chart.
    subcategories.forEach((cat) => {
      inputData[0].data.push({
        primary: cat.SubCategoryName,
        secondary: 0,
      });
    });

    try {
      // // Filtering out offers that are not within specified date range
      let startFilter = new Date(filterStartDate);
      let endFilter = new Date(filterEndDate);
      let offers = acceptedOffersData.filter((offer) => {
        let offerDate = new Date(offer.Created);
        return offerDate > startFilter && offerDate <= endFilter;
      });

      // Counting relevant offers by SubCategory_FK
      offers.forEach((offer) => {
        inputData[0].data[offer.SubCategory_FK - 1].secondary++;
      });
    } catch (err) {}

    return inputData;
  };
  const displayData = buildInputData();

  // Builds primary axis of chart
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => String(datum.primary),
    }),
    []
  );

  // Builds secondary axis of chart
  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return acceptedOffersData === undefined ? (
    <div>Filtering Chart Data... </div>
  ) : (
    <Container>
      <Row>
        <ResizableBox>
          <Chart
            options={{
              data: displayData,
              primaryAxis,
              secondaryAxes,
            }}
          />
        </ResizableBox>
      </Row>
    </Container>
  );
};

export default AdminDickers;
