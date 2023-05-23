import React, { useEffect, useState } from "react"
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
import { ToastContainer, toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import AddZone from "./AddZone/AddZone"
import {
  getAllZoneAction,
  zoneStatusEditAction,
  zoneStatusEditActionFresh,
  zoneDeleteAction,
  zoneDeleteFresh,
  getServerSidePaginationZoneAction,
  getServerSidePaginationZoneSearchAction,
  getServerSidePaginationSearchZoneFresh,
  getZoneByIdAction,
} from "store/actions"
import withRouter from "components/Common/withRouter"
import { connect } from "react-redux"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import DataTable from "react-data-table-component"

function Zone(props) {
  const [modalDel, setModalDel] = useState(false)
  const [editInfo, setEditInfo] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const [deleteItem, setDeleteItem] = useState()

  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)
  const toggleDel = () => setModalDel(!modalDel)

  const handleStatusModal = (row, cell) => {
    console.log(row)
    console.log(cell)
    //setEditInfo(row)
    setEditInfo(cell)

    toggleStatus()
  }

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }

  const handleStatusUpdate = () => {
    console.log(editInfo)

    props.zoneStatusEditAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }
  const navigate = useNavigate()
  const handleEdit = (row, cell) => {
    console.log(row)
    console.log(cell)

    //props.getZoneByIdAction(cell._id)
    navigate("/edit-zone", { state: cell })
  }

  const handleDelete = () => {
    // console.log(deleteItem)
    props.zoneDeleteAction(deleteItem)
    // toggleDel();
  }
  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEdit(row, cell)}
      >
        Edit
      </Button>{" "}
      <Button
        color="danger"
        className="btn btn-danger waves-effect waves-light"
        onClick={() => handleDeleteModal(row)}
      >
        Delete
      </Button>{" "}
    </div>
  )

  const statusRef = (cell, row) => (
    <Button
      color={cell.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(row, cell)}
    >
      {cell.is_active ? "Active" : "Deactivate"}
    </Button>
  )
  const textRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.name}</span>
  )
  const activeData = [
    {
      selector: row => row.name,
      name: "Area Name",
      sortable: true,
      cell: textRef,
    },
    {
      selector: row => "",
      name: "Status",
      sortable: true,
      cell: statusRef,
    },
    {
      selector: row => "",
      name: "Action",
      sortable: true,
      cell: actionRef,
    },
  ]

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(10)
  const handleFilter = e => {
    if (e.target.value?.length > 0) {
      props.getServerSidePaginationZoneSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchZoneFresh()
    }
  }

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  useEffect(() => {
    if (props.get_all_zone_loading == false) {
      props.getAllZoneAction()
    }

    props.getServerSidePaginationZoneAction(page, countPerPage)

    if (props.edit_zone_status_loading == "Success") {
      toast.success("Zone Status Updated Successfully")
      toggleStatus()
      props.zoneStatusEditActionFresh()
    }
    if (props.edit_zone_status_loading == "Failed") {
      toast.error("Something went wrong")
      // toggleStatus();
      props.zoneStatusEditActionFresh()
    }

    if (props.zone_delete_loading == "Success") {
      toast.success("Zone Deleted Successfully")
      toggleDel()
      props.zoneDeleteFresh()
    }
    if (props.zone_delete_loading == "Failed") {
      toast.error("Something went wrong")
      // toggleStatus();
      props.zoneDeleteFresh()
    }
  }, [
    props.get_all_zone_loading,
    props.edit_zone_status_loading,
    props.zone_delete_loading,
    props.get_server_side_pagination_zone_loading,
    page,
    countPerPage,
  ])

  console.log(props.get_all_zone_data)
  console.log(page)
  console.log(props.get_server_side_pagination_zone_data)
  console.log(props.get_server_side_pagination_zone_search_data)
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Zone & City"
            breadcrumbItem="Zone"
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
                      Zone{" "}
                    </CardTitle>
                    <Link to="/add-zone">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Zone
                      </Button>
                    </Link>
                  </div>
                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search Zone"
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid gray",
                      }}
                      onChange={e => handleFilter(e)}
                    />
                  </div>
                  <DataTable
                    columns={activeData}
                    data={
                      props.get_server_side_pagination_zone_search_data != null
                        ? props.get_server_side_pagination_zone_search_data
                            ?.data
                        : props?.get_server_side_pagination_zone_data?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_zone_search_data != null
                        ? props.get_server_side_pagination_zone_search_data
                            ?.count
                        : props.get_server_side_pagination_zone_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
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
            Are you sure?
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
      </div>
    </React.Fragment>
  )
}

//export default Zone

const mapStateToProps = state => {
  const {
    get_all_zone_data,
    get_all_zone_error,
    get_all_zone_loading,
    edit_zone_status_loading,
    zone_delete_loading,
    get_server_side_pagination_zone_data,
    get_server_side_pagination_zone_loading,
    get_server_side_pagination_zone_search_data,
  } = state.Restaurant
  return {
    get_all_zone_data,
    get_all_zone_error,
    get_all_zone_loading,
    edit_zone_status_loading,
    zone_delete_loading,
    get_server_side_pagination_zone_data,
    get_server_side_pagination_zone_loading,
    get_server_side_pagination_zone_search_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllZoneAction,
    zoneStatusEditAction,
    zoneStatusEditActionFresh,
    zoneDeleteAction,
    zoneDeleteFresh,
    getServerSidePaginationZoneAction,
    getServerSidePaginationZoneSearchAction,
    getServerSidePaginationSearchZoneFresh,
    getZoneByIdAction,
  })(Zone)
)
