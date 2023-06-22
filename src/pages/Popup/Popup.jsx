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
  getAllBranchAction,
  getAllCampaignAction,
  addPopUpAction,
  addPopUpFresh,
  getAllPopUpAction,
  getAllPopUpFresh,
  popUpUpdateAction,
  popUpUpdateFresh,
  popUpStatusUpdateAction,
  popUpStatusUpdateFresh,
  popUpDeleteAction,
  popUpDeleteFresh,
  getServerSidePaginationPopupAction,
  getServerSidePaginationPopupSearchAction,
  getServerSidePaginationSearchPopupFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import DataTable from "react-data-table-component"

function Popup(props) {
  document.title = "PopUp Banner | Foodi"
  const navigate = useNavigate()

  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [modalDel, setModalDel] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [redirectEdit, setRedirectEdit] = useState(false)

  const [addImages, setAddImages] = useState({
    image: "",
  })
  const [editImages, setEditImages] = useState({
    image: "",
  })

  const toggle = () => setModal(!modal)
  const toggleEditModal = () => setEditModal(!editModal)
  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const [addInfo, setAddInfo] = useState({
    title: "",
    description: "",
    is_redirect: false,
    redirection_type: "",
    restaurant_id: "",
    campaign_id: "",
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    cancellable: true,
    image: "",
    is_active: true,
  })

  const [editInfo, setEditInfo] = useState({
    _id: "",
    title: "",
    description: "",
    is_redirect: false,
    redirection_type: "",
    restaurant_id: "",
    campaign_id: "",
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    cancellable: true,
    image: "",
    is_active: true,
  })

  const [deleteItem, setDeleteItem] = useState()

  const [redirectionType, setRedirectionType] = useState([
    {
      label: "Restaurant",
      value: "restaurant",
    },
    {
      label: "Campaign",
      value: "campaign",
    },
  ])

  // console.log(coupon_data_edit)

  const [selectedRedirectionType, setSelectedRedirectionType] = useState("")
  const [selectedRedirectionTypeEdit, setSelectedRedirectionTypeEdit] =
    useState("")

  let restaurants = []
  if (props.get_all_branch_data?.length > 0) {
    restaurants = props.get_all_branch_data
  }

  let campaigns = []
  if (props.get_all_campaign_data?.length > 0) {
    campaigns = props.get_all_campaign_data
  }

  // console.log(props.get_all_branch_data)
  // console.log(props.get_all_campaign_data)

  let name, value, checked
  const handleAddInputs = e => {
    // console.log(e.target.name, e.target.value)
    name = e.target.name
    value = e.target.value
    setAddInfo({ ...addInfo, [name]: value })
    if (name === "redirection_type") {
      setSelectedRedirectionType(value)
    }
  }

  const handleAddFile = e => {
    name = e.target.name
    value = e.target.files[0]
    setAddInfo({ ...addInfo, [name]: value })
    const reader = new FileReader()

    reader.onload = () => {
      setAddImages({ ...addImages, [name]: reader.result })
    }

    reader.readAsDataURL(value)
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

  const handleAddCheckBox = e => {
    // console.log(e);
    name = e.target.name
    checked = e.target.checked
    setAddInfo({ ...addInfo, [name]: checked })

    if (name === "is_redirect") {
      setRedirect(checked)
    }
  }
  // console.log(redirect)

  const handleSubmit = e => {
    e.preventDefault()
    if (addInfo.start_date >= addInfo.end_date) {
      toast.error("Start time cannot be grater than or equal end time")
    } else {
      props.addPopUpAction(addInfo)
    }
  }

  const handleEditInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setEditInfo({ ...editInfo, [name]: value })
    if (name === "redirection_type") {
      setSelectedRedirectionTypeEdit(value)
    }
  }

  const handleEditFile = e => {
    name = e.target.name
    value = e.target.files[0]
    setEditInfo({ ...editInfo, [name]: value })
    const reader2 = new FileReader()

    reader2.onload = () => {
      setEditImages({ ...editImages, [name]: reader2.result })
    }

    reader2.readAsDataURL(value)
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

  const handleEditCheckBox = e => {
    // console.log(e);
    name = e.target.name
    checked = e.target.checked
    setEditInfo({ ...editInfo, [name]: checked })
    if (name === "is_redirect") {
      setRedirectEdit(checked)
    }
  }

  const handleEditSlider = row => {
    // setEditInfo(prevState => ({
    //   _id: row._id,
    //   title: row.title,
    //   description: row.description,
    //   is_redirect: row.is_redirect,
    //   redirection_type: row.redirection_type,
    //   restaurant_id: row.restaurant_id,
    //   start_date: row.start_date,
    //   end_date: row.end_date,
    //   campaign_id: row.campaign_id,
    //   cancellable: row.cancellable,
    //   image: row.image,
    //   is_active: row.is_active,
    // }))

    // setType(row.is_redirect, row.redirection_type)

    // setEditImages({ ...editImages, image: row.image })

    // toggleEditModal()
    navigate("/edit-popup-banner", { state: row })
  }

  const setType = (is_redirect_data, redirection_type_data) => {
    //console.log(is_redirect_data, redirection_type_data)
    setRedirectEdit(is_redirect_data)
    const common_redirection_types = redirectionType?.filter(
      elem => elem.value === redirection_type_data
    )
    // console.log("common_coupon_types :", common_coupon_types)

    const redirection_type_edit = common_redirection_types
      ? common_redirection_types?.map((item, key) => {
          return { label: item.label, value: item.value }
        })
      : ""

    setSelectedRedirectionTypeEdit(redirection_type_data)
  }

  const handleEdit = e => {
    e.preventDefault()
    // props.popUpUpdateAction(editInfo)
    if (editInfo.start_date >= editInfo.end_date) {
      toast.error("Start time cannot be grater than or equal end time")
    } else {
      props.popUpUpdateAction(editInfo)
    }
  }

  const handleStatusModal = row => {
    setEditInfo(row)
    toggleStatus()
  }

  const handleStatusUpdate = () => {
    // console.log(editInfo);
    props.popUpStatusUpdateAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }
  const handleDelete = () => {
    props.popUpDeleteAction(deleteItem)
  }

  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEditSlider(cell)}
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
    <span style={{ fontSize: "16px" }}>{cell.title}</span>
  )

  const activeData = [
    {
      selector: row => row.title,
      name: "Title",
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
      //dataField: "hello",
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
      props.getServerSidePaginationPopupSearchAction(e.target.value)
    } else {
      props.getServerSidePaginationSearchPopupFresh()
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
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }
    if (props.get_all_campaign_loading == false) {
      props.getAllCampaignAction()
    }

    if (props.get_all_popup_loading == false) {
      props.getAllPopUpAction()
    }

    props.getServerSidePaginationPopupAction(page, countPerPage)

    if (props.add_popup_loading === "Success") {
      toast.success("PopUp Banner Added Successfully")
      toggle()
      setAddInfo({
        ...addInfo,
        title: "",
        description: "",
        is_redirect: false,
        redirection_type: "",
        restaurant_id: "",
        campaign_id: "",
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        cancellable: true,
        image: "",
        is_active: true,
      })
      setAddImages({ ...addImages, iamge: "" })
      props.addPopUpFresh()
    }

    if (props.add_popup_loading === "Failed") {
      toast.error("Something went wrong")
      props.addPopUpFresh()
    }

    if (props.popup_edit_loading === "Success") {
      toast.success("PopUp Banner Updated")
      toggleEditModal()
      props.popUpUpdateFresh()
    }

    if (props.popup_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.popUpUpdateFresh()
    }

    if (props.popup_status_edit_loading === "Success") {
      toast.success("PopUp Banner Status Updated")
      toggleStatus()
      props.popUpStatusUpdateFresh()
    }

    if (props.popup_status_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.popUpStatusUpdateFresh()
    }

    if (props.popup_delete_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("PopUp Banner Deleted")
      toggleDel()
      props.popUpDeleteFresh()
    }
  }, [
    props.add_popup_loading,
    props.popup_edit_loading,
    props.popup_delete_loading,
    props.popup_status_edit_loading,
    page,
    countPerPage,
    props.get_all_campaign_data,
    props.get_all_branch_loading,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="PopUp Banner"
            breadcrumbItem="PopUp Banner"
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
                      PopUp Banner
                    </CardTitle>
                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add PopUp Banner
                    </Button>
                  </div>

                  <div className="text-end">
                    <input
                      type="text"
                      placeholder="Search Popup"
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
                      props.get_server_side_pagination_popup_search_data != null
                        ? props.get_server_side_pagination_popup_search_data
                            ?.data
                        : props?.get_server_side_pagination_popup_data?.data
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={
                      props.get_server_side_pagination_popup_search_data != null
                        ? props.get_server_side_pagination_popup_search_data
                            ?.count
                        : props.get_server_side_pagination_popup_data?.count
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

        {/* ============ create modal start=============== */}
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>New PopUp Banner</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                  required
                  name="title"
                  value={addInfo.title}
                  onChange={handleAddInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Enter description"
                  name="description"
                  onChange={handleAddInputs}
                  value={addInfo.description}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <label className="form-label" htmlFor="is_redirect">
                    Redirect
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="is_redirect"
                    checked={addInfo.is_redirect}
                    name="is_redirect"
                    onChange={handleAddCheckBox}
                  />
                </div>
              </div>

              {redirect == true ? (
                <Row className="mb-3">
                  <label htmlFor="redirection_type" className="col-form-label">
                    Redirection Type
                  </label>
                  <div className="">
                    <Input
                      id="redirection_type"
                      name="redirection_type"
                      className="form-control"
                      placeholder="Select redirection type"
                      value={addInfo.redirection_type}
                      onChange={handleAddInputs}
                      type="select"
                    >
                      <option value="">Choose...</option>
                      {redirectionType.map(redirection_type => (
                        <option
                          key={redirection_type.value}
                          value={redirection_type.value}
                        >
                          {redirection_type.label}
                        </option>
                      ))}
                    </Input>
                  </div>
                </Row>
              ) : (
                ""
              )}

              {redirect == true && selectedRedirectionType == "campaign" ? (
                <Row className="mb-3">
                  <label htmlFor="campaign_id" className="col-form-label">
                    Campaign
                  </label>
                  <div className="">
                    <Input
                      id="campaign_id"
                      name="campaign_id"
                      className="form-control"
                      placeholder="select Campaign"
                      value={addInfo.campaign_id}
                      onChange={handleAddInputs}
                      type="select"
                    >
                      <option value="">Choose...</option>
                      {campaigns.map(campaign => (
                        <option key={campaign._id} value={campaign._id}>
                          {campaign.name}
                        </option>
                      ))}
                    </Input>
                  </div>
                </Row>
              ) : (
                ""
              )}

              {redirect == true && selectedRedirectionType == "restaurant" ? (
                <Row className="mb-3">
                  <label htmlFor="restaurant_id" className="col-form-label">
                    Restaurant
                  </label>
                  <div className="">
                    <Input
                      id="restaurant_id"
                      name="restaurant_id"
                      className="form-control"
                      placeholder="Select Restaurant"
                      value={addInfo.restaurant_id}
                      onChange={handleAddInputs}
                      type="select"
                    >
                      <option value="">Choose...</option>
                      {restaurants.map(restaurant => (
                        <option key={restaurant._id} value={restaurant._id}>
                          {restaurant.name}
                        </option>
                      ))}
                    </Input>
                  </div>
                </Row>
              ) : (
                ""
              )}

              <div className="mb-3">
                <label className="form-label" htmlFor="image">
                  Image
                </label>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .bmp, .png, .webp"
                  className="form-control"
                  id="image"
                  required
                  name="image"
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
                  End Time{" "}
                </label>
                <input
                  type="datetime-local"
                  id="end_date"
                  className="form-control"
                  name="end_date"
                  placeholder="End Time"
                  value={addInfo.end_date.slice(0, 16)}
                  onChange={e => handleAddTimeChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <label className="form-label" htmlFor="cancellable">
                    Cancellable{" "}
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="cancellable"
                    checked={addInfo.cancellable}
                    name="cancellable"
                    onChange={handleAddCheckBox}
                  />
                </div>
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
        {/* ============ create modal end=============== */}

        {/* ============ edit modal start=============== */}
        <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
          <ModalHeader>Edit PopUp Banner</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleEdit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter title"
                  required
                  name="title"
                  value={editInfo.title}
                  onChange={handleEditInputs}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Enter description"
                  name="description"
                  onChange={handleEditInputs}
                  value={editInfo.description}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <label className="form-label" htmlFor="is_redirect">
                    Redirect
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="is_redirect"
                    checked={editInfo.is_redirect}
                    name="is_redirect"
                    onChange={handleEditCheckBox}
                  />
                </div>
              </div>

              {redirectEdit == true ? (
                <Row className="mb-3">
                  <label htmlFor="redirection_type" className="col-form-label">
                    Redirection Type
                  </label>
                  <div className="">
                    <Input
                      id="redirection_type"
                      name="redirection_type"
                      className="form-control"
                      placeholder="Select redirection type"
                      value={editInfo.redirection_type}
                      onChange={handleEditInputs}
                      type="select"
                    >
                      <option value="">Choose...</option>
                      {redirectionType.map(redirection_type => (
                        <option
                          key={redirection_type.value}
                          value={redirection_type.value}
                        >
                          {redirection_type.label}
                        </option>
                      ))}
                    </Input>
                  </div>
                </Row>
              ) : (
                ""
              )}

              {redirectEdit == true &&
              selectedRedirectionTypeEdit == "campaign" ? (
                <Row className="mb-3">
                  <label htmlFor="campaign_id" className="col-form-label">
                    Campaign
                  </label>
                  <div className="">
                    <Input
                      id="campaign_id"
                      name="campaign_id"
                      className="form-control"
                      placeholder="select Campaign"
                      value={editInfo.campaign_id}
                      onChange={handleEditInputs}
                      type="select"
                    >
                      <option value="">Choose...</option>
                      {campaigns.map(campaign => (
                        <option key={campaign._id} value={campaign._id}>
                          {campaign.name}
                        </option>
                      ))}
                    </Input>
                  </div>
                </Row>
              ) : (
                ""
              )}

              {redirectEdit == true &&
              selectedRedirectionTypeEdit == "restaurant" ? (
                <Row className="mb-3">
                  <label htmlFor="restaurant_id" className="col-form-label">
                    Restaurant
                  </label>
                  <div className="">
                    <Input
                      id="restaurant_id"
                      name="restaurant_id"
                      className="form-control"
                      placeholder="Select Restaurant"
                      value={editInfo.restaurant_id}
                      onChange={handleEditInputs}
                      type="select"
                    >
                      <option value="">Choose...</option>
                      {restaurants.map(restaurant => (
                        <option key={restaurant._id} value={restaurant._id}>
                          {restaurant.name}
                        </option>
                      ))}
                    </Input>
                  </div>
                </Row>
              ) : (
                ""
              )}

              <div className="mb-3">
                <label className="form-label" htmlFor="image">
                  Image
                </label>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .bmp, .png, .webp"
                  className="form-control"
                  id="image"
                  name="image"
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
                  End Time{" "}
                </label>
                <input
                  type="datetime-local"
                  id="end_date"
                  className="form-control"
                  name="end_date"
                  placeholder="End Time"
                  value={editInfo.end_date.slice(0, 16)}
                  onChange={e => handleEditTimeChange(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <label className="form-label" htmlFor="cancellable">
                    Cancellable
                  </label>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="cancellable"
                    checked={editInfo.cancellable}
                    name="cancellable"
                    onChange={handleEditCheckBox}
                  />
                </div>
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
  const { get_all_branch_loading, get_all_branch_data } = state.Restaurant
  const { get_all_campaign_loading, get_all_campaign_data } = state.Campaign
  const {
    add_popup_data,
    add_popup_error,
    add_popup_loading,

    get_all_popup_data,
    get_all_popup_error,
    get_all_popup_loading,

    popup_edit_data,
    popup_edit_loading,

    popup_status_edit_data,
    popup_status_edit_loading,

    popup_delete_loading,

    get_server_side_pagination_popup_data,
    get_server_side_pagination_popup_search_data,
  } = state.Popup

  return {
    add_popup_data,
    add_popup_error,
    add_popup_loading,

    get_all_popup_data,
    get_all_popup_error,
    get_all_popup_loading,

    popup_edit_data,
    popup_edit_loading,

    popup_status_edit_data,
    popup_status_edit_loading,

    popup_delete_loading,

    get_server_side_pagination_popup_data,
    get_server_side_pagination_popup_search_data,

    get_all_branch_loading,
    get_all_branch_data,

    get_all_campaign_loading,
    get_all_campaign_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addPopUpAction,
    addPopUpFresh,
    getAllPopUpAction,
    getAllPopUpFresh,
    popUpUpdateAction,
    popUpUpdateFresh,
    popUpStatusUpdateAction,
    popUpStatusUpdateFresh,
    popUpDeleteAction,
    popUpDeleteFresh,
    getServerSidePaginationPopupAction,
    getServerSidePaginationPopupSearchAction,
    getServerSidePaginationSearchPopupFresh,
    getAllBranchAction,
    getAllCampaignAction,
  })(Popup)
)
