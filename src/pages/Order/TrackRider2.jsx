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

import bikeIcon from "assets/icons/motorcycle-solid.svg"
import userIcon from "assets/icons/user-solid.svg"
import restaurantIcon from "assets/icons/utensils-solid.svg"
import markImage2 from "assets/icons/motorcycle-solid-2.svg"

const LoadingContainer = () => <div>Loading...</div>

// function TrackRider(props) {
//   const location = useLocation()
//   const naviagte = useNavigate()

//   const [loading, setLoading] = useState(true)

//   const [initialLatLong, setInitialLatLong] = useState({
//     // lat: 23.8103,
//     // lng: 90.4125,
//     lat: 23.8103,
//     lng: 90.4125,
//   })

//   const customMarker = {
//     url: markImage2,
//     anchor: new google.maps.Point(17, 46),
//     scaledSize: new google.maps.Size(37, 37),
//   }

//   //   const [locationData, setLocationData] = useState({
//   //     location: `${initialLatLong.lat},${initialLatLong.lng}`,
//   //     lat: 23.8103,
//   //     lng: 90.4125,
//   //   })

//   const [userLatLong, setUserLatLong] = useState({
//     lat: 23.8103,
//     lng: 90.4125,
//   })

//   const [restLatLong, setRestLatLong] = useState({
//     lat: 23.8293,
//     lng: 90.4325,
//   })

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

//   var bounds = new props.google.maps.LatLngBounds()
//   for (var i = 0; i < rider.length; i++) {
//     bounds.extend(rider[i])
//   }

//   const onMarkerClick = e => {}

//   const onMapClickHandler = e => {}

//   const moveMarker = (props, marker, e) => {
//     setInitialLatLong({ lat: e.latLng.lat(), lng: e.latLng.lng() })
//     // setLocationData({
//     //   ...locationData,
//     //   location: [e.latLng.lat(), e.latLng.lng()],
//     //   lat: e.latLng.lat(),
//     //   lng: e.latLng.lng(),
//     // })
//   }

//   //   useEffect(() => {
//   //     if (props.get_branch_by_id_loading == "Success") {
//   //       const branchData = props.get_branch_by_id_data

//   //       // location set start
//   //       let coordinates = branchData?.location?.coordinates
//   //       console.log("coordinates :", coordinates)

//   //       setInitialLatLong({
//   //         lat: coordinates[1],
//   //         lng: coordinates[0],
//   //       })

//   //       setLocationData({
//   //         location: `${coordinates[1]},${coordinates[0]}`,

//   //         lat: coordinates[1],
//   //         lng: coordinates[0],
//   //       })
//   //       // location set end

//   //       setLoading(false)
//   //     }
//   //   }, [props.get_branch_by_id_loading])

//   useEffect(() => {
//     if (location?.state) {
//       props.getBranchByIdAction(location.state._id)
//     }
//   }, [location?.state])

//   if (location?.state && loading) {
//     return <PageLoader />
//   }

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           {/* Render Breadcrumbs */}
//           <Breadcrumbs
//             maintitle="Foodi"
//             title="Order"
//             breadcrumbItem="Track Rider"
//           />

//           <Row>
//             <Col className="col-12">
//               <Card style={{ border: "none" }}>
//                 <CardBody>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       marginBottom: "10px",
//                       marginTop: "20px",
//                       backgroundColor: "#1E417D",
//                       padding: "15px",
//                     }}
//                   >
//                     <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
//                       Track Rider
//                     </CardTitle>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//           <Row>
//             <Col className="col-12 mx-auto">
//               <Card>
//                 <CardBody>
//                   <div
//                     id="gmaps-markers"
//                     className="gmaps"
//                     style={{ position: "relative" }}
//                   >
//                     <Map
//                       style={{ width: "100%", height: "100%" }}
//                       google={props.google}
//                       initialCenter={restLatLong}
//                       bounds={bounds}
//                       //   zoom={12}
//                       onClick={e => onMapClickHandler(e)}
//                     >
//                       <Marker
//                         icon={{
//                           url: restaurantIcon,
//                           anchor: new google.maps.Point(17, 46),
//                           scaledSize: new google.maps.Size(37, 37),
//                         }}
//                         position={restLatLong}
//                         draggable={true}
//                         onDragend={moveMarker}
//                         onClick={e => {
//                           onMarkerClick(e)
//                         }}
//                       />

//                       {rider.map(latLng => (
//                         <Marker
//                           icon={{
//                             url: markImage2,
//                             anchor: new google.maps.Point(17, 46),
//                             scaledSize: new google.maps.Size(37, 37),
//                           }}
//                           position={latLng}
//                           draggable={true}
//                           onDragend={moveMarker}
//                           onClick={e => {
//                             onMarkerClick(e)
//                           }}
//                         />
//                       ))}

//                       <Marker
//                         icon={{
//                           url: userIcon,
//                           anchor: new google.maps.Point(17, 46),
//                           scaledSize: new google.maps.Size(37, 37),
//                         }}
//                         position={userLatLong}
//                         draggable={true}
//                         onDragend={moveMarker}
//                         onClick={e => {
//                           onMarkerClick(e)
//                         }}
//                       />
//                     </Map>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </React.Fragment>
//   )
// }

function TrackRider2(props) {
  const onMapReady = (mapProps, map) => {
    let coords = []
    let waypoints = []

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
    //put data from config file in an array
    {
      rider.map(place => coords.push({ lat: place.lat, lng: place.lng }))
    }

    //instantiate directions service and directions renderer
    const directionsService = new google.maps.DirectionsService()
    const directionsDisplay = new google.maps.DirectionsRenderer()
    //put directions renderer to render in the map
    directionsDisplay.setMap(map)
    //Getting the first coordinate in the array as the start/origin
    let start = { lat: coords[0].lat, lng: coords[0].lng }
    //Getting the last coordinate in the array as the end/destination
    let end = {
      lat: coords[coords.length - 1].lat,
      lng: coords[coords.length - 1].lng,
    }

    //putting all the coordinates between the first and last coordinate from the array as the waypoints
    for (let i = 1; i < coords.length - 1; i++) {
      waypoints.push({
        location: { lat: coords[i].lat, lng: coords[i].lng },
        stopover: true,
      })
    }

    // directions requests

    let request = {
      origin: start,
      waypoints: waypoints,
      destination: end,
      travelMode: "DRIVING",
    }
    //show results in the directionsrenderer
    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        directionsDisplay.setDirections(result)
      }
    })

    //setting the autocomplete input
    let card = document.getElementById("pac-card")
    let input = document.getElementById("pac-input")
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card)
    let autocomplete = new google.maps.places.Autocomplete(input)

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo("bounds", map)

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"])

    //listener for the places input
    autocomplete.addListener("place_changed", function () {
      console.log(waypoints)
      let place = autocomplete.getPlace()
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'")
        return
      }

      //Putting the previous last coordinate in the array to be part of the waypoint
      waypoints.push({
        location: {
          lat: coords[coords.length - 1].lat,
          lng: coords[coords.length - 1].lng,
        },
        stopover: true,
      })

      //putting the Place Autocomplete coordinate result in the coords array
      coords.push({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
      //putting the Place Autocomplete coordinate result the value of the end/destination
      end = place.geometry.location

      //changing  request
      request = {
        origin: start,
        waypoints: waypoints,
        destination: end,
        travelMode: "DRIVING",
      }
      //creating new directions request
      directionsService.route(request, function (result, status) {
        if (status == "OK") {
          directionsDisplay.setDirections(result)
        }
      })
    })
  }

  return (
    <div>
      <Map
        className="map"
        initialCenter={{ lat: 14.6091, lng: 121.0223 }}
        google={props.google}
        // onClick={onMapClicked}
        onReady={onMapReady}
        style={{ height: "100%", position: "relative", width: "100%" }}
        zoom={8}
      ></Map>
      <div className="pac-card" id="pac-card">
        <div>
          <div id="title">Add new point</div>

          <div id="pac-container">
            <input id="pac-input" type="text" placeholder="Enter a location" />
          </div>
        </div>
      </div>
      <div style={{ width: 500, height: 500 }} id={props.id} />
      <div id="infowindow-content">
        <img src="" width="16" height="16" id="place-icon" />
        <span id="place-name" className="title"></span>
        <br />
        <span id="place-address"></span>
        <br />
        <span id="place-coord"></span>
      </div>
    </div>
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
  })(
    GoogleApiWrapper({
      apiKey: "AIzaSyDKIxr2AXZPA1k8EyJz52suWseQCFxfoMU",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(TrackRider2)
  )
)
