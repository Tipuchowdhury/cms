import React, { useState, useRef, useCallback } from "react"
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
  Container,
  Row,
  Col,
  Input,
} from "reactstrap"
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react"
import { Polygon } from "@react-google-maps/api"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  getAllUsersRolesAction,
  getUserByIdAction,
  userUpdateAction,
  userUpdateFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import CustomLoader from "components/CustomLoader/CustomLoader"

const LoadingContainer = () => <div>Loading...</div>

function EditUser(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [registerInfo, setRegisterInfo] = useState({
    first_name: "",
    last_name: "",
    present_address: "",
    permanent_address: "",
    mobileNumber: "",
    image: "",
    email: "",
    id: null,
    is_active: true,
  })
  const [role, setRole] = useState()
  const [file, setFile] = useState()
  const [getInfo, SetGetInfo] = useState(true)
  const [addImages, setAddImages] = useState({
    image: "",
  })

  let name, value
  const handleInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setRegisterInfo({ ...registerInfo, [name]: value })
  }
  function handleChange(event) {
    let name = event.target.name
    let value = event.target.files[0]
    setFile(value)

    const reader = new FileReader()

    reader.onload = () => {
      setAddImages({ ...addImages, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }
  let userData = undefined
  if (props.get_all_user_roles_data?.length > 0) {
    userData = props.get_all_user_roles_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(registerInfo)
    console.log(file)
    console.log(role)
    // console.log(role);
    if (role) {
      props.userUpdateAction(location?.state?._id, registerInfo, file, role)
    } else {
      toast.warning("Please select role")
    }
  }

  useEffect(() => {
    if (props.get_all_user_roles_loading === false) {
      props.getAllUsersRolesAction()
    }

    if (props.user_update_loading == "Success") {
      navigate("/manage-users")
      props.userUpdateFresh()
    }

    if (props.get_user_by_id_data != undefined) {
      setRegisterInfo({
        ...registerInfo,

        first_name: props?.get_user_by_id_data?.first_name,
        last_name: props?.get_user_by_id_data?.last_name,
        present_address: props?.get_user_by_id_data?.present_address,
        permanent_address: props?.get_user_by_id_data?.permanent_address,
        mobileNumber: props?.get_user_by_id_data?.mobile_number,
        is_active: props?.get_user_by_id_data?.is_active,
        //image: props?.get_user_by_id_data?.image,
        email: props?.get_user_by_id_data?.email,
      })

      setAddImages({ ...addImages, image: props?.get_user_by_id_data?.image })
      setRole(props?.get_user_by_id_data?.role_id)
    }

    if (getInfo) {
      console.log(location?.state?._id)
      props.getUserByIdAction(location?.state?._id)
      SetGetInfo(false)
    }
  }, [props])

  //   if (getInfo) {
  //     return (
  //       <React.Fragment>
  //         <div className="page-content">
  //           <Container fluid>
  //             <Row>
  //               <Col className="col-12 text-center mt-3">
  //                 <CustomLoader />
  //               </Col>
  //             </Row>
  //           </Container>
  //         </div>
  //       </React.Fragment>
  //     )
  //   }
  console.log(props.get_user_by_id_data)

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="User"
              breadcrumbItem="Edit User"
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
                        Edit User
                      </CardTitle>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="col-10 mx-auto">
                <form className="mt-1" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="first_name">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="Enter username"
                      name="first_name"
                      onChange={handleInputs}
                      value={registerInfo.first_name}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="last_name">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Enter username"
                      name="last_name"
                      onChange={handleInputs}
                      value={registerInfo.last_name}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="image">
                      Image
                    </label>{" "}
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={handleChange}
                    />
                  </div>
                  {addImages?.image && (
                    <Row className="mb-3">
                      <label className="col-md-2">
                        <span></span>
                      </label>
                      <div className="col-md-10">
                        <img
                          src={addImages.image}
                          alt="preview"
                          style={{ width: "50%" }}
                        />
                      </div>
                    </Row>
                  )}
                  <div className="mb-3">
                    <label className="form-label" htmlFor="present_address">
                      Present Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="present_address"
                      placeholder="Enter username"
                      name="present_address"
                      onChange={handleInputs}
                      value={registerInfo.present_address}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="permanent_address">
                      Permanent Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="permanent_address"
                      placeholder="Enter username"
                      name="permanent_address"
                      onChange={handleInputs}
                      value={registerInfo.permanent_address}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="mobileNumber">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="mobileNumber"
                      placeholder="Enter mobile number"
                      name="mobileNumber"
                      onChange={handleInputs}
                      value={registerInfo.mobileNumber}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="useremail">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="useremail"
                      placeholder="Enter email"
                      name="email"
                      value={registerInfo.email}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="Role">
                      Role
                    </label>

                    <Input
                      id="exampleSelect"
                      name="manager"
                      value={role}
                      required={true}
                      onChange={e => setRole(e.target.value)}
                      type="select"
                    >
                      <option>Choose...</option>
                      {userData}
                    </Input>
                  </div>

                  <div className="mb-3 row">
                    <div className="col-12 text-end">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="submit"
                      >
                        Update
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
  const {
    get_all_user_roles_data,
    get_all_user_roles_loading,
    get_user_by_id_data,
    user_update_loading,
  } = state.registerNew

  return {
    get_all_user_roles_data,
    get_all_user_roles_loading,
    get_user_by_id_data,
    user_update_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllUsersRolesAction,
    getUserByIdAction,
    userUpdateAction,
    userUpdateFresh,
  })(EditUser)
)
