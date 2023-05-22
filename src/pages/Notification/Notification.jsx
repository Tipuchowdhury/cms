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
  ; ` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  addNotificationAction,
  addNotificationFresh,
  getAllNotificationAction,
  getAllNotificationFresh,
  notificationDeleteAction,
  notificationDeleteFresh,
  notificationEditAction,
  notificationEditFresh,
  notificationStatusEditAction,
  notificationStatusEditFresh,
  getServerSidePaginationNotificationAction,
  getServerSidePaginationNotificationSearchAction,
  getServerSidePaginationSearchNotificationFresh
} from "store/Notification/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import DataTable from 'react-data-table-component';

function Notification(props) {
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [notificationId, setNotificationId] = useState()
  const [notificationname, setNotificationName] = useState()
  const [editInfo, setEditInfo] = useState(false)
  const [reload, setReload] = useState(false)
  const navigate = useNavigate()

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)
  const handleDelete = () => {
    toggleDel()
    // console.log(deleteItem)
    props.notificationDeleteAction(deleteItem)
  }
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const toggle = () => setModal(!modal)
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    const val = uuidv4()
    // console.log(name)
    // console.log(val)
    props.addNotificationAction(name, val)
  }

  const handleEdit = row => {
    navigate("/add-notification", { state: row })
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

  const handleStatusUpdate = () => {
    // console.log(editInfo)
    props.notificationStatusEditAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }
  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEdit(row)}
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
      color={row.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(row)}
    >
      {row.is_active ? "Active" : "Deactivate"}
    </Button>
  )

  // console.log(props.add_notification_loading)
  // console.log(props.get_all_notification_data)
  // console.log(props.notification_name_edit_loading)
  // console.log(props.get_all_notification_loading)

  const activeData = [
    {
      selector: row => row.title,
      name: "Title",
      sortable: true,
    },
    {
      selector: row => row.is_active,
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
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(1);
  const handleFilter = (e) => {
    if (e.target.value?.length > 0) {
      props.getServerSidePaginationNotificationSearchAction(e.target.value);
    } else {
      props.getServerSidePaginationSearchNotificationFresh();
    }

  }
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log(newPerPage, page);
    setCountPerPage(newPerPage);
  };

  useEffect(() => {
    // console.log("=======hello", props.notification_name_edit_loading)
    if (props.get_all_notification_loading == false) {
      //  console.log("I am in get all notification loading ")
      props.getAllNotificationAction()
    }

    props.getServerSidePaginationNotificationAction(page, countPerPage)

    if (props.add_notification_loading === "Success") {
      toast.success("Notification Added Successfully")
      props.addNotificationFresh()
    }

    if (props.add_notification_loading === "Failed") {
      toast.error("Something went wrong")
      props.addNotificationFresh()
    }

    if (props.notification_status_edit_loading === "Success") {
      toast.success("Status Updated")
      toggleStatus()
      props.notificationStatusEditFresh()
    }

    if (props.notification_delete_loading === "Success") {
      //  console.log("I am in the delete")
      toast.success("Notification Deleted")
      props.notificationDeleteFresh()
    }
  }, [
    props.add_notification_loading,
    props.notification_name_edit_loading,
    props.notification_delete_loading,
    props.notification_status_edit_loading,
    page, countPerPage
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Notification"
            breadcrumbItem="Notification"
          />
          {/* <Row className="d-flex flex-row-reverse" style={{ marginBottom: "20px", alignItems: "end" }}>
                        <Col className="col-12">
                            <Button color="danger" onClick={toggle}>
                                Add Notification
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
                      Notification{" "}
                    </CardTitle>
                    <Link to="/add-notification">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Notification
                      </Button>
                    </Link>
                  </div>

                  {/* {props.get_all_notification_data ? (
                    props.get_all_notification_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_notification_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                      />
                    ) : null
                  ) : null} */}
                  <div className='text-end'><input type='text' placeholder="Search Notification" style={{ padding: "10px", borderRadius: "8px", border: "1px solid gray" }} onChange={(e) => handleFilter(e)} /></div>
                  <DataTable
                    columns={activeData}
                    data={props.get_server_side_pagination_notification_search_data != null ? props.get_server_side_pagination_notification_search_data?.data : props?.get_server_side_pagination_notification_data?.data}
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={props.get_server_side_pagination_notification_search_data != null ? props.get_server_side_pagination_notification_search_data?.count : props.get_server_side_pagination_notification_data?.count}
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}

                    onChangePage={(page) => setPage(page)}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Notification Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter notification name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
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
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    add_notification_data,
    add_notification_error,
    add_notification_loading,

    get_all_notification_data,
    get_all_notification_error,
    get_all_notification_loading,
    notification_delete_loading,
    notification_edit_loading,
    notification_status_edit_data,
    notification_status_edit_loading,

    get_server_side_pagination_notification_data,
    get_server_side_pagination_notification_search_data
  } = state.Notification

  return {
    add_notification_data,
    add_notification_error,
    add_notification_loading,

    get_all_notification_data,
    get_all_notification_error,
    get_all_notification_loading,
    notification_edit_loading,
    notification_delete_loading,
    notification_status_edit_data,
    notification_status_edit_loading,

    get_server_side_pagination_notification_data,
    get_server_side_pagination_notification_search_data
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addNotificationAction,
    addNotificationFresh,
    getAllNotificationAction,
    getAllNotificationFresh,
    notificationDeleteAction,
    notificationDeleteFresh,
    notificationStatusEditAction,
    notificationEditFresh,
    notificationStatusEditFresh,
    getServerSidePaginationNotificationAction,
    getServerSidePaginationNotificationSearchAction,
    getServerSidePaginationSearchNotificationFresh
  })(Notification)
)
