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
;` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link, useNavigate } from "react-router-dom"
import {
  getAllRestaurantMenuItemAction,
  getServerSidePaginationMenuAction,
  getServerSidePaginationMenuSearchAction,
  getServerSidePaginationSearchMenuFresh,
  restaurantMenuItemDeleteAction,
  restaurantMenuItemDeleteFresh,
  restaurantMenuStatusEditAction,
  restaurantMenuStatusEditFresh,
} from "store/actions"
import DataTable from "react-data-table-component"

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
  const priceRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.price}</span>
  )

  const handleStatusModal = cell => {
    // console.log(row);
    setEditInfo(cell)

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
      name: "Title",
      sortable: true,
      cell: textRef,
    },
    {
      selector: row => row.price,
      name: "Price",
      sortable: true,
      cell: priceRef,
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
      props.getServerSidePaginationMenuSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchMenuFresh()
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
    props.getServerSidePaginationMenuAction(page, countPerPage)

    if (props.restaurant_menu_delete_loading === "Success") {
      //  console.log("I am in the delete")
      toast.success("Menu Deleted")
      props.restaurantMenuItemDeleteFresh()
      toggleDel()
    }
  }, [
    props.get_all_menu_loading,

    props.restaurant_menu_delete_loading,
    page,
    countPerPage,
    ,
    props.restaurant_menu_status_edit_loading,
  ])

  console.log(props.get_all_menu_data)
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
                    <Link to="/add-menu">
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
                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search Menu"
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
                      props.get_server_side_pagination_menu_search_data != null
                        ? props.get_server_side_pagination_menu_search_data
                            ?.data
                        : props?.get_server_side_pagination_menu_data?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_menu_search_data != null
                        ? props.get_server_side_pagination_menu_search_data
                            ?.count
                        : props.get_server_side_pagination_menu_data?.count
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
    get_server_side_pagination_menu_data,
    get_server_side_pagination_menu_search_data,
    restaurant_menu_delete_loading,
    restaurant_menu_status_edit_loading,
  } = state.Restaurant

  return {
    get_all_menu_data,
    get_all_menu_error,
    get_all_menu_loading,
    get_server_side_pagination_menu_data,
    get_server_side_pagination_menu_search_data,
    restaurant_menu_delete_loading,
    restaurant_menu_status_edit_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllRestaurantMenuItemAction,
    getServerSidePaginationMenuAction,
    getServerSidePaginationMenuSearchAction,
    getServerSidePaginationSearchMenuFresh,
    restaurantMenuItemDeleteAction,
    restaurantMenuItemDeleteFresh,
    restaurantMenuStatusEditAction,
    restaurantMenuStatusEditFresh,
  })(Menu)
)
