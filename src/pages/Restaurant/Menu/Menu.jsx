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
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link, useNavigate } from "react-router-dom"

import DataTable from "react-data-table-component"
import CustomLoader from "components/CustomLoader/CustomLoader"
import {
  getAllRestaurantMenuItemAction,
  restaurantMenuItemDeleteAction,
  restaurantMenuItemDeleteFresh,
  restaurantMenuStatusEditAction,
  restaurantMenuStatusEditFresh,
  getMenuItemByIdActionFresh,
  getServerSidePaginationMenuItemAction,
  getServerSidePaginationMenuItemFresh,
  getTimeSLotByBranchIdFresh,
} from "store/actions"

function Menu(props) {
  const navigate = useNavigate()

  const [modalDel, setModalDel] = useState(false)
  const [deleteItem, setDeleteItem] = useState()
  const [editInfo, setEditInfo] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)

  const handleEdit = row => {
    navigate("/edit-menu", { state: row })
  }

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }

  const handleDelete = () => {
    props.restaurantMenuItemDeleteAction(deleteItem)
  }
  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary btn-sm waves-effect waves-light"
        onClick={() => handleEdit(cell)}
      >
        Edit
      </Button>{" "}
      <Button
        color="danger"
        className="btn btn-danger btn-sm waves-effect waves-light"
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
    // <p>{cell.is_active}</p>
  )

  const handleStatusModal = row => {
    setEditInfo(row)

    toggleStatus()
  }

  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const handleStatusUpdate = () => {
    // console.log(editInfo)
    props.restaurantMenuStatusEditAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }

  const activeData = [
    {
      selector: row => row.name,
      name: "Menu Name",
      sortable: true,
    },
    {
      selector: row => row.price,
      name: "Menu Price",
      sortable: true,
    },

    {
      selector: row => row.branch_name,
      name: "Restaurant",
      sortable: true,
    },

    {
      selector: row => row.is_active,
      name: "Status",
      sortable: true,
      cell: statusRef,
    },
    {
      name: "Action",
      cell: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(10)
  const [pageFilters, setPageFilters] = useState({})
  const handleFilter = e => {
    let name = e.target.name
    let value = e.target.value
    setPageFilters({ ...pageFilters, [name]: value })
  }

  useEffect(() => {
    props.getServerSidePaginationMenuItemAction(page, countPerPage, pageFilters)

    if (props.get_server_side_pagination_menu_item_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getServerSidePaginationMenuItemAction(
        page,
        countPerPage,
        pageFilters
      )
    }

    if (props.get_server_side_pagination_menu_item_loading === "Success") {
      props.getTimeSLotByBranchIdFresh()
    }
  }, [
    page,
    countPerPage,
    pageFilters,
    props.get_server_side_pagination_menu_item_loading,
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
    if (props.restaurant_menu_status_edit_loading === "Success") {
      toast.success("Status Updated")
      toggleStatus()
      props.restaurantMenuStatusEditFresh()
    }

    if (props.restaurant_menu_status_edit_loading === "False") {
      toast.error("Couldn't update")
    }

    if (props.get_all_menu_loading == false) {
      props.getAllRestaurantMenuItemAction()
    }

    if (props.get_all_menu_loading == "Success") {
      props.getMenuItemByIdActionFresh()
    }

    if (props.restaurant_menu_delete_loading === "Success") {
      //  console.log("I am in the delete")
      toast.success("Menu Deleted")
      props.restaurantMenuItemDeleteFresh()
      toggleDel()
    }
  }, [
    props.get_all_menu_loading,
    props.restaurant_menu_delete_loading,
    props.restaurant_menu_status_edit_loading,
  ])

  // console.log(props?.get_server_side_pagination_menu_item_data)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Restaurant"
            breadcrumbItem="Manage Restaurant Menu"
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
                      Menu{" "}
                    </CardTitle>
                    <Link to="/add-multi-menu">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Menu
                      </Button>
                    </Link>
                  </div>

                  {/* {props.get_all_menu_data ? (
                    props.get_all_menu_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_menu_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                        key={props.get_all_menu_data?._id}
                      />
                    ) : null
                  ) : null} */}

                  <Row className="mb-3">
                    <Col className="col-12 col-sm-4 col-md-4 ">
                      <label className="form-label" htmlFor="name">
                        Menu Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Menu Name"
                        name="name"
                        onChange={handleFilter}
                        value={pageFilters.name}
                      />
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-4 ">
                      <label className="form-label" htmlFor="price">
                        Menu Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Enter  Menu Price"
                        name="price"
                        onChange={handleFilter}
                        value={pageFilters.price}
                      />
                    </Col>
                    <Col className="col-12 col-sm-4 col-md-4 ">
                      <label className="form-label" htmlFor="branch_name">
                        Restaurant Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="branch_name"
                        placeholder="Enter Restaurant Name"
                        name="branch_name"
                        onChange={handleFilter}
                        value={pageFilters.branch_name}
                      />
                    </Col>
                  </Row>

                  <DataTable
                    columns={activeData}
                    data={
                      props?.get_server_side_pagination_menu_item_data?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_menu_item_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
                    progressPending={
                      !props?.get_server_side_pagination_menu_item_data
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
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    get_all_menu_data,
    get_all_menu_error,
    get_all_menu_loading,
    restaurant_menu_delete_loading,
    restaurant_menu_status_edit_loading,
    get_server_side_pagination_menu_item_data,
    get_server_side_pagination_menu_item_loading,
  } = state.Restaurant

  return {
    get_all_menu_data,
    get_all_menu_error,
    get_all_menu_loading,
    restaurant_menu_delete_loading,
    restaurant_menu_status_edit_loading,
    get_server_side_pagination_menu_item_data,
    get_server_side_pagination_menu_item_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllRestaurantMenuItemAction,
    restaurantMenuItemDeleteAction,
    restaurantMenuItemDeleteFresh,
    restaurantMenuStatusEditAction,
    restaurantMenuStatusEditFresh,
    getMenuItemByIdActionFresh,
    getServerSidePaginationMenuItemAction,
    getServerSidePaginationMenuItemFresh,
    getTimeSLotByBranchIdFresh,
  })(Menu)
)
