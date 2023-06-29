import React, { useState, useCallback, useRef } from "react"
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

import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import { useEffect } from "react"
import { getBranchByIdAction } from "store/actions"
import Breadcrumbs from "components/Common/Breadcrumb"
import { boolean } from "yup"
import Select from "react-select"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useMemo } from "react"
import PageLoader from "components/CustomLoader/PageLoader"

import restaurant from "assets/icons/restaurant.png"
import home from "assets/icons/home.png"
import driver from "assets/icons/driver.png"
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api"

const LoadingContainer = () => <div>Loading...</div>

function TrackRider3(props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDKIxr2AXZPA1k8EyJz52suWseQCFxfoMU",
    libraries: ["places"],
  })
  const location = useLocation()
  const naviagte = useNavigate()

  const containerStyle = {
    width: "100%",
    height: "100%",
  }

  const [center, setCenter] = useState({ lat: 23.8103, lng: 90.4125 })
  const [searchPlace, setSearchPlaces] = useState("")

  const [initialLatLong, setInitialLatLong] = useState({
    lat: 23.8103,
    lng: 90.4125,
  })

  const [locationData, setLocationData] = useState({
    location: `${initialLatLong.lat},${initialLatLong.lng}`,
    lat: 23.8103,
    lng: 90.4125,
  })

  const [autocomplete, setAutocomplete] = useState(null)

  const moveMarker = e => {
    setInitialLatLong({ lat: e.latLng.lat(), lng: e.latLng.lng() })

    setSearchPlaces("")
    setLocationData({
      ...locationData,
      location: [e.latLng.lat(), e.latLng.lng()],
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    })
  }

  const handlePlaceSelect = () => {
    const place = autocomplete.getPlace()
    const { lat, lng } = place.geometry.location

    setSearchPlaces(place.name)
    setInitialLatLong({ lat: lat(), lng: lng() })
    setLocationData({
      ...locationData,
      location: [lat(), lng()],
      lat: lat(),
      lng: lng(),
    })
  }

  const clear = () => {
    setSearchPlaces("")
    setInitialLatLong({ lat: center.lat, lng: center.lng })
    setLocationData({
      ...locationData,
      location: [center.lat, center.lng],
      lat: center.lat,
      lng: center.lng,
    })
  }

  if (!isLoaded) {
    return <PageLoader />
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Order"
            breadcrumbItem="Track Rider"
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
                      Track Rider
                    </CardTitle>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col className="col-12 col-sm-5 col-md-5 ">
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
            <Col className="col-12 col-sm-5 col-md-5 ">
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                required
                value={locationData.location}
                readOnly={true}
                disabled={true}
              />
            </Col>
            <Col className="col-12 col-sm-2 col-md-2  ">
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

          <Row>
            <Col className="col-12 mx-auto">
              <Card>
                <CardBody>
                  <div
                    id="gmaps-markers"
                    className="gmaps"
                    style={{ position: "relative" }}
                  >
                    {/* <LoadScript googleMapsApiKey="AIzaSyDKIxr2AXZPA1k8EyJz52suWseQCFxfoMU"> */}
                    <GoogleMap
                      center={initialLatLong}
                      zoom={15}
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                    >
                      <Marker
                        draggable={true}
                        onDragEnd={e => moveMarker(e)}
                        position={initialLatLong}
                      />
                    </GoogleMap>
                    {/* </LoadScript> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    get_branch_by_id_data,
    get_branch_by_id_error,
    get_branch_by_id_loading,
  } = state.Branch

  return {
    get_branch_by_id_data,
    get_branch_by_id_error,
    get_branch_by_id_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getBranchByIdAction,
  })(TrackRider3)
)
