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
  addVoucherRequestAction,
  addVoucherRequestFresh,
  getAllVoucherRequestAction,
  getAllVoucherRequestFresh,
  voucherRequestUpdateAction,
  voucherRequestUpdateFresh,
  voucherRequestDeleteAction,
  voucherRequestDeleteFresh,
  voucherRequestStatusUpdateAction,
  voucherRequestStatusUpdateFresh,
  getServerSidePaginationVoucherRequestAction,
  getServerSidePaginationVoucherRequestFresh,
} from "store/actions"
import DataTable from "react-data-table-component"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { toast } from "react-toastify"
import CustomLoader from "components/CustomLoader/CustomLoader"
import moment from "moment"
import Select from "react-select"

function VoucherRequest(props) {
  document.title = "Voucher Requests | Foodi"

  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const [editInfo, setEditInfo] = useState({})

  const handleStatusModal = row => {
    setEditInfo(row)
    toggleStatus()
  }

  const handleStatusUpdate = () => {
    // console.log(editInfo);
    props.voucherRequestStatusUpdateAction({
      ...editInfo,

      is_approved: !editInfo.voucher_request_is_approved,
    })
  }

  const actionRef = (cell, row) => (
    <Button
      color={cell.voucher_request_is_approved == true ? "warning" : "success"}
      className="btn btn-sm waves-effect waves-light"
      onClick={() => handleStatusModal(cell)}
    >
      {cell.voucher_request_is_approved == true ? "Disapproved" : "Approved"}
    </Button>
  )

  const statusRef = (cell, row) => (
    <Badge
      color={cell.voucher_request_is_approved == true ? "success" : "warning"}
    >
      {cell.voucher_request_is_approved == true ? "Approved" : "Disapproved"}
    </Badge>
  )

  // const activeData = [
  //   {
  //     dataField: "voucher_name",
  //     text: "Voucher Name",
  //     sort: true,
  //   },
  //   {
  //     dataField: "user_name",
  //     text: "User Name",
  //     sort: true,
  //   },
  //   {
  //     dataField: "user_mobile",
  //     text: "User Mobile",
  //     sort: true,
  //   },

  //   {
  //     dataField: "voucher_request_status",
  //     text: "Status",
  //     sort: true,
  //     formatter: statusRef,
  //   },
  //   {
  //     dataField: "",
  //     text: "Action",
  //     formatter: actionRef,
  //   },
  // ]

  const activeData = [
    {
      // dataField: "customer_name",
      selector: row => row.voucher_name,
      name: "Voucher Name",
      sortable: true,
    },
    {
      // dataField: "customer_mobile",
      selector: row => row.customer_first_name,
      name: "User First Name",
      sortable: true,
    },
    {
      // dataField: "customer_mobile",
      selector: row => row.customer_last_name,
      name: "User Last Name",
      sortable: true,
    },
    {
      // dataField: "order_total",
      selector: row => row.customer_mobile,
      name: "User Mobile",
      sortable: true,
    },

    {
      // dataField: "",
      selector: row => row.voucher_request_status,
      name: "Status",
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
    let name = e.target.name
    let value = e.target.value
    setPageFilters({ ...pageFilters, [name]: value })
  }

  useEffect(() => {
    props.getServerSidePaginationVoucherRequestAction(
      page,
      countPerPage,
      pageFilters
    )

    if (props.get_server_side_pagination_voucher_request_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getServerSidePaginationVoucherRequestAction(
        page,
        countPerPage,
        pageFilters
      )
    }
  }, [
    page,
    countPerPage,
    pageFilters,
    props.get_server_side_pagination_voucher_request_loading,
  ])

  useEffect(() => {
    if (props.get_all_voucher_request_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getAllVoucherRequestAction()
    }

    if (props.voucher_request_status_edit_loading === "Success") {
      toast.success("Successfuly Edited")
      toggleStatus()
      props.voucherRequestStatusUpdateFresh()
    }

    if (props.voucher_request_status_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleStatus()
      props.voucherRequestStatusUpdateFresh()
    }
  }, [props.voucher_request_status_edit_loading])

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    // console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  console.log(props.get_server_side_pagination_voucher_request_data)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="CRM"
            breadcrumbItem="Voucher Request"
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
                      Voucher Requests{" "}
                    </CardTitle>
                  </div>

                  <Row className="mb-3">
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label className="form-label" htmlFor="voucher_name">
                        Voucher Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="voucher_name"
                        placeholder="Enter Voucher Name"
                        name="voucher_name"
                        onChange={handleFilter}
                        value={pageFilters.voucher_name}
                      />
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label
                        className="form-label"
                        htmlFor="customer_first_name"
                      >
                        User First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="customer_first_name"
                        placeholder="Enter User First Name"
                        name="customer_first_name"
                        onChange={handleFilter}
                        value={pageFilters.customer_first_name}
                      />
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label
                        className="form-label"
                        htmlFor="customer_last_name"
                      >
                        User Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="customer_last_name"
                        placeholder="Enter User Last Name"
                        name="customer_last_name"
                        onChange={handleFilter}
                        value={pageFilters.customer_last_name}
                      />
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label className="form-label" htmlFor="customer_mobile">
                        User Mobile
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="customer_mobile"
                        placeholder="Enter User Mobile"
                        name="customer_mobile"
                        onChange={handleFilter}
                        value={pageFilters.customer_mobile}
                      />
                    </Col>
                  </Row>

                  {/* {props.get_all_voucher_request_data ? (
                    props.get_all_voucher_request_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_voucher_request_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                      />
                    ) : null
                  ) : null} */}

                  <DataTable
                    columns={activeData}
                    data={
                      props?.get_server_side_pagination_voucher_request_data
                        ?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_voucher_request_data
                        ?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
                    progressPending={
                      !props?.get_server_side_pagination_voucher_request_data
                    }
                    progressComponent={<CustomLoader />}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

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
            Do you want to{" "}
            {editInfo.voucher_request_is_approved ? "disapprove" : "approve"}{" "}
            this data?{" "}
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
    add_voucher_request_data,
    add_voucher_request_error,
    add_voucher_request_loading,

    get_all_voucher_request_data,
    get_all_voucher_request_error,
    get_all_voucher_request_loading,

    voucher_request_edit_data,
    voucher_request_edit_loading,

    voucher_request_status_edit_data,
    voucher_request_status_edit_loading,

    voucher_request_delete_loading,

    get_server_side_pagination_voucher_request_data,
    get_server_side_pagination_voucher_request_loading,
  } = state.VoucherRequest

  return {
    add_voucher_request_data,
    add_voucher_request_error,
    add_voucher_request_loading,

    get_all_voucher_request_data,
    get_all_voucher_request_error,
    get_all_voucher_request_loading,

    voucher_request_edit_data,
    voucher_request_edit_loading,

    voucher_request_status_edit_data,
    voucher_request_status_edit_loading,

    voucher_request_delete_loading,
    get_server_side_pagination_voucher_request_data,
    get_server_side_pagination_voucher_request_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addVoucherRequestAction,
    addVoucherRequestFresh,
    getAllVoucherRequestAction,
    getAllVoucherRequestFresh,
    voucherRequestUpdateAction,
    voucherRequestUpdateFresh,
    voucherRequestDeleteAction,
    voucherRequestDeleteFresh,
    voucherRequestStatusUpdateAction,
    voucherRequestStatusUpdateFresh,
    getServerSidePaginationVoucherRequestAction,
    getServerSidePaginationVoucherRequestFresh,
  })(VoucherRequest)
)
