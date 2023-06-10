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
  addCuisineAction,
  getAllCuisneAction,
  cuisineEditAction,
  cuisineStatusEditAction,
  cuisineDeleteAction,
  cuisineDeleteFresh,
  getServerSidePaginationCuisineAction,
  getServerSidePaginationCuisineSearchAction,
  getServerSidePaginationSearchCuisineFresh,
} from "store/actions"
import DataTable from "react-data-table-component"

function Cuisine(props) {
  const [name, setName] = useState()
  const [editName, setEditName] = useState()
  const [id, setId] = useState()
  const [status, setStatus] = useState()
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  const [editModal, setEditModal] = useState(false)
  const [color, setColor] = useState({
    fg: "#ffffff",
    bg: "#ffffff",
  })

  const [editColor, setEditColor] = useState({
    fg: "#ffffff",
    bg: "#ffffff",
  })
  // const toggleEditModal = () => {
  //     setAddImages({ ...addImages, image: "" });
  //     setEditModal(!editModal);
  // }
  const [file, setFile] = useState()
  const [addImages, setAddImages] = useState({
    image: "",
  })
  const [editImages, setEditImages] = useState({
    image: "",
  })

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }

  const [editInfo, setEditInfo] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const [modalDel, setModalDel] = useState(false)
  const [deleteItem, setDeleteItem] = useState()
  const toggleDel = () => setModalDel(!modalDel)

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }
  const handleDelete = () => {
    props.cuisineDeleteAction(deleteItem)
  }

  const handleStatusModal = row => {
    // console.log(row);
    setEditInfo(row)

    toggleStatus()
  }
  const handleStatusUpdate = () => {
    // console.log(editInfo)
    props.cuisineStatusEditAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })

    toggleStatus()
  }

  const handleEditName = row => {
    console.log(row)
    setId(row._id)
    setEditName(row.name)
    setStatus(row.is_active)
    setEditImages({ ...editImages, image: row.image })
    setEditColor({ ...editColor, fg: row.color.fg, bg: row.color.bg })
    toggleEditModal()
  }
  // console.log(addImages);
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

  const activeData = [
    {
      selector: row => row.name,
      name: "Cuisine Name",
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

  const handleEditFile = event => {
    let name = event.target.name
    let value = event.target.files[0]
    setFile(value)

    const reader2 = new FileReader()

    reader2.onload = () => {
      setEditImages({ ...editImages, [name]: reader2.result })
    }

    reader2.readAsDataURL(value)
  }
  const handleAddFile = event => {
    let name = event.target.name
    let value = event.target.files[0]
    setFile(value)

    const reader = new FileReader()

    reader.onload = () => {
      setAddImages({ ...addImages, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  const handleAddColors = e => {
    let name = e.target.name
    let value = e.target.value
    setColor({ ...color, [name]: value })
  }

  const handleEditColors = e => {
    let name = e.target.name
    let value = e.target.value
    setEditColor({ ...editColor, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    //console.log(name);
    console.log(color)
    const id = uuidv4()
    props.addCuisineAction(id, name, file, color)
    toggle()
    setName("")
    setFile("")
    setColor({ ...color, fg: "#ffffff", bg: "#ffffff" })
    setAddImages({ ...addImages, image: "" })
  }

  const handleEditModal = e => {
    e.preventDefault(e)
    // console.log(editName);
    props.cuisineEditAction(id, editName, status, file, editColor)
    toggleEditModal()
    setEditName("")
  }

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(10)
  const handleFilter = e => {
    if (e.target.value?.length > 0) {
      props.getServerSidePaginationCuisineSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchCuisineFresh()
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
    if (props.get_all_cuisine_loading == false) {
      props.getAllCuisneAction()
    }

    props.getServerSidePaginationCuisineAction(page, countPerPage)

    if (props.cuisine_delete_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("Cuisine Deleted")
      toggleDel()
      props.cuisineDeleteFresh()
    }
  }, [
    props.get_all_cuisine_loading,
    props.cuisine_delete_loading,
    page,
    countPerPage,
  ])

  console.log(props.get_all_cuisine_data)
  console.log(props.get_all_cuisine_loading)
  console.log(props.get_server_side_pagination_cuisine_data)
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Restaurant"
            breadcrumbItem="Cuisine"
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
                      All Cuisine{" "}
                    </CardTitle>

                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add Cuisine
                    </Button>
                  </div>

                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search Cuisine"
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
                      props.get_server_side_pagination_cuisine_search_data !=
                      null
                        ? props.get_server_side_pagination_cuisine_search_data
                            ?.data
                        : props?.get_server_side_pagination_cuisine_data?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_cuisine_search_data !=
                      null
                        ? props.get_server_side_pagination_cuisine_search_data
                            ?.count
                        : props.get_server_side_pagination_cuisine_data?.count
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
          <ModalHeader toggle={toggle}>Add Cuisine</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Cuisine Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter cuisine name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <Row>
                <div className="col-sm-6 mb-3">
                  <label className="form-label" htmlFor="fg">
                    Color Foreground
                  </label>
                  <input
                    type="color"
                    style={{ width: 100, height: 50 }}
                    className="form-control"
                    value={color.fg}
                    name="fg"
                    id="fg"
                    onChange={handleAddColors}
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="form-label" htmlFor="bg">
                    Color Background
                  </label>
                  <input
                    type="color"
                    style={{ width: 100, height: 50 }}
                    className="form-control"
                    value={color.bg}
                    name="bg"
                    id="bg"
                    onChange={handleAddColors}
                  />
                </div>
              </Row>

              <div className="mb-3">
                <label className="form-label" htmlFor="image">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  id="image"
                  onChange={handleAddFile}
                />
              </div>
              {addImages?.image && (
                <Row className="mb-3">
                  <label className="col-md-2">
                    <span></span>
                  </label>
                  <div className="col-md-10">
                    <img
                      src={addImages.image}
                      alt="preview"
                      style={{ width: "50%" }}
                    />
                  </div>
                </Row>
              )}

              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>{" "}
                <Button color="primary" type="submit">
                  Add
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

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader toggle={toggleEditModal}>Edit cuisine name</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEditModal}>
              <div className="mb-3">
                <label className="form-label" htmlFor="cuisine_name">
                  Cuisine Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cuisine_name"
                  placeholder="Enter cuisine name"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                />
              </div>
              <Row>
                <div className="col-sm-6 mb-3">
                  <label className="form-label" htmlFor="fg">
                    Color Foreground
                  </label>
                  <input
                    type="color"
                    style={{ width: 100, height: 50 }}
                    className="form-control"
                    value={editColor.fg}
                    name="fg"
                    id="fg"
                    onChange={handleEditColors}
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="form-label" htmlFor="bg">
                    Color Background
                  </label>
                  <input
                    type="color"
                    style={{ width: 100, height: 50 }}
                    className="form-control"
                    value={editColor.bg}
                    name="bg"
                    id="bg"
                    onChange={handleEditColors}
                  />
                </div>
              </Row>

              <div className="mb-3">
                <label className="form-label" htmlFor="image">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  id="image"
                  onChange={handleEditFile}
                />
              </div>
              {editImages?.image && (
                <Row className="mb-3">
                  <label className="col-md-2">
                    <span></span>
                  </label>
                  <div className="col-md-10">
                    <img
                      src={editImages.image}
                      alt="preview"
                      style={{ width: "50%" }}
                    />
                  </div>
                </Row>
              )}
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
    get_all_cuisine_data,
    get_all_cuisine_error,
    get_all_cuisine_loading,
    cuisine_delete_loading,

    get_server_side_pagination_cuisine_data,
    get_server_side_pagination_cuisine_search_data,
  } = state.Restaurant

  return {
    get_all_cuisine_data,
    get_all_cuisine_error,
    get_all_cuisine_loading,
    cuisine_delete_loading,

    get_server_side_pagination_cuisine_data,
    get_server_side_pagination_cuisine_search_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addCuisineAction,
    getAllCuisneAction,
    cuisineEditAction,
    cuisineStatusEditAction,
    cuisineDeleteAction,
    cuisineDeleteFresh,
    getServerSidePaginationCuisineAction,
    getServerSidePaginationCuisineSearchAction,
    getServerSidePaginationSearchCuisineFresh,
  })(Cuisine)
)
