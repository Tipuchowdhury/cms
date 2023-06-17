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
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap"
import { v4 as uuidv4 } from "uuid"
import {
  addRefundAction,
  addRefundFresh,
  getAllRefundAction,
  getAllRefundFresh,
  refundUpdateAction,
  refundUpdateFresh,
  refundDeleteAction,
  refundDeleteFresh,
  refundStatusUpdateAction,
  refundStatusUpdateFresh,
  getServerSidePaginationRefundAction,
  getServerSidePaginationRefundFresh,
} from "store/actions"
import DataTable from "react-data-table-component"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { toast } from "react-toastify"
import CustomLoader from "components/CustomLoader/CustomLoader"
import moment from "moment"
import Select from "react-select"

function Refund(props) {
  document.title = "Refunds | Foodi"

  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  let allPermission = [
    {
      label: "Cash",
      value: "cash",
    },
    {
      label: "SSL",
      value: "ssl",
    },
    {
      label: "Bkash",
      value: "bkash",
    },
    {
      label: "Nagad",
      value: "nagad",
    },
    {
      label: "Upay",
      value: "upay",
    },
  ]

  const [selectedPermission, setSelectedPermission] = useState([])

  // const handleSelectPermission = e => {
  //   // console.log(e)
  //   setSelectedPermission(e)
  // }

  const [editInfo, setEditInfo] = useState({
    order_id: "",
    refund_amount: 0.0,
    refund_reason: "",
    is_active: false,
  })

  const handleEditRefund = row => {
    //console.log(row);

    let amount =
      row.refund_status == false ? row.order_total : row.refund_amount

    setEditInfo(prevState => ({
      order_id: row.order_id,
      order_total: row.order_total,
      refund_amount: amount,
      refund_reason: row.refund_reason,
      refund_status: row.refund_status,
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
    props.addRefundAction(editInfo)

    //toggleEditModal();
  }

  const actionRef = (cell, row) => (
    <Button
      color="primary"
      className="btn btn-sm btn-primary waves-effect waves-light"
      onClick={() => handleEditRefund(cell)}
    >
      Refund
    </Button>
  )

  const statusRef = (cell, row) => (
    <Badge color={cell.refund_status == true ? "success" : "secondary"}>
      {cell.refund_status == true ? "Refunded" : "Not Refunded"}
    </Badge>
  )

  const activeData = [
    {
      selector: row => row.order_id,
      name: "Order ID",
      sortable: true,
    },
    {
      // dataField: "customer_name",
      selector: row => row.customer_name,
      name: "Customer Name",
      sortable: true,
    },
    {
      // dataField: "customer_mobile",
      selector: row => row.customer_mobile,
      name: "Customer Mobile",
      sortable: true,
    },
    {
      // dataField: "order_total",
      selector: row => row.order_total,
      name: "Order Total",
      sortable: true,
    },
    {
      // dataField: "payment_method",
      selector: row => row.payment_method,
      name: "Payment Method",
      sortable: true,
    },
    {
      // dataField: "transaction_id",
      selector: row => row.transaction_id,
      name: "Transaction ID",
      sortable: true,
    },
    // {
    //   // dataField: "payment_id",
    //   selector: row => row.payment_id,
    //   name: "Payment ID",
    //   sortable: true,
    // },
    {
      // dataField: "date",
      selector: row => row.date,
      name: "Date",
      sortable: true,
      cell: (cell, row) => (
        <div>
          <span>{moment(cell.date).format("DD-MM-YYYY")}</span>
          <br />
          <span>{moment(cell.date).format("hh:MM:SS A")}</span>
        </div>
      ),
    },
    {
      // dataField: "refund_amount",
      selector: row => row.refund_amount,
      name: "Refund Amount",
      sortable: true,
    },
    {
      // dataField: "",
      selector: row => row.refund_status,
      name: "Refund Status",
      sortable: true,
      cell: statusRef,
    },
    {
      //dataField: "he",
      name: "Action",
      // sortable: true,
      cell: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(10)
  const [pageFilters, setPageFilters] = useState({})
  const handleFilter = e => {
    setSelectedPermission(e.target.value)
    let name = e.target.name
    let value = e.target.value
    setPageFilters({ ...pageFilters, [name]: value })
  }

  useEffect(() => {
    props.getServerSidePaginationRefundAction(page, countPerPage, pageFilters)

    if (props.get_server_side_pagination_refund_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getServerSidePaginationRefundAction(page, countPerPage, pageFilters)
    }
  }, [
    page,
    countPerPage,
    pageFilters,
    props.get_server_side_pagination_refund_loading,
  ])

  useEffect(() => {
    if (props.get_all_refund_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getAllRefundAction()
    }

    if (props.add_refund_loading === "Success") {
      toast.success("Successfuly Refund")
      toggleEditModal()
      props.addRefundFresh()
    }

    if (props.add_refund_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.addRefundFresh()
    }
  }, [props.add_refund_loading])

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    // console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Refunds"
            breadcrumbItem="Refunds"
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
                      Refunds{" "}
                    </CardTitle>
                    {/* <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add Refund
                    </Button> */}
                  </div>

                  {/* {props.get_all_refund_data ? (
                    props.get_all_refund_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_refund_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                      />
                    ) : null
                  ) : null} */}

                  <Row className="mb-3">
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label className="form-label" htmlFor="order_id">
                        Order ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="order_id"
                        placeholder="Enter Order ID"
                        name="order_id"
                        onChange={handleFilter}
                        value={pageFilters.order_id}
                      />
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label className="form-label" htmlFor="customer_mobile">
                        Customer Mobile
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="customer_mobile"
                        placeholder="Enter Customer Mobile"
                        name="customer_mobile"
                        onChange={handleFilter}
                        value={pageFilters.customer_mobile}
                      />
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label className="form-label" htmlFor="transaction_id">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="transaction_id"
                        placeholder="Enter Transaction ID"
                        name="transaction_id"
                        onChange={handleFilter}
                        value={pageFilters.transaction_id}
                      />
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label className="form-label" htmlFor="payment_method">
                        Payment Method
                      </label>
                      <Input
                        id="payment_method"
                        name="payment_method"
                        className="form-control"
                        placeholder="Select Payment Method"
                        value={selectedPermission}
                        onChange={handleFilter}
                        type="select"
                      >
                        <option value="">All Payment Method</option>
                        {allPermission.map(method => (
                          <option key={method.value} value={method.value}>
                            {method.label}
                          </option>
                        ))}
                      </Input>
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label className="form-label" htmlFor="order_date">
                        Order Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="order_date"
                        placeholder="Enter Order Date"
                        name="order_date"
                        onChange={handleFilter}
                        value={pageFilters.order_date}
                      />
                    </Col>
                  </Row>

                  <div className="text-end">
                    {/* <Select
                      name="payment_method"
                      value={selectedPermission}
                      onChange={handleFilter}
                      options={allPermission}
                      isMulti={false}
                    /> */}
                  </div>

                  <DataTable
                    columns={activeData}
                    data={props?.get_server_side_pagination_refund_data?.data}
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_refund_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
                    progressPending={
                      !props?.get_server_side_pagination_refund_data
                    }
                    progressComponent={<CustomLoader />}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader>Edit Refund</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEdit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="refund_amount">
                  Refund Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="refund_amount"
                  placeholder="Enter refund amount"
                  required
                  name="refund_amount"
                  onChange={handleEditInputs}
                  value={editInfo.refund_amount}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="refund_reason">
                  Refund Reason
                </label>
                <textarea
                  className="form-control"
                  name="refund_reason"
                  id="refund_reason"
                  cols="5"
                  rows="3"
                  onChange={handleEditInputs}
                  value={editInfo.refund_reason}
                ></textarea>
              </div>

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                {editInfo.refund_status == false ? (
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
    add_refund_data,
    add_refund_error,
    add_refund_loading,

    get_all_refund_data,
    get_all_refund_error,
    get_all_refund_loading,

    refund_edit_data,
    refund_edit_loading,

    refund_status_edit_data,
    refund_status_edit_loading,

    refund_delete_loading,

    get_server_side_pagination_refund_data,
    get_server_side_pagination_refund_loading,
  } = state.Refunds

  return {
    add_refund_data,
    add_refund_error,
    add_refund_loading,

    get_all_refund_data,
    get_all_refund_error,
    get_all_refund_loading,

    refund_edit_data,
    refund_edit_loading,

    refund_status_edit_data,
    refund_status_edit_loading,

    refund_delete_loading,
    get_server_side_pagination_refund_data,
    get_server_side_pagination_refund_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addRefundAction,
    addRefundFresh,
    getAllRefundAction,
    getAllRefundFresh,
    refundUpdateAction,
    refundUpdateFresh,
    refundDeleteAction,
    refundDeleteFresh,
    refundStatusUpdateAction,
    refundStatusUpdateFresh,
    getServerSidePaginationRefundAction,
    getServerSidePaginationRefundFresh,
  })(Refund)
)
