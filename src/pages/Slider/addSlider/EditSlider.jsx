import React, { useState } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  Container,
  Row,
  Col,
  Form,
} from "reactstrap"
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import { useEffect } from "react"
import Breadcrumbs from "components/Common/Breadcrumb"
import { boolean } from "yup"
import Select from "react-select"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import { useLocation, useNavigate } from "react-router-dom"
import {
  getAllBranchAction,
  getAllBranchFresh,
  getPromotionByIdAction,
  getPromotionByIdActionFresh,
  promotionUpdateAction,
  promotionUpdateFresh,
} from "store/actions"
import PageLoader from "components/CustomLoader/PageLoader"

function EditSlider(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [getInfo, SetGetInfo] = useState(true)

  useEffect(() => {
    SetGetInfo(true)
    props.getPromotionByIdActionFresh()
  }, [])

  let allRestaurant = undefined
  if (props.get_all_branch_data?.length > 0) {
    allRestaurant = props.get_all_branch_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const common_restaurants = props?.get_all_branch_data?.filter(elem =>
    props?.get_slider_by_id_data?.restaurants?.find(
      ({ res_id }) => elem._id === res_id
    )
  )

  const restaurant_data_edit = common_restaurants
    ? common_restaurants.map((item, key) => {
        return { label: item.name, value: item._id }
      })
    : ""

  const [selectedRestaurant, setSelectedRestaurant] = useState(
    restaurant_data_edit ? restaurant_data_edit : []
  )

  const handleSelectRestaurant = e => {
    // console.log(e)
    setSelectedRestaurant(e)
  }

  const [editInfo, setEditInfo] = useState({
    _id:
      props?.get_slider_by_id_data != undefined
        ? props?.get_slider_by_id_data?._id
        : "",
    name:
      props?.get_slider_by_id_data != undefined
        ? props?.get_slider_by_id_data?.name
        : "",
    start_date:
      props?.get_slider_by_id_data != undefined
        ? props?.get_slider_by_id_data?.start_date
        : new Date().toISOString(),
    end_date:
      props?.get_slider_by_id_data != undefined
        ? props?.get_slider_by_id_data?.end_date
        : new Date().toISOString(),
    type:
      props?.get_slider_by_id_data != undefined
        ? props?.get_slider_by_id_data?.type
        : "",
    is_delivery:
      props?.get_slider_by_id_data != undefined
        ? props?.get_slider_by_id_data?.is_delivery
        : false,
    is_pickup:
      props?.get_slider_by_id_data != undefined
        ? props?.get_slider_by_id_data?.is_pickup
        : false,
    is_dine:
      props?.get_slider_by_id_data != undefined
        ? props?.get_slider_by_id_data?.is_dine
        : false,
    is_active:
      props?.get_slider_by_id_data != undefined
        ? props?.get_slider_by_id_data?.is_active
        : true,
  })

  let name, value, checked

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

  const handleEdit = e => {
    e.preventDefault()
    if (editInfo.start_date >= editInfo.end_date) {
      toast.error("Start time can't be grater or equal valid end time")
    } else {
      props.promotionUpdateAction(editInfo, selectedRestaurant)
    }
  }

  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    if (props.get_slider_by_id_data != undefined) {
      setEditInfo({
        ...editInfo,
        _id: props.get_slider_by_id_data._id,
        name: props.get_slider_by_id_data.name,
        start_date: props.get_slider_by_id_data.start_date,
        end_date: props.get_slider_by_id_data.end_date,
        type: props.get_slider_by_id_data.type,
        is_delivery: props.get_slider_by_id_data.is_delivery,
        is_pickup: props.get_slider_by_id_data.is_pickup,
        is_dine: props.get_slider_by_id_data.is_dine,
        is_active: props.get_slider_by_id_data.is_active,
      })

      const common_restaurants = props?.get_all_branch_data?.filter(elem =>
        props.get_slider_by_id_data.restaurants?.find(
          ({ res_id }) => elem._id === res_id
        )
      )

      const restaurant_data_edit = common_restaurants
        ? common_restaurants.map((item, key) => {
            return { label: item.name, value: item._id }
          })
        : ""
      setSelectedRestaurant(restaurant_data_edit)
    }

    if (getInfo) {
      props.getPromotionByIdAction(location?.state?._id)
      SetGetInfo(false)
    }

    if (props.slider_edit_loading === "Success") {
      toast.success("Promotion Updated")
      props.promotionUpdateFresh()
      navigate("/slider")
    }

    if (props.slider_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.promotionUpdateFresh()
    }
  }, [props])

  if (getInfo) {
    return <PageLoader />
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Promotion"
            breadcrumbItem="Edit Promotion"
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
                      Edit Promotion
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
                  <label className="form-label" htmlFor="name">
                    Name <span className="text-danger">*</span>
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
                    Restaurants <span className="text-danger">*</span>
                  </label>
                  <Select
                    required
                    value={selectedRestaurant}
                    onChange={handleSelectRestaurant}
                    options={allRestaurant}
                    isMulti={true}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="start_date"
                    className="col-md-2 col-form-label"
                  >
                    Start Time
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
                    End Time
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
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 5,
                  }}
                >
                  <Button color="primary" type="submit">
                    Submit
                  </Button>{" "}
                  {/* <Button color="secondary" onClick={toggleEditModal}>
                    Cancel
                  </Button> */}
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

//export default AddBranch;

const mapStateToProps = state => {
  const { get_all_branch_loading, get_all_branch_data } = state.Restaurant

  const {
    slider_edit_data,
    slider_edit_loading,

    get_slider_by_id_data,
    get_slider_by_id_loading,
  } = state.Sliders

  return {
    get_all_branch_loading,
    get_all_branch_data,

    slider_edit_data,
    slider_edit_loading,

    get_slider_by_id_data,
    get_slider_by_id_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    getAllBranchFresh,

    getPromotionByIdAction,
    getPromotionByIdActionFresh,
    promotionUpdateAction,
    promotionUpdateFresh,
  })(EditSlider)
)
