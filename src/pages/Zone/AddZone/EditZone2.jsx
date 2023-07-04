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
} from "reactstrap"
// import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react"
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
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
  getZoneByIdActionFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import CustomLoader from "components/CustomLoader/CustomLoader"
import PageLoader from "components/CustomLoader/PageLoader"
import { toast } from "react-toastify"

const LoadingContainer = () => <div>Loading...</div>

function EditZone(props) {
  useEffect(() => {
    props.getZoneByIdActionFresh()
  }, [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDKIxr2AXZPA1k8EyJz52suWseQCFxfoMU",
    libraries: ["places"],
  })

  const [branch, setBranch] = useState([])
  const [getInfo, SetGetInfo] = useState(true)
  const [allEditData, setAllData] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  const [centerMap, setCenterMap] = useState({ lat: 23.8103, lng: 90.4125 })

  const [center, setCenter] = useState([
    { lat: 23.8103, lng: 90.4125 },
    { lat: 23.8103, lng: 90.4125 },
  ])
  const mapRef = useRef(null)

  const [searchPlace, setSearchPlaces] = useState("")

  const edit_map_data =
    props?.get_zone_by_id_data?.lat_long?.coordinates?.[0].map(x => ({
      lng: x[0],
      lat: x[1],
    }))

  const defaultProps = edit_map_data ? edit_map_data : ""
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

  const [path, setPath] = useState(
    props?.get_zone_by_id_data
      ? edit_map_data
      : [
          { lng: 90.4125, lat: 23.8103 },
          { lng: 90.4125, lat: 23.8103 },
        ]
  )

  const polygonRef = useRef(null)
  const listenersRef = useRef([])

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    // console.log("I am in the edit section")
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

  // var bounds = new props.google.maps.LatLngBounds()
  // for (var i = 0; i < path.length; i++) {
  //   bounds.extend(path[i])
  // }

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      // console.log("I am on load");
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

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove())
    polygonRef.current = null
  }, [])

  const calculateZoom = () => {
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds()
      path.forEach(coord => {
        bounds.extend(coord)
      })

      mapRef.current && mapRef.current.fitBounds(bounds)
    }
  }

  useEffect(() => {
    if (path) calculateZoom()
    // const calculateZoom = () => {
    //   const bounds = new window.google.maps.LatLngBounds()
    //   path.forEach(coord => {
    //     bounds.extend(coord)
    //   })

    //   mapRef.current && mapRef.current.fitBounds(bounds)
    // }
  }, [path])

  //select multiple branch
  const [selectedBranch, setSelectedBranch] = useState()
  const handleSelectBranch = e => {
    // console.log(e)
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
    cityData = props.get_all_city_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ))
  }

  const [zoneInfo, setZoneInfo] = useState({
    area: branch ? branch : "",
    city:
      props?.get_zone_by_id_data != undefined
        ? props?.get_zone_by_id_data?.city_id
        : "",
    radius:
      props?.get_zone_by_id_data != undefined
        ? props?.get_zone_by_id_data?.radius
        : "",
    is_active:
      props?.get_zone_by_id_data != undefined
        ? props?.get_zone_by_id_data?.is_active
        : true,
  })

  let name, value
  const handleInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setZoneInfo({ ...zoneInfo, [name]: value })
  }

  const allData = path?.map(item => Number(item.lng) + "," + Number(item.lat))

  const handleSubmitForEdit = e => {
    e.preventDefault()
    //console.log(zoneInfo)
    if (zoneInfo.city == "") {
      toast.error("Please select a city")
    } else {
      props.zoneEditAction(
        props?.get_zone_by_id_data?._id,
        zoneInfo,
        path,
        deliveryCharge,
        selectedBranch
      )
    }
  }

  const edit_zone_delivery_charge_unsort =
    props?.get_zone_by_id_data?.zone_delivery_charges?.map(item => ({
      distanceStart: item.distance_start_in_kilometer,
      distanceEnd: item.distance_end_in_kilometer,
      deliveryCharge: item.delivery_charge,
    }))

  const edit_zone_delivery_charge = edit_zone_delivery_charge_unsort
    ? [...edit_zone_delivery_charge_unsort].sort(
        (a, b) => a.distanceStart - b.distanceStart
      )
    : ""

  // Delivery charge functionality
  const deliveryChargeTemplate = {
    distanceStart: "",
    distanceEnd: "",
    deliveryCharge: "",
  }
  const [deliveryCharge, setDeliveryCHarge] = useState(
    props?.get_zone_by_id_data
      ? edit_zone_delivery_charge
      : [deliveryChargeTemplate]
  )
  const handleTimeChange = (e, index) => {
    // console.log(index);
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
  //console.log("deliveryCharge array" + deliveryCharge);

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
      props.zoneAddFresh()
    }

    if (props.edit_zone_loading == "Success") {
      navigate("/zone")
      props.zoneEditFresh()
    }

    if (props.get_zone_by_id_data != undefined) {
      setZoneInfo({
        ...zoneInfo,
        area: props?.get_zone_by_id_data?.name,
        city: props?.get_zone_by_id_data?.city_id,
        radius: props?.get_zone_by_id_data?.radius,
        is_active: props?.get_zone_by_id_data?.is_active,
      })

      let branchData = props?.get_zone_by_id_data?.branches?.map(
        (item, key) => ({
          label: "Test",
          value: item.branch_id,
        })
      )

      const common_branches = props?.get_all_branch_data?.filter(elem =>
        branchData?.find(({ value }) => elem._id === value)
      )
      // console.log(common_branches)

      const branch_data_edit =
        common_branches?.length > 0
          ? common_branches?.map((item, key) => {
              return { label: item.name, value: item._id }
            })
          : ""

      setBranch(branchData)
      //setSelectedBranch(branchData)
      setSelectedBranch(branch_data_edit)

      // show path
      const edit_map_data =
        props?.get_zone_by_id_data?.lat_long?.coordinates?.[0].map(x => ({
          lng: x[0],
          lat: x[1],
        }))

      setPath(edit_map_data)

      setCenterMap(path[0])

      // var bounds = new props.google.maps.LatLngBounds()
      // for (var i = 0; i < path.length; i++) {
      //   bounds.extend(path[i])
      // }

      //delivery charge
      const edit_zone_delivery_charge_unsort =
        props?.get_zone_by_id_data?.zone_delivery_charges?.map(item => ({
          distanceStart: item.distance_start_in_kilometer,
          distanceEnd: item.distance_end_in_kilometer,
          deliveryCharge: item.delivery_charge,
        }))

      const edit_zone_delivery_charge = edit_zone_delivery_charge_unsort
        ? [...edit_zone_delivery_charge_unsort].sort(
            (a, b) => a.distanceStart - b.distanceStart
          )
        : ""

      // console.log(edit_zone_delivery_charge_unsort)
      //console.log(edit_zone_delivery_charge)

      setDeliveryCHarge(
        edit_zone_delivery_charge
          ? edit_zone_delivery_charge
          : [deliveryChargeTemplate]
      )
    }

    if (getInfo) {
      props.getZoneByIdAction(location?.state?._id)
      SetGetInfo(false)
    }
  }, [props])

  if (!props.get_zone_by_id_data) {
    return <PageLoader />
  }
  if (!isLoaded) {
    return <PageLoader />
  }

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Zone"
              breadcrumbItem="Edit Zone"
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
                        {location.state ? "Edit Zone New" : "Add a New Zone"}{" "}
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
                  onSubmit={handleSubmitForEdit}
                >
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
                      <Input
                        required
                        id="exampleSelect"
                        name="city"
                        value={zoneInfo.city}
                        //required={true}
                        onChange={handleInputs}
                        type="select"
                      >
                        <option value="">Choose City</option>
                        {cityData}
                      </Input>
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
                        isMulti={true}
                      />
                    </div>
                  </Row>
                  {/* <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Location <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <textarea
                        required
                        className="form-control"
                        id="location"
                        name="location"
                        value={allData}
                        readOnly
                      />
                    </div>
                  </Row> */}

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
                  {centerMap ? (
                    <Card>
                      <CardBody>
                        <div
                          id="gmaps-markers"
                          className="gmaps"
                          style={{ position: "relative" }}
                        >
                          {/* <Map
                            style={{ width: "100%", height: "100%" }}
                            google={props.google}
                            initialCenter={defaultProps[0]}
                            bounds={bounds}
                            // zoom={12}
                            onClick={e => onMapClickHandler(e)}
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
                          </Map> */}

                          <GoogleMap
                            center={centerMap}
                            zoom={15}
                            mapContainerStyle={{
                              width: "100%",
                              height: "100%",
                            }}
                            // onLoad={calculateZoom}
                            // ref={mapRef}

                            onLoad={map => {
                              mapRef.current = map
                            }}
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
                  ) : (
                    <></>
                  )}

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
                      >
                        Edit Zone
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
    get_zone_by_id_loading,
  } = state.Restaurant

  const { get_all_city_data, get_all_city_error, get_all_city_loading } =
    state.zoneCity
  return {
    get_all_branch_loading,
    get_all_branch_data,
    edit_zone_loading,
    get_zone_by_id_data,
    get_zone_by_id_loading,

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
    getZoneByIdActionFresh,
  })(EditZone)
)
