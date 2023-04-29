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
  getAllAdminUsersAction,
  addNotificationAction,
  addNotificationFresh,
  notificationEditAction,
  notificationEditFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function AddNotification(props) {
  const navigate = useNavigate()
  const location = useLocation()
  console.log("lof", location?.state?.restaurants)

  //select multiple user
  const common_users = props?.get_all_user_data?.filter(elem =>
    location?.state?.restaurants?.find(({ res_id }) => elem._id === res_id)
  )

  const user_data_edit = common_users
    ? common_users?.map((item, key) => {
        return {
          label: `${item.first_name} ${item.last_name}`,
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

  // TODO: Get Customers
  let userData = undefined
  if (props.get_all_user_data?.length > 0) {
    userData = props.get_all_user_data?.map((item, key) => ({
      label: `${item.first_name} ${item.last_name}`,
      value: item._id,
    }))
  }

  console.log(location.state)
  const [notificationInfo, setNotificationInfo] = useState({
    title: location.state ? location.state.title : "",
    image: location.state ? location.state.image : "",
    description: location.state ? location.state.description : "",
    is_active: location.state ? location.state.is_active : true,
  })
  console.log("tt", new Date().toISOString())
  const handleTimeChange = e => {
    console.log("e :", e.target.value)
    console.log(new Date(e.target.value).toISOString())
    name = e.target.name
    value = e.target.value
    let new_time_string = `${value}:00Z`
    setNotificationInfo({
      ...notificationInfo,
      [name]: new Date(new_time_string).toISOString(),
    })
  }

  let name, value
  const handleInputs = e => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setNotificationInfo({ ...notificationInfo, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const uniqueId = uuidv4()
    // console.log(notificationInfo);
    props.addNotificationAction(uniqueId, notificationInfo, selectedUser)
  }

  const handleSubmitForEdit = e => {
    e.preventDefault()
    console.log("======================I am in the edit form==================")

    props.notificationEditAction(
      location.state._id,
      notificationInfo,
      selectedUser
    )
  }

  console.log(props.add_notification_loading)
  useEffect(() => {
    if (props.get_all_user_loading == false) {
      props.getAllAdminUsersAction()
    }

    console.log("add_notification_loading :", props.add_notification_loading)
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
    props.get_all_user_loading,
    props.add_notification_loading,
    props.notification_edit_loading,
  ])

  console.log(props.get_all_user_data)

  return (
    <>
      <React.Fragment>
        <div className="page-content">
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
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Image
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        className="form-control"
                        id="resume"
                        onChange={e => console.log(e)}
                        required
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
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
                  </Row>

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
  const { get_all_user_data, get_all_user_error, get_all_user_loading } =
    state.registerNew

  const { add_notification_loading, notification_edit_loading } =
    state.Notification
  return {
    get_all_user_loading,
    get_all_user_data,
    add_notification_loading,
    notification_edit_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllAdminUsersAction,
    addNotificationAction,
    addNotificationFresh,
    notificationEditAction,
    notificationEditFresh,
  })(AddNotification)
)
