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
  addSliderAction,
  getAllBranchAction,
  addSliderFresh,
  getAllSliderAction,
  getAllSliderFresh,
  promotionUpdateAction,
  promotionUpdateFresh,
  promotionStatusUpdateAction,
  promotionStatusUpdateFresh,
  promotionDeleteAction,
  promotionDeleteFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Select from "react-select"

function Slider(props) {
  document.title = "Promotion | Foodi"

  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const [addInfo, setAddInfo] = useState({
    name: "",
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    type: "",
    is_delivery: false,
    is_pickup: false,
    is_dine: false,
    is_active: true,
  })

  const [editInfo, setEditInfo] = useState({
    _id: "",
    name: "",
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    type: "",
    is_delivery: false,
    is_pickup: false,
    is_dine: false,
    is_active: true,
  })

  const [deleteItem, setDeleteItem] = useState()

  const [newSelectedRestaurant, setNewSelectedRestaurant] = useState([])

  const [selectedRestaurant, setSelectedRestaurant] = useState([])
  const handleSelectRestaurant = e => {
    // console.log(e)
    setSelectedRestaurant(e)
  }

  const handleNewSelectRestaurant = e => {
    // console.log(e)
    setNewSelectedRestaurant(e)
  }

  let allRestaurant = undefined
  if (props.get_all_branch_data?.length > 0) {
    allRestaurant = props.get_all_branch_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  let name, value, checked
  const handleInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setAddInfo({ ...addInfo, [name]: value })
  }

  const handleAddCheckBox = e => {
    // console.log(e);
    name = e.target.name
    checked = e.target.checked
    setAddInfo({ ...addInfo, [name]: checked })
  }

  const handleAddTimeChange = e => {
    name = e.target.name
    value = e.target.value
    let new_time_string = `${value}:00Z`
    setAddInfo({
      ...addInfo,
      [name]: new Date(new_time_string).toISOString(),
    })
  }

  const handleEditInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setEditInfo({ ...editInfo, [name]: value })
  }

  const handleEditCheckBox = e => {
    // console.log(e);
    name = e.target.name
    checked = e.target.checked
    setEditInfo({ ...editInfo, [name]: checked })
  }

  const handleEditTimeChange = e => {
    name = e.target.name
    value = e.target.value
    let new_time_string = `${value}:00Z`
    setEditInfo({
      ...editInfo,
      [name]: new Date(new_time_string).toISOString(),
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.addSliderAction(addInfo, newSelectedRestaurant)
  }

  const newRest = nn => {
    // console.log(nn);
    // console.log(props?.get_all_branch_data);
    const common_restaurants = props?.get_all_branch_data?.filter(elem =>
      nn?.find(({ res_id }) => elem._id === res_id)
    )
    // console.log(common_restaurants);

    const restaurant_data_edit = common_restaurants
      ? common_restaurants.map((item, key) => {
          return { label: item.name, value: item._id }
        })
      : ""
    setSelectedRestaurant(restaurant_data_edit)
  }

  const handleEditSlider = row => {
    // console.log(row);

    setEditInfo(prevState => ({
      _id: row._id,
      name: row.name,
      start_date: row.start_date,
      end_date: row.end_date,
      type: row.type,
      is_delivery: row.is_delivery,
      is_pickup: row.is_pickup,
      is_dine: row.is_dine,
      is_active: row.is_active,
    }))

    // setRestaurant(row.restaurants)
    newRest(row.restaurants)

    toggleEditModal()
  }

  const handleEdit = e => {
    e.preventDefault()
    props.promotionUpdateAction(editInfo, selectedRestaurant)
  }

  const handleStatusModal = row => {
    setEditInfo(row)

    toggleStatus()
  }

  const handleStatusUpdate = () => {
    // console.log(editInfo);
    props.promotionStatusUpdateAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }
  const handleDelete = () => {
    // console.log(deleteItem)
    props.promotionDeleteAction(deleteItem)
    // toggleDel();
  }

  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEditSlider(row)}
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

  // console.log(props.get_all_slider_data);

  const activeData = [
    {
      dataField: "name",
      text: "Promotion Name",
      sort: true,
    },
    {
      dataField: "",
      text: "Status",
      sort: true,
      formatter: statusRef,
    },

    {
      //dataField: "hello",
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
    props.get_all_branch_data

    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    if (props.get_all_slider_loading == false) {
      // console.log("I am in get all slider loading ")
      props.getAllSliderAction()
    }

    if (props.add_slider_loading === "Success") {
      toast.success("Promotion Added Successfully")
      toggle()
      setAddInfo({
        ...addInfo,
        name: "",
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        type: "",
        is_delivery: false,
        is_pickup: false,
        is_dine: false,
        is_active: true,
      })
      setSelectedRestaurant(false)
      props.addSliderFresh()
    }

    if (props.add_slider_loading === "Failed") {
      //console.log(props.add_slider_data);
      toast.error("Something went wrong")
      props.addSliderFresh()
    }

    if (props.slider_edit_loading === "Success") {
      toast.success("Promotion Updated")
      toggleEditModal()
      props.promotionUpdateFresh()
    }

    if (props.slider_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.promotionUpdateFresh()
    }

    if (props.slider_status_edit_loading === "Success") {
      toast.success("Promotion Status Updated")
      toggleStatus()
      props.promotionStatusUpdateFresh()
    }

    if (props.slider_status_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.promotionStatusUpdateFresh()
    }

    if (props.slider_delete_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("Promotion Deleted")
      toggleDel()
      props.promotionDeleteFresh()
    }
  }, [
    props.get_all_branch_loading,
    props.add_slider_loading,
    props.slider_edit_loading,
    props.slider_delete_loading,
    props.slider_status_edit_loading,
  ])

  // console.log(props.get_all_slider_data);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Promotion"
            breadcrumbItem="Promotion"
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
                      Promotion
                    </CardTitle>
                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add Promotion
                    </Button>
                  </div>
                  {props.get_all_slider_data ? (
                    props.get_all_slider_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_slider_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                        key={props.get_all_slider_data?._id}
                      />
                    ) : null
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ============ create modal start=============== */}
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>New Promotion</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  required
                  name="name"
                  value={addInfo.name}
                  onChange={handleInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="type">
                  Type
                </label>
                <Input
                  id="type"
                  name="type"
                  className="form-control"
                  placeholder="select type"
                  value={addInfo.type}
                  onChange={handleInputs}
                  type="select"
                >
                  <option>Choose...</option>
                  <option value="slider">Slider</option>
                  <option value="banner">Banner</option>
                </Input>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="restaurants">
                  Restaurants
                </label>
                <Select
                  value={newSelectedRestaurant}
                  onChange={handleNewSelectRestaurant}
                  options={allRestaurant}
                  isMulti={true}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="start_date" className="col-md-2 col-form-label">
                  {" "}
                  Start Time{" "}
                </label>
                <input
                  type="datetime-local"
                  id="start_date"
                  className="form-control"
                  name="start_date"
                  placeholder="Start Time"
                  value={addInfo.start_date.slice(0, 16)}
                  onChange={e => handleAddTimeChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="end_date" className="col-md-2 col-form-label">
                  {" "}
                  Start Time{" "}
                </label>
                <input
                  type="datetime-local"
                  id="end_date"
                  className="form-control"
                  name="end_date"
                  placeholder="Start Time"
                  value={addInfo.end_date.slice(0, 16)}
                  onChange={e => handleAddTimeChange(e)}
                  required
                />
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
                      onChange={handleAddCheckBox}
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
                      onChange={handleAddCheckBox}
                    />
                  </div>
                </div>

                <div className="col-sm-4">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="is_dine">
                      Dine
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="is_dine"
                      checked={addInfo.is_dine}
                      name="is_dine"
                      onChange={handleAddCheckBox}
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
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ create modal end=============== */}

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader>Edit Promotion</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEdit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  {" "}
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  required
                  name="name"
                  onChange={handleEditInputs}
                  value={editInfo.name}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="type">
                  Type
                </label>
                <Input
                  id="type"
                  name="type"
                  className="form-control"
                  placeholder="select type"
                  value={editInfo.type}
                  onChange={handleEditInputs}
                  type="select"
                >
                  <option>Choose...</option>
                  <option value="slider">Slider</option>
                  <option value="banner">Banner</option>
                </Input>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="restaurants">
                  Restaurants
                </label>
                <Select
                  value={selectedRestaurant}
                  onChange={handleSelectRestaurant}
                  options={allRestaurant}
                  isMulti={true}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="start_date" className="col-md-2 col-form-label">
                  {" "}
                  Start Time{" "}
                </label>
                <input
                  type="datetime-local"
                  id="start_date"
                  className="form-control"
                  name="start_date"
                  placeholder="Start Time"
                  value={editInfo.start_date.slice(0, 16)}
                  onChange={e => handleEditTimeChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="end_date" className="col-md-2 col-form-label">
                  {" "}
                  Start Time{" "}
                </label>
                <input
                  type="datetime-local"
                  id="end_date"
                  className="form-control"
                  name="end_date"
                  placeholder="Start Time"
                  value={editInfo.end_date.slice(0, 16)}
                  onChange={e => handleEditTimeChange(e)}
                  required
                />
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
                      Dine
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
  const { get_all_branch_loading, get_all_branch_data } = state.Restaurant

  const {
    add_slider_data,
    add_slider_error,
    add_slider_loading,

    get_all_slider_data,
    get_all_slider_error,
    get_all_slider_loading,

    slider_edit_data,
    slider_edit_loading,

    slider_status_edit_data,
    slider_status_edit_loading,

    slider_delete_loading,
  } = state.Sliders

  return {
    get_all_branch_loading,
    get_all_branch_data,

    add_slider_data,
    add_slider_error,
    add_slider_loading,

    get_all_slider_data,
    get_all_slider_error,
    get_all_slider_loading,

    slider_edit_data,
    slider_edit_loading,

    slider_status_edit_data,
    slider_status_edit_loading,

    slider_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    addSliderAction,
    addSliderFresh,
    getAllSliderAction,
    getAllSliderFresh,
    promotionUpdateAction,
    promotionUpdateFresh,
    promotionStatusUpdateAction,
    promotionStatusUpdateFresh,
    promotionDeleteAction,
    promotionDeleteFresh,
  })(Slider)
)
