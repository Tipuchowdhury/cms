import React, { useState, useRef } from "react"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  getAllCustomerAction,
  getAllRiderAction,
  addNotificationAction,
  addNotificationFresh,
  notificationEditAction,
  notificationEditFresh,
  getNotificationByIdAction,
  getNotificationByIdActionFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function AddNotification(props) {
  const navigate = useNavigate()
  const location = useLocation()

  const [allUser, setAllUser] = useState(false)

  const [allRider, setAllRider] = useState(false)

  //select multiple user
  const common_users = props?.get_all_customer_data?.filter(elem =>
    location?.state?.customers?.find(
      ({ customer_id }) => elem._id === customer_id
    )
  )

  const user_data_edit = common_users
    ? common_users?.map((item, key) => {
        return {
          label: `${item.firstName} ${item.lastName}`,
          device_id: `${item.device_id ?? ""}`,
          value: item._id,
        }
      })
    : ""

  const [selectedUser, setSelectedUser] = useState(
    user_data_edit ? user_data_edit : ""
  )
  const handleSelectUser = e => {
    setSelectedUser(e)
  }

  let userData = undefined
  if (props.get_all_customer_data?.length > 0) {
    userData = props.get_all_customer_data?.map((item, key) => ({
      label: `${item.firstName} ${item.lastName}`,
      device_id: `${item.device_id ?? ""}`,
      value: item._id,
    }))
  }

  //select multiple rider
  const common_riders = props?.get_all_rider_data?.filter(elem =>
    location?.state?.riders?.find(({ rider_id }) => elem._id === rider_id)
  )

  const rider_data_edit = common_riders
    ? common_riders?.map((item, key) => {
        return {
          label: `${item.firstName} ${item.lastName}`,
          device_id: `${item.device_id ?? ""}`,
          value: item._id,
        }
      })
    : ""

  const [selectedRider, setSelectedRider] = useState(
    rider_data_edit ? rider_data_edit : ""
  )
  const handleSelectRider = e => {
    setSelectedRider(e)
  }

  let riderData = undefined
  if (props.get_all_rider_data?.length > 0) {
    riderData = props.get_all_rider_data?.map((item, key) => ({
      label: `${item.first_name} ${item.last_name}`,
      device_id: `${item.device_id ?? ""}`,
      value: item._id,
    }))
  }

  let notification_type = [
    { label: "Customer", value: "customer" },
    { label: "Rider", value: "rider" },
  ]

  const [selectNotificationType, setSelectNotificationType] = useState("")

  const handleSelectType = e => {
    setNotificationInfo({ ...notificationInfo, type: e.value })
    setSelectNotificationType(e)
  }

  const [images, setImages] = useState({
    image: location.state ? location.state.image : "",
  })

  const [notificationInfo, setNotificationInfo] = useState({
    title: location.state ? location.state.title : "",
    image: location.state ? location.state.image : "",
    description: location.state ? location.state.description : "",
    type: location.state ? location.state.type : "",
    is_active: location.state ? location.state.is_active : true,
  })

  let name, value, checked
  const handleInputs = e => {
    name = e.target.name
    value = e.target.value
    setNotificationInfo({ ...notificationInfo, [name]: value })
  }

  const handleUserCheckBox = e => {
    if (e.target.checked == true) {
      setSelectedUser(userData)
    } else {
      setSelectedUser("")
    }
    setAllUser(!allUser)
  }

  const handleRiderCheckBox = e => {
    if (e.target.checked == true) {
      setSelectedRider(riderData)
    } else {
      setSelectedRider("")
    }
    setAllRider(!allRider)
  }

  const handleFiles = e => {
    name = e.target.name
    value = e.target.files[0]
    setNotificationInfo({ ...notificationInfo, [name]: value })
    const reader = new FileReader()

    reader.onload = () => {
      setImages({ ...images, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const uniqueId = uuidv4()

    props.addNotificationAction(
      uniqueId,
      notificationInfo,
      selectedUser,
      selectedRider
    )
  }

  const handleSubmitForEdit = e => {
    e.preventDefault()

    props.notificationEditAction(
      location.state._id,
      notificationInfo,
      selectedUser
    )
  }

  useEffect(() => {
    if (props.get_all_customer_loading == false) {
      props.getAllCustomerAction()
    }

    if (props.get_all_rider_loading == false) {
      props.getAllRiderAction()
    }

    if (props.add_notification_loading === "Success") {
      // redirect
      props.addNotificationFresh()
      navigate("/notification")
    }

    if (props.notification_edit_loading === "Success") {
      toast.success("Notification edited Successfully")
      // redirect
      props.notificationEditFresh()
      navigate("/notification")
    }
  }, [
    props.get_all_customer_loading,
    props.add_notification_loading,
    props.notification_edit_loading,
  ])

  return (
    <>
      <React.Fragment>
        <div className="page-content mb-5">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Notification"
              breadcrumbItem={
                location.state ? "Edit Notification" : "Add Notification"
              }
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
                        {location.state
                          ? "Edit Notification"
                          : "Add a New Notification"}
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
                  onSubmit={location.state ? handleSubmitForEdit : handleSubmit}
                >
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Title
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter title"
                        name="title"
                        onChange={handleInputs}
                        value={notificationInfo.title ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Description
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter description"
                        name="description"
                        onChange={handleInputs}
                        value={notificationInfo.description ?? ""}
                        required
                      ></textarea>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label htmlFor="image" className="col-md-2 col-form-label">
                      Image
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
                        className="form-control"
                        id="image"
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
                    <label htmlFor="type" className="col-md-2 col-form-label">
                      Type
                    </label>
                    <div className="col-md-10">
                      <Select
                        value={selectNotificationType}
                        onChange={handleSelectType}
                        options={notification_type}
                        isMulti={false}
                        required
                      />
                    </div>
                  </Row>

                  {selectNotificationType?.value == "customer" ? (
                    <>
                      <Row className="mb-3">
                        <div className="col-sm-4">
                          <div className="form-check">
                            <label
                              className="form-check-label"
                              htmlFor="select_all_user"
                            >
                              Select All Customer
                            </label>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="select_all_user"
                              checked={allUser}
                              name="select_all_user"
                              onChange={handleUserCheckBox}
                            />
                          </div>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Customers
                        </label>
                        <div className="col-md-10">
                          <Select
                            value={selectedUser}
                            onChange={handleSelectUser}
                            options={userData}
                            isLoading={userData == undefined ? true : false}
                            isDisabled={allUser}
                            isMulti={true}
                            required
                          />
                        </div>
                      </Row>
                    </>
                  ) : (
                    ""
                  )}

                  {selectNotificationType?.value == "rider" ? (
                    <>
                      <Row className="mb-3">
                        <div className="col-sm-4">
                          <div className="form-check">
                            <label
                              className="form-check-label"
                              htmlFor="select_all_rider"
                            >
                              Select All Rider
                            </label>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="select_all_rider"
                              checked={allRider}
                              name="select_all_rider"
                              onChange={handleRiderCheckBox}
                            />
                          </div>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Riders
                        </label>
                        <div className="col-md-10">
                          <Select
                            value={selectedRider}
                            onChange={handleSelectRider}
                            options={riderData}
                            isLoading={riderData == undefined ? true : false}
                            isDisabled={allRider}
                            isMulti={true}
                            required
                          />
                        </div>
                      </Row>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="mb-3 row">
                    <div className="col-12 text-end">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="submit"
                      >
                        {location.state
                          ? "Edit Notification"
                          : "Add Notification"}
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
  const { get_all_customer_data, get_all_customer_loading } = state.Customer

  const { get_all_rider_data, get_all_rider_loading } = state.Rider

  const {
    add_notification_loading,
    notification_edit_loading,
    get_notification_by_id_data,
    get_notification_by_id_loading,
  } = state.Notification
  return {
    get_all_customer_loading,
    get_all_customer_data,
    get_all_rider_data,
    get_all_rider_loading,
    add_notification_loading,
    notification_edit_loading,
    get_notification_by_id_data,
    get_notification_by_id_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllCustomerAction,
    getAllRiderAction,
    addNotificationAction,
    addNotificationFresh,
    notificationEditAction,
    notificationEditFresh,
    getNotificationByIdAction,
    getNotificationByIdActionFresh,
  })(AddNotification)
)
