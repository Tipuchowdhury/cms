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
  Alert,
  Table,
  ButtonGroup,
} from "reactstrap"

import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  getAllZoneAction,
  addQuestAction,
  addQuestFresh,
  questEditAction,
  questEditFresh,
  getQuestByIdAction,
  getQuestByIdFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CustomLoader from "components/CustomLoader/CustomLoader"
import PageLoader from "components/CustomLoader/PageLoader"

function AddQuest(props) {
  const navigate = useNavigate()
  const location = useLocation()
  // console.log("lof", location?.state?.restaurants)

  //select multiple zone
  const common_zones = props?.get_all_zone_data?.filter(elem =>
    location?.state?.restaurants?.find(({ res_id }) => elem._id === res_id)
  )

  const zone_data_edit = common_zones
    ? common_zones?.map((item, key) => {
        return { label: item.name, value: item._id }
      })
    : ""
  const [selectedZone, setSelectedZone] = useState(
    zone_data_edit ? zone_data_edit : ""
  )
  const handleSelectZone = e => {
    setSelectedZone(e)
  }

  let zoneDate = undefined
  if (props.get_all_zone_data?.length > 0) {
    zoneDate = props.get_all_zone_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const [images, setImages] = useState({
    image: location.state ? location.state.image : "",
  })

  const goalTemplate = {
    sl: 1,
    name: "",
    required_number_of_order: 0,
    per_order_value: 0,
  }

  const handleEditorChange = (e, editor) => {
    console.log("value :", editor.getData())
    setQuestInfo({ ...questInfo, rules: editor.getData() })
  }

  // console.log(location.state)
  const [questInfo, setQuestInfo] = useState({
    name: location.state ? location.state.name : "",
    acceptable_acceptance_rate: location.state
      ? location.state.acceptable_acceptance_rate
      : null,
    acceptable_completion_rate: location.state
      ? location.state.acceptable_completion_rate
      : null,
    start_date: location.state
      ? location.state.start_date
      : new Date().toISOString(),
    end_date: location.state
      ? location.state.end_date
      : new Date().toISOString(),
    has_time_limit: location.state ? location.state.has_time_limit : "false",
    start_time: location.state ? location.state.start_time : null,
    end_time: location.state ? location.state.end_time : null,
    rules: location.state ? location.state.rules : null,
    goals: location.state ? location.state.goals : [goalTemplate],
  })

  useEffect(() => {
    console.log("props.get_quest_by_id_loading", props.get_quest_by_id_loading)
    if (
      props.get_quest_by_id_loading == "Success" &&
      props?.get_all_zone_data
    ) {
      const questData = props.get_quest_by_id_data
      setQuestInfo({
        name: questData.name,
        acceptable_acceptance_rate: questData.acceptable_acceptance_rate,
        acceptable_completion_rate: questData.acceptable_completion_rate,
        start_date: questData.start_date,
        end_date: questData.end_date,
        has_time_limit: questData.has_time_limit.toString(),
        start_time: questData.start_time,
        end_time: questData.end_time,
        rules: questData.rules,
        goals: questData.goals,
      })

      const common_zones = props?.get_all_zone_data?.filter(elem =>
        questData?.zones?.find(({ zone_id }) => elem._id === zone_id)
      )

      const zone_data_edit = common_zones
        ? common_zones?.map((item, key) => {
            return { label: item.name, value: item._id }
          })
        : ""

      setSelectedZone(zone_data_edit)
    }
  }, [props.get_quest_by_id_loading, props?.get_all_zone_data])

  useEffect(() => {
    if (location?.state) {
      props.getQuestByIdAction(location.state._id)
    }
  }, [location?.state])
  // console.log("tt", new Date().toISOString())
  const handleTimeChange = e => {
    console.log("e :", e.target.value)
    console.log(new Date(e.target.value).toISOString())
    name = e.target.name
    value = e.target.value
    let new_time_string = `${value}:00Z`
    setQuestInfo({
      ...questInfo,
      [name]: new Date(new_time_string).toISOString(),
    })
  }

  let name, value, checked
  const handleInputs = e => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setQuestInfo({ ...questInfo, [name]: value })
  }

  const handleGoalChange = (e, index) => {
    const updatedValue = questInfo.goals.map((row, i) => {
      return index === i
        ? Object.assign(row, { [e.target.name]: e.target.value })
        : row
    })
    console.log("updatedValue :", updatedValue)
    setQuestInfo({ ...questInfo, goals: updatedValue })
  }
  const handleRowDelete = index => {
    const updatedValue = [...questInfo.goals]
    if (updatedValue.length > 1) {
      updatedValue.splice(index, 1)
      setQuestInfo({ ...questInfo, goals: updatedValue })
    }
  }

  function handleAddRowNested() {
    setQuestInfo({
      ...questInfo,
      goals: [
        ...questInfo.goals,
        {
          ...goalTemplate,
          sl: questInfo.goals ? questInfo.goals.length + 1 : 1,
        },
      ],
    })
  }
  const handleSubmit = e => {
    e.preventDefault()

    if (questInfo.start_date >= questInfo.end_date) {
      toast.error("Start date can not be greater than or equal to end date")
      return
    }
    if (
      questInfo.has_time_limit &&
      questInfo.start_time >= questInfo.end_time
    ) {
      toast.error("Start time can not be greater than or equal to end time")
      return
    }
    props.addQuestAction(questInfo, selectedZone)
  }

  const handleSubmitForEdit = e => {
    e.preventDefault()

    props.questEditAction(location.state._id, questInfo, selectedZone)
  }

  console.log(props.add_quest_loading)
  useEffect(() => {
    if (props.get_all_zone_loading == false) {
      props.getAllZoneAction()
    }

    console.log("add_quest_loading :", props.add_quest_loading)
    if (props.add_quest_loading === "Success") {
      // redirect
      props.addQuestFresh()
      navigate("/quests")
    }

    if (props.quest_edit_loading === "Success") {
      toast.success("Quest edited Successfully")
      // redirect
      props.questEditFresh()
      navigate("/quests")
    }
  }, [
    props.get_all_zone_loading,
    props.add_quest_loading,
    props.quest_edit_loading,
  ])

  if (location?.state && !props.get_quest_by_id_loading == "Success") {
    return <PageLoader />
  }

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Quest"
              breadcrumbItem={location.state ? "Edit Quest" : "Add Quest"}
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
                        {location.state ? "Edit Quest" : "Add a New Quest"}
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
                      Name<span className="text-danger"> *</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        name="name"
                        onChange={handleInputs}
                        value={questInfo.name ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Zones<span className="text-danger"> *</span>
                    </label>
                    <div className="col-md-10">
                      <Select
                        value={selectedZone}
                        onChange={handleSelectZone}
                        options={zoneDate}
                        isMulti={true}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Order Acceptance Rate (%)
                    </label>
                    <div className="col-md-10">
                      <input
                        type="number"
                        className="form-control"
                        id="acceptable_acceptance_rate"
                        placeholder="%"
                        name="acceptable_acceptance_rate"
                        onChange={handleInputs}
                        value={questInfo.acceptable_acceptance_rate ?? ""}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Order Completion Rate (%)
                    </label>
                    <div className="col-md-10">
                      <input
                        type="number"
                        className="form-control"
                        id="acceptable_completion_rate"
                        placeholder="%"
                        name="acceptable_completion_rate"
                        onChange={handleInputs}
                        value={questInfo.acceptable_completion_rate ?? ""}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Start Time<span className="text-danger"> *</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="datetime-local"
                        id="start_date"
                        className="form-control"
                        name="start_date"
                        placeholder="Start Time"
                        value={questInfo.start_date.slice(0, 16)}
                        onChange={e => handleTimeChange(e)}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      End Time<span className="text-danger"> *</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="datetime-local"
                        id="end_date"
                        className="form-control"
                        name="end_date"
                        placeholder="End Time"
                        value={questInfo.end_date.slice(0, 16)}
                        onChange={e => handleTimeChange(e)}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Time Limit (In A Day){" "}
                      <span className="text-danger"> *</span>
                    </label>
                    <div className="col-md-10">
                      <div className="btn-group" role="group">
                        <input
                          type="radio"
                          className="btn-check"
                          id="has_time_limit"
                          name="has_time_limit"
                          value="true"
                          onChange={handleInputs}
                          checked={questInfo.has_time_limit == "true"}
                        />
                        <label
                          className="btn btn-outline-secondary"
                          htmlFor="has_time_limit"
                        >
                          Yes
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="has_time_limit"
                          value="false"
                          onChange={handleInputs}
                          id="has_time_limit1"
                          checked={questInfo.has_time_limit == "false"}
                        />
                        <label
                          className="btn btn-outline-secondary"
                          htmlFor="has_time_limit1"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </Row>

                  {questInfo.has_time_limit == "true" ? (
                    <>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Time Start (In A Day)
                          {questInfo.has_time_limit == "true" ? (
                            <span className="text-danger"> *</span>
                          ) : (
                            ""
                          )}{" "}
                        </label>
                        <div className="col-md-10">
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            placeholder="Valid Time Start"
                            name="start_time"
                            onChange={handleInputs}
                            value={questInfo.start_time ?? ""}
                            required={questInfo.has_time_limit == "true"}
                          />
                        </div>
                      </Row>

                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Time End (In A Day)
                          {questInfo.has_time_limit == "true" ? (
                            <span className="text-danger"> *</span>
                          ) : (
                            ""
                          )}{" "}
                        </label>
                        <div className="col-md-10">
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            placeholder="Valid Time End"
                            name="end_time"
                            onChange={handleInputs}
                            value={questInfo.end_time ?? ""}
                            required={questInfo.has_time_limit == "true"}
                          />
                        </div>
                      </Row>
                    </>
                  ) : (
                    ""
                  )}

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Rules<span className="text-danger"> *</span>
                    </label>
                    <div className="col-md-10">
                      <CKEditor
                        editor={ClassicEditor}
                        data={questInfo.rules}
                        onChange={handleEditorChange}
                      />
                    </div>
                  </Row>

                  {/* <Row className="mb-12">

                    <Alert color="warning">
                      Goals<span className="text-danger"> *</span>
                    </Alert>
                  </Row> */}

                  {/* {questInfo.goals?.map((row, idx) => ( */}
                  {/* <React.Fragment key={idx}>
                      <div id={"addr" + idx}>
                        <div className="row">
                          <div className="mb-3 col-lg-1">
                            <label className="form-label" htmlFor="sl">
                              Serial
                            </label>
                            <input
                              type="number"
                              id="sl"
                              className="form-control"
                              name="sl"
                              placeholder="Serial"
                              value={row.sl}
                              onChange={e => handleGoalChange(e, idx)}
                            />
                          </div>

                          <div className="mb-3 col-lg-3">
                            <label className="form-label" htmlFor="name">
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              name="name"
                              placeholder="Goal Name"
                              value={row.name}
                              onChange={e => handleGoalChange(e, idx)}
                              required
                            />
                          </div>

                          <div className="mb-3 col-lg-3">
                            <label
                              className="form-label"
                              htmlFor="required_number_of_order"
                            >
                              Required Number of Orders
                            </label>
                            <input
                              type="number"
                              id="required_number_of_order"
                              className="form-control"
                              name="required_number_of_order"
                              placeholder="Required Order Number"
                              value={row.required_number_of_order}
                              onChange={e => handleGoalChange(e, idx)}
                            />
                          </div>

                          <div className="mb-3 col-lg-3">
                            <label
                              className="form-label"
                              htmlFor="per_order_value"
                            >
                              Per Order Value
                            </label>
                            <input
                              type="number"
                              id="per_order_value"
                              className="form-control"
                              name="per_order_value"
                              placeholder="Per Order Value"
                              value={row.per_order_value}
                              onChange={e => handleGoalChange(e, idx)}
                            />
                          </div>

                          <Col lg={2} className="align-self-center d-grid mt-3">
                            <input
                              data-repeater-delete
                              type="button"
                              className="btn btn-primary"
                              value="Delete"
                              onClick={() => handleRowDelete(idx)}
                            />
                          </Col>
                        </div>
                      </div>
                    </React.Fragment> */}
                  {/* ))} */}

                  <Row className="mb-12">
                    <Table bordered>
                      <thead>
                        <tr>
                          <th
                            colSpan={5}
                            style={{
                              backgroundColor: "#1E417D",
                              color: "white",
                              textAlign: "center",
                            }}
                          >
                            Goals *
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Serial</th>
                          <th>Name</th>
                          <th>Required Number of Orders</th>
                          <th>Per Order Value</th>
                          <th>Action</th>
                        </tr>
                        {questInfo.goals?.map((row, idx) => {
                          return (
                            <tr>
                              <td>
                                <input
                                  type="number"
                                  id="sl"
                                  className="form-control"
                                  name="sl"
                                  placeholder="Serial"
                                  value={row.sl}
                                  onChange={e => handleGoalChange(e, idx)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  id="name"
                                  className="form-control"
                                  name="name"
                                  placeholder="Goal Name"
                                  value={row.name}
                                  onChange={e => handleGoalChange(e, idx)}
                                  required
                                />
                              </td>
                              <td>
                                {" "}
                                <input
                                  type="number"
                                  id="required_number_of_order"
                                  className="form-control"
                                  name="required_number_of_order"
                                  placeholder="Required Order Number"
                                  value={row.required_number_of_order}
                                  onChange={e => handleGoalChange(e, idx)}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  id="per_order_value"
                                  className="form-control"
                                  name="per_order_value"
                                  placeholder="Per Order Value"
                                  value={row.per_order_value}
                                  onChange={e => handleGoalChange(e, idx)}
                                />
                              </td>
                              <td>
                                <ButtonGroup>
                                  {" "}
                                  <input
                                    type="button"
                                    className="btn btn-danger"
                                    value="Delete"
                                    onClick={() => handleRowDelete(idx)}
                                  />
                                  {questInfo?.goals?.length - 1 === idx ? (
                                    <Button
                                      onClick={() => {
                                        handleAddRowNested()
                                      }}
                                      color="success"
                                      className="btn btn-success"
                                    >
                                      Add
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </ButtonGroup>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </Row>

                  {/* <Button
                    onClick={() => {
                      handleAddRowNested()
                    }}
                    color="success"
                    className="btn btn-success mt-3 mt-lg-1"
                  >
                    Add
                  </Button> */}

                  <div className="mb-3 row">
                    <div className="col-12 text-end">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="submit"
                      >
                        {location.state ? "Edit Quest" : "Add Quest"}
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
  const { get_all_zone_loading, get_all_zone_data } = state.Restaurant

  const {
    add_quest_loading,
    quest_edit_loading,
    get_quest_by_id_data,
    get_quest_by_id_error,
    get_quest_by_id_loading,
  } = state.Quest
  return {
    get_all_zone_loading,
    get_all_zone_data,
    add_quest_loading,
    quest_edit_loading,
    get_quest_by_id_data,
    get_quest_by_id_error,
    get_quest_by_id_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllZoneAction,
    addQuestAction,
    addQuestFresh,
    questEditAction,
    questEditFresh,
    getQuestByIdAction,
    getQuestByIdFresh,
  })(AddQuest)
)
