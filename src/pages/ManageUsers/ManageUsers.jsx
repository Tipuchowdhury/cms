import React, { useEffect, useState } from "react"
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
import withRouter from "components/Common/withRouter"
;` `
import { connect, useSelector } from "react-redux"
import {
  getAllAdminUsersAction,
  getAllUsersRolesAction,
  userUpdateAction,
  userUpdateFresh,
  userStatusUpdateAction,
  userStatusUpdateFresh,
  userDeleteAction,
  userDeleteFresh,
  getServerSidePaginationUserAction,
  getServerSidePaginationUserSearchAction,
  getServerSidePaginationSearchUserFresh,
} from "store/register-new/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link, useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"

function ManageUsers(props) {
  const user_update_state = useSelector(
    state => state.registerNew.user_update_loading
  )
  // console.log(user_update_state);
  const [modal, setModal] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const navigate = useNavigate()

  const [modalDel, setModalDel] = useState(false)

  const toggle = () => setModal(!modal)
  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)
  const handleEditUser = (row, cell) => {
    navigate("/edit-user", { state: cell })
  }
  const [registerInfo, setRegisterInfo] = useState({
    first_name: "",
    last_name: "",
    present_address: "",
    permanent_address: "",
    mobileNumber: "",
    image: "",
    email: "",
    id: null,
    is_active: true,
  })

  const [deleteItem, setDeleteItem] = useState()

  const handleDeleteModal = cell => {
    setDeleteItem(cell._id)
    toggleDel()
  }
  const handleDelete = () => {
    // console.log(deleteItem)
    props.userDeleteAction(deleteItem)
    // toggleDel();
  }

  const [file, setFile] = useState()
  const [addImages, setAddImages] = useState({
    image: "",
  })

  function handleChange(event) {
    let name = event.target.name
    let value = event.target.files[0]
    setFile(value)

    const reader = new FileReader()

    reader.onload = () => {
      setAddImages({ ...addImages, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  const [statusItem, setStatusItem] = useState(false)

  const [role, setRole] = useState()
  const [passwordStatus, setPasswordStatus] = useState(false)
  let name, value
  const handleInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setRegisterInfo({ ...registerInfo, [name]: value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    console.log(registerInfo)
    // console.log(role);
    if (role) {
      props.userUpdateAction(registerInfo, file, role)
    } else {
      toast.warning("Please select role")
    }
  }

  const handleStatusModal = cell => {
    //  console.log(row);
    setStatusItem(cell)

    toggleStatus()
  }

  const handleStatusUpdate = () => {
    console.log(statusItem)
    props.userStatusUpdateAction({
      ...statusItem,
      is_active: !statusItem.is_active,
    })

    // props.userStatusUpdateAction(registerInfo);
    // toggleDel();
  }
  let userData = undefined
  if (props.get_all_user_roles_data?.length > 0) {
    userData = props.get_all_user_roles_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ))
  }

  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEditUser(row, cell)}
      >
        Edit
      </Button>{" "}
      <Button
        color="danger"
        className="btn btn-danger waves-effect waves-light"
        onClick={() => handleDeleteModal(cell)}
      >
        Delete
      </Button>{" "}
    </div>
  )

  // const statusRef = (cell, row) => <Badge color={row.is_active ? "success" : "secondary"} style={{ padding: "12px" }}>{row.is_active ? "Active" : "Deactivate"}</Badge>

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
  const phoneRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.mobile_number}</span>
  )
  const activeData = [
    {
      selector: row => row.name,
      name: "User",
      sortable: true,
      cell: textRef,
    },
    {
      selector: row => row.mobile_number,
      name: "Mobile Number",
      sortable: true,
      cell: phoneRef,
    },

    {
      selector: row => row.Status,
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
      props.getServerSidePaginationUserSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchUserFresh()
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
    if (props.get_all_user_loading === false) {
      props.getAllAdminUsersAction()
    }

    props.getServerSidePaginationUserAction(page, countPerPage)

    if (props.get_all_user_roles_loading === false) {
      props.getAllUsersRolesAction()
    }

    // if (props.user_update_loading === "Success") {
    //   toast.success("User Updated")
    //   props.userUpdateFresh()
    // }

    if (props.user_status_update_loading === "Success") {
      toast.success("User Status Updated")
      toggleStatus()
      props.userStatusUpdateFresh()
    }
    if (props.user_status_update_loading === "Failed") {
      toast.error("Something went wrong")
      props.userStatusUpdateFresh()
    }

    if (props.user_delete_loading === "Success") {
      toast.success("User Deleted Successfully")
      toggleDel()
      props.userDeleteFresh()
    }
    if (props.user_delete_loading === "Failed") {
      toast.error("Something went wrong")
      props.userDeleteFresh()
    }
  }, [
    props.get_all_user_loading,
    props.get_all_user_roles_loading,
    props.user_update_loading,
    props.user_status_update_loading,
    props.user_delete_loading,
    page,
    countPerPage,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Users"
            breadcrumbItem="Manage Users"
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
                      Users{" "}
                    </CardTitle>
                    <Link to="/register">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                        onClick={toggle}
                      >
                        Add User
                      </Button>
                    </Link>
                  </div>

                  {/* {props.get_all_user_data ? props.get_all_user_data.length > 0 ? <DatatableTablesWorking products={props.get_all_user_data}
                                        columnData={activeData} defaultSorted={defaultSorted} /> : null : null} */}

                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search User"
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
                      props.get_server_side_pagination_user_search_data != null
                        ? props.get_server_side_pagination_user_search_data
                            ?.data
                        : props?.get_server_side_pagination_user_data?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_user_search_data != null
                        ? props.get_server_side_pagination_user_search_data
                            ?.count
                        : props.get_server_side_pagination_user_data?.count
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

        {/* ============ edit modal start=============== */}

        {/* ============ edit modal ends=============== */}

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
            Do you really want to update status these records?{" "}
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

//export default ManageUsers

const mapStateToProps = state => {
  const {
    get_all_user_data,
    get_all_user_error,
    get_all_user_loading,
    get_all_user_roles_data,
    get_all_user_roles_loading,

    user_update_data,
    user_update_error,
    user_update_loading,

    user_status_update_data,
    user_status_update_error,
    user_status_update_loading,

    user_delete_loading,

    get_server_side_pagination_user_data,
    get_server_side_pagination_user_search_data,
  } = state.registerNew

  return {
    get_all_user_data,
    get_all_user_error,
    get_all_user_loading,
    get_all_user_roles_data,
    get_all_user_roles_loading,

    user_update_data,
    user_update_error,
    user_update_loading,

    user_status_update_data,
    user_status_update_error,
    user_status_update_loading,

    user_delete_loading,

    get_server_side_pagination_user_data,
    get_server_side_pagination_user_search_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllAdminUsersAction,
    getAllUsersRolesAction,
    userUpdateAction,
    userUpdateFresh,
    userStatusUpdateAction,
    userStatusUpdateFresh,
    userDeleteAction,
    userDeleteFresh,
    getServerSidePaginationUserAction,
    getServerSidePaginationUserSearchAction,
    getServerSidePaginationSearchUserFresh,
  })(ManageUsers)
)
