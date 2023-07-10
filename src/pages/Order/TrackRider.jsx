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
import { trackRider, trackRiderFresh } from "store/actions"
import Breadcrumbs from "components/Common/Breadcrumb"
import { boolean } from "yup"
import Select from "react-select"
import { v4 as uuidv4 } from "uuid"
import moment from "moment"
import { useLocation, useNavigate, useParams } from "react-router-dom"
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
import { orderStatusNames } from "common/data/order"

function TrackRider(props) {
  const location = useLocation()
  const naviagte = useNavigate()
  let params = useParams()

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyDKIxr2AXZPA1k8EyJz52suWseQCFxfoMU",
  // })

  const mapRef = useRef(null)

  useEffect(() => {
    if (params.order_id) {
      props.trackRider(params.order_id)
    }
  }, [params.order_id])

  console.log(props?.get_track_rider_data)

  const containerStyle = {
    width: "100%",
    height: "100%",
  }

  const [directions, setDirections] = useState(null)

  const options = {
    // disableDefaultUI: true,
    // zoomControl: true,
  }

  const branchToCustomerDirection = {
    origin: {
      lat: props?.get_track_rider_data
        ? props?.get_track_rider_data.branch.latitude
        : 0,
      lng: props?.get_track_rider_data
        ? props?.get_track_rider_data.branch.longitude
        : 0,
    },
    destination: {
      lat: props?.get_track_rider_data
        ? props?.get_track_rider_data.customer.latitude
        : 0,
      lng: props?.get_track_rider_data
        ? props?.get_track_rider_data.customer.longitude
        : 0,
    },
    travelMode: "DRIVING",
  }

  const branchToRiderDirection = {
    origin: {
      lat: props?.get_track_rider_data
        ? props?.get_track_rider_data.branch.latitude
        : 0,
      lng: props?.get_track_rider_data
        ? props?.get_track_rider_data.branch.longitude
        : 0,
    },
    destination: {
      lat: props?.get_track_rider_data
        ? props?.get_track_rider_data.rider.latitude
        : 0,
      lng: props?.get_track_rider_data
        ? props?.get_track_rider_data.rider.longitude
        : 0,
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

  const renderMarkers = directions => {
    const { markers } = directions || {}
    if (markers) {
      markers.forEach(marker => {
        marker.setOptions({ visible: false })
      })
    }
  }

  // if (!isLoaded) {
  //   return <PageLoader />
  // }

  if (
    props.get_track_rider_data == undefined ||
    props.get_track_rider_data == ""
  ) {
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
          <Row>
            <Col className="col-12 mx-auto">
              <div className="text-center mb-3">
                <h4>Track rider for Order ID {params.order_id}</h4>
                <h6>
                  Order Status:{" "}
                  {orderStatusNames[props.get_track_rider_data.order_status]}
                </h6>
              </div>
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
                        center={branchToCustomerDirection.origin}
                        // options={options}

                        zoom={14}
                        options={options}
                        onLoad={map => {
                          mapRef.current = map
                        }}
                      >
                        {props?.get_track_rider_data.order_status ==
                          "accepted" ||
                        props?.get_track_rider_data.order_status ==
                          "assigned" ? (
                          <>
                            <DirectionsService
                              options={branchToRiderDirection}
                              callback={directionsCallback}
                            />

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
                          </>
                        ) : (
                          ""
                        )}

                        {props?.get_track_rider_data.order_status
                          .order_status == "ongoing" ||
                        props?.get_track_rider_data.order_status.order_status ==
                          "delivered" ||
                        props?.get_track_rider_data.order_status.order_status ==
                          "not_delivered" ? (
                          <>
                            <DirectionsService
                              options={branchToCustomerDirection}
                              callback={directionsCallback}
                            />

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
                          </>
                        ) : (
                          ""
                        )}

                        <Marker
                          position={branchToCustomerDirection.origin}
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
                          position={branchToRiderDirection.destination}
                          icon={{
                            // url: driver,
                            path: "M512.9 192c-14.9-.1-29.1 2.3-42.4 6.9L437.6 144H520c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24h-45.3c-6.8 0-13.3 2.9-17.8 7.9l-37.5 41.7-22.8-38C392.2 68.4 384.4 64 376 64h-80c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h66.4l19.2 32H227.9c-17.7-23.1-44.9-40-99.9-40H72.5C59 104 47.7 115 48 128.5c.2 13 10.9 23.5 24 23.5h56c24.5 0 38.7 10.9 47.8 24.8l-11.3 20.5c-13-3.9-26.9-5.7-41.3-5.2C55.9 194.5 1.6 249.6 0 317c-1.6 72.1 56.3 131 128 131 59.6 0 109.7-40.8 124-96h84.2c13.7 0 24.6-11.4 24-25.1-2.1-47.1 17.5-93.7 56.2-125l12.5 20.8c-27.6 23.7-45.1 58.9-44.8 98.2.5 69.6 57.2 126.5 126.8 127.1 71.6.7 129.8-57.5 129.2-129.1-.7-69.6-57.6-126.4-127.2-126.9zM128 400c-44.1 0-80-35.9-80-80s35.9-80 80-80c4.2 0 8.4.3 12.5 1L99 316.4c-8.8 16 2.8 35.6 21 35.6h81.3c-12.4 28.2-40.6 48-73.3 48zm463.9-75.6c-2.2 40.6-35 73.4-75.5 75.5-46.1 2.5-84.4-34.3-84.4-79.9 0-21.4 8.4-40.8 22.1-55.1l49.4 82.4c4.5 7.6 14.4 10 22 5.5l13.7-8.2c7.6-4.5 10-14.4 5.5-22l-48.6-80.9c5.2-1.1 10.5-1.6 15.9-1.6 45.6-.1 82.3 38.2 79.9 84.3z",
                            fillColor: "yellow",
                            fillOpacity: 0.9,
                            scale: 0.05,
                            strokeColor: "green",
                            strokeWeight: 2,
                          }}
                        />

                        <Marker
                          position={branchToCustomerDirection.destination}
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
  const { get_track_rider_data, get_track_rider_loading } = state.Order

  return {
    get_track_rider_data,
    get_track_rider_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    trackRider,
    trackRiderFresh,
  })(TrackRider)
)
