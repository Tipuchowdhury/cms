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
  addNotificationAction,
  addNotificationFresh,
  notificationEditAction,
  getAllRiderAction,
  notificationEditFresh,
  getNotificationByIdAction,
  getNotificationByIdActionFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import PageLoader from "components/CustomLoader/PageLoader"

function EditNotification(props) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    props.getNotificationByIdActionFresh()
  }, [])

  const [getInfo, SetGetInfo] = useState(true)

  const [allUser, setAllUser] = useState(false)

  const [allRider, setAllRider] = useState(false)

  let notification_type = [
    { label: "Customer", value: "customer" },
    { label: "Rider", value: "rider" },
  ]

  // const common_types = notification_type?.filter(elem =>
  //   props.get_notification_by_id_data?.find(({ type }) => elem.value === type)
  // )

  const common_types = notification_type.filter(
    elem => elem.value === props?.get_notification_by_id_data?.type
  )

  const types_data_edit = common_types
    ? common_types?.map((item, key) => {
        return {
          label: item.label,
          value: item.value,
        }
      })
    : ""

  const [selectNotificationType, setSelectNotificationType] = useState(
    types_data_edit ? types_data_edit : ""
  )

  console.log(selectNotificationType)

  const handleSelectType = e => {
    setNotificationInfo({ ...notificationInfo, type: e.value })
    setSelectNotificationType(e)
  }

  //select multiple user
  const common_users = props?.get_all_customer_data?.filter(elem =>
    props.get_notification_by_id_data?.customers?.find(
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
    props.get_notification_by_id_data?.riders?.find(
      ({ rider_id }) => elem._id === rider_id
    )
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

  const [images, setImages] = useState({
    image:
      props?.get_notification_by_id_data != undefined
        ? props?.get_notification_by_id_data?.image
        : "",
  })

  const [notificationInfo, setNotificationInfo] = useState({
    title:
      props?.get_notification_by_id_data != undefined
        ? props?.get_notification_by_id_data?.title
        : "",
    image:
      props?.get_notification_by_id_data != undefined
        ? props?.get_notification_by_id_data?.image
        : "",
    description:
      props?.get_notification_by_id_data != undefined
        ? props?.get_notification_by_id_data?.description
        : "",
    type:
      props?.get_notification_by_id_data != undefined
        ? props?.get_notification_by_id_data?.type
        : "",
    is_active:
      props?.get_notification_by_id_data != undefined
        ? props?.get_notification_by_id_data?.is_active
        : "",
  })

  // const [notificationInfo, setNotificationInfo] = useState({})
  // const [images, setImages] = useState({})

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

  const handleSubmitForEdit = e => {
    e.preventDefault()

    props.notificationEditAction(
      location.state._id,
      notificationInfo,
      selectedUser,
      selectedRider
    )
  }

  useEffect(() => {
    if (props.get_all_customer_loading == false) {
      props.getAllCustomerAction()
    }

    if (props.get_all_rider_loading == false) {
      props.getAllRiderAction()
    }

    if (props.get_notification_by_id_data != undefined) {
      setNotificationInfo({
        ...notificationInfo,
        title: props.get_notification_by_id_data.title,
        image: props.get_notification_by_id_data.image,
        type: props.get_notification_by_id_data.type,
        description: props.get_notification_by_id_data.description,
        is_active: props.get_notification_by_id_data.is_active,
      })

      const common_types = notification_type.filter(
        elem => elem.value === props?.get_notification_by_id_data?.type
      )

      const types_data_edit = common_types
        ? common_types?.map((item, key) => {
            return {
              label: item.label,
              value: item.value,
            }
          })
        : ""

      setSelectNotificationType(types_data_edit)

      setImages({ ...images, image: props.get_notification_by_id_data.image })

      const common_users = props?.get_all_customer_data?.filter(elem =>
        props.get_notification_by_id_data?.customers?.find(
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

      setSelectedUser(user_data_edit)

      const common_riders = props?.get_all_rider_data?.filter(elem =>
        props.get_notification_by_id_data?.riders?.find(
          ({ rider_id }) => elem._id === rider_id
        )
      )

      const rider_data_edit = common_riders
        ? common_riders?.map((item, key) => {
            return {
              label: `${item.first_name} ${item.last_name}`,
              device_id: `${item.device_id ?? ""}`,
              value: item._id,
            }
          })
        : ""

      setSelectedRider(rider_data_edit)
    }

    if (getInfo) {
      props.getNotificationByIdAction(location?.state?._id)
      SetGetInfo(false)
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
  }, [props])

  if (props.get_notification_by_id_data == undefined) {
    return <PageLoader />
  }

  return (
    <>
      <React.Fragment>
        <div className="page-content mb-5">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Notification"
              breadcrumbItem="Edit Notification"
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
                        Edit Notification
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
                  {/* <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Users
                    </label>
                    <div className="col-md-10">
                      <Select
                        value={selectedUser}
                        onChange={handleSelectUser}
                        options={userData}
                        isMulti={true}
                        required
                      />
                    </div>
                  </Row> */}

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

                  {notificationInfo.type == "customer" ||
                  selectNotificationType?.value == "customer" ? (
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

                  {notificationInfo.type == "rider" ||
                  selectNotificationType?.value == "rider" ? (
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
  })(EditNotification)
)
