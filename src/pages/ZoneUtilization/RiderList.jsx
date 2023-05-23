import Breadcrumbs from "components/Common/Breadcrumb"
import withRouter from "components/Common/withRouter"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {
  Badge,
  Button,
  Card,
  CardBody,
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
  addRiderListAction,
  addRiderListFresh,
  getAllRiderListAction,
  getAllRiderListFresh,
  riderListUpdateAction,
  riderListUpdateFresh,
  riderListDeleteAction,
  riderListDeleteFresh,
  riderListStatusUpdateAction,
  riderListStatusUpdateFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { toast } from "react-toastify"

function RiderList(props) {
  document.title = "Rider List | Foodi"

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
    rider_list_amount: 0.0,
    rider_list_reason: "",
    rider_list_status: false,
  })

  const handleEditRiderList = row => {
    //console.log(row);

    setEditInfo(prevState => ({
      _id: row._id,
      rider_list_amount: row.order_total,
      rider_list_reason: row.rider_list_reason,
      rider_list_status: row.rider_list_status,
    }))

    toggleEditModal()
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
    props.riderListUpdateAction(editInfo, pathEdit)

    //toggleEditModal();
  }

  console.log(props.get_all_rider_list_data)

  //   const actionRef = (cell, row) => (
  //     <Button
  //       color="primary"
  //       className="btn btn-sm btn-primary waves-effect waves-light"
  //       onClick={() => handleEditRiderList(row)}
  //     >
  //       RiderList
  //     </Button>
  //   )

  //   const statusRef = (cell, row) => (
  //     <Badge color={row.rider_list_status == true ? "success" : "secondary"}>
  //       {row.rider_list_status == true ? "RiderListed" : "Not RiderListed"}
  //     </Badge>
  //   )

  const activeData = [
    {
      dataField: "rider_name",
      text: "Rider Name",
      sort: true,
    },
    {
      dataField: "phone_number",
      text: "Phone Number",
      sort: true,
    },
    {
      dataField: "online_status",
      text: "Online Status",
      sort: true,
    },
    {
      dataField: "avg_accpt_rate",
      text: "Average Accept Rate",
      sort: true,
    },
    {
      dataField: "avg_cancel_rate",
      text: "Average Cancel Rate",
      sort: true,
    },
    {
      dataField: "avg_delivery_time",
      text: "Avg. Delivery Time",
      sort: true,
    },
    {
      dataField: "total_delivery_order",
      text: "Total Delivered Orders",
      sort: true,
    },
    {
      dataField: "total_cancel_order",
      text: "Total Cancelled Orders",
      sort: true,
    },
    // {
    //   dataField: "",
    //   text: "RiderList Status",
    //   sort: true,
    //   formatter: statusRef,
    // },
    // {
    //   //dataField: "he",
    //   text: "Action",
    //   sort: true,
    //   formatter: actionRef,
    // },
  ]
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  useEffect(() => {
    if (props.get_all_rider_list_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getAllRiderListAction()
    }

    if (props.rider_list_edit_loading === "Success") {
      toast.success("RiderList Updated")
      toggleEditModal()
      props.riderListUpdateFresh()
    }

    if (props.rider_list_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.riderListUpdateFresh()
    }
  }, [props.rider_list_edit_loading])

  // console.log(props.get_all_rider_list_data);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Rider List"
            breadcrumbItem="Rider List"
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
                      Rider Lists{" "}
                    </CardTitle>
                    {/* <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add RiderList
                    </Button> */}
                  </div>

                  {props.get_all_rider_list_data ? (
                    props.get_all_rider_list_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_rider_list_data}
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
          <ModalHeader>Edit RiderList</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEdit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="rider_list_amount">
                  RiderList Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="rider_list_amount"
                  placeholder="Enter riderList amount"
                  required
                  name="rider_list_amount"
                  onChange={handleEditInputs}
                  value={editInfo.rider_list_amount}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="rider_list_reason">
                  RiderList Reason
                </label>
                <textarea
                  className="form-control"
                  name="rider_list_reason"
                  id="rider_list_reason"
                  cols="5"
                  rows="3"
                  onChange={handleEditInputs}
                  value={editInfo.rider_list_reason}
                ></textarea>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                {editInfo.rider_list_status == false ? (
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
    add_rider_list_data,
    add_rider_list_error,
    add_rider_list_loading,

    get_all_rider_list_data,
    get_all_rider_list_error,
    get_all_rider_list_loading,

    rider_list_edit_data,
    rider_list_edit_loading,

    rider_list_status_edit_data,
    rider_list_status_edit_loading,

    rider_list_delete_loading,
  } = state.RiderList

  return {
    add_rider_list_data,
    add_rider_list_error,
    add_rider_list_loading,

    get_all_rider_list_data,
    get_all_rider_list_error,
    get_all_rider_list_loading,

    rider_list_edit_data,
    rider_list_edit_loading,

    rider_list_status_edit_data,
    rider_list_status_edit_loading,

    rider_list_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addRiderListAction,
    addRiderListFresh,
    getAllRiderListAction,
    getAllRiderListFresh,
    riderListUpdateAction,
    riderListUpdateFresh,
    riderListDeleteAction,
    riderListDeleteFresh,
    riderListStatusUpdateAction,
    riderListStatusUpdateFresh,
  })(RiderList)
)
