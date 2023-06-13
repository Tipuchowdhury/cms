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
  getServerSidePaginationOrderAction,
  getServerSidePaginationOrderFresh,
} from "store/Order/actions"
import DataTable from "react-data-table-component"
import { orderStatusNames, orderStatuses, orderTypes } from "common/data/order"
import moment from "moment"
import CustomLoader from "components/CustomLoader/CustomLoader"

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
  const actionRef = (cell, row) =>
    // Filter Button
    cell.isFilter ? (
      <Button
        color="primary"
        className="btn btn-sm btn-primary waves-effect waves-light"
        onClick={handleParamChange}
      >
        <span className="fa fa-search"></span> Filter
      </Button>
    ) : (
      // Filter Button end
      <div>
        {cell.order_status == orderStatuses.placed ? (
          <>
            <Button
              disabled={!(cell.order_status == orderStatuses.placed)}
              color="primary"
              className="btn btn-sm btn-dark waves-effect waves-light mb-1"
              style={{ marginRight: "2px" }}
              onClick={() =>
                handleStatusModal(cell._id, orderStatuses.accepted)
              }
            >
              <span className="fa fa-check"></span> Accept
            </Button>
          </>
        ) : (
          ""
        )}
        {cell.order_status == orderStatuses.placed ? (
          <>
            <Button
              disabled={!(cell.order_status == orderStatuses.placed)}
              color="danger"
              className="btn btn-sm waves-effect waves-light mb-1"
              onClick={() => handleStatusModal(cell._id, orderStatuses.cancel)}
            >
              <span className="fa fa-times"></span> Cancel
            </Button>
          </>
        ) : (
          ""
        )}
        <Button
          className="btn btn-sm btn-warning waves-effect waves-light mb-1"
          onClick={() => {
            setSelectedRider(cell.rider_id)
            setRiderModalInfo({
              zone_id: cell.zone_id,
              order_id: cell._id,
            })
            toggle()
          }}
        >
          <span className="fas fa-biking"></span>
          {cell.rider_id ? " Assign Rider" : " Reassign Rider"}
        </Button>{" "}
        <br></br>
        <Button
          className="btn btn-sm btn-dark waves-effect waves-light"
          onClick={() => {
            setEditInfo({ _id: cell._id, status: cell.order_status })
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
      color={cell.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(cell)}
    >
      {cell.is_active ? "Active" : "Deactivate"}
    </Button>
  )
  const textRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.name}</span>
  )

  const columnFilerInputName = {
    _id: {
      name: "id",
      placeholder: "Order ID",
    },
    order_date: {
      name: "order_date",
      placeholder: "YYYY-MM-DD",
    },
    order_type: {
      name: "order_type",
      placeholder: "Order Type",
    },
    zone_name: {
      name: "zone_name",
      placeholder: "Zone Name",
    },
    branch_name: {
      name: "branch_name",
      placeholder: "Branch Name",
    },
    customer_name: {
      name: "customer_name",
      placeholder: "Customer Mobile",
    },
    rider_number: {
      name: "rider_number",
      placeholder: "Rider Mobile",
    },
    payment_method: {
      name: "payment_method",
      placeholder: "Payment Method",
    },
    order_total: {
      name: "order_total",
      placeholder: "Total Amount",
    },
    order_status: {
      name: "order_status",
    },
  }

  const columnFilterGeneral = (cell, row, field) => {
    return cell.isFilter ? (
      <input
        className="form-control"
        name={columnFilerInputName[field]?.name}
        placeholder={columnFilerInputName[field]?.placeholder}
        value={pageFilters[columnFilerInputName[field]?.name]}
        onChange={handleFilter}
      />
    ) : (
      <div>{cell[field]}</div>
    )
  }

  const columnFilterOrderStatus = (cell, row) => {
    return cell.isFilter ? (
      <Input
        type="select"
        className="form-control input-sm"
        name="order_status"
        value={pageFilters?.order_status}
        onChange={handleFilter}
      >
        <option value="">Choose...</option>
        {Object.keys(orderStatusNames).map(key => (
          <option value={key} key={key}>
            {orderStatusNames[key]}
          </option>
        ))}
      </Input>
    ) : (
      <div>
        <span>{orderStatusNames[cell?.order_status]}</span>
      </div>
    )
  }

  const columnFilterOrderTypes = (cell, row) => {
    return cell.isFilter ? (
      <Input
        type="select"
        className="form-control input-sm"
        name="order_type"
        value={pageFilters?.order_type}
        onChange={handleFilter}
      >
        <option value="">Choose...</option>
        {Object.keys(orderTypes).map(key => (
          <option value={key} key={key}>
            {orderTypes[key]}
          </option>
        ))}
      </Input>
    ) : (
      <div>
        <span>{orderTypes[cell?.order_type]}</span>
      </div>
    )
  }
  const activeData = [
    {
      name: "Order#",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "_id"),
    },
    {
      name: "Order Time",
      sortable: true,
      cell: (cell, row) =>
        cell.isFilter ? (
          <input
            type="date"
            className="form-control"
            name="order_date"
            value={pageFilters?.order_date}
            onChange={handleFilter}
          />
        ) : (
          <div>
            <span>{moment(cell?.order_date).format("MMMM D, YYYY")}</span>
            <br />
            <span>{moment(cell?.order_date).format("hh:MM:SS A")}</span>
          </div>
        ),
    },
    {
      selector: row => row.order_type,
      name: "Order Type",
      sortable: true,
      cell: (cell, row) => columnFilterOrderTypes(cell, row),
    },
    {
      selector: row => row.zone_name,
      name: "Zone",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "zone_name"),
    },
    {
      selector: row => row.branch_name,
      name: "Branch",
      sortable: true,
      cell: (cell, row) =>
        cell.isFilter ? (
          <input
            className="form-control"
            name="branch_name"
            placeholder="Branch Name"
            value={pageFilters?.branch_name}
            onChange={handleFilter}
          />
        ) : (
          <div>
            <span>{cell?.branch_name}</span>
            <br />
            <span>{cell?.branch_mobile_number}</span>
          </div>
        ),
    },
    {
      selector: row => row.customer_name,
      name: "Customer",
      sortable: true,
      cell: (cell, row) =>
        cell.isFilter ? (
          <input
            className="form-control"
            name="customer_number"
            placeholder="Customer Mobile"
            value={pageFilters?.customer_number}
            onChange={handleFilter}
          />
        ) : (
          <div>
            <span>{cell?.customer_name}</span>
            <br />
            <span>{cell?.customer_number}</span>
            <br />
            <span>{cell?.customer_address}</span>
          </div>
        ),
    },
    {
      // selector: row => row.customer_name,
      name: "Assigned To",
      sortable: true,
      cell: (cell, row) =>
        cell.isFilter ? (
          <input
            className="form-control"
            name="rider_number"
            placeholder="Rider Mobile"
            value={pageFilters?.rider_number}
            onChange={handleFilter}
          />
        ) : (
          <div>
            <span>{cell?.rider_name}</span>
            <br />
            <span>{cell?.rider_number}</span>
          </div>
        ),
    },
    {
      selector: row => row.payment_method,
      name: "Pay Method",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "payment_method"),
    },
    {
      selector: row => row.order_total,
      name: "Total Amount",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "order_total"),
    },
    {
      name: "Order Status",
      sortable: true,
      cell: columnFilterOrderStatus,
    },
    {
      name: "Action",
      sortable: true,
      cell: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "_id",
      order: "desc",
    },
  ]

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

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(20)
  const [pageFilters, setPageFilters] = useState({
    id: "",
    order_date: "",
    order_type: "",
    zone_name: "",
    branch_name: "",
    customer_name: "",
    rider_number: "",
    payment_method: "",
    order_total: "",
    order_status: "",
  })
  const [paramChange, setParamChange] = useState(false)

  const handleParamChange = () => {
    props.getServerSidePaginationOrderFresh()
    setParamChange(!paramChange)
  }

  const handleFilter = e => {
    console.log("e :", e)
    let name = e.target.name
    let value = e.target.value
    setPageFilters({ ...pageFilters, [name]: value })
  }

  useEffect(() => {
    props.getServerSidePaginationOrderAction(page, countPerPage, pageFilters)
  }, [
    page,
    countPerPage,
    paramChange,
    props.order_assign_rider_loading,
    props.order_status_edit_loading,
    // props.get_server_side_pagination_order_loading,
  ])
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    // console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  useEffect(() => {
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

  const customStyles = {
    table: {
      style: {
        border: "1px solid gray",
      },
    },
    headCells: {
      style: {
        padding: "5px",
        borderLeft: "1px solid gray",
      },
    },
    cells: {
      style: {
        padding: "5px",
        borderLeft: "1px solid gray",
      },
    },
  }

  const conditionalRowStyles = [
    {
      when: row => row.order_status === orderStatuses.placed,
      style: {
        backgroundColor: "#ddee11",
        color: "black",
      },
    },
    {
      when: row => row.order_status === orderStatuses.delivered,
      style: {
        backgroundColor: "#4ada99",
        color: "white",
      },
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs maintitle="Foodi" title="Order" breadcrumbItem="Order" />
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
                    <Button
                      className="btn btn-sm btn-warning"
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={handleParamChange}
                    >
                      <i
                        class={`fa fa-refresh ${
                          props.get_server_side_pagination_order_loading !=
                          "Success"
                            ? "spin"
                            : ""
                        }`}
                        aria-hidden="true"
                      ></i>{" "}
                      Refresh
                    </Button>
                  </div>

                  <div className="text-end"></div>
                  <DataTable
                    columns={activeData}
                    data={
                      props?.get_server_side_pagination_order_data?.data
                        ? [
                            { isFilter: true },
                            ...props?.get_server_side_pagination_order_data
                              ?.data,
                          ]
                        : ""
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    customStyles={customStyles}
                    paginationTotalRows={
                      props.get_server_side_pagination_order_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
                    progressPending={
                      !props.get_server_side_pagination_order_data
                    }
                    progressComponent={<CustomLoader />}
                    striped
                    stripedColor="#000"
                    conditionalRowStyles={conditionalRowStyles}
                  />
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
    get_server_side_pagination_order_data,
    get_server_side_pagination_order_error,
    get_server_side_pagination_order_loading,
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
    get_server_side_pagination_order_data,
    get_server_side_pagination_order_error,
    get_server_side_pagination_order_loading,
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
    getServerSidePaginationOrderAction,
    getServerSidePaginationOrderFresh,
  })(Order)
)
