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
  addRestaurantMenuAction,
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

const LoadingContainer = () => <div>Loading...</div>

function AddMenu(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [info, setInfo] = useState({
    name: location.state ? location.state.menu_name : "",
    menu_description: location.state ? location.state.description : "",
    restaurant: location.state ? location.state.restaurant_id : "",
    category: location.state ? location.state.category_id : "",
    Variation_group_name: location.state
      ? location.state.variation_group_name
      : "",
    Variation_grp_desc: location.state
      ? location.state.variation_group_name
      : "",
    is_popular: location.state ? location.state.is_popular.toString() : "true",
    is_delivery: location.state
      ? location.state.is_delivery.toString()
      : "true",
    is_pickup: location.state ? location.state.is_pickup.toString() : "true",
    is_dine: location.state ? location.state.is_dine.toString() : "true",
    menu_price: location.state ? location.state.menu_price : "",
    recipe_time: location.state ? location.state.recipe_time : "",
    pickup_menu_price: location.state ? location.state.pickup_menu_price : "",
    vat: location.state ? location.state.vat : "",
    sd: location.state ? location.state.sd : "",
  })

  const [addNewCategory, setAddNewCategory] = useState([])

  const [file, setFile] = useState()
  const [isChecked, setIsChecked] = useState(
    location.state ? location.state.has_variation : false
  )
  const [addVariation, setAddVariation] = useState(false)
  const [modal, setModal] = useState(false)
  const closeModal = () => {
    setModal(!modal)
    //props.getCategoryByIdFresh();
    // dispatch(getCategoryByIdFresh({
    //     get_category_by_id_data: null,
    //     get_category_by_id_loading: false
    // }))
  }
  const toggle = () => setModal(!modal)

  const handleModal = add_on_categories => {
    // console.log(add_on_categories)
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
      })
      add_ons_array = []
      // console.log(add_on_category)
    })
    setAddNewCategory(results)

    toggle()
  }

  // ===========================start working from here ====================
  const [item, setItem] = useState([])

  // const handleChangeTime = (e, ClickedItem) => {
  //   // Destructuring
  //   const { value, checked } = e.target
  //   console.log("checked :", checked)
  //   console.log("checked :", ClickedItem)

  //   // Case 1 : The user checks the box
  //   if (checked) {
  //     setItem([...item, ClickedItem])
  //   } else {
  //     setItem(item.filter(e => e !== ClickedItem))
  //   }
  //   console.log("item :", item)
  // }

  console.log(item)
  // ===========================ends here ====================

  // get all branch

  let branchData = undefined
  if (props.get_all_branch_data?.length > 0) {
    branchData = props.get_all_branch_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ))
  }

  // get all category

  let categoryData = undefined
  if (props.get_all_addOns_category_data?.length > 0) {
    categoryData = props.get_all_addOns_category_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ))
  }

  let menuCategoryData = undefined
  if (props.get_all_category_data?.length > 0) {
    menuCategoryData = props.get_all_category_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.category_name}
      </option>
    ))
  }

  const [images, setImages] = useState({
    image: location.state ? location.state.image : "",
  })

  const handleFiles = e => {
    name = e.target.name
    value = e.target.files[0]
    setInfo({ ...info, [name]: value })
    const reader = new FileReader()

    reader.onload = () => {
      setImages({ ...images, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  const checkHandler = () => {
    setIsChecked(!isChecked)
  }
  const handleAddVariation = () => {
    setAddVariation(!addVariation)
  }

  const [selectedBranch, setSelectedBranch] = useState()

  // const handleSelectBranch = e => {
  //   setInfo({ ...info, restaurant: e.value })
  //   setSelectedBranch(e)
  // }

  const handleSelectBranch = e => {
    let restaurantValue = e.value

    setInfo({ ...info, restaurant: restaurantValue, category: "" })
    // setInfo({ ...info, category: "" })
    setSelectedBranch(e)
    setCategoryNew([])
    setSelectedTimeSlot([])
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

  let menuCategoryData2 = undefined
  if (props.get_category_by_branch_id_data?.length > 0) {
    menuCategoryData2 = props.get_category_by_branch_id_data?.map(
      (item, key) => ({
        label: item.category_name,
        value: item._id,
      })
    )
  }

  const slot_data = []

  props?.get_time_slot_by_branch_id_data?.forEach((time_slot, index) => {
    slot_data.push({
      _id: time_slot._id,
      checked: false,
      name: time_slot.name,
      start_time: time_slot.start_time,
      end_time: time_slot.end_time,
    })
  })

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    slot_data ? slot_data : []
  )

  useEffect(() => {
    if (props.get_time_slot_by_branch_id_loading === "Success") {
      // props.getTimeSLotByBranchIdFresh()
      setSelectedTimeSlot(slot_data)
    }
  }, [props.get_time_slot_by_branch_id_loading])

  // console.log(props?.get_time_slot_by_branch_id_data)
  // console.log(selectedTimeSlot)
  console.log(info.restaurant)

  const handleChangeTime = (e, ClickedItem) => {
    const newState = selectedTimeSlot.map(obj => {
      // 👇️ if id equals 2, update country property
      if (obj._id === ClickedItem._id) {
        return { ...obj, checked: !obj.checked }
      }
      return obj
    })

    setSelectedTimeSlot(newState)
  }

  //for variation start
  const addOnsTemplate = {
    _id: "",
    menu_id: "",
    variation_name: "",
    variation_name: "",
    variation_group_name: "",
    variation_group_desc: "",
    add_on: false,
    add_on_categories: [],
  }
  const [addOns, setAddOns] = useState([addOnsTemplate])
  const handleAddOnsCat = (e, index) => {
    const updatedValue = addOns.map((row, i) =>
      index === i
        ? Object.assign(row, { [e.target.name]: e.target.value })
        : row
    )
    setAddOns(updatedValue)
    console.log("setAddOns :", addOns)
  }
  const setCatMaxChoice = (value, categoryIndex) => {
    //console.log(addNewCategory)
    const newCat = [...addNewCategory]
    //console.log(newCat)
    //console.log(newCat[categoryIndex])
    newCat[categoryIndex] = {
      ...newCat[categoryIndex],
      cat_max_choice: value,
    }

    setAddNewCategory(newCat)
  }
  function handleAddRowNested() {
    console.log(addOns)
    console.log(addOnsTemplate)
    setAddOns([...addOns, addOnsTemplate])
  }
  const handleRowDelete = index => {
    const filteredTime = [...addOns]
    if (filteredTime.length > 1) {
      filteredTime.splice(index, 1)
      setAddOns(filteredTime)
    }
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

  const [addAddOns, setAddAddOns] = useState({
    category: "",
  })
  const [num_of_choice_new, setNumber] = useState()
  const [isCheckAddOns, setIsCheckAddOns] = useState(false)
  let addAddOnName, addAddOnValue
  // const handleInputsAddOns = (e, idx) => {
  //
  //     addAddOnName = e.target.name;
  //     addAddOnValue = e.target.value;
  //
  //     setAddAddOns({ ...addAddOns, [addAddOnName]: addAddOnValue })
  //     props.getCategoryByIdAction(addAddOnValue)

  // }

  const [valueByID, setValue] = useState()
  const checkHandlerAddOns = categoryIndex => {
    //console.log(addNewCategory)
    const newCat = [...addNewCategory]
    //console.log(newCat)
    //console.log(newCat[categoryIndex])
    newCat[categoryIndex] = {
      ...newCat[categoryIndex],
      cat_is_multiple: !(newCat[categoryIndex]?.cat_is_multiple == true ||
      "true"
        ? true
        : false),
    }

    setAddNewCategory(newCat)
  }

  const handleCatMaxChoice = (e, categoryIndex) => {
    const newCat = [...addNewCategory]
    newCat[categoryIndex] = {
      ...newCat[categoryIndex],
      cat_max_choice: e.target.value,
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
    // console.log(index)
    // console.log(addNewCategory)
    let newAddOnCategory = [...addNewCategory]
    const filteredTime = newAddOnCategory[cat_idx].add_ons.filter(
      (val, i) => i !== index
    )

    newAddOnCategory[cat_idx].add_ons = filteredTime
    //console.log("aa", newAddOnCategory)
    setAddNewCategory(newAddOnCategory)
  }

  const [id, setID] = useState()
  const handleID = idx => {
    //alert(idx)
    setID(idx)
  }

  /*
   *
   * add-ons under category start
   */
  const addOnsTemplateNew_test = { add_on_name: "", add_on_price: "" }
  const [addOnUnderCategory, setAddOnUnderCategory] = useState([])
  const [addBtnStatus, setAddBtnStatus] = useState(false)
  const handleAddOnsUndeCategory = (e, index) => {
    console.log("index :", index)
    setAddBtnStatus(true)
    const updatedValue = addOnUnderCategory.map((row, i) => {
      console.log("row :", row)
      index === i
        ? Object.assign(row, { [e.target.name]: e.target.value })
        : row
    })
    console.log("updatedValue :", updatedValue)
    setAddOnUnderCategory(updatedValue)
  }

  const handleRowDeleteUnderCategory = index => {
    const filteredTime = [...addOnUnderCategory]

    filteredTime.splice(index, 1)
    setAddOnUnderCategory(filteredTime)
  }
  function handleAddRowNestedNew(add_on_category_id, categoryIndex) {
    const addOnsTemplateNew = {
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
  const [apiValue, setApiVal] = useState()
  //const finalTemplate = { category_Name: "", category_personal_addOn: addOnsNew, additionalAddOn: addOnUnderCategory }
  const finalTemplate = {
    add_on_category_id: "",
    add_on_category_name: "",
    cat_is_multiple: false,
    cat_max_choice: 0,
    language_slug: "en",
    add_on_category_desc: "",
    add_ons: [],
    // additionalAddOn: [],
  }

  const handleInputsAddOns = (e, idx) => {
    addAddOnName = e.target.name
    addAddOnValue = e.target.value

    // ----test -------
    //props.getCategoryByIdAction(addAddOnValue);
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
                { cat_max_choice: response.data?.cat_max_choice },
                { language_slug: response.data?.language_slug },
                { add_on_category_desc: response.data?.add_on_category_desc },
                { add_ons: response.data?.preset_add_ons }
              )
            : row
        )
        setAddNewCategory(updatedValue)
      })
      .catch(error => {})
  }

  function handleAddCategoryRow() {
    //props.getCategoryByIdFresh();
    setAddNewCategory([...addNewCategory, finalTemplate])

    // const updatedValue = addNewCategory.map((row, i) => idx === i ? Object.assign(row, { additionalAddOn: addOnUnderCategory }) : row);
    // setAddNewCategory(updatedValue)
  }
  //
  const addOnsTemplateNew1 = { add_on_name: "", add_on_price: "" }
  const [addOnUnderCategory1, setAddOnUnderCategory1] = useState([])
  const handleAddOnsUndeCategory1 = (e, index) => {
    setAddBtnStatus(true)
    const updatedValue = addNewCategory.map((row, i) =>
      index === i
        ? Object.assign(row, { additionalAddOn: e.target.value })
        : row
    )
    setAddNewCategory(updatedValue)
  }
  function handleAddRowNestedNew1() {
    //setAddOnUnderCategory1([...addOnUnderCategory1, addOnsTemplateNew1]);
    //setAddNewCategory({ ...addNewCategory, additionalAddOn: addOnsTemplateNew1 });
    const updatedValue = addNewCategory.map((row, i) =>
      index === i
        ? Object.assign(row, { additionalAddOn: addOnsTemplateNew1 })
        : row
    )
    setAddNewCategory(updatedValue)
  }

  // ************************ ends here ********************************
  const handleAddMenu = e => {
    e.preventDefault()
    let status = 0
    if (info.menu_price < 0) {
      status = 1
      toast.error("Menu price can't be negative")
    }
    if (info.pickup_menu_price < 0) {
      status = 1
      toast.error("Pickup menu price can't be negative")
    }

    if (status == 0) {
      const val = uuidv4()
      // console.log(info)
      props.addRestaurantMenuAction(
        val,
        info,
        isChecked,
        addOns,
        selectedTimeSlot
      )
    }
  }

  let newAddOnsArray = []
  const handleAddOnsForm = (e, idx) => {
    e.preventDefault()
    //===== test ========
    const updatedValue = addOns.map((row, i) =>
      idx === i
        ? Object.assign(row, {
            add_on_categories: addNewCategory,
          })
        : row
    )
    setAddOns(updatedValue)
    console.log("addOns :", addOns)

    setAddNewCategory([finalTemplate])
    console.log("addNewCategory", addNewCategory)
    setAddOnUnderCategory([addOnsTemplateNew_test])
    console.log("addOnUnderCategory", addOnUnderCategory)

    closeModal()
    // setAddNewCategory("");
    // setAddOnUnderCategory("");
    //===== test end========
    // addOns.splice(id, 0, { additionalVariation: [addNewCategory, addOnUnderCategory] })
    //
  }

  useEffect(() => {
    // if (props.get_all_restaurant_loading == false) {
    //     props.getAllRestaurantAction();
    // }

    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }
    if (props.get_all_addOns_category_loading == false) {
      props.getAllAddOnsCategoryAction()
    }

    if (props.add_restaurant_menu_loading === "Success") {
      navigate("/menu")
      props.addRestaurantMenuAddFresh()
    }

    if (props.get_all_menu_time_slot_loading == false) {
      props.getAllMenuTimeSlot()
    }

    if (props.get_all_category_loading == false) {
      props.getAllCategoryAction()
    }
    // if (props.get_category_by_id_loading == "Success") {
    //     props.getCategoryByIdFresh();
    // }

    if (props?.get_category_by_id_data?.preset_add_ons) {
      setAddOnsNew(props?.get_category_by_id_data?.preset_add_ons)
    }

    // if (props.get_category_by_branch_id_loading == false) {
    //   // console.log("false", info.restaurant)
    //   props.getCategoryByBranchIdAction(info.restaurant)
    // }

    // if (props.get_time_slot_by_branch_id_loading == false) {
    //   // console.log("false", info.restaurant)
    //   props.getTimeSLotByBranchIdAction(info.restaurant)
    // }
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
                  {/* {props.get_all_restaurant_data ? props.get_all_restaurant_data.length > 0 ? <DatatableTablesWorking products={props.get_all_restaurant_data}
                                    columnData={activeData} defaultSorted={defaultSorted} key={props.get_all_restaurant_data?._id} /> : null : null} */}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="col-10 mx-auto">
              <form className="mt-4" onSubmit={handleAddMenu}>
                {/* <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Restaurant Name
                  </label>
                  <div className="col-md-10">
                    <Input
                      id="exampleSelect"
                      name="restaurant"
                      value={info.restaurant}
                      //required={true}
                      onChange={handleInputs}
                      type="select"
                      required
                    >
                      <option>Choose...</option>
                      {branchData}
                    </Input>
                  </div>
                </Row> */}

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Restaurant Name
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
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Menu Name
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter menu name"
                      name="name"
                      onChange={handleInputs}
                      value={info.name ?? ""}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Menu Description
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter menu description"
                      name="menu_description"
                      onChange={handleInputs}
                      value={info.menu_description ?? ""}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Menu Price
                  </label>
                  <div className="col-md-10">
                    <input
                      type="number"
                      step={0.5}
                      className="form-control"
                      id="name"
                      placeholder="Enter menu price"
                      name="menu_price"
                      onChange={handleInputs}
                      value={info.menu_price ?? ""}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Pickup Menu Price
                  </label>
                  <div className="col-md-10">
                    <input
                      type="number"
                      className="form-control"
                      id="name"
                      placeholder="Enter pickup price"
                      name="pickup_menu_price"
                      onChange={handleInputs}
                      value={info.pickup_menu_price ?? ""}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Preparation Time
                  </label>
                  <div className="col-md-10">
                    <input
                      type="number"
                      className="form-control"
                      id="name"
                      placeholder="Enter preparation time"
                      name="recipe_time"
                      onChange={handleInputs}
                      value={info.recipe_time ?? ""}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Variation Group Name
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      id="Variation_group_name"
                      placeholder="Enter variation group name"
                      name="Variation_group_name"
                      onChange={handleInputs}
                      value={info.Variation_group_name ?? ""}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Variation Description
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      id="Variation_grp_desc"
                      placeholder="Enter variation description"
                      name="Variation_grp_desc"
                      onChange={handleInputs}
                      value={info.Variation_grp_desc ?? ""}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Image
                  </label>
                  <div className="col-md-10">
                    <input
                      type="file"
                      className="form-control"
                      id="resume"
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
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Check Add-Ons
                  </label>
                  <div className="col-md-10">
                    <input
                      type="checkbox"
                      id="cat_is_multiple"
                      name="cat_is_multiple"
                      checked={isChecked}
                      onChange={checkHandler}
                      value="true"
                      style={{ margin: "15px 5px 20px 0px" }}
                    />
                  </div>
                </Row>
                {/* {isChecked ?

                                    <Row className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="col-md-2 col-form-label"
                                        >

                                        </label>
                                        <div className="col-md-10">
                                            <input type="checkbox" id="cat_is_multiple" name="cat_is_multiple" checked={addVariation} onChange={handleAddVariation} value="true" style={{ margin: "15px 5px 20px 0px" }} />Add Variation
                                        </div>
                                    </Row>


                                    : ""} */}

                {isChecked ? (
                  <>
                    {addOns.map((row, idx) => (
                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        ></label>
                        <div className="col-md-10">
                          <React.Fragment key={idx}>
                            <div data-repeater-list="group-a" id={"addr" + idx}>
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
                                    value={row.addOnName}
                                    onChange={e => handleAddOnsCat(e, idx)}
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
                                    className="form-control"
                                    name="variation_price"
                                    placeholder="Price"
                                    value={row.price}
                                    onChange={e => handleAddOnsCat(e, idx)}
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
                                    id="Variation_group_name"
                                    placeholder="Enter variation group name"
                                    name="variation_group_name"
                                    value={row.variation_group_name ?? ""}
                                    onChange={e => handleAddOnsCat(e, idx)}
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
                                    id="Variation_grp_desc"
                                    placeholder="Enter variation description"
                                    name="variation_group_desc"
                                    value={row.variation_group_desc ?? ""}
                                    onChange={e => handleAddOnsCat(e, idx)}
                                  />
                                </div>

                                <div className="mb-3 col-lg-2">
                                  {addOns?.length == 1 ? (
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
                                      onClick={() => handleRowDelete(idx)}
                                    ></i>
                                  )}
                                </div>
                                <div className="mb-3 col-lg-2">
                                  <input
                                    data-repeater-delete
                                    type="button"
                                    className="btn btn-primary"
                                    value="Add Add ons"
                                    style={{
                                      marginTop: "30px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      {
                                        handleModal(
                                          row.add_on_categories ?? ""
                                        ),
                                          handleID(idx)
                                        //   handleSelectedAddOnsCategory(
                                        //     row.add_on_categories ?? ""
                                        //   )
                                      }
                                    }}
                                  />
                                </div>
                                {/* <Col lg={2} className="align-self-center d-grid mt-3">
                                                                <input data-repeater-delete type="button" className="btn btn-primary" value="Add Ad ons" onClick={() => (handleRowDelete(idx))} />
                                                            </Col> */}
                              </div>
                            </div>
                          </React.Fragment>
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
                            handleAddRowNested()
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
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Popular
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
                        checked={info.is_popular == "true"}
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
                        checked={info.is_popular == "false"}
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
                    Delivery
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
                        checked={info.is_delivery == "true"}
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
                        checked={info.is_delivery == "false"}
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
                    Pickup
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
                        checked={info.is_pickup == "true"}
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
                        checked={info.is_pickup == "false"}
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
                    Dine
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
                        checked={info.is_dine == "true"}
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
                        checked={info.is_dine == "false"}
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

                {/* <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Category
                  </label>
                  <div className="col-md-10">
                    <Input
                      id="exampleSelect"
                      name="category"
                      value={info.category}
                      //required={true}
                      onChange={handleInputs}
                      type="select"
                      required
                    >
                      <option>Choose...</option>
                      {menuCategoryData}
                    </Input>
                  </div>
                </Row> */}

                <Row className="mb-3">
                  <label htmlFor="category" className="col-md-2 col-form-label">
                    Category
                  </label>
                  <div className="col-md-10">
                    <Select
                      required
                      value={categoryNew}
                      onChange={handleSelectCategory2}
                      options={menuCategoryData2}
                      isMulti={false}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Vat(%)
                  </label>
                  <div className="col-md-10">
                    <input
                      type="number"
                      className="form-control"
                      id="vat"
                      placeholder="Enter vat"
                      name="vat"
                      onChange={handleInputs}
                      value={info.vat ?? ""}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    SD(%)
                  </label>
                  <div className="col-md-10">
                    <input
                      type="number"
                      className="form-control"
                      id="sd"
                      placeholder="Enter sd"
                      name="sd"
                      onChange={handleInputs}
                      value={info.sd ?? ""}
                      required
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                    style={{ marginTop: "22px" }}
                  >
                    Menu Availability
                  </label>
                  <div className="col-md-10">
                    {/* {props?.get_all_menu_time_slot_data?.map(item => (
                      <Row className="mb-3">
                        <div
                          className="col-md-10"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ marginTop: "30px" }}>
                            <input
                              type="checkbox"
                              id="cat_is_multiple"
                              name="cat_is_multiple"
                              style={{ margin: "0px 15px 50px 0px" }}
                              value="true"
                              onChange={e => handleChangeTime(e, item)}
                            />
                            <span
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {item?.name}
                            </span>
                          </div>

                          <div className="mb-3 col-lg-3">
                            <label className="form-label" htmlFor="startTime">
                              Start Time
                            </label>
                            <input
                              type="time"
                              id="startTime"
                              className="form-control"
                              name="start_time"
                              placeholder="Add-ons name"
                              value={moment({
                                hour: item.start_time?.hour,
                                minute: item?.start_time?.minute,
                              }).format("HH:mm")}
                            />
                          </div>

                          <div className="mb-3 col-lg-3">
                            <label className="form-label" htmlFor="subject">
                              End Time
                            </label>
                            <input
                              type="time"
                              id="subject"
                              className="form-control"
                              name="end_time"
                              placeholder="Price"
                              value={moment({
                                hour: item.end_time?.hour,
                                minute: item?.end_time?.minute,
                              }).format("HH:mm")}
                            />
                          </div>
                        </div>
                      </Row>
                    ))} */}

                    {selectedTimeSlot?.length > 0 && info.restaurant
                      ? selectedTimeSlot?.map(item => (
                          <Row className="mb-3">
                            <div
                              className="col-md-10"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ marginTop: "30px" }}>
                                <input
                                  type="checkbox"
                                  id="cat_is_multiple"
                                  name="cat_is_multiple"
                                  style={{ margin: "0px 15px 50px 0px" }}
                                  // value="true"

                                  checked={item.checked}
                                  // checked={checkTimeSelected(item)}
                                  onChange={e => handleChangeTime(e, item)}
                                />
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item?.name}
                                </span>
                              </div>

                              <div className="mb-3 col-lg-3">
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
                                  value={moment({
                                    hour: item.start_time?.hour,
                                    minute: item?.start_time?.minute,
                                  }).format("HH:mm")}
                                />
                              </div>

                              <div className="mb-3 col-lg-3">
                                <label className="form-label" htmlFor="subject">
                                  End Time
                                </label>
                                <input
                                  type="time"
                                  id="subject"
                                  className="form-control"
                                  name="end_time"
                                  placeholder="Price"
                                  value={moment({
                                    hour: item.end_time?.hour,
                                    minute: item?.end_time?.minute,
                                  }).format("HH:mm")}
                                />
                              </div>
                            </div>
                          </Row>
                        ))
                      : ""}
                  </div>
                </Row>

                <div className="mb-3 row">
                  <div className="col-12 text-end">
                    <button
                      className="btn btn-primary w-md waves-effect waves-light"
                      type="submit"
                    >
                      {location.state ? "Edit Menu" : "Add Menu"}
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
              // id === idx ?

              <React.Fragment key={idx}>
                {console.log("itemCat1 :", itemCat)}
                <div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Category
                    </label>
                    <Input
                      id="exampleSelect"
                      name="add_on_category_name"
                      value={itemCat.add_on_category_id}
                      required={true}
                      onChange={e => handleInputsAddOns(e, idx)}
                      type="select"
                    >
                      <option>Choose...</option>
                      {categoryData}
                    </Input>
                  </div>

                  <div className="col-md-12">
                    <input
                      type="checkbox"
                      id="cat_is_multiple"
                      // onChange={checkHandlerAddOns(itemCat)}
                      onChange={e => checkHandlerAddOns(idx)}
                      name="cat_is_multiple_add_ons"
                      checked={itemCat.cat_is_multiple}
                      // value={itemCat.cat_is_multiple}
                      style={{ margin: "15px 5px 20px 0px" }}
                    />
                    Multiple Selection
                    {/* {addOnsNew?.map((row, idx) => ( */}
                    {itemCat?.add_ons?.map((row, addon_index) => (
                      <React.Fragment key={addon_index}>
                        {console.log("addon_index :", addon_index)}
                        {console.log("itemCat :", itemCat)}
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
              // : ""
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
              <Button color="primary" onClick={e => handleAddOnsForm(e, id)}>
                Save
              </Button>{" "}
              <Button color="secondary" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </form>
        </ModalBody>
        {/* <ModalFooter>
                    <Button color="primary" type='submit'>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                </ModalFooter> */}
      </Modal>
    </React.Fragment>
  )
}

//export default AddBranch;

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
    addRestaurantMenuAction,
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
  })(AddMenu)
)
