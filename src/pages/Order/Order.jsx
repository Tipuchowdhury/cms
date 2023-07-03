import React, { useState, useEffect, useRef, useCallback } from "react"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
;` `
import { connect } from "react-redux"
import {
  getAllOrderAction,
  getAllOrderFresh,
  orderDeleteAction,
  orderDeleteFresh,
  orderEditAction,
  orderEditFresh,
  orderStatusEditAction,
  orderStatusEditFresh,
  getAvailableRider,
  orderAssignRider,
  assignRiderFresh,
  getServerSidePaginationOrderAction,
  getServerSidePaginationOrderFresh,
} from "store/Order/actions"
import DataTable from "react-data-table-component"
import { orderStatusNames, orderStatuses, orderTypes } from "common/data/order"
import moment from "moment"
import CustomLoader from "components/CustomLoader/CustomLoader"
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api"

import riderMarker from "assets/icons/map-rider.svg"
import userMarker from "assets/icons/map-user.svg"
import restaurantMarker from "assets/icons/map-restaruant.svg"

function Order(props) {
  const [riderModalInfo, setRiderModalInfo] = useState("")
  const [availableRiderData, setAvailableRiderData] = useState(false)
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [confirmRiderModal, setConfirmRiderModal] = useState(false)
  const [mapCenter, setMapCenter] = useState(false)

  const [editInfo, setEditInfo] = useState(false)
  const [reload, setReload] = useState(false)
  const navigate = useNavigate()

  // delete modal
  const [deleteItem, setDeleteItem] = useState()
  const [changeStatusModal, setChangeStatusModal] = useState(false)
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const [selectedRider, setSelectedRider] = useState("")

  const [selectedPoint, setSelectedPoint] = useState(null)
  const [locations, setLocations] = useState(null)

  const containerStyle = {
    width: "100%",
    height: "300px",
  }

  useEffect(() => {
    if (window.screen.width <= 992) {
      document.body.classList.add("sidebar-enable")
    } else {
      document.body.classList.add("vertical-collpsed")
      document.body.classList.add("sidebar-enable")
    }
  }, [])

  const toggleOrderInvoice = order_id => {
    window.open(`/invoice/${order_id}`, "_blank")
  }
  const toggleRiderInvoice = order_id => {
    window.open(`/rider_invoice/${order_id}`, "_blank")
  }

  const handleSelectRider = rider_id => {
    toggle()
    toggleConfirmRider()
    setSelectedRider(rider_id)
  }

  const handleSelectStatus = e => {
    setEditInfo({ ...editInfo, status: e.target.value })
  }

  const toggleChangeStatusModal = () => setChangeStatusModal(!changeStatusModal)

  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const toggle = () => {
    setModal(!modal)
  }

  const toggleConfirmRider = () => {
    setConfirmRiderModal(!confirmRiderModal)
  }

  const handleSubmit = e => {
    e.preventDefault()
    toggleConfirmRider()
    // console.log(name)
    // console.log(val)
    props.orderAssignRider(riderModalInfo.order_id, selectedRider)
  }

  const handleStatusModal = (_id, status) => {
    // console.log(row);
    setEditInfo({ _id, status })

    toggleStatus()
  }

  const handleStatusUpdate = () => {
    // console.log(editInfo)
    props.orderStatusEditAction(editInfo)
    toggleStatus()
  }

  const handleStatusChangeSubmit = e => {
    // console.log(editInfo)
    e.preventDefault()
    props.orderStatusEditAction(editInfo)
    toggleChangeStatusModal()
  }

  const handleFilterKeyPress = event => {
    if (event.key === "Enter") {
      handleParamChange()
    }
  }

  const actionRef = (cell, row) =>
    // Filter Button
    cell.isFilter ? (
      <Button
        color="primary"
        className="btn btn-sm btn-primary waves-effect waves-light"
        onClick={handleParamChange}
      >
        <span className="fa fa-search"></span> Filter
      </Button>
    ) : (
      // Filter Button end
      <div>
        {cell.order_status == orderStatuses.placed ? (
          <>
            <Button
              disabled={!(cell.order_status == orderStatuses.placed)}
              color="primary"
              className="btn btn-sm btn-dark waves-effect waves-light mb-1"
              style={{ marginRight: "2px" }}
              onClick={() =>
                handleStatusModal(cell._id, orderStatuses.accepted)
              }
            >
              <span className="fa fa-check"></span> Accept
            </Button>
          </>
        ) : (
          ""
        )}
        {cell.order_status == orderStatuses.placed ? (
          <>
            <Button
              disabled={!(cell.order_status == orderStatuses.placed)}
              color="danger"
              className="btn btn-sm waves-effect waves-light mb-1"
              onClick={() => handleStatusModal(cell._id, orderStatuses.cancel)}
            >
              <span className="fa fa-times"></span> Cancel
            </Button>
          </>
        ) : (
          ""
        )}
        <Button
          className="btn btn-sm btn-warning waves-effect waves-light mb-1"
          onClick={() => {
            setSelectedRider(cell.rider_id)
            setRiderModalInfo({
              zone_id: cell.zone_id,
              order_id: cell._id,
            })
            toggle()
          }}
        >
          <span className="fas fa-biking"></span>
          {cell.rider_id ? " Assign Rider" : " Reassign Rider"}
        </Button>
        <br></br>
        <Button
          className="btn btn-sm btn-dark waves-effect waves-light mb-1"
          onClick={() => {
            setEditInfo({ _id: cell._id, status: cell.order_status })
            toggleChangeStatusModal()
          }}
        >
          <span className="fas fa-edit"></span> Change Order Status
        </Button>
        <br></br>
        <Button
          className="btn btn-sm btn-dark waves-effect waves-light mb-1"
          onClick={() => {
            toggleOrderInvoice(cell._id)
          }}
        >
          <span className="fas fa-file-invoice"></span> Invoice
        </Button>{" "}
        {cell.rider_id != null ? (
          <Button
            className="btn btn-sm btn-dark waves-effect waves-light mb-1"
            onClick={() => {
              toggleRiderInvoice(cell._id)
            }}
          >
            <span className="fas fa-file-invoice"></span> Rider Invoice
          </Button>
        ) : (
          ""
        )}
      </div>
    )

  const statusRef = (cell, row) => (
    <Button
      color={cell.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(cell)}
    >
      {cell.is_active ? "Active" : "Deactivate"}
    </Button>
  )
  const textRef = (cell, row) => (
    <span style={{ fontSize: "16px" }}>{cell.name}</span>
  )

  const columnFilerInputName = {
    _id: {
      name: "id",
      placeholder: "Order ID",
    },
    order_date: {
      name: "order_date",
      placeholder: "YYYY-MM-DD",
    },
    order_type: {
      name: "order_type",
      placeholder: "Order Type",
    },
    zone_name: {
      name: "zone_name",
      placeholder: "Zone Name",
    },
    branch_name: {
      name: "branch_name",
      placeholder: "Branch Name",
    },
    customer_name: {
      name: "customer_name",
      placeholder: "Customer Mobile",
    },
    rider_number: {
      name: "rider_number",
      placeholder: "Rider Mobile",
    },
    payment_method: {
      name: "payment_method",
      placeholder: "Payment Method",
    },
    order_total: {
      name: "order_total",
      placeholder: "Total Amount",
    },
    order_status: {
      name: "order_status",
    },
  }

  const columnFilterGeneral = (cell, row, field, is_number = false) => {
    return cell.isFilter ? (
      <input
        className="form-control"
        name={columnFilerInputName[field]?.name}
        placeholder={columnFilerInputName[field]?.placeholder}
        value={pageFilters[columnFilerInputName[field]?.name]}
        onChange={handleFilter}
        onKeyDown={handleFilterKeyPress}
      />
    ) : (
      <div>{is_number ? parseFloat(cell[field]).toFixed(2) : cell[field]}</div>
    )
  }

  const columnFilterOrderStatus = (cell, row) => {
    return cell.isFilter ? (
      <Input
        type="select"
        className="form-control input-sm"
        name="order_status"
        value={pageFilters?.order_status}
        onChange={handleFilter}
      >
        <option value="">Choose...</option>
        {Object.keys(orderStatusNames).map(key => (
          <option value={key} key={key}>
            {orderStatusNames[key]}
          </option>
        ))}
      </Input>
    ) : (
      <div>
        <span>{orderStatusNames[cell?.order_status]}</span>
      </div>
    )
  }

  const columnFilterOrderTypes = (cell, row) => {
    return cell.isFilter ? (
      <Input
        type="select"
        className="form-control input-sm"
        name="order_type"
        value={pageFilters?.order_type}
        onChange={handleFilter}
      >
        <option value="">Choose...</option>
        {Object.keys(orderTypes).map(key => (
          <option value={key} key={key}>
            {orderTypes[key]}
          </option>
        ))}
      </Input>
    ) : (
      <div>
        <span>{orderTypes[cell?.order_type]}</span>
      </div>
    )
  }
  const activeData = [
    {
      name: "Order#",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "_id"),
    },
    {
      name: "Order Time",
      sortable: true,
      cell: (cell, row) =>
        cell.isFilter ? (
          <input
            type="date"
            className="form-control"
            name="order_date"
            value={pageFilters?.order_date}
            onChange={handleFilter}
          />
        ) : (
          <div>
            <span>{moment(cell?.order_date).format("MMMM D, YYYY")}</span>
            <br />
            <span>{moment(cell?.order_date).format("hh:mm:ss A")}</span>
          </div>
        ),
    },
    {
      selector: row => row.order_type,
      name: "Order Type",
      sortable: true,
      cell: (cell, row) => columnFilterOrderTypes(cell, row),
    },
    {
      selector: row => row.zone_name,
      name: "Zone",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "zone_name"),
    },
    {
      selector: row => row.branch_name,
      name: "Branch",
      sortable: true,
      cell: (cell, row) =>
        cell.isFilter ? (
          <input
            className="form-control"
            name="branch_name"
            placeholder="Branch Name"
            value={pageFilters?.branch_name}
            onChange={handleFilter}
            onKeyDown={handleFilterKeyPress}
          />
        ) : (
          <div>
            <span>{cell?.branch_name}</span>
            <br />
            <span>{cell?.branch_mobile_number}</span>
          </div>
        ),
    },
    {
      selector: row => row.customer_name,
      name: "Customer",
      sortable: true,
      cell: (cell, row) =>
        cell.isFilter ? (
          <input
            className="form-control"
            name="customer_number"
            placeholder="Customer Mobile"
            value={pageFilters?.customer_number}
            onChange={handleFilter}
            onKeyDown={handleFilterKeyPress}
          />
        ) : (
          <div>
            <span>{cell?.customer_name}</span>
            <br />
            <span>{cell?.customer_number}</span>
            <br />
            <span>{cell?.customer_address}</span>
          </div>
        ),
    },
    {
      // selector: row => row.customer_name,
      name: "Assigned To",
      sortable: true,
      cell: (cell, row) =>
        cell.isFilter ? (
          <input
            className="form-control"
            name="rider_number"
            placeholder="Rider Mobile"
            value={pageFilters?.rider_number}
            onChange={handleFilter}
            onKeyDown={handleFilterKeyPress}
          />
        ) : (
          <div>
            <span>{cell?.rider_name}</span>
            <br />
            <span>{cell?.rider_number}</span>
          </div>
        ),
    },
    {
      selector: row => row.payment_method,
      name: "Pay Method",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "payment_method"),
    },
    {
      selector: row => row.order_total,
      name: "Total Amount",
      sortable: true,
      cell: (cell, row) => columnFilterGeneral(cell, row, "order_total", true),
    },
    {
      name: "Order Status",
      sortable: true,
      cell: columnFilterOrderStatus,
    },
    {
      name: "Action",
      sortable: true,
      cell: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "_id",
      order: "desc",
    },
  ]

  useEffect(() => {
    console.log("riderModalInfo.order_id :", riderModalInfo.order_id)
    if (riderModalInfo.order_id)
      props.getAvailableRider(riderModalInfo.order_id)
  }, [riderModalInfo.order_id])

  useEffect(() => {
    if (props.get_available_rider_data?.length > 0) {
      setAvailableRiderData(
        props.get_available_rider_data?.map((item, key) => (
          <option key={item._id} value={item._id}>
            {item.first_name} {item.last_name}
          </option>
        ))
      )
    }
  }, [props.get_available_rider_data])

  // server side pagination
  const [page, setPage] = useState(1)
  const [countPerPage, setCountPerPage] = useState(20)
  const [pageFilters, setPageFilters] = useState({
    id: "",
    order_date: "",
    order_type: "",
    zone_name: "",
    branch_name: "",
    customer_name: "",
    rider_number: "",
    payment_method: "",
    order_total: "",
    order_status: "",
  })
  const [paramChange, setParamChange] = useState(false)

  const handleParamChange = () => {
    props.getServerSidePaginationOrderFresh()
    setParamChange(!paramChange)
  }

  const handleFilter = e => {
    console.log("e :", e)
    let name = e.target.name
    let value = e.target.value
    setPageFilters({ ...pageFilters, [name]: value })
  }

  useEffect(() => {
    props.getServerSidePaginationOrderAction(page, countPerPage, pageFilters)
  }, [
    page,
    countPerPage,
    paramChange,
    props.order_assign_rider_loading,
    props.order_status_edit_loading,
    // props.get_server_side_pagination_order_loading,
  ])
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    //selectAllRowsItemText: "ALL"
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    // console.log(newPerPage, page)
    setCountPerPage(newPerPage)
  }

  useEffect(() => {
    if (props.order_status_edit_loading === "Success") {
      toast.success("Status Updated")
      props.orderStatusEditFresh()
    }

    if (props.order_status_edit_loading === "Failed") {
      toast.error("Failed to update.")
      props.orderStatusEditFresh()
    }

    if (props.order_delete_loading === "Success") {
      //  console.log("I am in the delete")
      toast.success("Order Deleted")
      props.orderDeleteFresh()
    }
  }, [
    props.order_name_edit_loading,
    props.order_delete_loading,
    props.order_status_edit_loading,
    props.get_all_order_loading,
  ])

  useEffect(() => {
    if (props.order_assign_rider_loading === "Success") {
      toast.success("Order assigned to rider")
      props.assignRiderFresh()
    }

    if (props.order_assign_rider_loading === "Failed") {
      toast.error("Failed to assign")
      props.assignRiderFresh()
    }
  }, [props.order_assign_rider_loading])

  const customStyles = {
    table: {
      style: {
        border: "1px solid gray",
        borderLeft: "0px",
      },
    },
    headCells: {
      style: {
        padding: "5px",
        borderLeft: "1px solid gray",
      },
    },
    cells: {
      style: {
        padding: "5px",
        borderLeft: "1px solid gray",
      },
    },
  }

  const conditionalRowStyles = [
    {
      when: row => row.order_status === orderStatuses.placed,
      style: {
        backgroundColor: "#ddee11",
        color: "black",
      },
    },
    {
      when: row => row.order_status === orderStatuses.delivered,
      style: {
        backgroundColor: "#4ada99",
        color: "white",
      },
    },
  ]

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  })

  const mapRef = useRef()
  const onMapLoad = useCallback(map => {
    mapRef.current = map
  }, [])

  const panTo = ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(12)
  }

  const selectedRiderData =
    props.get_available_rider_data && selectedRider
      ? props.get_available_rider_data?.riders.filter(
          (value, index) => value._id == selectedRider
        )
      : ""
  console.log("selectedRiderData :", selectedRiderData)

  useEffect(() => {
    props.get_available_rider_data
      ? setLocations([
          props.get_available_rider_data?.branch,
          props.get_available_rider_data?.customer,
          ...props.get_available_rider_data?.riders,
        ])
      : ""
  }, [props.get_available_rider_data])

  useEffect(() => {
    if (locations) {
      setMapCenter({
        lat: locations[0].location.lat,
        lng: locations[0].location.lng,
      })
    }
  }, [locations])

  useEffect(() => {
    if (mapRef.current && locations) {
      const bounds = new window.google.maps.LatLngBounds()
      locations.forEach(location => {
        bounds.extend(
          new window.google.maps.LatLng(
            location.location.lat,
            location.location.lng
          )
        )
      })
      mapRef.current.fitBounds(bounds)
    }
  }, [mapRef.current])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs maintitle="Foodi" title="Order" breadcrumbItem="Order" />
          <Row>
            <Col className="col-12">
              <Card style={{ border: "none" }}>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "40px",
                      marginTop: "20px",
                      backgroundColor: "#1E417D",
                      padding: "15px",
                    }}
                  >
                    <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                      Order{" "}
                    </CardTitle>
                    <Button
                      className="btn btn-sm btn-warning"
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={handleParamChange}
                    >
                      <i
                        class={`fa fa-refresh ${
                          props.get_server_side_pagination_order_loading !=
                          "Success"
                            ? "spin"
                            : ""
                        }`}
                        aria-hidden="true"
                      ></i>{" "}
                      Refresh
                    </Button>
                  </div>

                  <div className="text-end"></div>
                  <DataTable
                    columns={activeData}
                    data={
                      props?.get_server_side_pagination_order_data?.data
                        ? [
                            { isFilter: true },
                            ...props?.get_server_side_pagination_order_data
                              ?.data,
                          ]
                        : ""
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    customStyles={customStyles}
                    paginationTotalRows={
                      props.get_server_side_pagination_order_data?.count
                    }
                    paginationPerPage={countPerPage}
                    paginationComponentOptions={paginationComponentOptions}
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={page => {
                      props.getServerSidePaginationOrderFresh()
                      setPage(page)
                    }}
                    progressPending={
                      !props.get_server_side_pagination_order_data
                    }
                    progressComponent={<CustomLoader />}
                    striped
                    stripedColor="#000"
                    conditionalRowStyles={conditionalRowStyles}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* Assign Rider Modal */}
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Assign Rider</ModalHeader>
          <ModalBody>
            {riderModalInfo.order_id && props.get_available_rider_data ? (
              <div>
                <div className="mb-3">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      // center={mapCenter}
                      zoom={10}
                      onLoad={onMapLoad}
                    >
                      {props.get_available_rider_data?.riders?.map(
                        (location, i) => (
                          <Marker
                            key={i}
                            icon={riderMarker}
                            position={{
                              lat: location.location.lat,
                              lng: location.location.lng,
                            }}
                            onMouseOver={() => {
                              setSelectedPoint({ ...location, type: "rider" })
                            }}
                          />
                        )
                      )}
                      {props.get_available_rider_data?.branch?.location ? (
                        <Marker
                          position={{
                            lat: props.get_available_rider_data?.branch
                              ?.location.lat,
                            lng: props.get_available_rider_data?.branch
                              ?.location.lng,
                          }}
                          icon={restaurantMarker}
                          onMouseOver={() => {
                            setSelectedPoint({
                              ...props.get_available_rider_data?.branch,
                              type: "branch",
                            })
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {props.get_available_rider_data?.customer?.location ? (
                        <Marker
                          position={{
                            lat: props.get_available_rider_data?.customer
                              ?.location.lat,
                            lng: props.get_available_rider_data?.customer
                              ?.location.lng,
                          }}
                          icon={userMarker}
                          onMouseOver={() => {
                            setSelectedPoint({
                              ...props.get_available_rider_data?.customer,
                              type: "customer",
                            })
                          }}
                        />
                      ) : (
                        ""
                      )}
                      {selectedPoint && (
                        <InfoWindow
                          position={{
                            lat: selectedPoint.location.lat,
                            lng: selectedPoint.location.lng,
                          }}
                          onCloseClick={() => {
                            setSelectedPoint(null)
                          }}
                          options={{
                            pixelOffset: new window.google.maps.Size(0, -30),
                          }}
                        >
                          <div>
                            <h4>
                              {selectedPoint.name ||
                                `${selectedPoint.first_name} ${selectedPoint.last_name}`}
                            </h4>
                            {selectedPoint.mobile_number ? (
                              <div>
                                <strong>Mobile:</strong>{" "}
                                {selectedPoint.mobile_number}
                              </div>
                            ) : (
                              ""
                            )}
                            {selectedPoint.address ? (
                              <div>
                                <strong>Address:</strong>{" "}
                                {selectedPoint.address}
                              </div>
                            ) : (
                              ""
                            )}
                            {/* {selectedPoint.type == "rider" &&
                            selectedPoint.current_order ? (
                              <div>
                                <strong>Current Order:</strong>{" "}
                                {selectedPoint.current_order}
                              </div>
                            ) : (
                              ""
                            )} */}
                            {selectedPoint.distance_in_meter ? (
                              <div>
                                <strong>Distance from branch:</strong>{" "}
                                {selectedPoint.distance_in_meter?.from_branch}{" "}
                                {selectedPoint.distance_in_meter?.from_branch >
                                0
                                  ? "meters"
                                  : "meter"}
                              </div>
                            ) : (
                              ""
                            )}
                            {selectedPoint.type == "rider" ? (
                              <div
                                className="col-sm-12"
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <button
                                  className="btn btn-sm btn-success"
                                  style={{ marginTop: "10px" }}
                                  onClick={e => {
                                    e.stopPropagation()
                                    handleSelectRider(selectedPoint._id)
                                  }}
                                >
                                  Assign
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </InfoWindow>
                      )}
                    </GoogleMap>
                  ) : (
                    ""
                  )}

                  <Table hover bordered striped style={{ marginTop: "2rem" }}>
                    <thead>
                      <tr>
                        <th>Rider Name</th>
                        <th>Distance from Branch</th>
                        <th>Current Order</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.get_available_rider_data?.riders.map(
                        (rider, i) => (
                          <tr
                            key={i}
                            onClick={() => {
                              panTo(rider.location)
                              setSelectedPoint({
                                ...rider,
                                type: "rider",
                              })
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <td>
                              {`${rider.first_name} ${rider.last_name}`}
                              <br />
                              {`${rider.mobile_number}`}
                            </td>
                            <td>{rider.distance_in_meter?.from_branch}m</td>
                            <td>{rider.current_order}</td>
                            <td>
                              {" "}
                              <button
                                className="btn btn-sm btn-success"
                                type="button"
                                onClick={e => {
                                  e.stopPropagation()
                                  handleSelectRider(rider._id)
                                }}
                              >
                                Assign
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 5,
                  }}
                >
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>{" "}
                </div>
              </div>
            ) : (
              ""
            )}
          </ModalBody>
        </Modal>

        <Modal
          isOpen={confirmRiderModal}
          toggle={toggleConfirmRider}
          centered
          style={{ zIndex: 100000 }}
        >
          <ModalHeader toggle={toggleConfirmRider}>Assign Rider</ModalHeader>
          <ModalBody>
            {riderModalInfo.order_id && selectedRiderData ? (
              <div className="mt-1">
                <div className="mb-3">
                  <h4>
                    Are you sure you want to assign order#{" "}
                    {riderModalInfo?.order_id} to{" "}
                    {selectedRiderData
                      ? `${selectedRiderData[0]?.first_name} ${selectedRiderData[0]?.last_name}`
                      : ""}
                  </h4>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 5,
                  }}
                >
                  <Button color="secondary" onClick={toggleConfirmRider}>
                    Cancel
                  </Button>{" "}
                  <Button color="primary" type="button" onClick={handleSubmit}>
                    Proceed
                  </Button>
                </div>
              </div>
            ) : (
              ""
            )}
          </ModalBody>
        </Modal>
        {/* Assign Rider Modal */}

        {/* ============ change status modal starts=============== */}
        <Modal
          isOpen={changeStatusModal}
          toggle={toggleChangeStatusModal}
          centered
        >
          <ModalHeader
            className="text-center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <h2>Change Order Status</h2>
            <h4>Order #{editInfo._id}</h4>
          </ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleStatusChangeSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Status
                </label>
                <Input
                  id="exampleSelect"
                  name="city"
                  value={editInfo.status}
                  //required={true}
                  onChange={handleSelectStatus}
                  type="select"
                >
                  <option>Choose Status</option>
                  {Object.keys(orderStatusNames)?.map((item, key) => (
                    <option key={key} value={item}>
                      {orderStatusNames[item]}
                    </option>
                  ))}
                </Input>
              </div>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="secondary" onClick={toggleChangeStatusModal}>
                  Cancel
                </Button>{" "}
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ change status modal ends=============== */}

        {/* ============ change status modal starts=============== */}
        <Modal
          isOpen={changeStatusModal}
          toggle={toggleChangeStatusModal}
          centered
        >
          <ModalHeader
            className="text-center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <h2>Change Order Status</h2>
            <h4>Order #{editInfo._id}</h4>
          </ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleStatusChangeSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Status
                </label>
                <Input
                  id="exampleSelect"
                  name="city"
                  value={editInfo.status}
                  //required={true}
                  onChange={handleSelectStatus}
                  type="select"
                >
                  <option>Choose Status</option>
                  {Object.keys(orderStatusNames)?.map((item, key) => (
                    <option key={key} value={item}>
                      {orderStatusNames[item]}
                    </option>
                  ))}
                </Input>
              </div>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="secondary" onClick={toggleChangeStatusModal}>
                  Cancel
                </Button>{" "}
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        {/* ============ change status modal ends=============== */}

        {/* ============ status update modal starts=============== */}
        <Modal isOpen={modalStatusUpdate} toggle={toggleStatus} centered>
          <ModalHeader
            className="text-center"
            style={{ textAlign: "center", margin: "0 auto" }}
          >
            <div className="icon-box">
              <i
                className="fa fa-exclamation-circle"
                style={{ color: "#DCA218", fontSize: "40px" }}
              ></i>
            </div>
            Are you sure?
          </ModalHeader>
          <ModalBody>
            Do you want to change the order status to{" "}
            <b>'{orderStatusNames[editInfo.status]}'</b>?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleStatus}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={handleStatusUpdate}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
        {/* ============ status update modal ends=============== */}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    get_all_order_data,
    get_all_order_error,
    get_all_order_loading,
    order_delete_loading,
    order_edit_loading,
    order_status_edit_data,
    order_status_edit_loading,
    get_available_rider_data,
    get_available_rider_error,
    get_available_rider_loading,
    order_assign_rider_data,
    order_assign_rider_error,
    order_assign_rider_loading,
    get_server_side_pagination_order_data,
    get_server_side_pagination_order_error,
    get_server_side_pagination_order_loading,
  } = state.Order

  return {
    get_all_order_data,
    get_all_order_error,
    get_all_order_loading,
    order_edit_loading,
    order_delete_loading,
    order_status_edit_data,
    order_status_edit_loading,
    get_available_rider_data,
    get_available_rider_error,
    get_available_rider_loading,
    order_assign_rider_data,
    order_assign_rider_error,
    order_assign_rider_loading,
    get_server_side_pagination_order_data,
    get_server_side_pagination_order_error,
    get_server_side_pagination_order_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllOrderAction,
    getAllOrderFresh,
    orderDeleteAction,
    orderDeleteFresh,
    orderStatusEditAction,
    orderEditFresh,
    orderStatusEditFresh,
    getAvailableRider,
    orderAssignRider,
    assignRiderFresh,
    getServerSidePaginationOrderAction,
    getServerSidePaginationOrderFresh,
  })(Order)
)
