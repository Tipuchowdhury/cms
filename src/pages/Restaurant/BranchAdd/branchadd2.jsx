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
import {
  getAllRestaurantAction,
  getAllAdminUsersAction,
  branchAddAction,
  addBranchFresh,
  branchEditAction,
  editBranchFresh,
  getAllCuisneAction,
  getAllBranchAttributeAction,
  getBranchByIdAction,
  getZonalAdminUser,
  getZonalAdminUserFresh,
  getBranchAdminUser,
  getBranchAdminUserFresh,
  getCentralAdminUser,
  getCentralAdminUserFresh,
} from "store/actions"
import Breadcrumbs from "components/Common/Breadcrumb"
import { boolean } from "yup"
import Select from "react-select"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useMemo } from "react"
import PageLoader from "components/CustomLoader/PageLoader"

const LoadingContainer = () => <div>Loading...</div>

function BranchAdd(props) {
  const location = useLocation()
  const naviagte = useNavigate()

  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const [initialLatLong, setInitialLatLong] = useState({
    // lat: 23.8103,
    // lng: 90.4125,
    lat: 23.8103,
    lng: 90.4125,
  })

  const [locationData, setLocationData] = useState({
    location: `${initialLatLong.lat},${initialLatLong.lng}`,
    lat: 23.8103,
    lng: 90.4125,
  })

  const timeTemplate = { day: "", startTime: "", endTime: "" }
  const [time, setTime] = useState([timeTemplate])

  function handleAddRowNested() {
    setTime([...time, timeTemplate])
  }

  const toggle = () => setModal(!modal)
  const onMarkerClick = e => {}

  const onMapClickHandler = e => {}

  const moveMarker = (props, marker, e) => {
    setInitialLatLong({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    setLocationData({
      ...locationData,
      location: [e.latLng.lat(), e.latLng.lng()],
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    })
  }

  const [images, setImages] = useState({
    image: "",
  })
  const [coverImages, setCoverImages] = useState({
    cover_image: location.state ? location.state.cover_image : "",
  })

  // get all restaurant
  let restaurantData = undefined
  if (props.get_all_restaurant_data?.length > 0) {
    restaurantData = props.get_all_restaurant_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ))
  }
  // get all users
  let userData = undefined
  if (props.get_all_user_data?.length > 0) {
    userData = props.get_all_user_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.first_name} {item.last_name}
      </option>
    ))
  }

  let zonal_admin = undefined
  if (props.get_all_user_data?.length > 0) {
    zonal_admin = props.get_all_user_data
      ?.filter(data => data.role == "branch_admin")
      .map((item, key) => ({
        label: `${item.first_name} ${item.last_name}`,
        value: item._id,
      }))
  }

  // const common_zonal_admin = props?.get_all_user_data?.filter(
  //   elem =>
  //     elem._id === location.state?.zonal_admin && elem.role == "branch_admin"
  // )

  // const zonal_admin_edit = common_zonal_admin
  //   ? common_zonal_admin?.map((item, key) => {
  //       return {
  //         label: `${item.first_name} ${item.last_name}`,
  //         value: item._id,
  //       }
  //     })
  //   : ""
  // const [selectedZonalAdmin, setSelectedZonalAdmin] = useState(
  //   zonal_admin_edit ? zonal_admin_edit : ""
  // )

  const [selectedZonalAdmin, setSelectedZonalAdmin] = useState()

  const handleSelectZonalAdmin = e => {
    // console.log(e.value)
    setZoneInfo({ ...zoneInfo, zonal_admin: e.value })
    setSelectedZonalAdmin(e)
  }

  const [selectedCuisine, setSelectedCuisine] = useState("")

  console.log(selectedCuisine)
  const handleSelectCuisine = e => {
    setSelectedCuisine(e)
  }
  let cusineData = undefined
  if (props.get_all_cuisine_data?.length > 0) {
    cusineData = props.get_all_cuisine_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const [selectedBranchAttribute, setSelectedBranchAttribute] = useState("")

  const handleSelectBranchAttribute = e => {
    setSelectedBranchAttribute(e)
  }

  let branchAttributeData = undefined
  if (props.get_all_branch_attribute_data?.length > 0) {
    branchAttributeData = props.get_all_branch_attribute_data?.map(
      (item, key) => ({
        label: item.name,
        value: item._id,
      })
    )
  }

  //console.log(location.state);

  const [zoneInfo, setZoneInfo] = useState({
    name: undefined,
    restaurant: undefined,
    phone_number: "",
    zonal_admin: "",
    address: "",
    cuisine: "",
    location: undefined,
    image: "",
    cover_image: "",
    price_range: "৳",
    popularity_sort_value: 0,
    is_take_pre_order: "false",
    is_veg: "false",
    is_popular: "false",
    is_delivery: "false",
    is_pickup: "false",
    is_dine: "false",
    commission: undefined,
    minimum_order_value: undefined,
    delivery_time: undefined,
    pickup_time: undefined,
    email: "",
    share_link: "",
  })

  let name, value
  const handleInputs = e => {
    name = e.target.name
    value = e.target.value
    setZoneInfo({ ...zoneInfo, [name]: value })
  }
  function handleChangeImage(event) {
    name = event.target.name
    value = event.target.files[0]
    setZoneInfo({ ...zoneInfo, [name]: value })

    const reader = new FileReader()

    reader.onload = () => {
      setImages({ ...images, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  function handleChangeCover(event) {
    name = event.target.name
    value = event.target.files[0]
    setZoneInfo({ ...zoneInfo, [name]: value })

    const reader2 = new FileReader()

    reader2.onload = () => {
      setCoverImages({ ...coverImages, [name]: reader2.result })
    }

    reader2.readAsDataURL(value)
  }
  const [timeCheckerState, setChecker] = useState()
  const handleTimeChange = (e, index) => {
    const updatedValue = time.map((row, i) =>
      index === i
        ? Object.assign(row, { [e.target.name]: e.target.value })
        : row
    )
    setTime(updatedValue)
  }

  //==============
  function isTimeInRange(newTime) {
    for (var i = 0; i < time.length; i++) {
      var range = time[i]
      if (
        (newTime.startTime > range.startTime &&
          newTime.startTime < range.endTime) ||
        (range.startTime > range.endTime &&
          (newTime.startTime > range.startTime ||
            newTime.startTime < range.endTime))
      ) {
        setTime(time)
        setChecker(true)
      } else {
        setTime(time)
        setChecker(false)
      }
    }
    return false
  }

  const handleRowDelete = index => {
    const filteredTime = [...time]
    if (filteredTime.length > 1) {
      filteredTime.splice(index, 1)
      setTime(filteredTime)
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    let status = 0
    if (zoneInfo.phone_number.length != 11) {
      status = 1
      toast.error("Phone Number should be 11 digit")
    }
    if (isNaN(zoneInfo.phone_number)) {
      status = 1
      toast.error("Phone Number should be numeric character")
    }

    if (status == 0) {
      const val = uuidv4()
      const currentPath = window.location.pathname
      props.branchAddAction(
        val,
        zoneInfo,
        locationData.lat,
        locationData.lng,
        // file,
        // coverFile,
        currentPath,
        selectedCuisine,
        time,
        selectedBranchAttribute
      )
    }
  }

  const handleEditBranch = e => {
    e.preventDefault()
    let status = 0
    if (zoneInfo.phone_number.length != 11) {
      status = 1
      toast.error("Phone Number should be 11 digit")
    }
    if (isNaN(zoneInfo.phone_number)) {
      status = 1
      toast.error("Phone Number should be numeric character")
    }

    if (status == 0) {
      const currentPath = window.location.pathname
      props.branchEditAction(
        location.state?._id,
        zoneInfo,
        locationData.lat,
        locationData.lng,
        // file,
        // coverFile,
        currentPath,
        selectedCuisine,
        time,
        selectedBranchAttribute
      )
    }
  }

  useEffect(() => {
    if (props.get_all_branch_attribute_loading == false) {
      //console.log("I am in get all subscription type loading ")
      props.getAllBranchAttributeAction()
    }
    if (props.get_all_restaurant_loading == false) {
      props.getAllRestaurantAction()
    }

    if (props.get_all_user_loading === false) {
      props.getAllAdminUsersAction()
    }

    // if (props.get_zonal_admin_loading === false) {
    //   props.getZonalAdminUser()
    // }

    if (props.get_all_cuisine_loading === false) {
      props.getAllCuisneAction()
    }

    if (props.add_branch_loading === "Success") {
      toast.success("Branch added Successfully")
      props.addBranchFresh()
      naviagte("/manage-branch")
    }

    if (props.add_branch_loading === "Failed") {
      toast.error("Branch Add Failed")
      props.addBranchFresh()
      // naviagte("/manage-branch")
    }

    if (props.edit_branch_loading === "Success") {
      // toast.success("Branch edited Successfully")
      props.editBranchFresh()
      naviagte("/manage-branch")
    }

    if (props.edit_branch_loading === "Failed") {
      // toast.error("Branch edited Failed")
      props.editBranchFresh()
      // naviagte("/manage-branch")
    }
  }, [
    props.get_all_restaurant_loading,
    props.get_all_user_loading,
    props.get_zonal_admin_loading,
    props.get_all_cusine_loading,
    props.add_branch_loading,
    props.edit_branch_loading,
    props.get_all_branch_attribute_loading,
  ])

  useEffect(() => {
    console.log(
      "props.get_branch_by_id_loading",
      props.get_branch_by_id_loading
    )
    if (
      props.get_branch_by_id_loading == "Success" &&
      props.get_all_branch_attribute_loading == "Success" &&
      props.get_all_restaurant_loading == "Success" &&
      props.get_all_user_loading == "Success" &&
      props.get_zonal_admin_loading == "Success" &&
      props.get_all_cuisine_loading == "Success"
    ) {
      const branchData = props.get_branch_by_id_data
      console.log("branchData :", branchData)
      setZoneInfo({
        name: branchData.name,
        restaurant: branchData.parent_restaurant_id,
        phone_number: branchData.phone_number,
        zonal_admin: branchData.zonal_admin,
        address: branchData.address,
        cuisine: "",
        location: undefined,
        image: branchData.image,
        cover_image: branchData.cover_image,
        price_range: branchData.price_range,
        popularity_sort_value: branchData.popularity_sort_value,
        is_take_pre_order: branchData.is_take_pre_order.toString(),
        is_veg: branchData.is_veg.toString(),
        is_popular: branchData.is_popular.toString(),
        is_delivery: branchData.is_delivery.toString(),
        is_pickup: branchData.is_pickup.toString(),
        is_dine: branchData.is_dine.toString(),
        commission: branchData.commission,
        minimum_order_value: branchData.min_order_value,
        delivery_time: branchData.delivery_time,
        pickup_time: branchData.pickup_time,
        email: branchData.email,
        share_link: "",
      })

      // set image start
      setImages({
        image: branchData.image,
      })

      setCoverImages({
        cover_image: branchData.cover_image,
      })
      // set image end

      // Attribute set start
      const common_attributes = props?.get_all_branch_attribute_data?.filter(
        elem =>
          branchData?.attributes?.find(
            ({ branch_attribute_id }) => elem._id === branch_attribute_id
          )
      )

      setSelectedBranchAttribute(
        common_attributes
          ? common_attributes?.map((item, key) => {
              return { label: item.name, value: item._id }
            })
          : ""
      )

      // Attribute set end

      // Cuisine set start
      const common_cuisines = props?.get_all_cuisine_data?.filter(elem => {
        return branchData?.cuisines?.find(
          ({ cuisine_id }) => elem._id === cuisine_id
        )
      })

      setSelectedCuisine(
        common_cuisines
          ? common_cuisines?.map((item, key) => {
              return { label: item.name, value: item._id }
            })
          : ""
      )
      // Cuisine set end

      // location set start
      let coordinates = branchData?.location?.coordinates
      console.log("coordinates :", coordinates)

      setInitialLatLong({
        lat: coordinates[1],
        lng: coordinates[0],
      })

      setLocationData({
        location: `${coordinates[1]},${coordinates[0]}`,

        lat: coordinates[1],
        lng: coordinates[0],
      })
      // location set end

      // timing set start

      setTime(
        branchData?.working_hours?.map(item => ({
          day: item.day,
          startTime: moment({
            hour: item.open_hour,
            minute: item.open_minute,
          }).format("HH:mm"),
          endTime: moment({
            hour: item.close_hour,
            minute: item.close_minute,
          }).format("HH:mm"),
        }))
      )
      // timing set end

      setLoading(false)
    }
  }, [
    props.get_branch_by_id_loading,
    props.get_all_branch_attribute_loading,
    props.get_all_restaurant_loading,
    props.get_all_user_loading,
    props.get_zonal_admin_loading,
    props.get_all_cuisine_loading,
  ])

  useEffect(() => {
    console.log("location?.state :", location?.state)
    if (location?.state) {
      props.getBranchByIdAction(location.state._id)
    }
  }, [location?.state])

  if (location?.state && loading) {
    return <PageLoader />
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Branch"
            breadcrumbItem="Manage Branch"
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
                      {location.state ? "Edit Branch" : "Add a New Branch"}{" "}
                    </CardTitle>
                  </div>
                  {/* {props.get_all_restaurant_data ? props.get_all_restaurant_data.length > 0 ? <DatatableTablesWorking products={props.get_all_restaurant_data}
                                    columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_restaurant_data?._id} /> : null : null} */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="col-10 mx-auto">
              <form
                className="mt-4"
                action="#"
                onSubmit={location.state ? handleEditBranch : handleSubmit}
              >
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Branch Name <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter branch name"
                      name="name"
                      required
                      onChange={handleInputs}
                      value={zoneInfo.name ?? ""}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Restaurant Name <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <Input
                      id="exampleSelect"
                      name="restaurant"
                      value={zoneInfo.restaurant}
                      required
                      onChange={handleInputs}
                      type="select"
                    >
                      <option>Choose...</option>
                      {restaurantData}
                    </Input>
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-md-10">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter address"
                      name="email"
                      value={zoneInfo.email}
                      onChange={handleInputs}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter phone number"
                      name="phone_number"
                      required
                      value={zoneInfo.phone_number}
                      onChange={handleInputs}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Zonal Admin
                  </label>
                  <div className="col-md-10">
                    {/* <Input
                      id="exampleSelect"
                      name="zonal_admin"
                      value={zoneInfo.zonal_admin}
                      //required={true}
                      onChange={handleInputs}
                      type="select"
                    >
                      <option>Choose...</option>
                      {userData}
                    </Input> */}

                    <Select
                      required
                      value={selectedZonalAdmin}
                      onChange={handleSelectZonalAdmin}
                      options={zonal_admin}
                      isMulti={false}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label htmlFor="image" className="col-md-2 col-form-label">
                    Image
                  </label>
                  <div className="col-md-10">
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .bmp, .png, .webp"
                      name="image"
                      className="form-control"
                      id="image"
                      onChange={handleChangeImage}
                    />
                  </div>
                </Row>

                {images?.image && (
                  <Row className="mb-3">
                    <label className="col-md-2">
                      <span></span>
                    </label>
                    <div className="col-md-10">
                      <img
                        src={images.image}
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

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Cuisine <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <Select
                      required
                      value={selectedCuisine}
                      onChange={handleSelectCuisine}
                      options={cusineData}
                      isMulti={true}
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Price Range <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <div className="btn-group" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        id="btnradio4"
                        autoComplete="off"
                        name="price_range"
                        onChange={handleInputs}
                        value="৳৳৳"
                        //checked={zoneInfo.price_range == "high"}
                        checked={zoneInfo.price_range == "৳৳৳" ? "৳৳৳" : ""}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="btnradio4"
                      >
                        High
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="price_range"
                        onChange={handleInputs}
                        value="৳৳"
                        id="btnradio5"
                        autoComplete="off"
                        //checked={zoneInfo.price_range == "medium"}
                        checked={zoneInfo.price_range == "৳৳" ? "৳৳" : ""}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="btnradio5"
                      >
                        Medium
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="price_range"
                        onChange={handleInputs}
                        value="৳"
                        id="btnradio6"
                        autoComplete="off"
                        //checked={zoneInfo.price_range == "low"}
                        checked={zoneInfo.price_range == "৳" ? "৳" : ""}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="btnradio6"
                      >
                        Low
                      </label>
                    </div>
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Pre Order <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <div className="btn-group" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        id="popularity_sort"
                        name="is_take_pre_order"
                        value="true"
                        onChange={handleInputs}
                        //checked={zoneInfo.popularity_sort_value === "1"}
                        checked={zoneInfo.is_take_pre_order == "true"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="popularity_sort"
                      >
                        Yes
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="is_take_pre_order"
                        value="false"
                        onChange={handleInputs}
                        id="popularity_value1"
                        //checked={zoneInfo.popularity_sort_value === "0"}
                        checked={zoneInfo.is_take_pre_order == "false"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="popularity_value1"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Vegetarian <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <div className="btn-group" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        id="is_veg"
                        autoComplete="off"
                        name="is_veg"
                        onChange={handleInputs}
                        value="true"
                        checked={zoneInfo.is_veg == "true"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_veg"
                      >
                        Yes
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="is_veg"
                        onChange={handleInputs}
                        value="false"
                        id="is_veg1"
                        autoComplete="off"
                        checked={zoneInfo.is_veg == "false"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_veg1"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Popular <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <div className="btn-group" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        id="is_popular"
                        autoComplete="off"
                        name="is_popular"
                        onChange={handleInputs}
                        value="true"
                        checked={zoneInfo.is_popular == "true"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_popular"
                      >
                        Yes
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="is_popular"
                        onChange={handleInputs}
                        value="false"
                        id="is_popular1"
                        autoComplete="off"
                        checked={zoneInfo.is_popular == "false"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_popular1"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Delivery <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <div className="btn-group" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        id="is_delivery"
                        autoComplete="off"
                        name="is_delivery"
                        onChange={handleInputs}
                        value="true"
                        checked={zoneInfo.is_delivery == "true"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_delivery"
                      >
                        Yes
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="is_delivery"
                        onChange={handleInputs}
                        value="false"
                        id="is_delivery1"
                        autoComplete="off"
                        checked={zoneInfo.is_delivery == "false"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_delivery1"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Pickup <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <div className="btn-group" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        id="is_pickup"
                        autoComplete="off"
                        name="is_pickup"
                        onChange={handleInputs}
                        value="true"
                        checked={zoneInfo.is_pickup == "true"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_pickup"
                      >
                        Yes
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="is_pickup"
                        onChange={handleInputs}
                        value="false"
                        id="is_pickup1"
                        autoComplete="off"
                        checked={zoneInfo.is_pickup == "false"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_pickup1"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Dine <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <div className="btn-group" role="group">
                      <input
                        type="radio"
                        className="btn-check"
                        id="is_dine"
                        autoComplete="off"
                        name="is_dine"
                        onChange={handleInputs}
                        value="true"
                        checked={zoneInfo.is_dine == "true"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_dine"
                      >
                        Yes
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="is_dine"
                        onChange={handleInputs}
                        value="false"
                        id="is_dine1"
                        autoComplete="off"
                        checked={zoneInfo.is_dine == "false"}
                      />
                      <label
                        className="btn btn-outline-secondary"
                        htmlFor="is_dine1"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Commission <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="number"
                      className="form-control"
                      id="city"
                      required
                      min="0"
                      placeholder="Enter commission amount"
                      name="commission"
                      value={zoneInfo.commission ?? ""}
                      onChange={handleInputs}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Minimum Order Value <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="number"
                      className="form-control"
                      id="minimum_order_value"
                      placeholder="Enter minimum order value"
                      name="minimum_order_value"
                      required
                      min="0"
                      value={zoneInfo.minimum_order_value ?? ""}
                      onChange={handleInputs}
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Delivery Time <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="number"
                      className="form-control"
                      id="city"
                      placeholder="Enter Delivery Time"
                      name="delivery_time"
                      required
                      min="0"
                      value={zoneInfo.delivery_time ?? ""}
                      onChange={handleInputs}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Pickup Time <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="number"
                      className="form-control"
                      id="city"
                      required
                      min="0"
                      placeholder="Enter Delivery Time"
                      name="pickup_time"
                      value={zoneInfo.pickup_time ?? ""}
                      onChange={handleInputs}
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Address <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      id="delivery_charge_1"
                      placeholder="Enter Address"
                      name="address"
                      required
                      onChange={handleInputs}
                      value={zoneInfo.address}
                    />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label
                    htmlFor="branch-attribute"
                    className="col-md-2 col-form-label"
                  >
                    Branch Attribute
                  </label>
                  <div className="col-md-10">
                    <Select
                      value={selectedBranchAttribute}
                      onChange={handleSelectBranchAttribute}
                      options={branchAttributeData}
                      isMulti={true}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Location <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      name="location"
                      required
                      value={locationData.location}
                      readOnly={true}
                    />
                  </div>
                </Row>

                <Card>
                  <CardBody>
                    <div
                      id="gmaps-markers"
                      className="gmaps"
                      style={{ position: "relative" }}
                    >
                      <Map
                        style={{ width: "100%", height: "100%" }}
                        google={props.google}
                        initialCenter={initialLatLong}
                        zoom={12}
                        onClick={e => onMapClickHandler(e)}
                      >
                        <Marker
                          position={initialLatLong}
                          draggable={true}
                          onDragend={moveMarker}
                          onClick={e => {
                            onMarkerClick(e)
                          }}
                        />
                      </Map>
                    </div>
                  </CardBody>
                </Card>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Restaurant Timings
                  </label>
                </Row>
                {/* ==================restaurant time================= */}

                {time.map((row, idx) => (
                  <React.Fragment key={idx}>
                    <div data-repeater-list="group-a" id={"addr" + idx}>
                      <div data-repeater-item className="row">
                        <div className="mb-3 col-lg-2">
                          <label className="form-label" htmlFor="name">
                            Day
                          </label>
                          <Input
                            id="name"
                            name="day"
                            className="form-control"
                            placeholder="select day"
                            value={row.day}
                            onChange={e => handleTimeChange(e, idx)}
                            type="select"
                          >
                            <option>Choose...</option>

                            <option value="6">Saturday</option>
                            <option value="7">Sunday</option>
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                          </Input>
                        </div>

                        <div className="mb-3 col-lg-2">
                          <label className="form-label" htmlFor="startTime">
                            Start Time
                          </label>
                          <input
                            type="time"
                            id="startTime"
                            className="form-control"
                            name="startTime"
                            placeholder="Start Time"
                            value={row.startTime}
                            // max={row.endTime}
                            onChange={e => handleTimeChange(e, idx)}
                          />
                        </div>

                        <div className="mb-3 col-lg-2">
                          <label className="form-label" htmlFor="subject">
                            End Time
                          </label>
                          <input
                            type="time"
                            id="subject"
                            className="form-control"
                            name="endTime"
                            placeholder="End Time"
                            value={row.endTime}
                            min={row.startTime}
                            onChange={e => handleTimeChange(e, idx)}
                          />
                        </div>

                        <Col lg={2} className="align-self-center d-grid mt-3">
                          <input
                            data-repeater-delete
                            type="button"
                            className="btn btn-primary"
                            value="Delete"
                            onClick={() => handleRowDelete(idx)}
                          />
                        </Col>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <Button
                  onClick={() => {
                    handleAddRowNested()
                  }}
                  color="success"
                  className="btn btn-success mt-3 mt-lg-0"
                >
                  Add
                </Button>

                <div className="mb-3 row">
                  <div className="col-12 text-end">
                    <button
                      className="btn btn-primary w-md waves-effect waves-light"
                      type="submit"
                    >
                      {location.state ? "Edit Branch" : "Add Branch"}
                    </button>
                  </div>
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
  const {
    get_all_restaurant_data,
    get_all_restaurant_loading,

    add_branch_loading,
    edit_branch_loading,

    get_all_cuisine_data,
    get_all_cuisine_loading,
  } = state.Restaurant

  const {
    get_branch_by_id_data,
    get_branch_by_id_error,
    get_branch_by_id_loading,
  } = state.Branch

  const {
    get_all_user_data,
    get_all_user_loading,
    get_zonal_admin_data,
    get_zonal_admin_loading,
    get_branch_admin_data,
    get_branch_admin_loading,
    get_central_admin_data,
    get_central_admin_loading,
  } = state.registerNew
  const { get_all_branch_attribute_data, get_all_branch_attribute_loading } =
    state.BranchAttribute
  return {
    get_all_branch_attribute_data,
    get_all_branch_attribute_loading,

    get_all_restaurant_data,
    get_all_restaurant_loading,

    get_all_user_data,
    get_all_user_loading,
    add_branch_loading,
    edit_branch_loading,

    get_all_cuisine_data,
    get_all_cuisine_loading,

    get_branch_by_id_data,
    get_branch_by_id_error,
    get_branch_by_id_loading,

    get_zonal_admin_data,
    get_zonal_admin_loading,
    get_branch_admin_data,
    get_branch_admin_loading,
    get_central_admin_data,
    get_central_admin_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllRestaurantAction,
    getAllAdminUsersAction,
    branchAddAction,
    addBranchFresh,
    branchEditAction,
    editBranchFresh,
    getAllCuisneAction,
    getAllBranchAttributeAction,
    getBranchByIdAction,
    getZonalAdminUser,
    getZonalAdminUserFresh,
    getBranchAdminUser,
    getBranchAdminUserFresh,
    getCentralAdminUser,
    getCentralAdminUserFresh,
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyDKIxr2AXZPA1k8EyJz52suWseQCFxfoMU",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(BranchAdd)
  )
)
