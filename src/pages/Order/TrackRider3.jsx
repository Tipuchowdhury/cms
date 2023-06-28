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
} from "@react-google-maps/api"

const LoadingContainer = () => <div>Loading...</div>

function TrackRider3(props) {
  const location = useLocation()
  const naviagte = useNavigate()

  const [loading, setLoading] = useState(true)

  const containerStyle = {
    width: "100%",
    height: "100%",
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

  //   var rider = [
  //     { lat: 23.8153, lng: 90.4165 },
  //     { lat: 23.8173, lng: 90.4185 },
  //     { lat: 23.8183, lng: 90.4205 },
  //     { lat: 23.8193, lng: 90.4225 },
  //     { lat: 23.8213, lng: 90.4245 },
  //     { lat: 23.8233, lng: 90.4265 },
  //     { lat: 23.8253, lng: 90.4285 },
  //     { lat: 23.8273, lng: 90.4305 },
  //   ]

  const [response, setResponse] = useState(null)
  const origin = "mirpur 10"
  const destination = "gulshan 1"
  const travelMode = "DRIVING"

  // const [response, setResponse] = useState(null)
  // const origin = [{ lat: 23.8103, lng: 90.4125 }]
  // const destination = [{ lat: 23.8233, lng: 90.4265 }]
  // const travelMode = "DRIVING"
  let count = useRef(0)
  // const directionsCallback = res => {
  //   console.log(res)

  //   if (res !== null) {
  //     if (res.status === "OK") {
  //       setResponse(res)
  //     } else {
  //       console.log("response: ", res)
  //     }
  //   }
  // }

  const directionsCallback = useCallback(res => {
    console.log(count.current)
    if (res !== null) {
      if (res.status === "OK" && count.current < 2) {
        count.current += 1
        setResponse(res)
      } else {
        count.current = 0
        console.log("res: ", res)
      }
    }
  }, [])

  const center = {
    lat: 0,
    lng: -180,
  }

  const onLoad = polyline => {
    console.log("polyline: ", polyline)
  }

  const path = [
    { lat: 23.8103, lng: 90.4125 },
    { lat: 23.8153, lng: 90.4165 },
    { lat: 23.8173, lng: 90.4185 },
    { lat: 23.8183, lng: 90.4205 },
    { lat: 23.8193, lng: 90.4225 },
    { lat: 23.8213, lng: 90.4245 },
    { lat: 23.8233, lng: 90.4265 },
    // { lat: 23.8253, lng: 90.4285 },
    // { lat: 23.8273, lng: 90.4305 },
    // { lat: 23.8293, lng: 90.4325 },
  ]

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [
      { lat: 23.8103, lng: 90.4125 },
      { lat: 23.8153, lng: 90.4165 },
      { lat: 23.8173, lng: 90.4185 },
      { lat: 23.8183, lng: 90.4205 },
      { lat: 23.8193, lng: 90.4225 },
      { lat: 23.8213, lng: 90.4245 },
      { lat: 23.8233, lng: 90.4265 },
      //   { lat: 23.8253, lng: 90.4285 },
      //   { lat: 23.8273, lng: 90.4305 },
      //   { lat: 23.8293, lng: 90.4325 },
    ],
    zIndex: 1,
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
                      {/* <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={restLatLong}
                        // onLoad={onLoad}
                        zoom={14}
                      >
                        <Marker
                          icon={{
                            path: "M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z",
                            fillColor: "#FF6263",
                            fillOpacity: 0.9,
                            scale: 0.05,
                            strokeColor: "#FF6263",
                            strokeWeight: 2,
                          }}
                          position={restLatLong}
                        />

                        {rider.map(latLng => (
                          <Marker
                            icon={{
                              path: "M512.9 192c-14.9-.1-29.1 2.3-42.4 6.9L437.6 144H520c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24h-45.3c-6.8 0-13.3 2.9-17.8 7.9l-37.5 41.7-22.8-38C392.2 68.4 384.4 64 376 64h-80c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h66.4l19.2 32H227.9c-17.7-23.1-44.9-40-99.9-40H72.5C59 104 47.7 115 48 128.5c.2 13 10.9 23.5 24 23.5h56c24.5 0 38.7 10.9 47.8 24.8l-11.3 20.5c-13-3.9-26.9-5.7-41.3-5.2C55.9 194.5 1.6 249.6 0 317c-1.6 72.1 56.3 131 128 131 59.6 0 109.7-40.8 124-96h84.2c13.7 0 24.6-11.4 24-25.1-2.1-47.1 17.5-93.7 56.2-125l12.5 20.8c-27.6 23.7-45.1 58.9-44.8 98.2.5 69.6 57.2 126.5 126.8 127.1 71.6.7 129.8-57.5 129.2-129.1-.7-69.6-57.6-126.4-127.2-126.9zM128 400c-44.1 0-80-35.9-80-80s35.9-80 80-80c4.2 0 8.4.3 12.5 1L99 316.4c-8.8 16 2.8 35.6 21 35.6h81.3c-12.4 28.2-40.6 48-73.3 48zm463.9-75.6c-2.2 40.6-35 73.4-75.5 75.5-46.1 2.5-84.4-34.3-84.4-79.9 0-21.4 8.4-40.8 22.1-55.1l49.4 82.4c4.5 7.6 14.4 10 22 5.5l13.7-8.2c7.6-4.5 10-14.4 5.5-22l-48.6-80.9c5.2-1.1 10.5-1.6 15.9-1.6 45.6-.1 82.3 38.2 79.9 84.3z",
                              fillColor: "#758283",
                              fillOpacity: 0.9,
                              scale: 0.05,
                              strokeColor: "#758283",
                              strokeWeight: 2,
                            }}
                            position={latLng}
                          />
                        ))}

                        <Marker
                          icon={{
                            path: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z",
                            fillColor: "#120E43",
                            fillOpacity: 0.9,
                            scale: 0.05,
                            strokeColor: "#120E43",
                            strokeWeight: 2,
                          }}
                          position={userLatLong}
                        />
                      </GoogleMap> */}

                      <GoogleMap
                        // required
                        id="direction-example"
                        // required
                        mapContainerStyle={containerStyle}
                        // required
                        zoom={2}
                        // required
                        center={{
                          lat: 0,
                          lng: -180,
                        }}
                      >
                        {destination !== "" && origin !== "" && (
                          <DirectionsService
                            // required
                            options={{
                              destination: destination,
                              origin: origin,
                              travelMode: travelMode,
                            }}
                            // required
                            callback={directionsCallback}
                          />
                        )}

                        {response !== null && (
                          <DirectionsRenderer
                            // required
                            options={{
                              directions: response,
                            }}
                          />
                        )}

                        {/* <DistanceMatrixService
                          options={{
                            destinations: [
                              {
                                lat: 23.8103,
                                lng: 90.4125,
                              },
                            ],
                            origins: [
                              {
                                lat: 23.8203,
                                lng: 90.4225,
                              },
                            ],
                            travelMode: "DRIVING",
                          }}
                          callback={directionsCallback}
                        /> */}
                      </GoogleMap>

                      {/* <GoogleMap
                        id="marker-example"
                        mapContainerStyle={containerStyle}
                        zoom={15}
                        center={restLatLong}
                      >
                        <Marker
                          icon={{
                            // path: "M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z",
                            url: restaurant,
                            fillColor: "#FF6263",
                            fillOpacity: 0.9,
                            scale: 0.0005,
                            strokeColor: "#FF6263",
                            strokeWeight: 2,
                          }}
                          position={restLatLong}
                        />
                        

                        <Marker
                          icon={{
                            // url: driver,
                            path: "M512.9 192c-14.9-.1-29.1 2.3-42.4 6.9L437.6 144H520c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24h-45.3c-6.8 0-13.3 2.9-17.8 7.9l-37.5 41.7-22.8-38C392.2 68.4 384.4 64 376 64h-80c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h66.4l19.2 32H227.9c-17.7-23.1-44.9-40-99.9-40H72.5C59 104 47.7 115 48 128.5c.2 13 10.9 23.5 24 23.5h56c24.5 0 38.7 10.9 47.8 24.8l-11.3 20.5c-13-3.9-26.9-5.7-41.3-5.2C55.9 194.5 1.6 249.6 0 317c-1.6 72.1 56.3 131 128 131 59.6 0 109.7-40.8 124-96h84.2c13.7 0 24.6-11.4 24-25.1-2.1-47.1 17.5-93.7 56.2-125l12.5 20.8c-27.6 23.7-45.1 58.9-44.8 98.2.5 69.6 57.2 126.5 126.8 127.1 71.6.7 129.8-57.5 129.2-129.1-.7-69.6-57.6-126.4-127.2-126.9zM128 400c-44.1 0-80-35.9-80-80s35.9-80 80-80c4.2 0 8.4.3 12.5 1L99 316.4c-8.8 16 2.8 35.6 21 35.6h81.3c-12.4 28.2-40.6 48-73.3 48zm463.9-75.6c-2.2 40.6-35 73.4-75.5 75.5-46.1 2.5-84.4-34.3-84.4-79.9 0-21.4 8.4-40.8 22.1-55.1l49.4 82.4c4.5 7.6 14.4 10 22 5.5l13.7-8.2c7.6-4.5 10-14.4 5.5-22l-48.6-80.9c5.2-1.1 10.5-1.6 15.9-1.6 45.6-.1 82.3 38.2 79.9 84.3z",

                            fillColor: "green",
                            fillOpacity: 0.9,
                            scale: 0.07,
                            strokeColor: "gold",
                            strokeWeight: 2,
                          }}
                          position={rider}
                        />

                        <Marker
                          icon={{
                            url: home,
                            fillColor: "#120E43",
                            fillOpacity: 0.9,
                            scale: 0.05,
                            strokeColor: "#120E43",
                            strokeWeight: 2,
                          }}
                          position={userLatLong}
                        />
                        <Polyline
                          onLoad={onLoad}
                          path={path}
                          options={options}
                        />
                      </GoogleMap> */}
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
  })(TrackRider3)
)
