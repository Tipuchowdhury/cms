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
import withRouter from "components/Common/withRouter"
;` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  restaurantAddAction,
  restaurantNameUpdateAction,
  restaurantStatusUpdateAction,
  restaurantDeleteAction,
  restaurantDeleteFresh,
  getServerSidePaginationRestaurantAction,
  getServerSidePaginationRestaurantSearchAction,
  getServerSidePaginationSearchRestaurantFresh,
  getRestaurantByIdFresh,
  restaurantStatusUpdateActionFresh,
} from "store/actions"
import DataTable from "react-data-table-component"
import { useNavigate } from "react-router-dom"

function Restaurant(props) {
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [restaurantId, setId] = useState()
  const [restaurantName, setRestaurantName] = useState()
  const [isActive, setIsActive] = useState()
  const [editModal, setEditModal] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)

  const navigate = useNavigate()

  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const handleDelete = () => {
    // toggleDel();
    props.restaurantDeleteAction(deleteItem)
  }

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    const val = uuidv4()
    props.restaurantAddAction(name, val)
    setName("")
  }
  const handleEditName = cell => {
    props.getRestaurantByIdFresh()

    navigate("/edit-restaurant", { state: cell })
  }
  const handleNameChange = e => {
    setRestaurantName(e.target.value)
  }

  const handleEditModalSubmit = e => {
    e.preventDefault()
    toggleEditModal()
    props.restaurantNameUpdateAction(restaurantName, restaurantId, isActive)
  }
  const handleDeleteModal = cell => {
    setDeleteItem(cell._id)
    toggleDel()
  }

  const handleStatusModal = cell => {
    setId(cell._id)
    setRestaurantName(cell.name)
    setIsActive(cell.is_active)

    toggleStatus()
  }

  const handleStatusUpdate = () => {
    // console.log(statusItem);
    props.restaurantStatusUpdateAction(restaurantId, isActive)
    toggleStatus()
  }
  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEditName(cell)}
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

  const statusRef = cell => (
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
  const activeData = [
    {
      selector: row => row.name,
      name: "Name",
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
      props.getServerSidePaginationRestaurantSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchRestaurantFresh()
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
    if (props.restaurant_status_update_loading === "Success") {
      props.getServerSidePaginationRestaurantAction(page, countPerPage)
      props.restaurantStatusUpdateActionFresh()
    }
  }, [props.restaurant_status_update_loading])

  useEffect(() => {
    props.getServerSidePaginationRestaurantAction(page, countPerPage)

    if (props.restaurant_delete_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("Restaurant Deleted")
      toggleDel()
      props.restaurantDeleteFresh()
    }
  }, [props.restaurant_delete_loading, page, countPerPage])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Restaurant"
            breadcrumbItem="Manage Restaurant"
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
                      Restaurant{" "}
                    </CardTitle>
                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={() => {
                        props.getRestaurantByIdFresh()
                        navigate("/add-restaurant")
                      }}
                    >
                      Add Restaurant
                    </Button>
                  </div>

                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search Restaurant"
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
                      props.get_server_side_pagination_restaurant_search_data !=
                      null
                        ? props
                            .get_server_side_pagination_restaurant_search_data
                            ?.data
                        : props?.get_server_side_pagination_restaurant_data
                            ?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_restaurant_search_data !=
                      null
                        ? props
                            .get_server_side_pagination_restaurant_search_data
                            ?.count
                        : props.get_server_side_pagination_restaurant_data
                            ?.count
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
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Add Restaurant</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Restaurant Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter restaurant name"
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

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader toggle={toggleEditModal}>
            Edit Restaurant name
          </ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEditModalSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Restaurant Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter restaurant name"
                  required
                  value={restaurantName ? restaurantName : ""}
                  onChange={handleNameChange}
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
    add_restaurant_data,
    add_restaurant_error,
    add_restaurant_loading,

    get_all_restaurant_data,
    get_all_restaurant_loading,

    restaurant_delete_loading,
    get_server_side_pagination_restaurant_data,
    get_server_side_pagination_restaurant_loading,
    get_server_side_pagination_restaurant_search_data,

    // restaurant_name_update_data,
    // restaurant_name_update_error,
    // restaurant_name_update_loading,

    restaurant_status_update_data,
    restaurant_status_update_error,
    restaurant_status_update_loading,
  } = state.Restaurant

  return {
    add_restaurant_data,
    add_restaurant_error,
    add_restaurant_loading,

    get_all_restaurant_data,
    get_all_restaurant_loading,

    restaurant_delete_loading,
    get_server_side_pagination_restaurant_data,
    get_server_side_pagination_restaurant_loading,
    get_server_side_pagination_restaurant_search_data,

    // restaurant_name_update_data,
    // restaurant_name_update_error,
    // restaurant_name_update_loading,

    restaurant_status_update_data,
    restaurant_status_update_error,
    restaurant_status_update_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    restaurantAddAction,
    restaurantNameUpdateAction,
    restaurantStatusUpdateAction,
    restaurantDeleteAction,
    restaurantDeleteFresh,
    getServerSidePaginationRestaurantAction,
    getServerSidePaginationRestaurantSearchAction,
    getServerSidePaginationSearchRestaurantFresh,
    getRestaurantByIdFresh,
    restaurantStatusUpdateActionFresh,
  })(Restaurant)
)
