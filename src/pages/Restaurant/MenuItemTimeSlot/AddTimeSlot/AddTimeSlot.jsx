import React, { useState, useEffect } from "react"
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
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { toast } from "react-toastify"
import withRouter from "components/Common/withRouter"
;` `
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import {
  getAllBranchAction,
  addMenuTimeSlotAction,
  addMenuTimeSlotFresh,
  editMenuTimeSlotAction,
  editMenuTimeSlotFresh,
} from "store/actions"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { useLocation, useNavigate } from "react-router-dom"
import moment from "moment"

function AddTimeSlot(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const [timeSlot, setTimeSlot] = useState({
    name: location.state ? location.state.name : "",
    branch: location.state ? location.state.branch_id : "",
    start_time: location.state
      ? moment({
          hour: location?.state?.start_time?.hour,
          minute: location?.state?.start_time?.minute,
        }).format("HH:mm")
      : "",
    end_time: location.state
      ? moment({
          hour: location?.state?.end_time?.hour,
          minute: location?.state?.end_time?.minute,
        }).format("HH:mm")
      : "",
  })
  const addOnsTemplate = { start_time: "", end_time: "" }
  const [addOns, setAddOns] = useState(
    location.state ? location.state.preset_add_ons : [addOnsTemplate]
  )
  const handleAddOnsCat = (e, index) => {
    console.log(index)
    const updatedValue = addOns.map((row, i) =>
      index === i
        ? Object.assign(row, { [e.target.name]: e.target.value })
        : row
    )
    setAddOns(updatedValue)
  }
  function handleAddRowNested() {
    setAddOns([...addOns, addOnsTemplate])
  }
  const handleRowDelete = index => {
    const filteredTime = [...addOns]
    if (filteredTime.length > 1) {
      filteredTime.splice(index, 1)
      setAddOns(filteredTime)
    }
  }

  let name, value
  const handleInputs = e => {
    // console.log(e);
    name = e.target.name
    value = e.target.value
    setTimeSlot({ ...timeSlot, [name]: value })
  }
  // get all branch
  // console.log(props.get_all_branch_data);
  let branchData = undefined
  if (props.get_all_branch_data?.length > 0) {
    branchData = props.get_all_branch_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ))
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    // console.log(timeSlot);
    const val = uuidv4()

    if (timeSlot.end_time <= timeSlot.start_time) {
      toast.error("Start time can not be greater than or equal end time")
    } else {
      props.addMenuTimeSlotAction(val, timeSlot)
    }
  }

  const handleEdit = e => {
    e.preventDefault()
    console.log(timeSlot)

    if (timeSlot.end_time <= timeSlot.start_time) {
      toast.error("Start time can not be greater than or equal end time")
    } else {
      props.editMenuTimeSlotAction(location?.state?._id, timeSlot)
    }
  }
  useEffect(() => {
    if (props.add_menu_time_slot_loading == "Success") {
      navigate("/time-slot")
      props.addMenuTimeSlotFresh()
    }
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    if (props.edit_menu_time_slot_loading == "Success") {
      navigate("/time-slot")
      props.editMenuTimeSlotFresh()
    }
  }, [
    props.add_menu_time_slot_loading,
    props.get_all_branch_loading,
    props.edit_menu_time_slot_loading,
  ])

  // console.log(location.state);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Menu Time Slot"
            breadcrumbItem={
              location.state ? "Edit Menu Time Slot" : "Add Menu Time Slot"
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
                      marginBottom: "40px",
                      marginTop: "20px",
                      backgroundColor: "#1E417D",
                      padding: "15px",
                    }}
                  >
                    <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                      {location.state
                        ? "Edit Menu Time Slot"
                        : "Add Menu Time Slot"}{" "}
                    </CardTitle>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="col-10 mx-auto">
              <form
                className="mt-0"
                onSubmit={location.state ? handleEdit : handleFormSubmit}
              >
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Slot Name <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter slot name"
                      name="name"
                      onChange={handleInputs}
                      required
                      value={timeSlot.name ?? ""}
                    />
                  </div>
                </Row>

                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Branch <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-10">
                    <Input
                      id="exampleSelect"
                      name="branch"
                      value={timeSlot.branch}
                      //required={true}
                      onChange={handleInputs}
                      type="select"
                      required
                    >
                      <option>Choose...</option>
                      {branchData}
                    </Input>
                  </div>
                </Row>

                {/* <Row className="mb-3">
                                    <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                    >
                                        Menu Availability
                                    </label>

                                    <div className="col-md-10">


                                        {addOns.map((row, idx) => (
                                            <React.Fragment key={idx}>
                                                <div data-repeater-list="group-a" id={"addr" + idx}>
                                                    <div data-repeater-item className="row">

                                                        <div className="mb-3 col-lg-3">
                                                            <label className="form-label" htmlFor="startTime">Start Time</label>
                                                            <input type="time" id="startTime" className="form-control" name="start_time" placeholder="Add-ons name" value={row.start_time} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                        </div>

                                                        <div className="mb-3 col-lg-3">
                                                            <label className="form-label" htmlFor="subject">End Time</label>
                                                            <input type="time" id="subject" className="form-control" name="end_time" placeholder="Price" value={row.end_time} onChange={(e) => handleAddOnsCat(e, idx)} />
                                                        </div>


                                                        <Col lg={2} className="align-self-center d-grid mt-3">
                                                            <input data-repeater-delete type="button" className="btn btn-primary" value="Delete" onClick={() => (handleRowDelete(idx))} />
                                                        </Col>
                                                    </div>

                                                </div>
                                            </React.Fragment>
                                        ))}
                                        <Button
                                            onClick={() => {
                                                handleAddRowNested();
                                            }}
                                            color="success"
                                            className="btn btn-success mt-3 mt-lg-0"
                                        >
                                            Add
                                        </Button>



                                    </div>

                                </Row> */}
                <Row className="mb-3">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    Menu Availability
                  </label>

                  <div className="col-md-10">
                    <React.Fragment>
                      <div data-repeater-list="group-a">
                        <div data-repeater-item className="row">
                          <div className="mb-3 col-lg-3">
                            <label className="form-label" htmlFor="startTime">
                              Start Time <span className="text-danger">*</span>
                            </label>
                            <input
                              required
                              type="time"
                              id="startTime"
                              className="form-control"
                              name="start_time"
                              placeholder="Add-ons name"
                              value={timeSlot.start_time}
                              onChange={handleInputs}
                            />
                          </div>

                          <div className="mb-3 col-lg-3">
                            <label className="form-label" htmlFor="subject">
                              End Time <span className="text-danger">*</span>
                            </label>
                            <input
                              required
                              type="time"
                              id="subject"
                              className="form-control"
                              name="end_time"
                              placeholder="Price"
                              value={timeSlot.end_time}
                              onChange={handleInputs}
                            />
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </div>
                </Row>

                {/* ==================restaurant time================= */}

                <div className="mb-3 row">
                  <div className="col-12 text-end">
                    <button
                      className="btn btn-primary w-md waves-effect waves-light"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const {
    add_menu_time_slot_data,
    add_menu_time_slot_loading,

    get_all_branch_data,
    get_all_branch_error,
    get_all_branch_loading,

    edit_menu_time_slot_loading,
  } = state.Restaurant

  return {
    add_menu_time_slot_data,
    add_menu_time_slot_loading,

    get_all_branch_data,
    get_all_branch_error,
    get_all_branch_loading,

    edit_menu_time_slot_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    addMenuTimeSlotAction,
    addMenuTimeSlotFresh,
    editMenuTimeSlotAction,
    editMenuTimeSlotFresh,
  })(AddTimeSlot)
)
