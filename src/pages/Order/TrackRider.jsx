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
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
  DistanceMatrixService,
  useJsApiLoader,
} from "@react-google-maps/api"

function TrackRider(props) {
  const location = useLocation()
  const naviagte = useNavigate()

  const mapRef = useRef(null)

  const containerStyle = {
    width: "100%",
    height: "100%",
  }

  const [directions, setDirections] = useState(null)

  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  }

  const directionsOptions = {
    origin: {
      lat: 23.8103,
      lng: 90.4125,
    },
    destination: {
      lat: 23.8293,
      lng: 90.4325,
    },
    travelMode: "DRIVING",
  }

  const center = {
    lat: 23.8103,
    lng: 90.4125,
  }

  const [restLatLong, setRestLatLong] = useState({
    lat: 23.8103,
    lng: 90.4125,
  })

  const [userLatLong, setUserLatLong] = useState({
    lat: 23.8293,
    lng: 90.4325,
  })

  const [rider, setRider] = useState({ lat: 23.8233, lng: 90.4265 })

  let count = useRef(0)

  //   const directionsCallback = useCallback(res => {
  //     // console.log(count.current)
  //     if (res !== null) {

  //       if (res.status === "OK" && count.current < 2) {
  //         count.current += 1
  //         setDirections(res)
  //         const map = mapRef.current
  //         const bounds = new window.google.maps.LatLngBounds()
  //         res.routes[0].legs.forEach(leg => {
  //           leg.steps.forEach(step => {
  //             step.path.forEach(point => {
  //               bounds.extend(point)
  //             })
  //           })
  //         })
  //         map.fitBounds(bounds)
  //       } else {
  //         count.current = 0
  //         // console.log("res: ", res)
  //       }
  //     }
  //   }, [])

  const directionsCallback = res => {
    if (res !== null) {
      if (res.status === "OK" && count.current < 2) {
        count.current += 1
        setDirections(res)
      } else {
        count.current = 0
        console.log("Directions request failed:", res)
      }
    }
  }

  useEffect(() => {
    if (directions && mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds()
      directions.routes[0].legs.forEach(leg => {
        leg.steps.forEach(step => {
          step.path.forEach(point => {
            bounds.extend(point)
          })
        })
      })
      mapRef.current.fitBounds(bounds)
    }
  }, [directions])

  //   useEffect(() => {
  //     if (directions && mapRef.current) {
  //       const map = mapRef.current.getMap()
  //       const bounds = new window.google.maps.LatLngBounds()
  //       directions.routes[0].legs.forEach(leg => {
  //         leg.steps.forEach(step => {
  //           step.path.forEach(point => {
  //             bounds.extend(point)
  //           })
  //         })
  //       })
  //       map.fitBounds(bounds)
  //     }
  //   }, [directions])

  //   const directionsCallback = response => {
  //     if (response !== null) {
  //       if (response.status === "OK") {
  //         setDirections(response)
  //         const map = mapRef.current
  //         const bounds = new window.google.maps.LatLngBounds()
  //         response.routes[0].legs.forEach(leg => {
  //           leg.steps.forEach(step => {
  //             step.path.forEach(point => {
  //               bounds.extend(point)
  //             })
  //           })
  //         })
  //         map.fitBounds(bounds)
  //       } else {
  //         console.log("Directions request failed:", response)
  //       }
  //     }
  //   }

  const renderMarkers = directions => {
    const { markers } = directions || {}
    if (markers) {
      markers.forEach(marker => {
        marker.setOptions({ visible: false })
      })
    }
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
          <Row>
            <Col className="col-12 mx-auto">
              <Card>
                <CardBody>
                  <div
                    id="gmaps-markers"
                    className="gmaps"
                    style={{ position: "relative" }}
                  >
                    <LoadScript googleMapsApiKey="AIzaSyDKIxr2AXZPA1k8EyJz52suWseQCFxfoMU">
                      <GoogleMap
                        id="direction-example"
                        mapContainerStyle={containerStyle}
                        // zoom={2}
                        center={center}
                        // options={options}

                        zoom={14}
                        options={options}
                        onLoad={map => {
                          mapRef.current = map
                        }}
                      >
                        <DirectionsService
                          options={directionsOptions}
                          callback={directionsCallback}
                        />
                        {/* {directions && (
                          <DirectionsRenderer directions={directions} />
                        )} */}
                        {directions && (
                          <DirectionsRenderer
                            directions={directions}
                            options={{
                              suppressMarkers: true, // Hide the default markers
                              preserveViewport: true, // Maintain the current viewport
                              polylineOptions: {
                                strokeColor: "red", // Set the desired line color here
                              },
                            }}
                            onLoad={renderMarkers} // Hide the default markers after the directions are loaded
                          />
                        )}

                        <Marker
                          position={directionsOptions.origin}
                          icon={{
                            url: restaurant,
                            fillColor: "#120E43",
                            fillOpacity: 0.9,
                            scale: 0.05,
                            strokeColor: "#120E43",
                            strokeWeight: 2,
                          }}
                        />

                        <Marker
                          position={directionsOptions.destination}
                          icon={{
                            url: home,
                            fillColor: "#120E43",
                            fillOpacity: 0.9,
                            scale: 0.05,
                            strokeColor: "#120E43",
                            strokeWeight: 2,
                          }}
                        />
                      </GoogleMap>
                    </LoadScript>
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
  })(TrackRider)
)
