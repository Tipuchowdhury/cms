import React, { useState, useEffect } from "react"
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
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  addFaqAction,
  addFaqFresh,
  faqUpdateAction,
  faqUpdateFresh,
  faqStatusUpdateAction,
  faqStatusUpdateFresh,
  faqDeleteAction,
  faqDeleteFresh,
  getServerSidePaginationFaqAction,
  getServerSidePaginationFaqFresh,
} from "store/actions"
import DataTable from "react-data-table-component"
import CustomLoader from "components/CustomLoader/CustomLoader"

function Faq(props) {
  const [modal, setModal] = useState(false)

  const [editModal, setEditModal] = useState(false)

  const [addInfo, setAddInfo] = useState({
    question: "",
    answer: "",
    is_delivery: false,
    is_dine: false,
    is_pickup: false,
    is_active: true,
  })

  const toggle = () => setModal(!modal)

  const handleStatusModal = row => {
    // console.log(row);
    setEditInfo(row)

    toggleStatus()
  }

  const [editInfo, setEditInfo] = useState({
    _id: "",
    question: "",
    answer: "",
    is_delivery: false,
    is_dine: false,
    is_pickup: false,
    is_active: true,
  })

  const toggleEditModal = () => {
    setEditModal(!editModal)
  }

  const handleEdit = row => {
    setEditInfo({
      ...editInfo,
      _id: row._id,
      question: row.question,
      answer: row.answer,
      is_active: row.is_active,
      is_delivery: row.is_delivery,
      is_pickup: row.is_pickup,
      is_dine: row.is_dine,
    })

    toggleEditModal()
  }

  const handleEditSubmit = e => {
    e.preventDefault(e)
    // console.log(editName);
    props.faqUpdateAction(editInfo)
  }

  let name, value, checked

  const handleAddInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setAddInfo({ ...addInfo, [name]: value })
  }

  const handleEditInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setEditInfo({ ...editInfo, [name]: value })
  }

  const handleCheckBox = e => {
    // console.log(e);
    name = e.target.name
    checked = e.target.checked
    setAddInfo({ ...addInfo, [name]: checked })
  }

  const handleEditCheckBox = e => {
    // console.log(e);
    name = e.target.name
    checked = e.target.checked
    setEditInfo({ ...editInfo, [name]: checked })
  }

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
    props.faqDeleteAction(deleteItem)
  }

  const handleStatusUpdate = () => {
    // console.log(editInfo)
    props.faqStatusUpdateAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }

  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEdit(cell)}
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

  const activeData = [
    {
      selector: row => row.question,
      name: "Question",
      sortable: true,
      // cell: textRef,
    },
    {
      selector: row => row.answer,
      name: "Answer",
      sortable: true,
      // cell: textRef,
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

  const handleSubmit = e => {
    e.preventDefault()

    props.addFaqAction(addInfo)
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

  // const handleCheckedFilter = e => {
  //   let name = e.target.name
  //   let checked = e.target.checked
  //   setPageFilters({ ...pageFilters, [name]: checked })
  // }
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  useEffect(() => {
    props.getServerSidePaginationFaqAction(page, countPerPage, pageFilters)
    if (props.get_server_side_pagination_faq_loading == false) {
      //console.log("I am in get all permis type loading ")
      props.getServerSidePaginationFaqAction(page, countPerPage, pageFilters)
    }
  }, [
    page,
    countPerPage,
    pageFilters,
    props.get_server_side_pagination_faq_loading,
  ])

  useEffect(() => {
    if (props.add_faq_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("FAQ added successfully")
      toggle()
      setAddInfo({})
      props.addFaqFresh()
    }

    if (props.add_faq_loading === "Failed") {
      toast.error("Something went wrong")
      props.addFaqFresh()
    }

    if (props.faq_edit_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("FAQ edited successfully")
      toggleEditModal()
      props.faqUpdateFresh()
    }

    if (props.faq_edit_loading === "Failed") {
      toast.error("Something went wrong")
      props.faqUpdateFresh()
    }

    if (props.faq_status_edit_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("FAQ status updated")
      toggleStatus()
      props.faqStatusUpdateFresh()
    }

    if (props.faq_status_edit_loading === "Failed") {
      toast.error("Something went wrong")
      props.faqStatusUpdateFresh()
    }

    if (props.faq_delete_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("FAQ Deleted")
      toggleDel()
      props.faqDeleteFresh()
    }

    if (props.faq_delete_loading === "Failed") {
      toast.error("Something went wrong")
      props.faqDeleteFresh()
    }
  }, [
    props.add_faq_loading,
    props.faq_edit_loading,
    props.faq_status_edit_loading,
    props.faq_delete_loading,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs maintitle="Foodi" title="FAQ" breadcrumbItem="FAQ" />
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
                      All FAQS{" "}
                    </CardTitle>

                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add FAQ
                    </Button>
                  </div>

                  <Row className="mb-3 justify-content-center">
                    <Col className="col-12 col-sm-12 col-md-12 mb-3">
                      <label className="form-label" htmlFor="question">
                        Question
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="question"
                        placeholder="Enter question"
                        name="question"
                        onChange={handleFilter}
                        value={pageFilters.question}
                      />
                    </Col>

                    <Col className="col-12 col-sm-12 col-md-4 ">
                      <label className="form-label" htmlFor="is_delivery">
                        Delivery
                      </label>
                      <Input
                        id="is_delivery"
                        name="is_delivery"
                        className="form-control"
                        onChange={handleFilter}
                        value={pageFilters.is_delivery}
                        type="select"
                      >
                        <option value="">Choose </option>
                        <option value="true">True </option>
                        <option value="false">False </option>
                      </Input>
                    </Col>

                    <Col className="col-12 col-sm-12 col-md-4 ">
                      <label className="form-label" htmlFor="is_pickup">
                        Pickup
                      </label>
                      <Input
                        id="is_pickup"
                        name="is_pickup"
                        className="form-control"
                        onChange={handleFilter}
                        value={pageFilters.is_pickup}
                        type="select"
                      >
                        <option value="">Choose </option>
                        <option value="true">True </option>
                        <option value="false">False </option>
                      </Input>
                    </Col>

                    <Col className="col-12 col-sm-12 col-md-4 ">
                      <label className="form-label" htmlFor="is_dine">
                        Dine In
                      </label>
                      <Input
                        id="is_dine"
                        name="is_dine"
                        className="form-control"
                        onChange={handleFilter}
                        value={pageFilters.is_dine}
                        type="select"
                      >
                        <option value="">Choose </option>
                        <option value="true">True </option>
                        <option value="false">False </option>
                      </Input>
                    </Col>
                  </Row>

                  <DataTable
                    columns={activeData}
                    data={props?.get_server_side_pagination_faq_data?.faqs}
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props?.get_server_side_pagination_faq_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => setPage(page)}
                    progressPending={
                      !props?.get_server_side_pagination_faq_data
                    }
                    progressComponent={<CustomLoader />}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ============ create modal start=============== */}
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Add FAQ</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="question">
                  Question <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  name="question"
                  placeholder="Enter question"
                  required
                  value={addInfo.question}
                  onChange={handleAddInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="answer">
                  Answer <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="answer"
                  name="answer"
                  placeholder="Enter answer"
                  required
                  value={addInfo.answer}
                  onChange={handleAddInputs}
                ></textarea>
              </div>

              <Row className="mb-3">
                <div className="col-sm-4">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="is_delivery">
                      Delivery
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_delivery"
                      checked={addInfo.is_delivery}
                      name="is_delivery"
                      onChange={handleCheckBox}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="is_pickup">
                      Pickup
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_pickup"
                      checked={addInfo.is_pickup}
                      name="is_pickup"
                      onChange={handleCheckBox}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="is_dine">
                      Dine In
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_dine"
                      checked={addInfo.is_dine}
                      name="is_dine"
                      onChange={handleCheckBox}
                    />
                  </div>
                </div>
              </Row>

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
        {/* ============ create modal ends=============== */}

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
            <form className="mt-1" onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="question">
                  Question <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  name="question"
                  placeholder="Enter question"
                  required
                  value={editInfo.question}
                  onChange={handleEditInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="answer">
                  Answer <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="answer"
                  name="answer"
                  placeholder="Enter answer"
                  required
                  value={editInfo.answer}
                  onChange={handleEditInputs}
                ></textarea>
              </div>

              <Row className="mb-3">
                <div className="col-sm-4">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="is_delivery">
                      Delivery
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_delivery"
                      checked={editInfo.is_delivery}
                      name="is_delivery"
                      onChange={handleEditCheckBox}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="is_pickup">
                      Pickup
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_pickup"
                      checked={editInfo.is_pickup}
                      name="is_pickup"
                      onChange={handleEditCheckBox}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="is_dine">
                      Dine In
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_dine"
                      checked={editInfo.is_dine}
                      name="is_dine"
                      onChange={handleEditCheckBox}
                    />
                  </div>
                </div>
              </Row>
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
    add_faq_loading,
    faq_edit_loading,
    faq_status_edit_loading,
    faq_delete_loading,
    get_server_side_pagination_faq_data,
    get_server_side_pagination_faq_loading,
  } = state.Faq

  return {
    add_faq_loading,
    faq_edit_loading,
    faq_status_edit_loading,
    faq_delete_loading,
    get_server_side_pagination_faq_data,
    get_server_side_pagination_faq_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addFaqAction,
    addFaqFresh,
    faqUpdateAction,
    faqUpdateFresh,
    faqStatusUpdateAction,
    faqStatusUpdateFresh,
    faqDeleteAction,
    faqDeleteFresh,
    getServerSidePaginationFaqAction,
    getServerSidePaginationFaqFresh,
  })(Faq)
)
