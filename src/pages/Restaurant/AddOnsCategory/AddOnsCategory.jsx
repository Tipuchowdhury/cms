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
  getAllAddOnsCategoryAction,
  addOnCategoryDeleteAction,
  addOnCategoryDeleteFresh,
  addOnCategoryStatusEditAction,
  addOnCategoryStatusEditActionFresh,
  getServerSidePaginationAddOnsCategoryAction,
  getServerSidePaginationAddOnsCategorySearchAction,
  getServerSidePaginationSearchAddOnsCategoryFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link, useNavigate } from "react-router-dom"
import DataTable from "react-data-table-component"

function AddOnsCategory(props) {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [restaurantId, setId] = useState()
  const [restaurantName, setRestaurantName] = useState()
  const [editModal, setEditModal] = useState(false)

  const [statusItem, setStatusItem] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const handleStatusModal = row => {
    //  console.log(row);
    setStatusItem(row)
    toggleStatus()
  }

  const handleStatusUpdate = () => {
    props.addOnCategoryStatusEditAction({
      ...statusItem,
      is_active: !statusItem.is_active,
    })
  }

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)
  const handleDelete = () => {
    // toggleDel();
    console.log(deleteItem)
    props.addOnCategoryDeleteAction(deleteItem)
  }

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    const val = uuidv4()
    console.log(name)
    console.log(val)
    props.restaurantAddAction(name, val)
    setName("")
  }
  const handleEdit = row => {
    console.log(row)
    navigate("/category-addons", { state: row })
  }

  const handleNameChange = e => {
    setRestaurantName(e.target.value)
  }

  const handleEditModalSubmit = e => {
    e.preventDefault()
    toggleEditModal()
    console.log(restaurantName)
    console.log(restaurantId)
    props.restaurantNameUpdateAction(restaurantName, restaurantId)
  }
  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
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

  // const statusRef = (cell, row) => <Badge color="success" style={{ padding: "8px" }}>Activate</Badge>

  const statusRef = (cell, row) => (
    <Button
      color={row.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(row)}
    >
      {row.is_active ? "Active" : "Deactivate"}
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
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(10)
  const handleFilter = e => {
    if (e.target.value?.length > 0) {
      props.getServerSidePaginationAddOnsCategorySearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchAddOnsCategoryFresh()
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
    if (props.get_all_addOns_category_loading == false) {
      props.getAllAddOnsCategoryAction()
    }

    props.getServerSidePaginationAddOnsCategoryAction(page, countPerPage)

    if (props.add_on_category_delete_loading === "Success") {
      toast.success("ADD on Category Deleted Successfully")
      toggleDel()
      props.addOnCategoryDeleteFresh()
    }
    if (props.edit_add_on_category_status_loading === "Success") {
      toast.success("ADD on Category Status Updated")
      toggleStatus()
      props.addOnCategoryStatusEditActionFresh()
    }

    if (props.edit_add_on_category_status_loading === "Failed") {
      toast.error("Something went wrong")
      props.addOnCategoryStatusEditActionFresh()
    }
  }, [
    props.get_all_addOns_category_loading,
    props.add_on_category_delete_loading,
    props.edit_add_on_category_status_loading,
    page,
    countPerPage,
  ])

  // console.log(props.get_all_addOns_category_data);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Restaurant"
            breadcrumbItem="Add-ons Category"
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
                      Add-ons Category{" "}
                    </CardTitle>
                    <Link to="/category-addons">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add
                      </Button>
                    </Link>
                  </div>

                  {/* {props.get_all_addOns_category_data ? props.get_all_addOns_category_data.length > 0 ? <DatatableTablesWorking products={props.get_all_addOns_category_data}
                                        columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_addOns_category_data?._id} /> : null : null} */}
                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search category"
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
                      props.get_server_side_pagination_addOns_category_search_data !=
                      null
                        ? props
                            .get_server_side_pagination_addOns_category_search_data
                            ?.data
                        : props?.get_server_side_pagination_addOns_category_data
                            ?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_addOns_category_search_data !=
                      null
                        ? props
                            .get_server_side_pagination_addOns_category_search_data
                            ?.count
                        : props.get_server_side_pagination_addOns_category_data
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
                <label className="form-label" htmlFor="username">
                  Restaurant Name
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

const mapStateToProps = state => {
  const {
    get_all_addOns_category_data,
    get_all_addOns_category_error,
    get_all_addOns_category_loading,
    add_on_category_delete_loading,
    edit_add_on_category_status_loading,
    get_server_side_pagination_addOns_category_data,
    get_server_side_pagination_addOns_category_search_data,
  } = state.Restaurant

  return {
    get_all_addOns_category_data,
    get_all_addOns_category_error,
    get_all_addOns_category_loading,
    add_on_category_delete_loading,
    edit_add_on_category_status_loading,
    get_server_side_pagination_addOns_category_data,
    get_server_side_pagination_addOns_category_search_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllAddOnsCategoryAction,
    addOnCategoryDeleteAction,
    addOnCategoryDeleteFresh,
    addOnCategoryStatusEditAction,
    addOnCategoryStatusEditActionFresh,
    getServerSidePaginationAddOnsCategoryAction,
    getServerSidePaginationAddOnsCategorySearchAction,
    getServerSidePaginationSearchAddOnsCategoryFresh,
  })(AddOnsCategory)
)
