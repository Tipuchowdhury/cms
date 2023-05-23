import Breadcrumbs from "components/Common/Breadcrumb"
import withRouter from "components/Common/withRouter"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap"
import { v4 as uuidv4 } from "uuid"
import {
  addZoneUtilizationAction,
  addZoneUtilizationFresh,
  getAllZoneUtilizationAction,
  getAllZoneUtilizationFresh,
  zoneUtilizationUpdateAction,
  zoneUtilizationUpdateFresh,
  zoneUtilizationDeleteAction,
  zoneUtilizationDeleteFresh,
  zoneUtilizationStatusUpdateAction,
  zoneUtilizationStatusUpdateFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { toast } from "react-toastify"

function ZoneUtilization(props) {
  document.title = "Zone Utilizations | Foodi"

  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const [editInfo, setEditInfo] = useState({
    _id: "",
    zone_utilization_amount: 0.0,
    zone_utilization_reason: "",
    zone_utilization_status: false,
  })

  const handleEditZoneUtilization = row => {
    navigate("/rider-list")
    //console.log(row);

    // setEditInfo(prevState => ({
    //   _id: row._id,
    //   zone_utilization_amount: row.order_total,
    //   zone_utilization_reason: row.zone_utilization_reason,
    //   zone_utilization_status: row.zone_utilization_status,
    // }))

    // toggleEditModal()
  }

  let name, value, checked

  const handleEditInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setEditInfo({ ...editInfo, [name]: value })
  }

  const handleEdit = e => {
    e.preventDefault()
    props.zoneUtilizationUpdateAction(editInfo, pathEdit)

    //toggleEditModal();
  }

  // console.log(props.get_all_zone_utilization_data)

  const actionRef = (cell, row) => (
    <Button
      color="primary"
      className="btn btn-sm btn-primary waves-effect waves-light"
      onClick={() => handleEditZoneUtilization(row)}
    >
      Rider List
    </Button>
  )

  //   const statusRef = (cell, row) => (
  //     <Badge
  //       color={row.zone_utilization_status == true ? "success" : "secondary"}
  //     >
  //       {row.zone_utilization_status == true
  //         ? "ZoneUtilizationed"
  //         : "Not ZoneUtilizationed"}
  //     </Badge>
  //   )

  const activeData = [
    {
      dataField: "zone_name",
      text: "Zone Name",
      sort: true,
    },
    {
      dataField: "open_rider",
      text: "Open Rider",
      sort: true,
    },
    {
      dataField: "rider_with_one_order",
      text: "Rider with 1 Order",
      sort: true,
    },
    {
      dataField: "rider_with_two_order",
      text: "Rider with 2 Orders",
      sort: true,
    },
    {
      dataField: "rider_with_three_order",
      text: "Rider with 2 Orders",
      sort: true,
    },
    {
      dataField: "total_delivered_order",
      text: "Total Delivered Order(s)",
      sort: true,
    },
    {
      dataField: "avg_delivery_time",
      text: "Avg DT",
      sort: true,
    },
    {
      dataField: "avg_acception_rate",
      text: "Avg DT",
      sort: true,
    },
    {
      dataField: "total_cancelled_order",
      text: "Total Cancelled Order(s)",
      sort: true,
    },
    {
      dataField: "avg_cancel_rate",
      text: "Avg CR",
      sort: true,
    },
    {
      dataField: "order_cancelled_for_rider_issue",
      text: "Order Cancelled for Rider Issue",
      sort: true,
    },
    // {
    //   dataField: "",
    //   text: "ZoneUtilization Status",
    //   sort: true,
    //   formatter: statusRef,
    // },
    {
      text: "Action",
      sort: true,
      formatter: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  useEffect(() => {
    if (props.get_all_zone_utilization_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getAllZoneUtilizationAction()
    }

    if (props.zone_utilization_edit_loading === "Success") {
      toast.success("ZoneUtilization Updated")
      toggleEditModal()
      props.zoneUtilizationUpdateFresh()
    }

    if (props.zone_utilization_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.zoneUtilizationUpdateFresh()
    }
  }, [props.zone_utilization_edit_loading])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Zone Utilizations"
            breadcrumbItem="Zone Utilizations"
          />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "40px",
                      marginTop: "20px",
                      backgroundColor: "#1E417D",
                      padding: "15px",
                    }}
                  >
                    <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                      Zone Utilizations{" "}
                    </CardTitle>
                    {/* <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add ZoneUtilization
                    </Button> */}
                  </div>

                  <Row>
                    <Col sm="4">
                      <Card
                        body
                        style={{ backgroundColor: "#5DA3FA", color: "#ffffff" }}
                      >
                        <CardTitle tag="h5">
                          {props.get_all_zone_utilization_data
                            ? props.get_all_zone_utilization_data[0]
                                ?.online_rider
                            : 0}
                        </CardTitle>
                        <CardText>Online Riders</CardText>
                      </Card>
                    </Col>
                    <Col sm="4">
                      <Card
                        body
                        style={{ backgroundColor: "#23C4ED", color: "#ffffff" }}
                      >
                        <CardTitle tag="h5">
                          {props.get_all_zone_utilization_data
                            ? props.get_all_zone_utilization_data[0]
                                ?.rider_with_one_order
                            : 0}
                        </CardTitle>
                        <CardText>Rider with 1 order</CardText>
                      </Card>
                    </Col>
                    <Col sm="4">
                      <Card
                        body
                        style={{ backgroundColor: "#207398", color: "#ffffff" }}
                      >
                        <CardTitle tag="h5">
                          {props.get_all_zone_utilization_data
                            ? props.get_all_zone_utilization_data[0]
                                ?.rider_with_two_order
                            : 0}
                        </CardTitle>
                        <CardText>Rider with 2 orders</CardText>
                      </Card>
                    </Col>
                    <Col sm="4">
                      <Card
                        body
                        style={{ backgroundColor: "#5DA3FA", color: "#ffffff" }}
                      >
                        <CardTitle tag="h5">
                          {props.get_all_zone_utilization_data
                            ? props.get_all_zone_utilization_data[0]
                                ?.rider_with_three_order
                            : 0}
                        </CardTitle>
                        <CardText>Rider with 3 orders</CardText>
                      </Card>
                    </Col>
                    <Col sm="4">
                      <Card
                        body
                        style={{ backgroundColor: "#23C4ED", color: "#ffffff" }}
                      >
                        <CardTitle tag="h5">
                          {props.get_all_zone_utilization_data
                            ? props.get_all_zone_utilization_data[0]
                                ?.total_active_order
                            : 0}
                        </CardTitle>
                        <CardText>Total Active Order(s)</CardText>
                      </Card>
                    </Col>
                    <Col sm="4">
                      <Card
                        body
                        style={{ backgroundColor: "#207398", color: "#ffffff" }}
                      >
                        <CardTitle tag="h5">
                          {props.get_all_zone_utilization_data
                            ? props.get_all_zone_utilization_data[0]
                                ?.total_unassigned_order
                            : 0}
                        </CardTitle>
                        <CardText>Total Unassigned Order(s)</CardText>
                      </Card>
                    </Col>
                  </Row>

                  {props.get_all_zone_utilization_data ? (
                    props.get_all_zone_utilization_data[0]?.zone_data.length >
                    0 ? (
                      <DatatableTablesWorking
                        products={
                          props.get_all_zone_utilization_data[0]?.zone_data
                        }
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                      />
                    ) : null
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader>Edit ZoneUtilization</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEdit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="zone_utilization_amount">
                  ZoneUtilization Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zone_utilization_amount"
                  placeholder="Enter zoneUtilization amount"
                  required
                  name="zone_utilization_amount"
                  onChange={handleEditInputs}
                  value={editInfo.zone_utilization_amount}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="zone_utilization_reason">
                  ZoneUtilization Reason
                </label>
                <textarea
                  className="form-control"
                  name="zone_utilization_reason"
                  id="zone_utilization_reason"
                  cols="5"
                  rows="3"
                  onChange={handleEditInputs}
                  value={editInfo.zone_utilization_reason}
                ></textarea>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                {editInfo.zone_utilization_status == false ? (
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                ) : (
                  ""
                )}
                <Button color="secondary" onClick={toggleEditModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ edit modal ends=============== */}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    add_zone_utilization_data,
    add_zone_utilization_error,
    add_zone_utilization_loading,

    get_all_zone_utilization_data,
    get_all_zone_utilization_error,
    get_all_zone_utilization_loading,

    zone_utilization_edit_data,
    zone_utilization_edit_loading,

    zone_utilization_status_edit_data,
    zone_utilization_status_edit_loading,

    zone_utilization_delete_loading,
  } = state.ZoneUtilization

  return {
    add_zone_utilization_data,
    add_zone_utilization_error,
    add_zone_utilization_loading,

    get_all_zone_utilization_data,
    get_all_zone_utilization_error,
    get_all_zone_utilization_loading,

    zone_utilization_edit_data,
    zone_utilization_edit_loading,

    zone_utilization_status_edit_data,
    zone_utilization_status_edit_loading,

    zone_utilization_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addZoneUtilizationAction,
    addZoneUtilizationFresh,
    getAllZoneUtilizationAction,
    getAllZoneUtilizationFresh,
    zoneUtilizationUpdateAction,
    zoneUtilizationUpdateFresh,
    zoneUtilizationDeleteAction,
    zoneUtilizationDeleteFresh,
    zoneUtilizationStatusUpdateAction,
    zoneUtilizationStatusUpdateFresh,
  })(ZoneUtilization)
)
