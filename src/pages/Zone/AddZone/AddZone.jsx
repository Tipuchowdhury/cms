import React, { useState, useRef, useCallback } from "react"
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
  Container,
  Row,
  Col,
  Input,
  BreadcrumbItem,
} from "reactstrap"
// import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react"
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
  useLoadScript,
  Polygon,
} from "@react-google-maps/api"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  getAllBranchAction,
  getAllCityAction,
  zoneAddAction,
  zoneEditAction,
  zoneAddFresh,
  zoneEditFresh,
  getZoneByIdAction,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import PageLoader from "components/CustomLoader/PageLoader"

const LoadingContainer = () => <div>Loading...</div>

function AddZone(props) {
  document.title = "Add Zone | Foodi"
  // const libraries = ["places"]
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  })

  const [submitDisabled, setSubmitDisabled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [centerMap, setCenterMap] = useState({ lat: 23.8103, lng: 90.4125 })

  const [center, setCenter] = useState([
    { lat: 23.8103, lng: 90.4125 },
    { lat: 23.8103, lng: 90.4125 },
  ])
  const [searchPlace, setSearchPlaces] = useState("")

  const [autocomplete, setAutocomplete] = useState(null)

  const handlePlaceSelect = () => {
    const place = autocomplete.getPlace()
    const { lat, lng } = place.geometry.location

    setSearchPlaces(place.name)

    setPath([
      { lat: lat(), lng: lng() },
      { lat: lat(), lng: lng() },
    ])

    setCenterMap({ lat: lat(), lng: lng() })
  }

  const clear = () => {
    setSearchPlaces("")

    setCenterMap({ lat: 23.8103, lng: 90.4125 })
    setPath(center)
  }

  const [path, setPath] = useState([
    { lng: 90.4125, lat: 23.8103 },
    { lng: 90.4125, lat: 23.8103 },
  ])

  const polygonRef = useRef(null)
  const listenersRef = useRef([])

  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() }
        })
      setPath(nextPath)
    }
  }, [setPath])

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon
      const path = polygon.getPath()
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      )
    },
    [onEdit]
  )
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove())
    polygonRef.current = null
  }, [])

  const common_branches = props?.get_all_branch_data?.filter(elem =>
    location?.state?.branches?.find(({ branch_id }) => elem._id === branch_id)
  )

  const branch_data_edit = common_branches
    ? common_branches?.map((item, key) => {
        return { label: item.name, value: item._id }
      })
    : ""

  //select multiple branch
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

  // get all city
  let cityData = undefined
  if (props.get_all_city_data?.length > 0) {
    cityData = props.get_all_city_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const [selectedCity, setSelectedCity] = useState("")

  const handleSelectCity = e => {
    const value = e ? e.value : ""
    setZoneInfo({ ...zoneInfo, city: value })
    setSelectedCity(e)
  }

  const onMapClickHandler = e => {}

  const [zoneInfo, setZoneInfo] = useState({
    area: location.state ? location.state.name : "",
    city: location.state ? location.state.city_id : "",
    radius: location.state ? location.state.radius : "",
    is_active: location.state ? location.state.is_active : true,
  })

  let name, value
  const handleInputs = e => {
    name = e.target.name
    value = e.target.value
    setZoneInfo({ ...zoneInfo, [name]: value })
  }

  const allData = path?.map(item => Number(item.lng) + "," + Number(item.lat))

  const handleSubmit = e => {
    setSubmitDisabled(true)
    e.preventDefault()
    if (zoneInfo.city === "") {
      toast.error("Please select a city")
    } else {
      const uniqueId = uuidv4()
      props.zoneAddAction(
        uniqueId,
        zoneInfo,
        path,
        deliveryCharge,
        selectedBranch
      )
    }
  }

  const edit_zone_delivery_charge = location.state?.zone_delivery_charges?.map(
    item => ({
      distanceStart: item.distance_start_in_kilometer,
      distanceEnd: item.distance_end_in_kilometer,
      deliveryCharge: item.delivery_charge,
    })
  )

  // Delivery charge functionality
  const deliveryChargeTemplate = {
    distanceStart: "",
    distanceEnd: "",
    deliveryCharge: "",
  }
  const [deliveryCharge, setDeliveryCHarge] = useState(
    location.state ? edit_zone_delivery_charge : [deliveryChargeTemplate]
  )
  const handleTimeChange = (e, index) => {
    const updatedValue = deliveryCharge.map((row, i) =>
      index === i
        ? Object.assign(row, { [e.target.name]: e.target.value })
        : row
    )
    setDeliveryCHarge(updatedValue)
  }
  const handleRowDelete = index => {
    const filteredTime = [...deliveryCharge]
    if (filteredTime.length > 1) {
      filteredTime.splice(index, 1)
      setDeliveryCHarge(filteredTime)
    }
  }

  function handleAddRowNested() {
    setDeliveryCHarge([...deliveryCharge, deliveryChargeTemplate])
  }

  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    if (props.get_all_city_loading == false) {
      props.getAllCityAction()
    }

    if (props.add_zone_loading == "Success") {
      navigate("/zone")
      setSubmitDisabled(false)
      props.zoneAddFresh()
    }

    if (props.add_zone_loading == "Falied") {
      setSubmitDisabled(false)
      props.zoneAddFresh()
    }
  }, [
    props.get_all_branch_loading,
    props.get_all_city_loading,
    props.add_zone_loading,
  ])

  if (!isLoaded) {
    return <PageLoader />
  }

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Row className="align-items-center">
              <Col sm={6}>
                <div className="page-title-box">
                  <h4 className="font-size-18">Add Zone</h4>
                  <ol className="breadcrumb mb-0">
                    <BreadcrumbItem>
                      <Link to="/">Foodi</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <Link to="/zone">Zone</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Add Zone</BreadcrumbItem>
                  </ol>
                </div>
              </Col>
            </Row>

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
                        {location.state ? "Edit Zone" : "Add a New Zone"}{" "}
                      </CardTitle>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="col-10 mx-auto">
                <form className="mt-4" action="#" onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Area Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        required
                        type="text"
                        className="form-control"
                        id="area"
                        placeholder="Enter area name"
                        name="area"
                        onChange={handleInputs}
                        value={zoneInfo.area ?? ""}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      City <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <Select
                        required
                        value={selectedCity}
                        onChange={handleSelectCity}
                        options={cityData}
                        isLoading={cityData == undefined ? true : false}
                        isClearable={true}
                        isMulti={false}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Radius (Km) <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        required
                        type="text"
                        className="form-control"
                        id="radius"
                        placeholder="Enter radius"
                        name="radius"
                        onChange={handleInputs}
                        value={zoneInfo.radius ?? ""}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Branches <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <Select
                        required
                        value={selectedBranch}
                        onChange={handleSelectBranch}
                        options={branchDate}
                        isLoading={branchDate == undefined ? true : false}
                        isMulti={true}
                      />
                    </div>
                  </Row>

                  <fieldset
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "0.375rem",
                      marginBottom: "10px",
                      padding: "10px",
                    }}
                  >
                    <legend>Location</legend>
                    <Row className="row-cols-lg-auto g-3 align-items-center">
                      <Col lg={5} md={5} sm={12}>
                        <Autocomplete
                          onLoad={autocomplete => {
                            setAutocomplete(autocomplete)
                          }}
                          onPlaceChanged={handlePlaceSelect}
                        >
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Search location"
                            value={searchPlace}
                            onChange={e => setSearchPlaces(e.target.value)}
                          />
                        </Autocomplete>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <textarea
                          required
                          className="form-control"
                          id="location"
                          name="location"
                          value={allData}
                          readOnly={true}
                          disabled={true}
                        />
                      </Col>

                      <Col lg={1} md={1} sm={12} className="text-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => {
                            clear()
                          }}
                        >
                          Clear
                        </button>
                      </Col>
                    </Row>
                  </fieldset>

                  <Card>
                    <CardBody>
                      <div
                        id="gmaps-markers"
                        className="gmaps"
                        style={{ position: "relative" }}
                      >
                        <GoogleMap
                          center={centerMap}
                          zoom={15}
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                        >
                          <Polygon
                            // Make the Polygon editable / draggable
                            editable
                            draggable
                            path={path}
                            // Event used when manipulating and adding points
                            onMouseUp={onEdit}
                            // Event used when dragging the whole Polygon
                            onDragEnd={onEdit}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                          />
                        </GoogleMap>
                      </div>
                    </CardBody>
                  </Card>

                  {/* <div className="mb-3">
                                        <label className="form-label" htmlFor="location">Zone Delevery Charges</label>
                                        <input type="text" className="form-control" id="location" name="delivery_charge" value={state2.location} />
                                    </div> */}

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Delivery Charges
                    </label>
                    {/* <div className="col-md-10">
                                        <input type="text" className="form-control" id="location" name="location" value={state2.location} />
                                    </div> */}
                  </Row>
                  {/* ==================restaurant time================= */}

                  {deliveryCharge?.map((row, idx) => (
                    <React.Fragment key={idx}>
                      <div data-repeater-list="group-a" id={"addr" + idx}>
                        <div data-repeater-item className="row">
                          <div className="mb-3 col-lg-3">
                            <label className="form-label" htmlFor="startTime">
                              Distance Start(km){" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              required
                              type="number"
                              id="startTime"
                              className="form-control"
                              name="distanceStart"
                              placeholder="Distance start"
                              value={row.distanceStart}
                              onChange={e => handleTimeChange(e, idx)}
                            />
                          </div>

                          <div className="mb-3 col-lg-3">
                            <label className="form-label" htmlFor="subject">
                              Distance End(km){" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              required
                              type="number"
                              id="subject"
                              className="form-control"
                              name="distanceEnd"
                              placeholder="Distance end"
                              value={row.distanceEnd}
                              onChange={e => handleTimeChange(e, idx)}
                            />
                          </div>

                          <div className="mb-3 col-lg-3">
                            <label className="form-label" htmlFor="startTime">
                              Delivery Charge{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              required
                              type="number"
                              id="startTime"
                              min="0"
                              className="form-control"
                              name="deliveryCharge"
                              placeholder="Delivery charge"
                              value={row.deliveryCharge}
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
                        disabled={submitDisabled}
                      >
                        Add Zone
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
    add_zone_loading,
    edit_zone_loading,
    get_zone_by_id_data,
  } = state.Restaurant

  const { get_all_city_data, get_all_city_error, get_all_city_loading } =
    state.zoneCity
  return {
    get_all_branch_loading,
    get_all_branch_data,
    edit_zone_loading,
    get_zone_by_id_data,

    get_all_city_data,
    get_all_city_error,
    get_all_city_loading,
    add_zone_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    getAllCityAction,
    zoneAddAction,
    zoneEditAction,
    zoneAddFresh,
    zoneEditFresh,
    getZoneByIdAction,
  })(AddZone)
)
