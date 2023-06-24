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

const LoadingContainer = () => <div>Loading...</div>

function TrackRider(props) {
  const location = useLocation()
  const naviagte = useNavigate()

  const [loading, setLoading] = useState(true)

  const [initialLatLong, setInitialLatLong] = useState({
    // lat: 23.8103,
    // lng: 90.4125,
    lat: 23.8103,
    lng: 90.4125,
  })

  //   const [locationData, setLocationData] = useState({
  //     location: `${initialLatLong.lat},${initialLatLong.lng}`,
  //     lat: 23.8103,
  //     lng: 90.4125,
  //   })

  const [userLatLong, setUserLatLong] = useState({
    lat: 23.8103,
    lng: 90.4125,
  })

  const [restLatLong, setRestLatLong] = useState({
    lat: 23.8293,
    lng: 90.4325,
  })

  var rider = [
    { lat: 23.8153, lng: 90.4165 },
    { lat: 23.8173, lng: 90.4185 },
    { lat: 23.8183, lng: 90.4205 },
    { lat: 23.8193, lng: 90.4225 },
    { lat: 23.8213, lng: 90.4245 },
    { lat: 23.8233, lng: 90.4265 },
    { lat: 23.8253, lng: 90.4285 },
    { lat: 23.8273, lng: 90.4305 },
  ]

  var bounds = new props.google.maps.LatLngBounds()
  for (var i = 0; i < rider.length; i++) {
    bounds.extend(rider[i])
  }

  const onMarkerClick = e => {}

  const onMapClickHandler = e => {}

  const moveMarker = (props, marker, e) => {
    setInitialLatLong({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    // setLocationData({
    //   ...locationData,
    //   location: [e.latLng.lat(), e.latLng.lng()],
    //   lat: e.latLng.lat(),
    //   lng: e.latLng.lng(),
    // })
  }

  //   useEffect(() => {
  //     if (props.get_branch_by_id_loading == "Success") {
  //       const branchData = props.get_branch_by_id_data

  //       // location set start
  //       let coordinates = branchData?.location?.coordinates
  //       console.log("coordinates :", coordinates)

  //       setInitialLatLong({
  //         lat: coordinates[1],
  //         lng: coordinates[0],
  //       })

  //       setLocationData({
  //         location: `${coordinates[1]},${coordinates[0]}`,

  //         lat: coordinates[1],
  //         lng: coordinates[0],
  //       })
  //       // location set end

  //       setLoading(false)
  //     }
  //   }, [props.get_branch_by_id_loading])

  useEffect(() => {
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
                    <Map
                      style={{ width: "100%", height: "100%" }}
                      google={props.google}
                      //   initialCenter={{
                      //     lat: 42.39,
                      //     lng: -72.52,
                      //   }}

                      initialCenter={restLatLong}
                      bounds={bounds}
                      //   zoom={12}
                      onClick={e => onMapClickHandler(e)}
                    >
                      <Marker
                        position={restLatLong}
                        draggable={true}
                        onDragend={moveMarker}
                        onClick={e => {
                          onMarkerClick(e)
                        }}
                      />
                      {rider.map(latLng => (
                        <Marker
                          position={latLng}
                          draggable={true}
                          onDragend={moveMarker}
                          onClick={e => {
                            onMarkerClick(e)
                          }}
                        />
                      ))}

                      <Marker
                        position={userLatLong}
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
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyDKIxr2AXZPA1k8EyJz52suWseQCFxfoMU",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(TrackRider)
  )
)
