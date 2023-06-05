import React, { useState, useEffect } from "react"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
;` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import Select from "react-select"
import {
  getAllOrderAction,
  getAllOrderFresh,
  orderDeleteAction,
  orderDeleteFresh,
  orderEditAction,
  orderEditFresh,
  orderStatusEditAction,
  orderStatusEditFresh,
  getAvailableRider,
  orderAssignRider,
  assignRiderFresh,
} from "store/Order/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { orderStatusNames, orderStatuses } from "common/data/order"
import DataTable from "react-data-table-component"
import moment from "moment"

function Order(props) {
  const [riderModalInfo, setRiderModalInfo] = useState("")
  const [availableRiderData, setAvailableRiderData] = useState(false)
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [editInfo, setEditInfo] = useState(false)
  const [reload, setReload] = useState(false)
  const navigate = useNavigate()

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [changeStatusModal, setChangeStatusModal] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const [selectedRider, setSelectedRider] = useState("")

  const handleSelectRider = e => {
    setSelectedRider(e.target.value)
  }

  const handleSelectStatus = e => {
    setEditInfo({ ...editInfo, status: e.target.value })
  }

  const toggleChangeStatusModal = () => setChangeStatusModal(!changeStatusModal)

  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const toggle = () => {
    setModal(!modal)
  }
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    // console.log(name)
    // console.log(val)
    props.orderAssignRider(riderModalInfo.order_id, selectedRider)
  }

  const handleStatusModal = (_id, status) => {
    // console.log(row);
    setEditInfo({ _id, status })

    toggleStatus()
  }

  const handleStatusUpdate = () => {
    // console.log(editInfo)
    props.orderStatusEditAction(editInfo)
    toggleStatus()
  }

  const handleStatusChangeSubmit = e => {
    // console.log(editInfo)
    e.preventDefault()
    props.orderStatusEditAction(editInfo)
    toggleChangeStatusModal()
  }
  const actionRef = (cell, row) => (
    <div>
      <Button
        disabled={!(row.order_status == orderStatuses.placed)}
        color="primary"
        className="btn btn-sm btn-dark waves-effect waves-light mb-1"
        onClick={() => handleStatusModal(row._id, orderStatuses.accepted)}
      >
        <span className="fa fa-check"></span> Accept
      </Button>{" "}
      <br />
      <Button
        disabled={!(row.order_status == orderStatuses.placed)}
        color="danger"
        className="btn btn-sm waves-effect waves-light mb-1"
        onClick={() => handleStatusModal(row._id, orderStatuses.cancel)}
      >
        <span className="fa fa-times"></span> Cancel
      </Button>{" "}
      <br></br>
      <Button
        className="btn btn-sm btn-warning waves-effect waves-light mb-1"
        onClick={() => {
          setSelectedRider(row.rider_id)
          setRiderModalInfo({ zone_id: row.zone_id, order_id: row._id })
          toggle()
        }}
      >
        <span className="fas fa-biking"></span>
        {row.rider_id ? " Assign Rider" : " Reassign Rider"}
      </Button>{" "}
      <br></br>
      <Button
        className="btn btn-sm btn-dark waves-effect waves-light"
        onClick={() => {
          setEditInfo({ _id: row._id, status: row.order_status })
          toggleChangeStatusModal()
        }}
      >
        <span className="fas fa-edit"></span>
        Change Order Status
      </Button>{" "}
    </div>
  )

  const statusRef = (cell, row) => (
    <Button
      color={row.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(row)}
    >
      {row.is_active ? "Active" : "Deactivate"}
    </Button>
  )

  const activeData = [
    {
      dataField: "_id",
      text: "Order#",
      sort: true,
    },
    {
      text: "Order Time",
      sort: true,
      formatter: (cell, row) => (
        <div>
          <span>{moment(row.order_date).format("DD-MM-YYYY")}</span>
          <br />
          <span>{moment(row.order_date).format("hh:MM:SS A")}</span>
        </div>
      ),
    },
    {
      dataField: "order_type",
      text: "Order Type",
      sort: true,
    },
    {
      dataField: "zone_name",
      text: "Zone",
      sort: true,
    },
    {
      dataField: "branch_name",
      text: "Branch",
      sort: true,
    },
    {
      text: "Customer",
      sort: true,
      formatter: (cell, row) => (
        <div>
          <span>{row.customer_name}</span>
          <br />
          <span>{row.customer_number}</span>
          <br />
          <span>{row.customer_address}</span>
        </div>
      ),
    },
    {
      text: "Assigned To",
      sort: true,
      formatter: (cell, row) => (
        <div>
          <span>{row.rider_name}</span>
          <br />
          <span>{row.rider_number}</span>
        </div>
      ),
    },
    {
      dataField: "payment_method",
      text: "Pay Method",
      sort: true,
    },
    {
      dataField: "order_total",
      text: "Total Amount",
      sort: true,
    },
    {
      text: "Order Status",
      sort: true,
      formatter: (cell, row) => (
        <div>
          <span>{orderStatusNames[row.order_status]}</span>
        </div>
      ),
    },
    {
      text: "Action",
      sort: true,
      formatter: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "_id",
      order: "desc",
    },
  ]

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(10)
  const handleFilter = e => {
    if (e.target.value?.length > 0) {
      props.getServerSidePaginationCuisineSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchCuisineFresh()
    }
  }
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setCountPerPage(newPerPage)
  }

  useEffect(() => {
    if (riderModalInfo.zone_id) props.getAvailableRider(riderModalInfo.zone_id)
  }, [riderModalInfo.zone_id])

  useEffect(() => {
    if (props.get_available_rider_data?.length > 0) {
      setAvailableRiderData(
        props.get_available_rider_data?.map((item, key) => (
          <option key={item._id} value={item._id}>
            {item.first_name} {item.last_name}
          </option>
        ))
      )
    }
  }, [props.get_available_rider_data])

  useEffect(() => {
    // console.log("=======hello", props.order_name_edit_loading)
    if (props.get_all_order_loading == false) {
      //  console.log("I am in get all order loading ")
      props.getAllOrderAction(0, 500)
    }

    if (props.order_status_edit_loading === "Success") {
      toast.success("Status Updated")
      props.orderStatusEditFresh()
    }

    if (props.order_status_edit_loading === "Failed") {
      toast.error("Failed to update.")
      props.orderStatusEditFresh()
    }

    if (props.order_delete_loading === "Success") {
      //  console.log("I am in the delete")
      toast.success("Order Deleted")
      props.orderDeleteFresh()
    }
  }, [
    props.order_name_edit_loading,
    props.order_delete_loading,
    props.order_status_edit_loading,
    props.get_all_order_loading,
  ])

  useEffect(() => {
    if (props.order_assign_rider_loading === "Success") {
      toast.success("Order assigned to rider")
      props.assignRiderFresh()
    }

    if (props.order_assign_rider_loading === "Failed") {
      toast.error("Failed to assign")
      props.assignRiderFresh()
    }
  }, [props.order_assign_rider_loading])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs maintitle="Foodi" title="Order" breadcrumbItem="Order" />
          {/* <Row className="d-flex flex-row-reverse" style={{ marginBottom: "20px", alignItems: "end" }}>
                        <Col className="col-12">
                            <Button color="danger" onClick={toggle}>
                                Add Order
                            </Button>
                        </Col>
                    </Row> */}
          <Row>
            <Col className="col-12">
              <Card style={{ border: "none" }}>
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
                      Order{" "}
                    </CardTitle>
                    {/* <Link to="/add-order">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Order
                      </Button>
                    </Link> */}
                  </div>

                  {props.get_all_order_data ? (
                    props.get_all_order_data.data?.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_order_data.data}
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
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Assign Rider</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Rider
                </label>
                <Input
                  id="exampleSelect"
                  name="city"
                  value={selectedRider}
                  //required={true}
                  onChange={handleSelectRider}
                  type="select"
                >
                  <option>Choose Rider</option>
                  {availableRiderData}
                </Input>
              </div>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>{" "}
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>

        {/* ============ change status modal starts=============== */}
        <Modal
          isOpen={changeStatusModal}
          toggle={toggleChangeStatusModal}
          centered
        >
          <ModalHeader
            className="text-center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <h2>Change Order Status</h2>
            <h4>Order #{editInfo._id}</h4>
          </ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleStatusChangeSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Status
                </label>
                <Input
                  id="exampleSelect"
                  name="city"
                  value={editInfo.status}
                  //required={true}
                  onChange={handleSelectStatus}
                  type="select"
                >
                  <option>Choose Status</option>
                  {Object.keys(orderStatusNames)?.map((item, key) => (
                    <option key={key} value={item}>
                      {orderStatusNames[item]}
                    </option>
                  ))}
                </Input>
              </div>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="secondary" onClick={toggleChangeStatusModal}>
                  Cancel
                </Button>{" "}
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ change status modal ends=============== */}

        {/* ============ status update modal starts=============== */}
        <Modal isOpen={modalStatusUpdate} toggle={toggleStatus} centered>
          <ModalHeader
            className="text-center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <div className="icon-box">
              <i
                className="fa fa-exclamation-circle"
                style={{ color: "#DCA218", fontSize: "40px" }}
              ></i>
            </div>
            Are you sure?
          </ModalHeader>
          <ModalBody>
            Do you want to change the order status to{" "}
            <b>'{orderStatusNames[editInfo.status]}'</b>?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleStatus}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={handleStatusUpdate}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
        {/* ============ status update modal ends=============== */}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    get_all_order_data,
    get_all_order_error,
    get_all_order_loading,
    order_delete_loading,
    order_edit_loading,
    order_status_edit_data,
    order_status_edit_loading,
    get_available_rider_data,
    get_available_rider_error,
    get_available_rider_loading,
    order_assign_rider_data,
    order_assign_rider_error,
    order_assign_rider_loading,
  } = state.Order

  return {
    get_all_order_data,
    get_all_order_error,
    get_all_order_loading,
    order_edit_loading,
    order_delete_loading,
    order_status_edit_data,
    order_status_edit_loading,
    get_available_rider_data,
    get_available_rider_error,
    get_available_rider_loading,
    order_assign_rider_data,
    order_assign_rider_error,
    order_assign_rider_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllOrderAction,
    getAllOrderFresh,
    orderDeleteAction,
    orderDeleteFresh,
    orderStatusEditAction,
    orderEditFresh,
    orderStatusEditFresh,
    getAvailableRider,
    orderAssignRider,
    assignRiderFresh,
  })(Order)
)
