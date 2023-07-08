import React, { useState, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import { toast } from "react-toastify"
import withRouter from "components/Common/withRouter"
;` `
import { connect } from "react-redux"
import {
  getAllSystemOptionAction,
  getAllSystemOptionFresh,
  systemOptionUpdateAction,
  systemOptionUpdateFresh,
  getAllReasonAction,
} from "store/actions"

function SystemOption(props) {
  document.title = "System Option | Foodi"

  const [systemOnOffReason, setSystemOnOffReason] = useState(false)

  let name, value, checked
  const handleAddInputs = e => {
    name = e.target.name
    value = e.target.value

    let updatedList = options.map(option => {
      if (option.name == name) {
        return { ...option, value: value }
      }
      return option
    })

    setOptions(updatedList)
  }

  const handleAddCheckBox = e => {
    name = e.target.name
    checked = e.target.checked
    let valueNum = checked ? "1" : "0"

    if (name == "is_system_off" && checked == true) {
      setSystemOnOffReason(true)
    }

    if (name == "is_system_off" && checked == false) {
      setSystemOnOffReason(false)
    }

    let updatedList = options.map(option => {
      if (option.name == name) {
        return { ...option, value: valueNum }
      }
      return option
    })
    setOptions(updatedList)
  }

  const handleEdit = data => {
    // e.preventDefault();
    props.systemOptionUpdateAction(data)
  }

  const [options, setOptions] = useState([])

  const [optionCopy, setOptionCopy] = useState([])

  useEffect(() => {
    //console.log(props.get_all_system_option_data)
    if (props.get_all_system_option_data) {
      setOptions(props.get_all_system_option_data)
      setOptionCopy(props.get_all_system_option_data)

      props.get_all_system_option_data?.filter(obj => {
        if (
          obj.type === "on_off" &&
          obj.name === "is_system_off" &&
          obj.value === "1"
        ) {
          setSystemOnOffReason(true)
        }
      })
    }
  }, [props.get_all_system_option_data])

  const enums = options?.filter(obj => {
    return obj.type === "enum" && obj.name != "system_off_reason"
  })

  const newList = enums
    ? enums?.map((item, key) => {
        return { value: item.possible_value.split(", ") }
      })
    : ""

  let vehicleTypes = []
  if (props.get_all_reason_data?.length > 0) {
    vehicleTypes = props.get_all_reason_data
  }

  useEffect(() => {
    if (props.get_all_reason_loading == false) {
      props.getAllReasonAction()
    }

    if (props.get_all_system_option_loading == false) {
      props.getAllSystemOptionAction()
    }

    if (props.system_option_edit_loading === "Success") {
      toast.success("Option Updated")
      //toggleEditModal();
      props.systemOptionUpdateFresh()
      // props.getAllSystemOptionAction();
    }

    if (props.system_option_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.systemOptionUpdateFresh()
      // props.getAllSystemOptionAction();
    }
  }, [props.system_option_edit_loading, props.get_all_reason_loading])

  let i = 0,
    j = 0

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Settings"
            breadcrumbItem="System Option"
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
                      System Option
                    </CardTitle>
                    {/* <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Option
                                        </Button> */}
                  </div>

                  {props.get_all_system_option_data ? (
                    props.get_all_system_option_data.length > 0 ? (
                      <>
                        {options?.map((option, index) => (
                          <form key={option._id} className="mt-1">
                            {console.log("option :", option)}
                            {console.log("index :", optionCopy[index])}
                            <Row className="mb-3">
                              <div className="col-sm-2">
                                <label
                                  className="form-label"
                                  htmlFor={option.name}
                                >
                                  {option.display_name}:
                                </label>
                              </div>

                              <div className="col-sm-8">
                                {option.type === "single_value" ? (
                                  <input
                                    type="text"
                                    className={`form-control ${
                                      optionCopy[index]?.value !== option.value
                                        ? "border-warning"
                                        : ""
                                    }`}
                                    value={option.value}
                                    name={option.name}
                                    id={option.name}
                                    onChange={handleAddInputs}
                                  />
                                ) : (
                                  ""
                                )}

                                {option.type === "on_off" ? (
                                  <input
                                    type="checkbox"
                                    className={`form-check-input ${
                                      optionCopy[index]?.value !== option.value
                                        ? "border-warning"
                                        : ""
                                    }`}
                                    id={option.name}
                                    checked={Number(option.value)}
                                    name={option.name}
                                    onChange={handleAddCheckBox}
                                  />
                                ) : (
                                  ""
                                )}

                                {option.type === "enum" ? (
                                  option.name === "system_off_reason" ? (
                                    systemOnOffReason ? (
                                      <Input
                                        id={option.name}
                                        name={option.name}
                                        className={`form-control ${
                                          optionCopy[index]?.value !==
                                          option.value
                                            ? "border-warning"
                                            : ""
                                        }`}
                                        value={option.value}
                                        onChange={handleAddInputs}
                                        type="select"
                                      >
                                        <option value="">Choose...</option>
                                        {vehicleTypes.map(vehicleType => (
                                          <option
                                            key={vehicleType._id}
                                            value={vehicleType._id}
                                          >
                                            {vehicleType.name}
                                          </option>
                                        ))}
                                      </Input>
                                    ) : (
                                      <Input
                                        id={option.name}
                                        name={option.name}
                                        className={`form-control ${
                                          optionCopy[index]?.value !==
                                          option.value
                                            ? "border-warning"
                                            : ""
                                        }`}
                                        value={option.value}
                                        onChange={handleAddInputs}
                                        type="select"
                                        disabled
                                      >
                                        <option value="">Choose...</option>
                                        {vehicleTypes.map(vehicleType => (
                                          <option
                                            key={vehicleType._id}
                                            value={vehicleType._id}
                                          >
                                            {vehicleType.name}
                                          </option>
                                        ))}
                                      </Input>
                                    )
                                  ) : (
                                    <Input
                                      id={option.name}
                                      name={option.name}
                                      className={`form-control ${
                                        optionCopy[index]?.value !==
                                        option.value
                                          ? "border-warning"
                                          : ""
                                      }`}
                                      value={option.value}
                                      onChange={handleAddInputs}
                                      type="select"
                                    >
                                      <option value="">Choose...</option>
                                      {newList[i++]?.value?.map(list => (
                                        <option value={list}>
                                          {list.toUpperCase()}
                                        </option>
                                      ))}
                                    </Input>
                                  )
                                ) : (
                                  ""
                                )}
                              </div>

                              {optionCopy[index]?.value !== option.value ? (
                                <div className="col-sm-2">
                                  <Button
                                    color="primary"
                                    className="btn btn-warning btn-sm waves-effect waves-light"
                                    onClick={() => handleEdit(option)}
                                  >
                                    <i className="fas fa-check"></i>
                                  </Button>
                                </div>
                              ) : (
                                ""
                              )}
                            </Row>
                          </form>
                        ))}
                      </>
                    ) : null
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { get_all_reason_loading, get_all_reason_data } = state.Reason

  const {
    add_system_option_data,
    add_system_option_error,
    add_system_option_loading,

    get_all_system_option_data,
    get_all_system_option_error,
    get_all_system_option_loading,

    system_option_edit_data,
    system_option_edit_loading,

    system_option_status_edit_data,
    system_option_status_edit_loading,

    system_option_delete_loading,
  } = state.SystemOption

  return {
    get_all_reason_loading,
    get_all_reason_data,

    add_system_option_data,
    add_system_option_error,
    add_system_option_loading,

    get_all_system_option_data,
    get_all_system_option_error,
    get_all_system_option_loading,

    system_option_edit_data,
    system_option_edit_loading,

    system_option_status_edit_data,
    system_option_status_edit_loading,

    system_option_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllReasonAction,
    getAllSystemOptionAction,
    getAllSystemOptionFresh,
    systemOptionUpdateAction,
    systemOptionUpdateFresh,
  })(SystemOption)
)
