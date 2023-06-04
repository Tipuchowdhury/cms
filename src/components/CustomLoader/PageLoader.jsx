import React from "react"
import { Col, Container, Row } from "reactstrap"
import CustomLoader from "./CustomLoader"

function PageLoader({ color = "warning" }) {
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col className="col-12 text-center mt-3">
            <CustomLoader color={color} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PageLoader
