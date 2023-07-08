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
  getAllBranchAction,
  addRestaurantMenuAction2,
  addRestaurantMenuAddFresh,
  getAllAddOnsCategoryAction,
  getAllMenuTimeSlot,
  getCategoryByIdAction,
  getCategoryByIdFresh,
  getCategoryByBranchIdAction,
  getCategoryByBranchIdFresh,
  getTimeSLotByBranchIdAction,
  getTimeSLotByBranchIdFresh,
  getAllCategoryAction,
} from "store/actions"
import Breadcrumbs from "components/Common/Breadcrumb"
import { boolean } from "yup"
import Select from "react-select"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { toast } from "react-toastify"
import CustomLoader from "components/CustomLoader/CustomLoader"

const LoadingContainer = () => <div>Loading...</div>

function AddMenu2(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [timeSLotLoading, setTimeSLotLoading] = useState(false)
  useEffect(() => {
    props.getTimeSLotByBranchIdFresh()
    setMenuItem([{ ...menuItem, menu_available_times: [] }])
  }, [])
  const [info, setInfo] = useState({
    // name: location.state ? location.state.menu_name : "",
    // menu_description: location.state ? location.state.description : "",
    restaurant: location.state ? location.state.restaurant_id : "",
    category: location.state ? location.state.category_id : "",
    // variation_group_name: location.state
    //   ? location.state.variation_group_name
    //   : "",
    // variation_grp_desc: location.state ? location.state.variation_grp_desc : "",
    // is_popular: location.state ? location.state.is_popular.toString() : "true",
    // is_delivery: location.state
    //   ? location.state.is_delivery.toString()
    //   : "true",
    // is_pickup: location.state ? location.state.is_pickup.toString() : "true",
    // is_dine: location.state ? location.state.is_dine.toString() : "true",
    // menu_price: location.state ? location.state.menu_price : "",
    // recipe_time: location.state ? location.state.recipe_time : "",
    // pickup_menu_price: location.state ? location.state.pickup_menu_price : "",
    // vat: location.state ? location.state.vat : "",
    sd: location.state ? location.state.sd : "",
  })

  const [addNewCategory, setAddNewCategory] = useState([])

  const [isChecked, setIsChecked] = useState(
    location.state ? location.state.has_variation : false
  )

  const [modal, setModal] = useState(false)
  const closeModal = () => {
    setModal(!modal)
  }
  const toggle = () => setModal(!modal)

  const handleModal = (add_on_categories, variation_id, menu_id) => {
    let results = []
    let add_ons_array = []

    add_on_categories?.forEach((add_on_category, index) => {
      add_on_category.add_ons?.forEach((add_on, index) => {
        add_ons_array.push({
          _id: add_on._id,
          add_on_name: add_on.add_ons_name
            ? add_on.add_ons_name
            : add_on.add_on_name,
          add_on_price: add_on.add_ons_price
            ? add_on.add_ons_price
            : add_on.add_on_price,
          addoncat_id: add_on.addoncat_id,
          is_multiple: add_on.is_multiple,
          max_choice: add_on.max_choice,
          variation_and_add_on_category_id:
            add_on.variation_and_add_on_category_id,
        })
      })
      results.push({
        _id: add_on_category._id,
        add_on_category_desc: add_on_category.add_on_category_desc,
        add_on_category_id: add_on_category.add_on_category_id,
        add_on_category_name: add_on_category.add_on_category_name,
        add_ons: add_ons_array,
        cat_is_multiple: add_on_category.cat_is_multiple,
        cat_max_choice: add_on_category.cat_max_choice,
        language_slug: add_on_category.language_slug,
        variation_id: add_on_category.variation_id,
        menu_id: add_on_category.menu_id,
      })
      add_ons_array = []
    })

    setAddNewCategory(results)

    toggle()
  }
  let slot_data = []

  props?.get_time_slot_by_branch_id_data?.forEach((time_slot, index) => {
    if (time_slot.is_active == true) {
      slot_data.push({
        _id: time_slot._id,
        checked: false,
        name: time_slot.name,
        start_time: time_slot.start_time,
        end_time: time_slot.end_time,
      })
    }
  })

  // ===========================start working from here ====================
  // const [item, setItem] = useState([])

  // ===========================ends here ====================

  // get all category

  let categoryData = undefined
  if (props.get_all_addOns_category_data?.length > 0) {
    categoryData = props.get_all_addOns_category_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ))
  }

  // const [images, setImages] = useState({
  //   image: location.state ? location.state.image : "",
  // })

  // const handleFiles = e => {
  //   name = e.target.name
  //   value = e.target.files[0]
  //   setInfo({ ...info, [name]: value })
  //   const reader = new FileReader()

  //   reader.onload = () => {
  //     setImages({ ...images, [name]: reader.result })
  //   }

  //   reader.readAsDataURL(value)
  // }

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }

  const [selectedBranch, setSelectedBranch] = useState()

  const handleSelectBranch = e => {
    setIsLoading(true)
    setTimeSLotLoading(true)
    let restaurantValue = e.value

    setInfo({ ...info, restaurant: restaurantValue, category: "" })

    setSelectedBranch(e)
    setCategoryNew([])
    setSelectedTimeSlot([])

    const updatedValue = menuItem.map((row, i) =>
      Object.assign(row, { menu_available_times: slot_data })
    )
    setMenuItem(updatedValue)
    props.getCategoryByBranchIdAction(restaurantValue)
    props.getTimeSLotByBranchIdAction(restaurantValue)
  }

  let branchDate = undefined
  if (props.get_all_branch_data?.length > 0) {
    branchDate = props.get_all_branch_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const [categoryNew, setCategoryNew] = useState()

  const handleSelectCategory2 = e => {
    setInfo({ ...info, category: e.value })
    setCategoryNew(e)
  }

  useEffect(() => {
    if (info.restaurant) {
      props.getCategoryByBranchIdFresh()
      props.getCategoryByBranchIdAction(info.restaurant)
      props.getTimeSLotByBranchIdFresh()
      props.getTimeSLotByBranchIdAction(info.restaurant)
    }
  }, [info.restaurant])

  useEffect(() => {
    if (props.get_category_by_branch_id_loading === "Success") {
      setCategoryNew([])
      setIsLoading(false)
    }
  }, [props.get_category_by_branch_id_loading])

  let menuCategoryData2 = undefined
  if (props.get_category_by_branch_id_data?.length > 0) {
    menuCategoryData2 = props.get_category_by_branch_id_data?.map(
      (item, key) => ({
        label: item.category_name,
        value: item._id,
      })
    )
  }

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    slot_data ? slot_data : []
  )

  useEffect(() => {
    if (props.get_time_slot_by_branch_id_loading === "Success") {
      setSelectedTimeSlot(slot_data)

      const updatedValue = menuItem.map((row, i) =>
        Object.assign(row, { menu_available_times: slot_data })
      )
      setMenuItem(updatedValue)
      setTimeSLotLoading(false)
    }
  }, [props.get_time_slot_by_branch_id_loading])

  const handleChangeTime = (e, ClickedItem, index, idx, menuId, slotId) => {
    const newArray = [...menuItem]

    const new_data = newArray[idx].menu_available_times.map((time_item, id) => {
      if (time_item._id == slotId) {
        return {
          ...time_item,
          [e.target.name]: e.target.checked,
        }
      } else {
        return time_item
      }
    })

    newArray[idx].menu_available_times = new_data

    setMenuItem(newArray)
  }

  //for variation start
  const addOnsTemplate = {
    _id: uuidv4(),
    menu_id: "",
    variation_name: "",
    variation_price: "",
    variation_group_name: "",
    variation_group_desc: "",
    add_on: false,
    add_on_categories: [],
  }
  const [addOns, setAddOns] = useState([addOnsTemplate])

  const handleAddOnsCat = (e, index, idx) => {
    let newArray = [...menuItem]

    newArray[idx].variations[index] = {
      ...newArray[idx].variations[index],
      [e.target.name]: e.target.value,
    }

    setMenuItem(newArray)
  }
  const setCatMaxChoice = (value, categoryIndex) => {
    const newCat = [...addNewCategory]

    newCat[categoryIndex] = {
      ...newCat[categoryIndex],
      cat_max_choice: value,
    }

    setAddNewCategory(newCat)
  }
  function handleAddRowNested(idx) {
    let newArray = [...menuItem]

    newArray[idx].variations = [...newArray[idx].variations, addOnsTemplate]

    setMenuItem(newArray)
  }

  const handleRowDelete = (index, idx, id) => {
    const filteredItem = [...menuItem]

    const new_data = filteredItem[idx].variations.filter((data, i) => {
      return data._id != id
    })

    filteredItem[idx].variations = new_data

    setMenuItem(filteredItem)
  }

  //for multi menu start
  const menuTemplate = {
    _id: uuidv4(),
    menu_name: "",
    description: "",
    menu_price: "",
    pickup_menu_price: "",
    recipe_time: "",
    variation_group_name: "",
    variation_group_desc: "",
    is_popular: false,
    is_delivery: false,
    is_pickup: false,
    is_dine: false,
    vat: "",
    sd: "",
    image: "",
    menu_available_times: slot_data,
    has_variation: false,
    variations: [addOnsTemplate],
  }
  const [menuItem, setMenuItem] = useState([menuTemplate])

  // useEffect(() => {
  //   if (props?.get_time_slot_by_branch_id_loading === "Success") {
  //     console.log(1)
  //     slot_data = []
  //   }
  // }, [props.get_time_slot_by_branch_id_loading])

  console.log(slot_data)
  console.log(menuItem[0].menu_available_times)

  console.log(props?.get_time_slot_by_branch_id_loading)

  const handleMenuItem = (e, index) => {
    const updatedValue = menuItem.map((row, i) =>
      index === i
        ? Object.assign(row, { [e.target.name]: e.target.value })
        : row
    )
    setMenuItem(updatedValue)
  }

  const handleMenuItemChecked = (e, index) => {
    const updatedValue = menuItem.map((row, i) =>
      index === i
        ? Object.assign(row, { [e.target.name]: e.target.checked })
        : row
    )
    setMenuItem(updatedValue)
  }

  function handleAddRowMenu() {
    setMenuItem([...menuItem, menuTemplate])
  }

  const handleDeleteRowMenu = index => {
    const filteredTime = [...menuItem]
    if (filteredTime.length > 1) {
      filteredTime.splice(index, 1)
      setMenuItem(filteredTime)
    }
  }

  const fileTemplate = {
    image: "",
  }

  const [images, setImages] = useState([fileTemplate])

  const handleFiles = (e, index) => {
    const updatedValue = menuItem.map((row, i) =>
      index === i
        ? Object.assign(row, { [e.target.name]: e.target.files[0] })
        : row
    )
    setMenuItem(updatedValue)
  }

  //for variation ends
  let name, value
  const handleInputs = e => {
    name = e.target.name
    value = e.target.value
    setInfo({ ...info, [name]: value })
  }

  // ** here is all value for "Add Ad-ons Modal"

  // *********************** start from here ****************************

  let addAddOnName, addAddOnValue

  const checkHandlerAddOns = categoryIndex => {
    const newCat = [...addNewCategory]
    newCat[categoryIndex] = {
      ...newCat[categoryIndex],
      cat_is_multiple: !newCat[categoryIndex].cat_is_multiple,
    }

    setAddNewCategory(newCat)
  }

  const [addOnsNew, setAddOnsNew] = useState([
    props?.get_category_by_id_data?.preset_add_ons,
  ])

  const handleAddOnsCatNew = (e, categoryIndex, addonIndex) => {
    const newCat = [...addNewCategory]
    newCat[categoryIndex] = {
      ...newCat[categoryIndex],
      add_ons: newCat[categoryIndex].add_ons.map((addOn, index) => {
        return index === addonIndex
          ? { ...addOn, [e.target.name]: e.target.value }
          : addOn
      }),
    }

    setAddNewCategory(newCat)
  }

  const handleRowDeleteNew = (cat_idx, index) => {
    let newAddOnCategory = [...addNewCategory]
    const filteredTime = newAddOnCategory[cat_idx].add_ons.filter(
      (val, i) => i !== index
    )

    newAddOnCategory[cat_idx].add_ons = filteredTime

    setAddNewCategory(newAddOnCategory)
  }

  const [idx, setIdx] = useState()
  const handleIdx = idx => {
    setIdx(idx)
  }

  const [index, setIndex] = useState()
  const handleIndex = index => {
    setIndex(index)
  }

  const [menuItemId, setMenuItemId] = useState()
  const handleMenuItemId = menu_id => {
    setMenuItemId(menu_id)
  }

  const [variationId, setVariationId] = useState()
  const handleVariationId = variation_id => {
    setVariationId(variation_id)
  }

  /*
   *
   * add-ons under category start
   */
  const addOnsTemplateNew_test = { add_on_name: "", add_on_price: "" }
  const [addOnUnderCategory, setAddOnUnderCategory] = useState([])

  function handleAddRowNestedNew(add_on_category_id, categoryIndex) {
    const addOnsTemplateNew = {
      _id: uuidv4(),
      add_on_category_id: add_on_category_id,
      add_on_name: "",
      add_on_price: "",
    }
    const newCat = [...addNewCategory]
    newCat[categoryIndex] = {
      ...newCat[categoryIndex],
      add_ons: [...newCat[categoryIndex].add_ons, addOnsTemplateNew],
    }

    setAddNewCategory(newCat)
  }

  /*
   *
   final template - for add menu addon
   *
   */

  const finalTemplate = {
    add_on_category_id: "",
    add_on_category_name: "",
    cat_is_multiple: false,
    cat_max_choice: 0,
    language_slug: "en",
    add_on_category_desc: "",
    variation_id: "",
    menu_id: "",
    add_ons: [],
  }

  const handleInputsAddOns = (e, idx) => {
    addAddOnName = e.target.name
    addAddOnValue = e.target.value

    // ----test -------

    let value = undefined
    var url =
      process.env.REACT_APP_LOCALHOST +
      "/AddOnCategory/GetById?id=" +
      addAddOnValue

    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        const updatedValue = addNewCategory.map((row, i) =>
          idx === i
            ? Object.assign(
                row,
                { _id: uuidv4() },
                { add_on_category_id: response.data?._id },
                { add_on_category_name: response.data?.name },
                { cat_is_multiple: response.data?.cat_is_multiple },
                {
                  cat_max_choice: response.data?.cat_max_choice
                    ? response.data?.cat_max_choice
                    : 0,
                },
                { language_slug: response.data?.language_slug },
                { add_on_category_desc: response.data?.add_on_category_desc },
                { add_ons: response.data?.preset_add_ons },
                { variation_id: variationId },
                { menu_id: menuItemId }
              )
            : row
        )
        setAddNewCategory(updatedValue)
      })
      .catch(error => {})
  }

  function handleAddCategoryRow() {
    setAddNewCategory([...addNewCategory, finalTemplate])
  }

  // ************************ ends here ********************************
  const handleAddMenu = e => {
    e.preventDefault()
    let status = 0

    if (status == 0) {
      const val = uuidv4()

      props.addRestaurantMenuAction2(info, menuItem)
    }
  }

  const handleAddOnsForm = (e, index, idx) => {
    e.preventDefault()
    //===== test ========
    const filterItem = [...menuItem]

    let addNewCategoryItem = [...addNewCategory]

    let results = []
    addNewCategoryItem?.forEach((itemData, id) => {
      itemData.add_ons?.forEach((data, index) => {
        let price = data.add_ons_price ? data.add_ons_price : data.add_on_price
        results.push({
          addoncat_id: data.add_on_category_id
            ? data.add_on_category_id
            : data.addoncat_id,
          // add_on_category_name: data.add_on_category_name,
          add_ons_name: data.add_on_name ? data.add_on_name : data.add_ons_name,
          add_ons_price: price ? price : 0,
          is_multiple: false,
          max_choice: 0,
          variation_and_add_on_category_id: itemData._id,
          _id: data._id,
        })
      })
      addNewCategoryItem[id].add_ons = results
      addNewCategoryItem[id].cat_max_choice =
        addNewCategoryItem[id].cat_max_choice == null ||
        addNewCategoryItem[id].cat_max_choice == ""
          ? 0
          : addNewCategoryItem[id].cat_max_choice
      results = []
    })

    filterItem[idx].variations[index].add_on_categories = addNewCategory

    setMenuItem(filterItem)

    setAddNewCategory([finalTemplate])

    setAddOnUnderCategory([addOnsTemplateNew_test])

    closeModal()
  }

  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }
    if (props.get_all_addOns_category_loading == false) {
      props.getAllAddOnsCategoryAction()
    }

    if (props.add_restaurant_menu_loading === "Success") {
      slot_data = []
      navigate("/menu")
      props.addRestaurantMenuAddFresh()
    }

    // if (props.get_all_menu_time_slot_loading == false) {
    //   props.getAllMenuTimeSlot()
    // }

    // if (props.get_all_category_loading == false) {
    //   props.getAllCategoryAction()
    // }

    if (props?.get_category_by_id_data?.preset_add_ons) {
      setAddOnsNew(props?.get_category_by_id_data?.preset_add_ons)
    }

    if (props.get_category_by_branch_id_loading == false && info.restaurant) {
      props.getCategoryByBranchIdAction(info.restaurant)
    }

    if (props.get_time_slot_by_branch_id_loading == false && info.restaurant) {
      props.getTimeSLotByBranchIdAction(info.restaurant)
    }
  }, [
    props.get_all_branch_loading,
    props.get_all_addOns_category_loading,
    props.add_restaurant_menu_loading,
    props.get_all_menu_time_slot_loading,
    props.get_category_by_id_data,
    props.get_category_by_id_loading,
    props.get_all_category_loading,
    props.get_category_by_branch_id_loading,
    props.get_time_slot_by_branch_id_loading,
    info.restaurant,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Menu"
            breadcrumbItem="Add Menu"
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
                      {location.state ? "Edit Menu" : "Add a New Menu"}{" "}
                    </CardTitle>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 mx-auto">
              <form className="mt-4" onSubmit={handleAddMenu}>
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Restaurant Name <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <Select
                      value={selectedBranch}
                      onChange={handleSelectBranch}
                      options={branchDate}
                      isMulti={false}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label htmlFor="category" className="col-md-2 col-form-label">
                    Category <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <Select
                      isLoading={isLoading}
                      required
                      value={categoryNew}
                      onChange={handleSelectCategory2}
                      options={menuCategoryData2}
                      isMulti={false}
                    />
                  </div>
                </Row>

                {menuItem.map((row, idx) => (
                  <React.Fragment key={row._id}>
                    <div data-repeater-list="group-a" id={"addr" + idx}>
                      <div data-repeater-item>
                        <Card>
                          <CardBody>
                            <Row className="mb-3">
                              <label
                                htmlFor="menu_name"
                                className="col-md-2 col-form-label"
                              >
                                Menu Name <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="menu_name"
                                  placeholder="Enter menu name"
                                  name="menu_name"
                                  value={row.menu_name}
                                  onChange={e => handleMenuItem(e, idx)}
                                  required
                                />
                              </div>
                            </Row>

                            <Row className="mb-3">
                              <label
                                htmlFor="description"
                                className="col-md-2 col-form-label"
                              >
                                Menu Description
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="description"
                                  placeholder="Enter menu description"
                                  name="description"
                                  value={row.description}
                                  onChange={e => handleMenuItem(e, idx)}
                                />
                              </div>
                            </Row>

                            <Row className="mb-3">
                              <label
                                htmlFor="menu_price"
                                className="col-md-2 col-form-label"
                              >
                                Menu Price{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="number"
                                  step={0.5}
                                  className="form-control"
                                  id="menu_price"
                                  placeholder="Enter menu price"
                                  name="menu_price"
                                  value={row.menu_price}
                                  onChange={e => handleMenuItem(e, idx)}
                                  required
                                  min="0"
                                />
                              </div>
                            </Row>

                            <Row className="mb-3">
                              <label
                                htmlFor="pickup_menu_price"
                                className="col-md-2 col-form-label"
                              >
                                Pickup Menu Price{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="number"
                                  required
                                  min="0"
                                  className="form-control"
                                  id="pickup_menu_price"
                                  placeholder="Enter pickup price"
                                  name="pickup_menu_price"
                                  value={row.pickup_menu_price}
                                  onChange={e => handleMenuItem(e, idx)}
                                />
                              </div>
                            </Row>

                            <Row className="mb-3">
                              <label
                                htmlFor="recipe_time"
                                className="col-md-2 col-form-label"
                              >
                                Preparation Time{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="recipe_time"
                                  placeholder="Enter preparation time"
                                  name="recipe_time"
                                  value={row.recipe_time}
                                  onChange={e => handleMenuItem(e, idx)}
                                  min="0"
                                  required
                                />
                              </div>
                            </Row>

                            <Row className="mb-3">
                              <label
                                htmlFor="variation_group_name"
                                className="col-md-2 col-form-label"
                              >
                                Variation Group Name
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="variation_group_name"
                                  placeholder="Enter variation group name"
                                  name="variation_group_name"
                                  value={row.variation_group_name}
                                  onChange={e => handleMenuItem(e, idx)}
                                />
                              </div>
                            </Row>

                            <Row className="mb-3">
                              <label
                                htmlFor="variation_group_desc"
                                className="col-md-2 col-form-label"
                              >
                                Variation Description
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="variation_group_desc"
                                  placeholder="Enter variation description"
                                  name="variation_group_desc"
                                  value={row.variation_group_desc}
                                  onChange={e => handleMenuItem(e, idx)}
                                />
                              </div>
                            </Row>

                            <Row className="mb-3 ms-1">
                              <div className="form-check">
                                <label
                                  className="form-check-label"
                                  htmlFor={`${idx}_has_variation`}
                                >
                                  Check Add-Ons
                                </label>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`${idx}_has_variation`}
                                  checked={row.has_variation}
                                  name="has_variation"
                                  // onChange={handleMenuItemChecked}
                                  onChange={e => handleMenuItemChecked(e, idx)}
                                />
                              </div>
                            </Row>

                            {row.has_variation ? (
                              <>
                                {row.variations.map((addon_data, index) => (
                                  <Row key={addon_data._id} className="mb-3">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-md-2 col-form-label"
                                    ></label>
                                    <div className="col-md-10">
                                      <div
                                        data-repeater-list="group-a"
                                        id={"addr" + index}
                                      >
                                        <div data-repeater-item className="row">
                                          <div className="mb-3 col-lg-2">
                                            <label
                                              className="form-label"
                                              htmlFor="startTime"
                                            >
                                              Variation Name
                                            </label>
                                            <input
                                              type="text"
                                              id="startTime"
                                              className="form-control"
                                              name="variation_name"
                                              placeholder="Variation name"
                                              value={addon_data.addOnName}
                                              onChange={e =>
                                                handleAddOnsCat(e, index, idx)
                                              }
                                            />
                                          </div>

                                          <div className="mb-3 col-lg-2">
                                            <label
                                              className="form-label"
                                              htmlFor="subject"
                                            >
                                              Variation Price
                                            </label>
                                            <input
                                              type="number"
                                              id="subject"
                                              min="0"
                                              className="form-control"
                                              name="variation_price"
                                              placeholder="Price"
                                              value={addon_data.price}
                                              onChange={e =>
                                                handleAddOnsCat(e, index, idx)
                                              }
                                            />
                                          </div>

                                          <div className="mb-3 col-lg-2">
                                            <label
                                              className="form-label"
                                              htmlFor="subject"
                                            >
                                              Group Name
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="variation_group_name"
                                              placeholder="Enter variation group name"
                                              name="variation_group_name"
                                              value={
                                                addon_data.variation_group_name ??
                                                ""
                                              }
                                              onChange={e =>
                                                handleAddOnsCat(e, index, idx)
                                              }
                                            />
                                          </div>

                                          <div className="mb-3 col-lg-2">
                                            <label
                                              className="form-label"
                                              htmlFor="subject"
                                            >
                                              Description
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              id="variation_grp_desc"
                                              placeholder="Enter variation description"
                                              name="variation_group_desc"
                                              value={
                                                addon_data.variation_group_desc ??
                                                ""
                                              }
                                              onChange={e =>
                                                handleAddOnsCat(e, index, idx)
                                              }
                                            />
                                          </div>

                                          <div className="mb-3 col-lg-2">
                                            {row.variations?.length == 1 ? (
                                              ""
                                            ) : (
                                              <i
                                                className="fas fa-times me-1"
                                                size={20}
                                                style={{
                                                  color: "red",
                                                  marginTop: "40px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                  handleRowDelete(
                                                    index,
                                                    idx,
                                                    addon_data._id
                                                  )
                                                }
                                              ></i>
                                            )}
                                          </div>
                                          <div className="mb-3 col-lg-2">
                                            <input
                                              data-repeater-delete
                                              type="button"
                                              className={
                                                addon_data.add_on_categories
                                                  .length > 0
                                                  ? "btn btn-warning btn-sm"
                                                  : "btn btn-primary btn-sm"
                                              }
                                              value={
                                                addon_data.add_on_categories
                                                  .length > 0
                                                  ? "Edit AddOns"
                                                  : "Add AddOns"
                                              }
                                              style={{
                                                marginTop: "30px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                {
                                                  handleModal(
                                                    addon_data.add_on_categories ??
                                                      "",
                                                    addon_data._id ?? "",
                                                    row._id ?? ""
                                                  ),
                                                    handleIdx(idx),
                                                    handleIndex(index),
                                                    handleMenuItemId(row._id),
                                                    handleVariationId(
                                                      addon_data._id
                                                    )
                                                }
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Row>
                                ))}
                                <Row className="mb-3">
                                  <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                  ></label>
                                  <div className="col-md-10">
                                    <Button
                                      onClick={() => {
                                        handleAddRowNested(idx)
                                      }}
                                      color="success"
                                      className="btn btn-success mt-3 mt-lg-0"
                                    >
                                      Add
                                    </Button>
                                  </div>
                                </Row>
                              </>
                            ) : (
                              ""
                            )}

                            <Row className="mb-3">
                              <label
                                htmlFor="vat"
                                className="col-md-2 col-form-label"
                              >
                                Vat(%) <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="vat"
                                  placeholder="Enter vat"
                                  name="vat"
                                  min="0"
                                  required
                                  value={row.vat}
                                  onChange={e => handleMenuItem(e, idx)}
                                />
                              </div>
                            </Row>

                            <Row className="mb-3">
                              <label
                                htmlFor="sd"
                                className="col-md-2 col-form-label"
                              >
                                SD(%) <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="sd"
                                  min="0"
                                  placeholder="Enter sd"
                                  name="sd"
                                  value={row.sd}
                                  onChange={e => handleMenuItem(e, idx)}
                                  required
                                />
                              </div>
                            </Row>

                            <Row className="mb-3">
                              <div className="col-sm-3">
                                <div className="form-check">
                                  <label
                                    className="form-check-label"
                                    htmlFor={`${idx}_is_popular`}
                                  >
                                    Popular
                                  </label>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`${idx}_is_popular`}
                                    checked={row.is_popular}
                                    name="is_popular"
                                    // onChange={handleMenuItemChecked}
                                    onChange={e =>
                                      handleMenuItemChecked(e, idx)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-sm-3">
                                <div className="form-check">
                                  <label
                                    className="form-check-label"
                                    htmlFor={`${idx}_is_delivery`}
                                  >
                                    Delivery
                                  </label>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`${idx}_is_delivery`}
                                    checked={row.is_delivery}
                                    name="is_delivery"
                                    // onChange={handleMenuItemChecked}
                                    onChange={e =>
                                      handleMenuItemChecked(e, idx)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-sm-3">
                                <div className="form-check">
                                  <label
                                    className="form-check-label"
                                    htmlFor={`${idx}_is_pickup`}
                                  >
                                    Pickup
                                  </label>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`${idx}_is_pickup`}
                                    checked={row.is_pickup}
                                    name="is_pickup"
                                    // onChange={handleMenuItemChecked}
                                    onChange={e =>
                                      handleMenuItemChecked(e, idx)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-sm-3">
                                <div className="form-check">
                                  <label
                                    className="form-check-label"
                                    htmlFor={`${idx}_is_dine`}
                                  >
                                    Dine
                                  </label>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`${idx}_is_dine`}
                                    checked={row.is_dine}
                                    name="is_dine"
                                    // onChange={handleMenuItemChecked}
                                    onChange={e =>
                                      handleMenuItemChecked(e, idx)
                                    }
                                  />
                                </div>
                              </div>
                            </Row>
                            <Row className="mb-3">
                              <label
                                htmlFor="image"
                                className="col-md-2 col-form-label"
                              >
                                Image
                              </label>
                              <div className="col-md-10">
                                <input
                                  type="file"
                                  accept=".jpg, .jpeg, .bmp, .png, .webp"
                                  className="form-control"
                                  id="image"
                                  name="image"
                                  // onChange={handleFiles}
                                  onChange={e => handleFiles(e, idx)}
                                />
                              </div>
                            </Row>
                            {row?.image && (
                              <Row className="mb-3">
                                <label className="col-md-2">
                                  <span></span>
                                </label>
                                <div className="col-md-10">
                                  <img
                                    src={URL.createObjectURL(row.image)}
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
                                style={{ marginTop: "22px" }}
                              >
                                Menu Availability{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="col-md-10">
                                {timeSLotLoading ? (
                                  <Row className="mb-3">
                                    <div className="text-center mt-4">
                                      <CustomLoader color="success" />
                                    </div>
                                  </Row>
                                ) : (
                                  <>
                                    {row.menu_available_times?.length > 0 ? (
                                      row.menu_available_times?.map(
                                        (item, index) => (
                                          <Row key={item._id} className="mb-3">
                                            {/* <div
                                              className="col-md-10 row"
                                              
                                            > */}
                                            {/* <div style={{ marginTop: "30px" }}> */}
                                            <div
                                              className="mb-3 col-12 col-md-6 col-sm-6 form-check"
                                              style={{ marginTop: "30px" }}
                                            >
                                              <label
                                                className="form-check-label"
                                                // htmlFor="checked"
                                                htmlFor={`${idx}_${item?.name}_checked`}
                                              >
                                                {item?.name}
                                              </label>
                                              <input
                                                type="checkbox"
                                                className="form-check-input"
                                                // id="checked"
                                                id={`${idx}_${item?.name}_checked`}
                                                checked={item.checked}
                                                name="checked"
                                                onChange={e =>
                                                  handleChangeTime(
                                                    e,
                                                    item,
                                                    index,
                                                    idx,
                                                    row._id,
                                                    item._id
                                                  )
                                                }
                                              />
                                            </div>
                                            {/* </div> */}

                                            <div className="mb-3 col-12 col-md-3 col-sm-3 ">
                                              <label
                                                className="form-label"
                                                htmlFor="startTime"
                                              >
                                                Start Time
                                              </label>
                                              <input
                                                type="time"
                                                id="startTime"
                                                className="form-control"
                                                name="start_time"
                                                placeholder="Add-ons name"
                                                readOnly
                                                disabled
                                                defaultValue={moment({
                                                  hour: item.start_time?.hour,
                                                  minute:
                                                    item?.start_time?.minute,
                                                }).format("HH:mm")}
                                              />
                                            </div>

                                            <div className="mb-3 col-12 col-md-3 col-sm-3 ">
                                              <label
                                                className="form-label"
                                                htmlFor="subject"
                                              >
                                                End Time
                                              </label>
                                              <input
                                                type="time"
                                                id="subject"
                                                readOnly
                                                disabled
                                                className="form-control"
                                                name="end_time"
                                                placeholder="Price"
                                                defaultValue={moment({
                                                  hour: item.end_time?.hour,
                                                  minute:
                                                    item?.end_time?.minute,
                                                }).format("HH:mm")}
                                              />
                                            </div>
                                            {/* </div> */}
                                          </Row>
                                        )
                                      )
                                    ) : (
                                      <Row className="mb-3">
                                        <p className="text-center mt-4">
                                          No Time Slot Found
                                        </p>
                                      </Row>
                                    )}
                                  </>
                                )}
                              </div>
                            </Row>

                            <div className="mb-3">
                              {menuItem?.length == 1 ? (
                                ""
                              ) : (
                                <Button
                                  onClick={() => handleDeleteRowMenu(idx)}
                                  color="danger"
                                  className="btn btn-sm btn-danger mt-3"
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <Button
                  onClick={() => {
                    handleAddRowMenu()
                  }}
                  color="success"
                  className="btn btn-sm btn-success mt-3"
                >
                  Add
                </Button>

                <div className="mb-3 row">
                  <div className="col-12 text-end">
                    <button
                      className="btn btn-primary w-md waves-effect waves-light"
                      type="submit"
                    >
                      Add Menu
                    </button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal isOpen={modal} centered backdrop="static">
        <ModalHeader toggle={closeModal}>Add Addon</ModalHeader>
        <ModalBody>
          <form>
            {addNewCategory.map((itemCat, idx) => (
              <React.Fragment key={idx}>
                <div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Category
                    </label>
                    <Input
                      id="exampleSelect"
                      name="add_on_category_name"
                      value={itemCat.add_on_category_id}
                      onChange={e => handleInputsAddOns(e, idx)}
                      type="select"
                    >
                      <option value="">Choose...</option>
                      {categoryData}
                    </Input>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="checkbox"
                      id="cat_is_multiple"
                      onChange={e => checkHandlerAddOns(idx)}
                      name="cat_is_multiple_add_ons"
                      checked={itemCat.cat_is_multiple}
                      style={{ margin: "15px 5px 20px 0px" }}
                    />
                    Multiple Selection
                    {itemCat?.add_ons?.map((row, addon_index) => (
                      <React.Fragment key={addon_index}>
                        <div
                          data-repeater-list="group-a"
                          id={"addr" + addon_index}
                        >
                          <div data-repeater-item className="row">
                            <div className="mb-3 col-lg-4">
                              <label className="form-label" htmlFor="startTime">
                                Add-ons Name
                              </label>
                              <input
                                type="text"
                                id="startTime"
                                className="form-control"
                                name="add_on_name"
                                placeholder="Add-ons name"
                                value={row.add_on_name}
                                onChange={e =>
                                  handleAddOnsCatNew(e, idx, addon_index)
                                }
                              />
                            </div>

                            <div className="mb-3 col-lg-4">
                              <label className="form-label" htmlFor="subject">
                                Price
                              </label>
                              <input
                                type="number"
                                id="subject"
                                className="form-control"
                                name="add_on_price"
                                placeholder="Price"
                                value={row.add_on_price}
                                onChange={e =>
                                  handleAddOnsCatNew(e, idx, addon_index)
                                }
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
                                onClick={() =>
                                  handleRowDeleteNew(idx, addon_index)
                                }
                              />
                            </Col>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                    <Button
                      onClick={() => {
                        handleAddRowNestedNew(itemCat.add_on_category_id, idx)
                      }}
                      color="success"
                      className="btn btn-success mt-3 mt-lg-0"
                    >
                      Add
                    </Button>
                    {itemCat.cat_is_multiple ? (
                      <div className="mt-4 col-lg-6">
                        <label className="form-label" htmlFor="subject">
                          Maximum required number of choice(s)
                        </label>
                        <input
                          type="number"
                          id="subject"
                          min="0"
                          className="form-control"
                          placeholder="Enter number"
                          name="cat_max_choice"
                          value={itemCat.cat_max_choice}
                          onChange={e => setCatMaxChoice(e.target.value, idx)}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}

            <Button
              onClick={() => {
                handleAddCategoryRow()
              }}
              color="success"
              className="btn btn-success mt-3 mt-lg-0"
            >
              Add category
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 5,
                marginTop: "20px",
              }}
            >
              <Button
                color="primary"
                onClick={e => handleAddOnsForm(e, index, idx)}
              >
                Save
              </Button>{" "}
              <Button color="secondary" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    get_all_restaurant_data,
    get_all_restaurant_loading,
    get_all_branch_loading,
    get_all_branch_data,
    get_all_addOns_category_data,
    get_all_addOns_category_loading,

    add_restaurant_menu_loading,

    get_all_menu_time_slot_data,
    get_all_menu_time_slot_loading,

    get_category_by_id_data,
    get_category_by_id_loading,

    get_category_by_branch_id_data,
    get_category_by_branch_id_loading,

    get_time_slot_by_branch_id_data,
    get_time_slot_by_branch_id_loading,
  } = state.Restaurant

  const {
    get_all_category_data,
    get_all_category_error,
    get_all_category_loading,
  } = state.Category

  const { get_all_user_roles_data, get_all_user_roles_loading } =
    state.registerNew
  return {
    get_all_restaurant_data,
    get_all_restaurant_loading,

    get_all_branch_loading,
    get_all_branch_data,
    get_all_addOns_category_data,
    get_all_addOns_category_loading,

    add_restaurant_menu_loading,

    get_all_menu_time_slot_data,
    get_all_menu_time_slot_loading,

    get_category_by_id_data,
    get_category_by_id_loading,

    get_all_category_data,
    get_all_category_error,
    get_all_category_loading,

    get_category_by_branch_id_data,
    get_category_by_branch_id_loading,

    get_time_slot_by_branch_id_data,
    get_time_slot_by_branch_id_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllRestaurantAction,
    getAllBranchAction,
    addRestaurantMenuAction2,
    addRestaurantMenuAddFresh,
    getAllAddOnsCategoryAction,
    getAllMenuTimeSlot,
    getCategoryByIdAction,
    getCategoryByIdFresh,
    getCategoryByBranchIdAction,
    getCategoryByBranchIdFresh,
    getTimeSLotByBranchIdAction,
    getTimeSLotByBranchIdFresh,
    getAllCategoryAction,
  })(AddMenu2)
)
