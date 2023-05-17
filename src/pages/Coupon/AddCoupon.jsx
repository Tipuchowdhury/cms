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
  getAllBranchAction,
  addCouponAction,
  addCouponFresh,
  couponEditAction,
  couponEditFresh,
  getAllSubscriptionTypeAction,
  getAllCategoryAction,
  getAllCuisneAction,
  // getAllAdminUsersAction, //TODO: change it to normal customer
  getAllRestaurantAction,
  getAllRestaurantMenuItemAction,
  getAllZoneAction,
  getAllCustomerAction,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"

function AddCoupon(props) {
  const navigate = useNavigate()
  const location = useLocation()
  // console.log("lof", location?.state?.restaurants)

  const [couponTypes, setCouponTypes] = useState([
    {
      label: "User Wise",
      value: "user_wise",
    },
    {
      label: "Branch Wise",
      value: "branch_wise",
    },
    {
      label: "Zone Wise",
      value: "zone_wise",
    },
    {
      label: "Cuisine Wise",
      value: "cuisine_wise",
    },
    {
      label: "Category Wise",
      value: "category_wise",
    },
    {
      label: "Menu Item Wise",
      value: "menu_item_wise",
    },
    {
      label: "Subscription Type Wise",
      value: "subscription_wise",
    },
  ])
  //select multiple branch
  const common_coupon_types = couponTypes?.filter(
    elem => elem.value === location?.state?.coupon_type_name
  )
  console.log("common_coupon_types :", common_coupon_types)

  const coupon_data_edit = common_coupon_types
    ? common_coupon_types?.map((item, key) => {
        return { label: item.label, value: item.value }
      })
    : ""

  console.log(coupon_data_edit)

  const [selectedCouponType, setSelectedCouponType] = useState(
    coupon_data_edit ? coupon_data_edit[0] : ""
  )

  console.log(selectedCouponType?.value)

  const handleSelectCouponType = e => {
    //console.log(e.value);
    setSelectedCouponType(e)
  }
  //select multiple branch
  const common_branches = props?.get_all_branch_data?.filter(elem =>
    location?.state?.restaurants?.find(({ res_id }) => elem._id === res_id)
  )

  const branch_data_edit = common_branches
    ? common_branches?.map((item, key) => {
        return { label: item.name, value: item._id }
      })
    : ""
  const [selectedBranch, setSelectedBranch] = useState(
    branch_data_edit ? branch_data_edit : ""
  )
  const handleSelectBranch = e => {
    setSelectedBranch(e)
  }

  let branchDate = undefined
  if (props.get_all_branch_data?.length > 0) {
    branchDate = props.get_all_branch_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  //select multiple category
  const common_categories = props?.get_all_category_data?.filter(elem =>
    location?.state?.categories?.find(
      ({ category_id }) => elem._id === category_id
    )
  )

  const category_data_edit = common_categories
    ? common_categories?.map((item, key) => {
        return { label: item.category_name, value: item._id }
      })
    : ""
  const [selectedCategory, setSelectedCategory] = useState(
    category_data_edit ? category_data_edit : ""
  )
  const handleSelectCategory = e => {
    setSelectedCategory(e)
  }

  let categoryData = undefined
  if (props.get_all_category_data?.length > 0) {
    categoryData = props.get_all_category_data?.map((item, key) => ({
      label: item.category_name,
      value: item._id,
    }))
  }

  //select multiple cuisine
  const common_cuisine = props?.get_all_cuisine_data?.filter(elem =>
    location?.state?.cuisines?.find(({ cusine_id }) => elem._id === cusine_id)
  )

  const cuisine_data_edit = common_cuisine
    ? common_cuisine?.map((item, key) => {
        return { label: item.name, value: item._id }
      })
    : ""

  const [selectedCuisine, setSelectedCuisine] = useState(
    cuisine_data_edit ? cuisine_data_edit : ""
  )
  const handleSelectCuisine = e => {
    setSelectedCuisine(e)
  }

  let cuisineData = undefined
  if (props.get_all_cuisine_data?.length > 0) {
    cuisineData = props.get_all_cuisine_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  // console.log("cuisineData", cuisineData)

  //select multiple user
  const common_user = props?.get_all_customer_data?.filter(elem =>
    location?.state?.customers?.find(
      ({ customer_id }) => elem._id === customer_id
    )
  )

  const user_data_edit = common_user
    ? common_user?.map((item, key) => {
        return {
          label: `${item.first_name} ${item.last_name}`,
          value: item._id,
        }
      })
    : ""
  const [selectedUser, setSelectedUser] = useState(
    user_data_edit ? user_data_edit : ""
  )
  const handleSelectUser = e => {
    setSelectedUser(e)
  }

  let userData = undefined
  if (props.get_all_customer_data?.length > 0) {
    userData = props.get_all_customer_data?.map((item, key) => ({
      label: `${item.first_name} ${item.last_name}`,
      value: item._id,
    }))
  }

  //select multiple zone
  const common_zone = props?.get_all_zone_data?.filter(elem =>
    location?.state?.zones?.find(({ zone_id }) => elem._id === zone_id)
  )

  const zone_data_edit = common_zone
    ? common_zone?.map((item, key) => {
        return {
          label: item.name,
          value: item._id,
        }
      })
    : ""
  const [selectedZone, setSelectedZone] = useState(
    zone_data_edit ? zone_data_edit : ""
  )
  const handleSelectZone = e => {
    setSelectedZone(e)
  }

  let zoneData = undefined
  if (props.get_all_zone_data?.length > 0) {
    zoneData = props.get_all_zone_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const common_menu = props?.get_all_menu_data?.filter(elem =>
    location?.state?.menu_items?.find(
      ({ menu_item_id }) => elem._id === menu_item_id
    )
  )

  const menu_data_edit = common_menu
    ? common_menu?.map((item, key) => {
        return {
          label: item.menu_name,
          value: item._id,
        }
      })
    : ""

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    menu_data_edit ? menu_data_edit : ""
  )
  const handleSelectMenu = e => {
    setSelectedMenuItem(e)
  }

  let menuData = undefined
  if (props.get_all_menu_data?.length > 0) {
    menuData = props.get_all_menu_data?.map((item, key) => ({
      label: item.menu_name,
      value: item._id,
    }))
  }

  //select multiple subscription_type
  const common_subscription_type =
    props?.get_all_subscription_type_data?.filter(elem =>
      location?.state?.subscription_types?.find(
        ({ subscription_type_id }) => elem._id === subscription_type_id
      )
    )

  const subscription_type_data_edit = common_subscription_type
    ? common_subscription_type?.map((item, key) => {
        return {
          label: item.name,
          value: item._id,
        }
      })
    : ""
  const [selectedSubType, setSelectedSubType] = useState(
    subscription_type_data_edit ? subscription_type_data_edit : ""
  )
  const handleSelectSubType = e => {
    setSelectedSubType(e)
  }

  let subTypeData = undefined
  if (props.get_all_subscription_type_data?.length > 0) {
    subTypeData = props.get_all_subscription_type_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const [images, setImages] = useState({
    image: location.state ? location.state.image : "",
  })

  const [couponInfo, setCouponInfo] = useState({
    name: location.state ? location.state.name : "",
    image: location.state ? location.state.image : "",
    description: location.state ? location.state.description : "",
    coupon_type_id: location.state ? location.state.coupon_type_id : "",
    coupon_type_name: location.state ? location.state.coupon_type_name : "",
    is_gradual: location.state ? location.state.is_gradual.toString() : "",
    use_limit: location.state ? location.state.use_limit : 0,
    is_auto_apply: location.state
      ? location.state.is_auto_apply.toString()
      : "",
    daily_use_limit: location.state ? location.state.daily_use_limit : 0,
    is_percent: location.state ? location.state.is_percent.toString() : "",
    is_active: location.state ? location.state.is_active : true,
    discount_in_amount: location.state ? location.state.discount_in_amount : 0,
    discount_in_percent: location.state
      ? location.state.discount_in_percent
      : 0,
    minimum_order_amount: location.state
      ? location.state.minimum_order_amount
      : 0,
    maximum_discount_amount: location.state
      ? location.state.maximum_discount_amount
      : 0,
    total_coupon: location.state ? location.state.total_coupon : 0,

    valid_time_in_a_day_start: location.state
      ? location.state.valid_time_in_a_day_start
      : "00:00",
    valid_time_in_a_day_end: location.state
      ? location.state.valid_time_in_a_day_end
      : "23:59",

    start_time: location.state
      ? location.state.start_time
      : new Date().toISOString(),
    end_time: location.state
      ? location.state.end_time
      : new Date().toISOString(),
  })
  console.log("tt", new Date().toISOString())
  const handleTimeChange = e => {
    console.log("e :", e.target.value)
    console.log(new Date(e.target.value).toISOString())
    name = e.target.name
    value = e.target.value
    let new_time_string = `${value}:00Z`
    setCouponInfo({
      ...couponInfo,
      [name]: new Date(new_time_string).toISOString(),
    })
  }

  const handleFiles = e => {
    name = e.target.name
    value = e.target.files[0]
    setCouponInfo({ ...couponInfo, [name]: value })
    const reader = new FileReader()

    reader.onload = () => {
      setImages({ ...images, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  const gradual_for_edit = location.state?.gradual_informations?.map(item => ({
    sequence: item.sequence,
    discount_percent: item.discount_percent,
  }))

  const gradualTemplate = { sequence: "", discount_percent: "" }
  const [gradual, setGradual] = useState(
    location.state ? gradual_for_edit : [gradualTemplate]
  )

  function handleAddRowNested() {
    setGradual([...gradual, gradualTemplate])
  }
  const handleRowDelete = index => {
    const filteredGradual = [...gradual]
    if (filteredGradual.length > 1) {
      filteredGradual.splice(index, 1)
      setGradual(filteredGradual)
    }
  }
  const handleGradualChange = (e, index) => {
    console.log(index)
    const updatedValue = gradual.map((row, i) =>
      index === i
        ? Object.assign(row, { [e.target.name]: e.target.value })
        : row
    )
    setGradual(updatedValue)
  }
  let name, value
  const handleInputs = e => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    name === "name" ? (value = e.target.value.toUpperCase()) : ""
    setCouponInfo({ ...couponInfo, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const uniqueId = uuidv4()
    console.log(couponInfo)
    props.addCouponAction(
      uniqueId,
      couponInfo,
      selectedCouponType,
      selectedBranch,
      selectedCategory,
      selectedCuisine,
      selectedSubType,
      selectedUser,
      selectedZone,
      selectedMenuItem,
      gradual
    )
  }

  const handleSubmitForEdit = e => {
    e.preventDefault()
    console.log("======================I am in the edit form==================")

    props.couponEditAction(
      location.state._id,
      couponInfo,
      selectedCouponType,
      selectedBranch,
      selectedCategory,
      selectedCuisine,
      selectedSubType,
      selectedUser,
      selectedZone,
      selectedMenuItem,
      gradual
    )
  }

  console.log(props.add_coupon_loading)
  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    if (props.get_all_menu_loading == false) {
      props.getAllRestaurantMenuItemAction()
    }

    if (props.get_all_category_loading == false) {
      props.getAllCategoryAction()
    }

    if (props.get_all_cuisine_loading == false) {
      props.getAllCuisneAction()
    }

    if (props.get_all_zone_loading == false) {
      props.getAllZoneAction()
    }
    if (props.get_all_category_loading == false) {
      props.getAllCategoryAction()
    }
    if (props.get_all_customer_loading == false) {
      props.getAllCustomerAction()
    }
    if (props.get_all_subscription_type_loading == false) {
      props.getAllSubscriptionTypeAction()
    }

    console.log("add_coupon_loading :", props.add_coupon_loading)
    if (props.add_coupon_loading === "Success") {
      // redirect
      props.addCouponFresh()
      navigate("/coupon")
    }

    if (props.coupon_edit_loading === "Success") {
      // redirect
      props.couponEditFresh()
      navigate("/coupon")
    }
  }, [
    props.get_all_branch_loading,
    props.add_coupon_loading,
    props.coupon_edit_loading,
    props.get_all_cuisine_loading,
    props.get_all_zone_loading,
    props.get_all_category_loading,
    props.get_all_customer_loading,
    props.get_all_subscription_type_loading,
    props.get_all_category_loading,
    props.get_all_menu_loading,
  ])

  console.log(props.get_all_branch_data)

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Coupon"
              breadcrumbItem={location.state ? "Edit Coupon" : "Add Coupon"}
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
                        {location.state ? "Edit Coupon" : "Add a New Coupon"}
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
                      Name
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        name="name"
                        onChange={handleInputs}
                        value={couponInfo.name ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Type
                    </label>
                    <div className="col-md-10">
                      <Select
                        value={selectedCouponType}
                        onChange={handleSelectCouponType}
                        options={couponTypes}
                        isMulti={false}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Description
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter description"
                        name="description"
                        onChange={handleInputs}
                        value={couponInfo.description ?? ""}
                        required
                      ></textarea>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label htmlFor="image" className="col-md-2 col-form-label">
                      Image
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleFiles}
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

                  {selectedCouponType?.value == "branch_wise" ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Branches
                      </label>
                      <div className="col-md-10">
                        <Select
                          value={selectedBranch}
                          onChange={handleSelectBranch}
                          options={branchDate}
                          isMulti={true}
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  {selectedCouponType?.value == "category_wise" ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Categories
                      </label>
                      <div className="col-md-10">
                        <Select
                          value={selectedCategory}
                          onChange={handleSelectCategory}
                          options={categoryData}
                          isMulti={true}
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  {selectedCouponType?.value == "cuisine_wise" ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Cuisines
                      </label>
                      <div className="col-md-10">
                        <Select
                          value={selectedCuisine}
                          onChange={handleSelectCuisine}
                          options={cuisineData}
                          isMulti={true}
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  {selectedCouponType?.value == "user_wise" ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Users
                      </label>
                      <div className="col-md-10">
                        <Select
                          value={selectedUser}
                          onChange={handleSelectUser}
                          options={userData}
                          isMulti={true}
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  {selectedCouponType?.value == "zone_wise" ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Zones
                      </label>
                      <div className="col-md-10">
                        <Select
                          value={selectedZone}
                          onChange={handleSelectZone}
                          options={zoneData}
                          isMulti={true}
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  {selectedCouponType?.value == "menu_item_wise" ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Menu Item
                      </label>
                      <div className="col-md-10">
                        <Select
                          value={selectedMenuItem}
                          onChange={handleSelectMenu}
                          options={menuData}
                          isMulti={true}
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  {selectedCouponType?.value == "subscription_wise" ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Subscription Type
                      </label>
                      <div className="col-md-10">
                        <Select
                          value={selectedSubType}
                          onChange={handleSelectSubType}
                          options={subTypeData}
                          isMulti={true}
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Auto Apply
                    </label>
                    <div className="col-md-10">
                      <div className="btn-group" role="group">
                        <input
                          type="radio"
                          className="btn-check"
                          id="is_auto_apply"
                          name="is_auto_apply"
                          value="true"
                          onChange={handleInputs}
                          checked={couponInfo.is_auto_apply == "true"}
                        />
                        <label
                          className="btn btn-outline-secondary"
                          htmlFor="is_auto_apply"
                        >
                          Yes
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="is_auto_apply"
                          value="false"
                          onChange={handleInputs}
                          id="is_auto_apply1"
                          checked={couponInfo.is_auto_apply == "false"}
                        />
                        <label
                          className="btn btn-outline-secondary"
                          htmlFor="is_auto_apply1"
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
                      Use Limit
                    </label>
                    <div className="col-md-10">
                      <input
                        type="number"
                        className="form-control"
                        id="use_limit"
                        placeholder="Enter Use Limit"
                        name="use_limit"
                        onChange={handleInputs}
                        value={couponInfo.use_limit ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Daily Use Limit
                    </label>
                    <div className="col-md-10">
                      <input
                        type="number"
                        className="form-control"
                        id="daily_use_limit"
                        placeholder="Enter Daily Use Limit"
                        name="daily_use_limit"
                        onChange={handleInputs}
                        value={couponInfo.daily_use_limit ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Discount Type
                    </label>
                    <div className="col-md-10">
                      <div className="btn-group" role="group">
                        <input
                          type="radio"
                          className="btn-check"
                          id="is_percent"
                          name="is_percent"
                          value="true"
                          onChange={handleInputs}
                          checked={couponInfo.is_percent == "true"}
                        />
                        <label
                          className="btn btn-outline-secondary"
                          htmlFor="is_percent"
                        >
                          Percent
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="is_percent"
                          value="false"
                          onChange={handleInputs}
                          id="is_percent1"
                          checked={couponInfo.is_percent == "false"}
                        />
                        <label
                          className="btn btn-outline-secondary"
                          htmlFor="is_percent1"
                        >
                          Amount
                        </label>
                      </div>
                    </div>
                  </Row>

                  {couponInfo?.is_percent == "false" ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Discount
                      </label>
                      <div className="col-md-10">
                        <input
                          type="number"
                          className="form-control"
                          id="discount_in_amount"
                          placeholder="Enter Discount"
                          name="discount_in_amount"
                          onChange={handleInputs}
                          value={couponInfo.discount_in_amount ?? ""}
                          required
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  {couponInfo?.is_percent == "true" ? (
                    <Row className="mb-3">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-2 col-form-label"
                      >
                        Discount (%)
                      </label>
                      <div className="col-md-10">
                        <input
                          type="number"
                          className="form-control"
                          id="discount_in_percent"
                          placeholder="Enter Discount in Percent"
                          name="discount_in_percent"
                          onChange={handleInputs}
                          value={couponInfo.discount_in_percent ?? ""}
                          required
                        />
                      </div>
                    </Row>
                  ) : (
                    ""
                  )}

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Minimum Order Amount
                    </label>
                    <div className="col-md-10">
                      <input
                        type="number"
                        className="form-control"
                        id="minimum_order_amount"
                        placeholder="Minimum Order Amount"
                        name="minimum_order_amount"
                        onChange={handleInputs}
                        value={couponInfo.minimum_order_amount ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Maximum Discount Amount
                    </label>
                    <div className="col-md-10">
                      <input
                        type="number"
                        className="form-control"
                        id="maximum_discount_amount"
                        placeholder="Maximum Discount Amount"
                        name="maximum_discount_amount"
                        onChange={handleInputs}
                        value={couponInfo.maximum_discount_amount ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Valid Time Start
                    </label>
                    <div className="col-md-10">
                      <input
                        type="time"
                        className="form-control"
                        id="valid_time_in_a_day_start"
                        placeholder="Valid Time Start"
                        name="valid_time_in_a_day_start"
                        onChange={handleInputs}
                        value={couponInfo.valid_time_in_a_day_start ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Valid Time End
                    </label>
                    <div className="col-md-10">
                      <input
                        type="time"
                        className="form-control"
                        id="valid_time_in_a_day_end"
                        placeholder="Valid Time End"
                        name="valid_time_in_a_day_end"
                        onChange={handleInputs}
                        value={couponInfo.valid_time_in_a_day_end ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Start Time
                    </label>
                    <div className="col-md-10">
                      <input
                        type="datetime-local"
                        id="start_time"
                        className="form-control"
                        name="start_time"
                        placeholder="Start Time"
                        value={couponInfo.start_time.slice(0, 16)}
                        onChange={e => handleTimeChange(e)}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      End Time
                    </label>
                    <div className="col-md-10">
                      <input
                        type="datetime-local"
                        id="end_time"
                        className="form-control"
                        name="end_time"
                        placeholder="End Time"
                        value={couponInfo.end_time.slice(0, 16)}
                        onChange={e => handleTimeChange(e)}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Gradual
                    </label>
                    <div className="col-md-10">
                      <div className="btn-group" role="group">
                        <input
                          type="radio"
                          className="btn-check"
                          id="is_gradual"
                          name="is_gradual"
                          value="true"
                          onChange={handleInputs}
                          checked={couponInfo.is_gradual == "true"}
                        />
                        <label
                          className="btn btn-outline-secondary"
                          htmlFor="is_gradual"
                        >
                          Yes
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="is_gradual"
                          value="false"
                          onChange={handleInputs}
                          id="is_gradual1"
                          checked={couponInfo.is_gradual == "false"}
                        />
                        <label
                          className="btn btn-outline-secondary"
                          htmlFor="is_gradual1"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </Row>
                  {couponInfo?.is_gradual == "true" ? (
                    <Row className="mb-1">
                      <label
                        htmlFor="example-text-input"
                        className="col-md-3 col-form-label"
                      >
                        Gradual Information
                      </label>
                      {/* <div className="col-md-10">
                                        <input type="text" className="form-control" id="location" name="location" value={state2.location} />
                                    </div> */}
                    </Row>
                  ) : (
                    ""
                  )}

                  {gradual.map((row, idx) => (
                    <React.Fragment key={idx}>
                      {couponInfo.is_gradual == "true" ? (
                        <div data-repeater-list="group-a" id={"addr" + idx}>
                          <div data-repeater-item className="row">
                            <div className="mb-3 col-lg-3">
                              <label className="form-label" htmlFor="sequence">
                                Sequence
                              </label>
                              <input
                                type="number"
                                id="sequence"
                                className="form-control"
                                name="sequence"
                                placeholder="Sequence"
                                value={row.sequence}
                                onChange={e => handleGradualChange(e, idx)}
                              />
                            </div>

                            <div className="mb-3 col-lg-3">
                              <label
                                className="form-label"
                                htmlFor="discount_percent"
                              >
                                Discount (%)
                              </label>
                              <input
                                type="number"
                                step={0.25}
                                id="discount_percent"
                                className="form-control"
                                name="discount_percent"
                                placeholder="Discount"
                                value={row.discount_percent}
                                onChange={e => handleGradualChange(e, idx)}
                              />
                            </div>

                            <Col
                              lg={2}
                              className="align-self-center d-grid mt-3"
                            >
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
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  ))}
                  {couponInfo?.is_gradual == "true" ? (
                    <Button
                      onClick={() => {
                        handleAddRowNested()
                      }}
                      color="success"
                      className="btn btn-success mt-3 mt-lg-0"
                    >
                      Add
                    </Button>
                  ) : (
                    ""
                  )}

                  <div className="mb-3 row">
                    <div className="col-12 text-end">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="submit"
                      >
                        {location.state ? "Edit Coupon" : "Add Coupon"}
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
    get_all_branch_loading,
    get_all_branch_data,
    get_all_cuisine_data,
    get_all_cuisine_error,
    get_all_cuisine_loading,
    get_all_zone_data,
    get_all_zone_error,
    get_all_zone_loading,
    get_all_menu_data,
    get_all_menu_loading,
  } = state.Restaurant
  const {
    get_all_category_data,
    get_all_category_error,
    get_all_category_loading,
  } = state.Category

  const {
    get_all_customer_data,
    get_all_customer_error,
    get_all_customer_loading,
  } = state.Customer

  const {
    get_all_subscription_type_data,
    get_all_subscription_type_error,
    get_all_subscription_type_loading,
  } = state.SubscriptionTypes

  const { add_coupon_loading, coupon_edit_loading } = state.Coupon
  return {
    get_all_menu_data,
    get_all_menu_loading,
    get_all_branch_loading,
    get_all_branch_data,
    add_coupon_loading,
    coupon_edit_loading,
    get_all_cuisine_data,
    get_all_cuisine_error,
    get_all_cuisine_loading,
    get_all_zone_data,
    get_all_zone_error,
    get_all_zone_loading,
    get_all_category_data,
    get_all_category_error,
    get_all_category_loading,
    get_all_customer_data,
    get_all_customer_error,
    get_all_customer_loading,
    get_all_subscription_type_data,
    get_all_subscription_type_error,
    get_all_subscription_type_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllRestaurantMenuItemAction,
    getAllBranchAction,
    addCouponAction,
    addCouponFresh,
    couponEditAction,
    couponEditFresh,
    getAllSubscriptionTypeAction,
    getAllCategoryAction,
    getAllCuisneAction,
    getAllCustomerAction,
    getAllRestaurantAction,
    getAllZoneAction,
  })(AddCoupon)
)
