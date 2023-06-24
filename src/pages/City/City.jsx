import React, { useState, useEffect } from "react"
import {
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
  Spinner,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import withRouter from "components/Common/withRouter"
;` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  addCityAction,
  addCityFresh,
  getAllCityAction,
  getAllCityFresh,
  cityNameEditAction,
  cityNameEditFresh,
  cityDeleteAction,
  cityDeleteFresh,
  cityStatusEditAction,
  cityStatusEditFresh,
  getServerSidePaginationAction,
  serverSidePaginationFresh,
  getServerSidePaginationSearchAction,
  getServerSidePaginationSearchFresh,
} from "store/zoneCity/actions"
import DataTable from "react-data-table-component"
import CustomLoader from "components/CustomLoader/CustomLoader"

function City(props) {
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [cityId, setCityId] = useState()
  const [cityname, setCityName] = useState()
  const [isActive, setIsActive] = useState()
  const [editModal, setEditModal] = useState(false)
  const [reload, setReload] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)
  const handleDelete = () => {
    toggleDel()
    props.cityDeleteAction(deleteItem)
  }

  const toggle = () => {
    //setSubmitDisabled(false)
    setModal(!modal)
  }
  const toggleEditModal = () => setEditModal(!editModal)
  const handleSubmit = e => {
    setSubmitDisabled(true)
    e.preventDefault()
    toggle()
    const val = uuidv4()
    props.addCityAction(name, val)
  }
  const handleEditCityName = (cell, row) => {
    setCityId(cell._id)
    setCityName(cell.name)
    setIsActive(cell.is_active)
    toggleEditModal()
  }
  const handleCityName = e => {
    setCityName(e.target.value)
  }

  const handleStatusModal = row => {
    // console.log(row)
    setCityId(row._id)
    setCityName(row.name)
    setIsActive(row.is_active)

    toggleStatus()
  }

  const handleStatusUpdate = e => {
    e.preventDefault()
    props.cityStatusEditAction(cityname, cityId, isActive)
    // toggleDel();
  }

  const handleEditModalSubmit = e => {
    e.preventDefault()
    toggleEditModal()
    props.cityNameEditAction(cityname, cityId, isActive)
  }
  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }
  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 5 }}>
      <Button
        color="primary"
        className="btn btn-sm waves-effect waves-light"
        onClick={() => handleEditCityName(cell, row)}
      >
        Edit
      </Button>{" "}
      <Button
        color="danger"
        className="btn btn-sm waves-effect waves-light"
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

  const textRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.name}</span>
  )

  const activeData = [
    {
      selector: row => row.name,
      name: "Name",
      sortable: true,
      cell: textRef,
    },
    {
      selector: row => row.is_active,
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

  const customStyles = {
    headCells: {
      style: {
        fontSize: "18px",
      },
    },
  }

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(10)
  const [pageFilters, setPageFilters] = useState({})
  const handleFilter = e => {
    let name = e.target.name
    let value = e.target.value
    setPageFilters({ ...pageFilters, [name]: value })
  }

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  console.log(props.get_server_side_pagination_data)

  useEffect(() => {
    if (props.get_all_city_loading == false) {
      props.getAllCityAction()
    }

    // if (props.get_server_side_pagination_loading == false) {
    //   props.getServerSidePaginationAction(page, countPerPage)
    //   props.serverSidePaginationFresh()
    // }

    props.getServerSidePaginationAction(page, countPerPage, pageFilters)

    if (props.get_server_side_pagination_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getServerSidePaginationAction(page, countPerPage, pageFilters)
    }

    if (props.add_city_loading === "Success") {
      toast.success("City Addedd Successfully")
      setName("")
      props.addCityFresh()
      setSubmitDisabled(false)
    }

    if (props.add_city_loading === "Failed") {
      toast.error("Something went wrong")
      props.addCityFresh()
      setSubmitDisabled(false)
    }

    if (props.city_name_edit_loading === "Success") {
      toast.success("City Name Updated")

      props.cityNameEditFresh()
    }

    if (props.city_status_edit_loading === "Success") {
      toast.success("City Status Updated")
      toggleStatus()
      props.cityStatusEditFresh()
    }

    if (props.city_status_edit_loading === "Failed") {
      toast.error("Something went wrong")
      props.cityStatusEditFresh()
    }

    if (props.city_delete_loading === "Success") {
      console.log("I am in the delete")
      toast.success("City Deleted")
      props.cityDeleteFresh()
    }

    // props.getServerSidePaginationAction(page, countPerPage)
  }, [
    props.add_city_loading,
    props.city_name_edit_loading,
    props.city_delete_loading,
    props.city_status_edit_loading,
    props.get_server_side_pagination_loading,
    page,
    countPerPage,
    pageFilters,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Zone & City"
            breadcrumbItem="City"
          />
          {/* <Row className="d-flex flex-row-reverse" style={{ marginBottom: "20px", alignItems: "end" }}>
                        <Col className="col-12">
                            <Button color="danger" onClick={toggle}>
                                Add City
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
                      City{" "}
                    </CardTitle>
                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add City
                    </Button>
                  </div>

                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search City"
                      name="city_name"
                      value={pageFilters.city_name}
                      style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid gray",
                      }}
                      onChange={e => handleFilter(e)}
                    />
                  </div>
                  <DataTable
                    //title="Employees"
                    columns={activeData}
                    customStyles={customStyles}
                    data={
                      props.get_server_side_pagination_data != null
                        ? props.get_server_side_pagination_data?.data
                        : props?.get_server_side_pagination_data?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_data != null
                        ? props.get_server_side_pagination_data?.count
                        : props.get_server_side_pagination_data?.count
                    }
                    paginationPerPage={countPerPage}
                    // paginationComponentOptions={{
                    //     noRowsPerPage: true,
                    //     //noRowsPerPage: false,

                    // }}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    progressPending={!props.get_server_side_pagination_loading}
                    progressComponent={<CustomLoader />}
                    onChangePage={page => setPage(page)}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Add City</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  City Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter city name"
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
                <Button disabled={submitDisabled} color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader toggle={toggleEditModal}>Edit city name</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEditModalSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username1">
                  City Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username1"
                  placeholder="Enter city name"
                  required
                  value={cityname ? cityname : ""}
                  onChange={handleCityName}
                />
              </div>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="primary" type="submit">
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={toggleEditModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
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
            Do you want to {isActive ? "deactivate" : "activate"} this record?{" "}
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
    add_city_data,
    add_city_error,
    add_city_loading,

    get_all_city_data,
    get_all_city_error,
    get_all_city_loading,

    city_name_edit_loading,
    city_status_edit_loading,
    city_delete_loading,

    get_server_side_pagination_data,
    get_server_side_pagination_loading,

    get_server_side_pagination_search_data,
    get_server_side_pagination_search_loading,
  } = state.zoneCity

  return {
    add_city_data,
    add_city_error,
    add_city_loading,

    get_all_city_data,
    get_all_city_error,
    get_all_city_loading,

    city_name_edit_loading,
    city_status_edit_loading,
    city_delete_loading,

    get_server_side_pagination_data,
    get_server_side_pagination_loading,

    get_server_side_pagination_search_data,
    get_server_side_pagination_search_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addCityAction,
    addCityFresh,
    getAllCityAction,
    getAllCityFresh,
    cityNameEditAction,
    cityNameEditFresh,
    cityDeleteAction,
    cityDeleteFresh,
    cityStatusEditAction,
    cityStatusEditFresh,
    getServerSidePaginationAction,
    serverSidePaginationFresh,
    getServerSidePaginationSearchAction,
    getServerSidePaginationSearchFresh,
  })(City)
)
