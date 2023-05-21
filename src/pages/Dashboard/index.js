import PropTypes from "prop-types"
import React, { useState } from "react"
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

// import images
import servicesIcon1 from "../../assets/images/services-icon/01.png"
import servicesIcon2 from "../../assets/images/services-icon/02.png"
import servicesIcon3 from "../../assets/images/services-icon/03.png"
import servicesIcon4 from "../../assets/images/services-icon/04.png"

// Charts
import LineAreaChart from "../AllCharts/apex/lineareachart"
import RadialChart from "../AllCharts/apex/apexdonut"
import Apexdonut from "../AllCharts/apex/apexdonut1"

const Dashboard = props => {
  const [menu, setMenu] = useState(false)
  const toggle = () => {
    setMenu(!menu)
  }
  document.title = "Dashboard | Foodi - React Admin & Dashboard Template"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to Foodi</li>
                </ol>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Orders
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      1,685{" "}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-success">
                      <p className="mb-0">+ 12%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Restaurants
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      52,368{" "}
                      <i className="mdi mdi-arrow-down text-danger ms-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-danger">
                      <p className="mb-0">- 28%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Users
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      35.2K{" "}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-info">
                      <p className="mb-0"> 00%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} md={6}>
              <Card className="mini-stat bg-primary text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon4} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      Total Order Value
                    </h5>
                    <h4 className="fw-medium font-size-24">
                      103K{" "}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    <div className="mini-stat-label bg-warning">
                      <p className="mb-0">+ 84%</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last month</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xl={9}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Total Order Value</h4>
                  <Row>
                    <Col lg={7}>
                      <div>
                        <LineAreaChart />
                      </div>
                    </Col>
                    <Col lg={5}>
                      <Row>
                        <Col md={6}>
                          <div className="text-center">
                            <p className="text-muted mb-4">This month</p>
                            <h3>$34,252</h3>
                            <p className="text-muted mb-4">
                              This is dummy data
                            </p>
                            <RadialChart />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="text-center">
                            <p className="text-muted mb-4">Last month</p>
                            <h3>$36,253</h3>
                            <p className="text-muted mb-4">
                              This is dummy data
                            </p>
                            <Apexdonut />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
}

export default Dashboard
