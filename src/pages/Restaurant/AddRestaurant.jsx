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
  Alert,
  Table,
  ButtonGroup,
} from "reactstrap"

import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  restaurantAddAction,
  addRestaurantActionFresh,
  restaurantEditAction,
  restaurantEditFresh,
  getRestaurantByIdAction,
  getRestaurantByIdFresh,
  getCentralAdminUser,
  getCentralAdminUserFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import PageLoader from "components/CustomLoader/PageLoader"
import moment from "moment"

function AddRestaurant(props) {
  const navigate = useNavigate()
  const location = useLocation()
  // console.log("lof", location?.state?.restaurants)
  const [loading, setLoading] = useState(true)

  const [images, setImages] = useState({
    image: location.state ? location.state.image : "",
  })

  const [coverImages, setCoverImages] = useState({
    cover_image: "",
  })

  const goalTemplate = {
    sl: 1,
    name: "",
    required_number_of_order: 0,
    per_order_value: 0,
  }

  // console.log(location.state)
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "",
    central_admin: null,
    mobile: null,
    logo: null,
    cover_image: null,
    // currency: null,
  })
  console.log("restaurantInfo :", restaurantInfo)

  useEffect(() => {
    console.log("location?.state :", location?.state)
    if (location?.state?._id) {
      props.getRestaurantByIdAction(location.state._id)
    }
  }, [location?.state])
  console.log("location?.state :", location?.state)

  let name, value, checked
  const handleInputs = e => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setRestaurantInfo({ ...restaurantInfo, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (restaurantInfo.mobile.length != 11) {
      toast.error("Phone Number should be 11 digit")
      return
    }
    if (isNaN(restaurantInfo.mobile)) {
      toast.error("Phone Number should be numeric character")
      return
    }

    props.restaurantAddAction(restaurantInfo)
  }

  const handleSubmitForEdit = e => {
    e.preventDefault()

    props.restaurantEditAction(location.state._id, restaurantInfo)
  }

  useEffect(() => {
    if (props.add_restaurant_loading === "Success") {
      // redirect
      props.addRestaurantActionFresh()
      navigate("/restaurant")
    }

    if (props.edit_restaurant_loading === "Success") {
      toast.success("Restaurant edited Successfully")
      // redirect
      props.restaurantEditFresh()
      navigate("/restaurant")
    }
  }, [props.add_restaurant_loading, props.edit_restaurant_loading])

  useEffect(() => {
    if (props.get_central_admin_loading === false) {
      props.getCentralAdminUser()
    }
  }, [props.get_central_admin_loading])

  let central_admin = undefined
  if (props.get_central_admin_data?.length > 0) {
    central_admin = props.get_central_admin_data?.map((item, key) => ({
      label: `${item.first_name} ${item.last_name}`,
      value: item._id,
    }))
  }

  const [selectedCentralAdmin, setSelectedCentralAdmin] = useState("")

  const handleSelectCentralAdmin = e => {
    setRestaurantInfo({ ...restaurantInfo, central_admin: e.value })
    setSelectedCentralAdmin(e)
  }

  function handleChangeImage(event) {
    name = event.target.name
    value = event.target.files[0]
    setRestaurantInfo({ ...restaurantInfo, [name]: value })

    const reader = new FileReader()

    reader.onload = () => {
      setImages({ ...images, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  function handleChangeCover(event) {
    name = event.target.name
    value = event.target.files[0]
    setRestaurantInfo({ ...restaurantInfo, [name]: value })

    const reader2 = new FileReader()

    reader2.onload = () => {
      setCoverImages({ ...coverImages, [name]: reader2.result })
    }

    reader2.readAsDataURL(value)
  }

  useEffect(() => {
    console.log(
      "props.get_restaurant_by_id_loading",
      props.get_restaurant_by_id_loading
    )
    if (props.get_restaurant_by_id_loading == "Success") {
      setRestaurantInfo({
        name: props.get_restaurant_by_id_data.name,
        central_admin: props.get_restaurant_by_id_data.central_admin,
        mobile: props.get_restaurant_by_id_data.mobile,
        logo: props.get_restaurant_by_id_data.logo,
        cover_image: props.get_restaurant_by_id_data.cover_image,
        // currency: props.get_restaurant_by_id_data.currency,
      })

      setImages({
        logo: props.get_restaurant_by_id_data.logo,
      })

      setCoverImages({
        cover_image: props.get_restaurant_by_id_data.cover_image,
      })

      // console.log(
      //   "sadasss",
      //   props?.get_central_admin_data
      //     ?.filter(elem => elem._id === restaurantData?.central_admin)
      //     .map((item, key) => {
      //       return {
      //         label: `${item.first_name} ${item.last_name}`,
      //         value: item._id,
      //       }
      //     })
      // )

      setLoading(false)
    }
  }, [props.get_restaurant_by_id_loading])

  useEffect(() => {
    if (props.get_restaurant_by_id_data)
      setSelectedCentralAdmin(
        props?.get_central_admin_data
          ?.filter(
            elem => elem._id === props.get_restaurant_by_id_data?.central_admin
          )
          .map((item, key) => {
            return {
              label: `${item.first_name} ${item.last_name}`,
              value: item._id,
            }
          })
      )
  }, [props.get_restaurant_by_id_data, props?.get_central_admin_data])

  if (location?.state && loading) {
    return <PageLoader />
  }

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Restaurant"
              breadcrumbItem={
                location.state ? "Edit Restaurant" : "Add Restaurant"
              }
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
                        {location.state
                          ? "Edit Restaurant"
                          : "Add a New Restaurant"}
                      </CardTitle>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="col-10 mx-auto">
                <form
                  className="mt-4"
                  action="#"
                  onSubmit={location.state ? handleSubmitForEdit : handleSubmit}
                >
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Name<span className="text-danger"> *</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        name="name"
                        onChange={handleInputs}
                        value={restaurantInfo.name ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Central Admin
                    </label>
                    <div className="col-md-10">
                      <Select
                        //required
                        isLoading={!props.get_central_admin_data}
                        value={selectedCentralAdmin}
                        onChange={handleSelectCentralAdmin}
                        options={central_admin}
                        isMulti={false}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Mobile
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        placeholder="Mobile Number"
                        name="mobile"
                        pattern="[0-9]+"
                        minLength={11}
                        maxLength={11}
                        onChange={handleInputs}
                        value={restaurantInfo.mobile ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label htmlFor="logo" className="col-md-2 col-form-label">
                      Image
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
                        name="logo"
                        className="form-control"
                        id="logo"
                        onChange={handleChangeImage}
                      />
                    </div>
                  </Row>

                  {images?.logo && (
                    <Row className="mb-3">
                      <label className="col-md-2">
                        <span></span>
                      </label>
                      <div className="col-md-10">
                        <img
                          src={images.logo}
                          alt="preview"
                          style={{ width: "50%" }}
                        />
                      </div>
                    </Row>
                  )}

                  <Row className="mb-3">
                    <label
                      htmlFor="cover_image"
                      className="col-md-2 col-form-label"
                    >
                      Cover Image
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
                        className="form-control"
                        name="cover_image"
                        id="cover_image"
                        onChange={handleChangeCover}
                      />
                    </div>
                  </Row>

                  {coverImages?.cover_image && (
                    <Row className="mb-3">
                      <label className="col-md-2">
                        <span></span>
                      </label>
                      <div className="col-md-10">
                        <img
                          src={coverImages.cover_image}
                          alt="preview"
                          style={{ width: "50%" }}
                        />
                      </div>
                    </Row>
                  )}

                  <div className="mb-3 row">
                    <div className="col-12 text-end">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="submit"
                      >
                        {location.state ? "Edit Restaurant" : "Add Restaurant"}
                      </button>
                    </div>
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
  const {
    add_restaurant_loading,
    edit_restaurant_loading,
    get_restaurant_by_id_data,
    get_restaurant_by_id_error,
    get_restaurant_by_id_loading,
  } = state.Restaurant

  const { get_central_admin_data, get_central_admin_loading } =
    state.registerNew

  return {
    add_restaurant_loading,
    edit_restaurant_loading,
    get_restaurant_by_id_data,
    get_restaurant_by_id_error,
    get_restaurant_by_id_loading,

    get_central_admin_data,
    get_central_admin_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    restaurantAddAction,
    addRestaurantActionFresh,
    restaurantEditAction,
    restaurantEditFresh,
    getRestaurantByIdAction,
    getRestaurantByIdFresh,
    getCentralAdminUser,
    getCentralAdminUserFresh,
  })(AddRestaurant)
)
