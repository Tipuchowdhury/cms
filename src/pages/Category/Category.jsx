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
  addCategoryAction,
  addCategoryFresh,
  getAllCategoryAction,
  getAllCategoryFresh,
  categoryNameEditAction,
  categoryNameEditFresh,
  categoryDeleteAction,
  categoryDeleteFresh,
} from "store/Category/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"

function Category(props) {
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [categoryId, setCategoryId] = useState()
  const [categoryname, setCategoryName] = useState()
  const [editModal, setEditModal] = useState(false)
  const [reload, setReload] = useState(false)

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [modalDel, setModalDel] = useState(false)

  const toggleDel = () => setModalDel(!modalDel)
  const handleDelete = () => {
    toggleDel()
    console.log(deleteItem)
    props.categoryDeleteAction(deleteItem)
  }

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const handleSubmit = e => {
    e.preventDefault()
    toggle()
    const val = uuidv4()
    console.log(name)
    console.log(val)
    props.addCategoryAction(name, val)
  }
  const handleEditCategoryName = row => {
    console.log(row)
    setCategoryId(row._id)
    setCategoryName(row.name)
    toggleEditModal()
  }
  const handleCategoryName = e => {
    setCategoryName(e.target.value)
  }

  const handleEditModalSubmit = e => {
    e.preventDefault()
    toggleEditModal()
    console.log(categoryname)
    console.log(categoryId)
    props.categoryNameEditAction(categoryname, categoryId)
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
        onClick={() => handleEditCategoryName(row)}
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

  // const statusRef = (cell, row) => (
  //   <Badge color="secondary" style={{ padding: "12px" }}>
  //     Deactivate
  //   </Badge>
  // )

  const statusRef = (cell, row) => <Badge color={row.is_active ? "success" : "secondary"} style={{ padding: "12px" }}>{row.is_active ? "Active" : "Deactivate"}</Badge>

  console.log(props.add_category_loading)
  console.log(props.get_all_category_data)
  console.log(props.category_name_edit_loading)
  console.log(props.get_all_category_loading)

  const activeData = [
    {
      dataField: "category_name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "is_active",
      text: "Status",
      sort: true,
      formatter: statusRef,
    },
    {
      //dataField: "he",
      text: "Action",
      sort: true,
      formatter: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  useEffect(() => {
    console.log("=======hello", props.category_name_edit_loading)
    if (props.get_all_category_loading == false) {
      console.log("I am in get all category loading ")
      props.getAllCategoryAction()
    }

    if (props.add_category_loading === "Success") {
      toast.success("Category Addedd Successfully")
      props.addCategoryFresh()
    }

    if (props.add_category_loading === "Failed") {
      toast.error("Something went wrong")
      props.addCategoryFresh()
    }

    if (props.category_name_edit_loading === "Success") {
      toast.success("Category Name Updated")
      props.categoryNameEditFresh()
    }

    if (props.category_delete_loading === "Success") {
      console.log("I am in the delete")
      toast.success("Category Deleted")
      props.categoryDeleteFresh()
    }
  }, [
    props.add_category_loading,
    props.category_name_edit_loading,
    props.category_delete_loading,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Category"
            breadcrumbItem="Category"
          />
          {/* <Row className="d-flex flex-row-reverse" style={{ marginBottom: "20px", alignItems: "end" }}>
                        <Col className="col-12">
                            <Button color="danger" onClick={toggle}>
                                Add Category
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
                      Category{" "}
                    </CardTitle>
                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add Category
                    </Button>
                  </div>

                  {props.get_all_category_data ? (
                    props.get_all_category_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_category_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                      />
                    ) : null
                  ) : null}
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
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter category name"
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
          <ModalHeader toggle={toggleEditModal}>Edit category name</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEditModalSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username1">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username1"
                  placeholder="Enter category name"
                  required
                  value={categoryname ? categoryname : ""}
                  onChange={handleCategoryName}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="username1">
                  Image
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username1"
                  placeholder="Enter category name"
                  required
                  value={categoryname ? categoryname : ""}
                  onChange={handleCategoryName}
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
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    add_category_data,
    add_category_error,
    add_category_loading,

    get_all_category_data,
    get_all_category_error,
    get_all_category_loading,

    category_name_edit_loading,
    category_delete_loading,
  } = state.Category

  return {
    add_category_data,
    add_category_error,
    add_category_loading,

    get_all_category_data,
    get_all_category_error,
    get_all_category_loading,

    category_name_edit_loading,
    category_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addCategoryAction,
    addCategoryFresh,
    getAllCategoryAction,
    getAllCategoryFresh,
    categoryNameEditAction,
    categoryNameEditFresh,
    categoryDeleteAction,
    categoryDeleteFresh,
  })(Category)
)
