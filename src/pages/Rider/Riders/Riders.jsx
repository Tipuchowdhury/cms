import React, { useState, useEffect } from "react"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
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
import {
  addRiderAction,
  addRiderFresh,
  getAllRiderAction,
  getAllRiderFresh,
  riderDeleteAction,
  riderDeleteFresh,
  riderEditAction,
  riderEditFresh,
  riderStatusEditAction,
  riderStatusEditFresh,
  riderApprovedEditAction,
  riderApprovedEditFresh,
  getServerSidePaginationRiderAction,
  getServerSidePaginationRiderFresh,
  getRiderByIdActionFresh,
} from "store/actions"
import DataTable from "react-data-table-component"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import CustomLoader from "components/CustomLoader/CustomLoader"

function Riders(props) {
  document.title = "Riders | Foodi"

  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [riderId, setRiderId] = useState()
  const [riderName, setRiderName] = useState()
  const [editInfo, setEditInfo] = useState(false)
  const [reload, setReload] = useState(false)
  const navigate = useNavigate()

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const [modalApprovedUpdate, setModalApprovedUpdate] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)
  const handleDelete = () => {
    toggleDel()
    // console.log(deleteItem)
    props.riderDeleteAction(deleteItem)
  }
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)
  const toggleApproved = () => setModalApprovedUpdate(!modalApprovedUpdate)

  const toggle = () => setModal(!modal)
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    const val = uuidv4()
    // console.log(name)
    // console.log(val)
    props.addRiderAction(name, val)
  }

  const handleEdit = row => {
    navigate("/edit-rider", { state: row })
  }
  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }
  const handleStatusModal = row => {
    // console.log(row);
    setEditInfo(row)

    toggleStatus()
  }

  const handleApprovedModal = row => {
    // console.log(row);
    setEditInfo(row)

    toggleApproved()
  }

  const handleStatusUpdate = () => {
    // console.log(editInfo)
    props.riderStatusEditAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }

  const handleApprovedUpdate = () => {
    // console.log(editInfo)
    props.riderApprovedEditAction({
      ...editInfo,
      is_approve: !editInfo.is_approve,
    })
  }

  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-sm btn-primary waves-effect waves-light"
        onClick={() => handleEdit(cell)}
      >
        Edit
      </Button>{" "}
      <Button
        color="danger"
        className="btn btn-sm btn-danger waves-effect waves-light"
        onClick={() => handleDeleteModal(cell)}
      >
        Delete
      </Button>{" "}
    </div>
  )

  const statusRef = (cell, row) => (
    <Button
      color={cell.is_active ? "success" : "secondary"}
      className="btn btn-sm waves-effect waves-light"
      onClick={() => handleStatusModal(cell)}
    >
      {cell.is_active ? "Active" : "Deactivate"}
    </Button>
  )

  const approvedRef = (cell, row) => (
    <Button
      color={cell.is_approve ? "info" : "warning"}
      className="btn btn-sm waves-effect waves-light"
      onClick={() => handleApprovedModal(cell)}
    >
      {cell.is_approve ? "Approved" : "Disapprove "}
    </Button>
  )

  const activeData = [
    {
      // dataField: "first_name",
      selector: row => row.first_name,
      name: "First Name",
      sortable: true,
    },

    {
      // dataField: "first_name",
      selector: row => row.last_name,
      name: "Last Name",
      sortable: true,
    },
    {
      // dataField: "mobile_number",
      selector: row => row.mobile_number,
      name: "Mobile Number",
      sortable: true,
    },
    {
      // dataField: "is_active",
      selector: row => row.is_active,
      name: "Status",
      sortable: true,
      cell: statusRef,
    },
    {
      // dataField: "is_approve",
      selector: row => row.is_approve,
      name: "Aprroved",
      sortable: true,
      cell: approvedRef,
    },
    {
      //dataField: "he",
      name: "Action",
      // sort: true,
      cell: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "first_name",
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
    props.getServerSidePaginationRiderAction(page, countPerPage, pageFilters)

    if (props.get_server_side_pagination_rider_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getServerSidePaginationRiderAction(page, countPerPage, pageFilters)
    }
    if (props.get_server_side_pagination_rider_loading == "Success") {
      //console.log("I am in get all permis type loading ")
      props.getRiderByIdActionFresh()
    }
  }, [
    page,
    countPerPage,
    pageFilters,
    props.get_server_side_pagination_rider_loading,
  ])

  useEffect(() => {
    if (props.get_all_rider_loading == false) {
      props.getAllRiderAction()
    }

    if (props.add_rider_loading === "Success") {
      toast.success("Rider Added Successfully")
      props.addRiderFresh()
    }

    if (props.add_rider_loading === "Failed") {
      toast.error("Something went wrong")
      props.addRiderFresh()
    }

    if (props.rider_status_edit_loading === "Success") {
      toast.success("Status Updated")
      toggleStatus()
      props.riderStatusEditFresh()
    }

    if (props.rider_status_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleStatus()
      props.riderStatusEditFresh()
    }

    if (props.rider_approved_edit_loading === "Success") {
      toast.success("Approved Status Updated")
      toggleApproved()
      props.riderApprovedEditFresh()
    }

    if (props.rider_approved_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleStatus()
      props.riderApprovedEditFresh()
    }

    if (props.rider_delete_loading === "Success") {
      //  console.log("I am in the delete")
      toast.success("Rider Deleted")
      props.riderDeleteFresh()
    }
    if (props.rider_delete_loading === "Failed") {
      toast.error("Something went wrong")
      props.riderDeleteFresh()
    }
  }, [
    props.add_rider_loading,
    props.rider_name_edit_loading,
    props.rider_delete_loading,
    props.rider_status_edit_loading,
    props.rider_approved_edit_loading,
  ])

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
            title="Users"
            breadcrumbItem="Riders"
          />

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
                      Riders{" "}
                    </CardTitle>
                    <Link to="/add-rider">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Rider
                      </Button>
                    </Link>
                  </div>

                  {/* {props.get_all_rider_data ? (
                    props.get_all_rider_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_rider_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                      />
                    ) : null
                  ) : null} */}

                  <Row className="mb-3 justify-content-center">
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label className="form-label" htmlFor="name">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter First Name"
                        name="name"
                        onChange={handleFilter}
                        value={pageFilters.name}
                      />
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-3 ">
                      <label className="form-label" htmlFor="mobile">
                        Mobile No
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        placeholder="Enter Mobile No"
                        name="mobile"
                        onChange={handleFilter}
                        value={pageFilters.mobile}
                      />
                    </Col>
                  </Row>

                  <DataTable
                    columns={activeData}
                    data={props?.get_server_side_pagination_rider_data?.data}
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_rider_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
                    progressPending={
                      !props?.get_server_side_pagination_rider_data
                    }
                    progressComponent={<CustomLoader />}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ============ delete modal starts=============== */}
        <Modal isOpen={modalDel} toggle={toggleDel} centered>
          <ModalHeader
            className="text-center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <div className="icon-box">
              <i
                className="fa red-circle fa-trash"
                style={{ color: "red", fontSize: "40px" }}
              ></i>
            </div>
            <h2>Are you sure?</h2>
          </ModalHeader>
          <ModalBody>
            Do you really want to delete these records? This process cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleDel}>
              Cancel
            </Button>{" "}
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
        {/* ============ delete modal ends=============== */}

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
            Do you want to {editInfo.is_active ? "deactivate" : "activate"} this
            record?{" "}
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

        {/* ============ status update modal starts=============== */}
        <Modal isOpen={modalApprovedUpdate} toggle={toggleApproved} centered>
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
            Do you want to {editInfo.is_approve ? "disapprove " : "approve"}{" "}
            this rider?{" "}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleApproved}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={handleApprovedUpdate}>
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
    add_rider_data,
    add_rider_error,
    add_rider_loading,

    get_all_rider_data,
    get_all_rider_error,
    get_all_rider_loading,
    rider_delete_loading,
    rider_edit_loading,
    rider_status_edit_data,
    rider_status_edit_loading,
    rider_approved_edit_data,
    rider_approved_edit_loading,

    get_server_side_pagination_rider_data,
    get_server_side_pagination_rider_loading,
  } = state.Rider

  return {
    add_rider_data,
    add_rider_error,
    add_rider_loading,

    get_all_rider_data,
    get_all_rider_error,
    get_all_rider_loading,

    rider_edit_loading,

    rider_delete_loading,

    rider_status_edit_data,
    rider_status_edit_loading,

    rider_approved_edit_data,
    rider_approved_edit_loading,

    get_server_side_pagination_rider_data,
    get_server_side_pagination_rider_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addRiderAction,
    addRiderFresh,
    getAllRiderAction,
    getAllRiderFresh,
    riderDeleteAction,
    riderDeleteFresh,
    riderStatusEditAction,
    riderEditFresh,
    riderStatusEditFresh,
    riderApprovedEditAction,
    riderApprovedEditFresh,
    getServerSidePaginationRiderAction,
    getServerSidePaginationRiderFresh,
    getRiderByIdActionFresh,
  })(Riders)
)
