import { useGetDataWithParam } from "../api/useGetDataWithParam";
import { Spinner, Container, Col, Row } from "reactstrap";

const businessesURL = "/api/businesses";

const Businesses = ({ merchantId, setBusinessesLoaded, setBusinessData, businessData }) => {
  const [businesses, businessesIsLoading] = useGetDataWithParam(
    businessesURL,
    merchantId
  );

  if (!businessesIsLoading) {
    console.log(merchantId);
    businessData = businesses;
    setBusinessData(businesses);
    setBusinessesLoaded(true);
  }
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
};

export default Businesses;
