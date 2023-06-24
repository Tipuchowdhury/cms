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
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  getCustomerByIdAction,
  getAllSubscriptionTypeAction,
  customerEditAction,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import CustomLoader from "components/CustomLoader/CustomLoader"

const LoadingContainer = () => <div>Loading...</div>

function CustomerEdit(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [getInfo, SetGetInfo] = useState(true)
  console.log(location.state)
  const [editInfo, setEditInfo] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    image: "",
    is_active: true,
  })
  const [editImages, setEditImages] = useState({
    image: "",
  })

  const [selectedSubscription, setSelectedSubscription] = useState([])
  const handleSelectSubscription = e => {
    console.log(e)
    var new_data = [e]
    //console.log(new_data)
    setSelectedSubscription(new_data)
  }

  let subscriptionData = undefined
  if (props.get_all_subscription_type_data?.length > 0) {
    subscriptionData = props.get_all_subscription_type_data?.map(
      (item, key) => ({
        label: item.name,
        value: item._id,
      })
    )
  }

  let name, value
  const handleEditInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setEditInfo({ ...editInfo, [name]: value })
  }

  const handleEditFile = e => {
    // setEditInfo({
    //     ...editInfo,
    //     image: e.target.value,
    // });

    name = e.target.name
    value = e.target.files[0]
    setEditInfo({ ...editInfo, [name]: value })
    const reader2 = new FileReader()

    reader2.onload = () => {
      setEditImages({ ...editImages, [name]: reader2.result })
    }

    reader2.readAsDataURL(value)
  }

  const handleEditSubmit = e => {
    e.preventDefault()
    console.log(selectedSubscription[0].value)

    props.customerEditAction(
      location.state._id,
      editInfo,
      selectedSubscription[0].value
    )
  }

  useEffect(() => {
    if (props.get_all_subscription_type_loading == false) {
      props.getAllSubscriptionTypeAction()
    }

    if (props.get_customer_by_id_data != undefined) {
      setEditInfo({
        ...editInfo,
        firstName: props?.get_customer_by_id_data?.firstName,
        lastName: props?.get_customer_by_id_data?.lastName,
        email: props?.get_customer_by_id_data?.email,
        mobile: props?.get_customer_by_id_data?.mobile,
        //image: props?.get_customer_by_id_data?.lastName,
      })

      setEditImages({
        ...editImages,
        image: props?.get_customer_by_id_data?.image,
      })
      //setRole()
      let edit_data_subscription = props.get_all_subscription_type_data.filter(
        item => item._id == props?.get_customer_by_id_data?.subscription_type_id
      )
      setSelectedSubscription({
        label: edit_data_subscription[0].name,
        value: edit_data_subscription[0]._id,
      })
      console.log(edit_data_subscription[0].name, edit_data_subscription[0]._id)
      console.log(edit_data_subscription)
    }

    if (getInfo) {
      console.log(location?.state?._id)
      props.getCustomerByIdAction(location?.state?._id)
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
  console.log(props.get_customer_by_id_data)
  console.log(props.get_all_subscription_type_data)

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Customer"
              breadcrumbItem="View Customer"
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
                        View Customer
                      </CardTitle>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="col-10 mx-auto">
                <form className="mt-1" onSubmit={handleEditSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter First Name"
                      required
                      name="firstName"
                      value={editInfo.firstName}
                      onChange={handleEditInputs}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter last name"
                      required
                      name="lastName"
                      value={editInfo.lastName}
                      onChange={handleEditInputs}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      required
                      name="email"
                      value={editInfo.email}
                      onChange={handleEditInputs}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="mobile">
                      Mobile
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      placeholder="Enter mobile"
                      required
                      name="mobile"
                      value={editInfo.mobile}
                      onChange={handleEditInputs}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="image">
                      Image
                    </label>
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .bmp, .png, .webp"
                      className="form-control"
                      id="image"
                      required
                      name="image"
                      onChange={handleEditFile}
                    />
                  </div>

                  {editImages?.image && (
                    <Row className="mb-3">
                      <label className="col-md-2">
                        <span></span>
                      </label>
                      <div className="col-md-10">
                        <img
                          src={editImages.image}
                          alt="preview"
                          style={{ width: "50%" }}
                        />
                      </div>
                    </Row>
                  )}

                  <div className="mb-3">
                    <label
                      className="form-label"
                      htmlFor="subscription_type_id"
                    >
                      Subscription Types
                    </label>

                    <Select
                      value={selectedSubscription}
                      onChange={handleSelectSubscription}
                      options={subscriptionData}
                      isMulti={false}
                    />
                  </div>

                  {/* <div
                                        style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
                                    >
                                        <Button color="primary" type="submit">
                                            Submit
                                        </Button>{" "}

                                    </div> */}
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
  const { get_all_subscription_type_loading, get_all_subscription_type_data } =
    state.SubscriptionTypes

  const { get_customer_by_id_data } = state.Customer

  return {
    get_customer_by_id_data,
    get_all_subscription_type_loading,
    get_all_subscription_type_data,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getCustomerByIdAction,
    getAllSubscriptionTypeAction,
    customerEditAction,
  })(CustomerEdit)
)
