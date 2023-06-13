import React, { useState, useRef } from "react"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  popUpUpdateAction,
  popUpUpdateFresh,
  getPopupByIdAction,
  getPopupByIdActionFresh,
  getAllBranchAction,
  getAllCampaignAction,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import PageLoader from "components/CustomLoader/PageLoader"

function EditPopup(props) {
  const navigate = useNavigate()
  const location = useLocation()

  const [redirectEdit, setRedirectEdit] = useState(false)
  const [getInfo, SetGetInfo] = useState(true)

  const [editImages, setEditImages] = useState({
    image:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.image
        : "",
  })

  useEffect(() => {
    SetGetInfo(true)
    props.getPopupByIdActionFresh()
  }, [])

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

  const [editInfo, setEditInfo] = useState({
    title:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.title
        : "",
    description:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.description
        : "",
    is_redirect:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.is_redirect
        : false,
    redirection_type:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.redirection_type
        : "",
    restaurant_id:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.restaurant_id
        : "",
    campaign_id:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.campaign_id
        : "",
    start_date:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.start_date
        : new Date().toISOString(),
    end_date:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.end_date
        : new Date().toISOString(),
    cancellable:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.cancellable
        : true,
    image:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.image
        : "",
    is_active:
      props?.get_popup_by_id_data != undefined
        ? props?.get_popup_by_id_data?.is_active
        : true,
  })

  let name, value, checked
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

  const handleEdit = e => {
    e.preventDefault()
    // props.popUpUpdateAction(editInfo)
    if (editInfo.start_date >= editInfo.end_date) {
      toast.error("Start time cannot be grater than or equal end time")
    } else {
      props.popUpUpdateAction(location?.state?._id, editInfo)
    }
  }

  useEffect(() => {
    if (props.get_all_customer_loading == false) {
      props.getAllCustomerAction()
    }

    if (props.get_popup_by_id_data != undefined) {
      setEditInfo({
        ...editInfo,
        title: props.get_popup_by_id_data.title,
        description: props.get_popup_by_id_data.description,
        is_redirect: props.get_popup_by_id_data.is_redirect,
        redirection_type: props.get_popup_by_id_data.redirection_type,
        restaurant_id: props.get_popup_by_id_data.restaurant_id,
        start_date: props.get_popup_by_id_data.start_date,
        end_date: props.get_popup_by_id_data.end_date,
        campaign_id: props.get_popup_by_id_data.campaign_id,
        cancellable: props.get_popup_by_id_data.cancellable,
        image: props.get_popup_by_id_data.image,
        is_active: props.get_popup_by_id_data.is_active,
      })

      setEditImages({
        ...editImages,
        image: props.get_popup_by_id_data.image,
      })

      setRedirectEdit(props.get_popup_by_id_data.is_redirect)
      setSelectedRedirectionTypeEdit(
        props.get_popup_by_id_data.redirection_type
      )
    }

    if (getInfo) {
      props.getPopupByIdAction(location?.state?._id)
      SetGetInfo(false)
    }

    if (props.popup_edit_loading === "Success") {
      toast.success("PopUp Banner Updated")
      props.popUpUpdateFresh()
      navigate("/popup-banner")
    }

    if (props.popup_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.popUpUpdateFresh()
    }
  }, [props])

  if (getInfo) {
    return <PageLoader />
  }

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="PopUp Banner"
              breadcrumbItem="Edit PopUp Banner"
            />

            <Row>
              <Col className="col-12">
                <Card style={{ border: "none" }}>
                  <CardBody>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        marginTop: "20px",
                        backgroundColor: "#1E417D",
                        padding: "15px",
                      }}
                    >
                      <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                        Edit PopUp Banner
                      </CardTitle>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="col-10 mx-auto">
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
                      <label
                        htmlFor="redirection_type"
                        className="col-form-label"
                      >
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
                    <label
                      htmlFor="start_date"
                      className="col-md-2 col-form-label"
                    >
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
                    <label
                      htmlFor="end_date"
                      className="col-md-2 col-form-label"
                    >
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
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 5,
                    }}
                  >
                    <Button color="primary" type="submit">
                      Edit
                    </Button>{" "}
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </>
  )
}

const mapStateToProps = state => {
  const { get_all_branch_loading, get_all_branch_data } = state.Restaurant
  const { get_all_campaign_loading, get_all_campaign_data } = state.Campaign
  const {
    popup_edit_data,
    popup_edit_loading,
    get_popup_by_id_data,
    get_popup_by_id_loading,
  } = state.Popup

  return {
    popup_edit_data,
    popup_edit_loading,
    get_popup_by_id_data,
    get_popup_by_id_loading,

    get_all_branch_loading,
    get_all_branch_data,

    get_all_campaign_loading,
    get_all_campaign_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    popUpUpdateAction,
    popUpUpdateFresh,
    getPopupByIdAction,
    getPopupByIdActionFresh,

    getAllBranchAction,
    getAllCampaignAction,
  })(EditPopup)
)
