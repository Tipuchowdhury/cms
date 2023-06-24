import React, { useState, useEffect } from "react"
import {
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
import {
  getAllRewardLabelAction,
  getAllRewardLabelFresh,
  rewardLabelUpdateAction,
  rewardLabelUpdateFresh,
  getAllReasonAction,
  addRewardLabelAction,
  addRewardLabelFresh,
} from "store/actions"

function RewardLabel(props) {
  document.title = "Reward label | Foodi"

  const [labelName, setLabelName] = useState("")
  const [thresholdValue, setthresholdValue] = useState("0")
  const [editInfo, setEditInfo] = useState({})
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [modalApprovedUpdate, setModalApprovedUpdate] = useState(false)

  const toggleApproved = () => setModalApprovedUpdate(!modalApprovedUpdate)

  const handleApprovedModal = row => {
    // console.log(row);
    setEditInfo(row)

    toggleApproved()
  }

  let name, value
  const handleAddInputs = e => {
    name = e.target.name
    value = e.target.value

    let updatedList = options.map(option => {
      if (option._id == name) {
        return { ...option, threshold_value: value }
      }
      return option
    })

    setOptions(updatedList)
  }

  const handleEdit = e => {
    e.preventDefault()
    props.rewardLabelUpdateAction(editInfo)
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.addRewardLabelAction(labelName, thresholdValue)
  }

  const [options, setOptions] = useState([])

  useEffect(() => {
    //console.log(props.get_all_reward_label_data)
    if (props.get_all_reward_label_data) {
      setOptions(props.get_all_reward_label_data)
    }
  }, [props.get_all_reward_label_data])

  useEffect(() => {
    if (props.get_all_reward_label_loading == false) {
      props.getAllRewardLabelAction()
    }

    if (props.add_reward_label_loading === "Success") {
      toast.success("Label Point Added")
      toggle()
      setLabelName("")
      setthresholdValue("0")
      props.addRewardLabelFresh()
    }

    if (props.add_reward_label_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.addRewardLabelFresh()
    }

    if (props.reward_label_edit_loading === "Success") {
      toast.success("Label Point Updated")
      toggleApproved()
      props.rewardLabelUpdateFresh()
    }

    if (props.reward_label_edit_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.rewardLabelUpdateFresh()
    }
  }, [
    props.reward_label_edit_loading,
    props.get_all_reason_loading,
    props.add_reward_label_loading,
  ])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="CRM"
            breadcrumbItem="Reward Label Setting"
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
                      Reward Label Setting
                    </CardTitle>
                    <Button
                      style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      onClick={toggle}
                    >
                      Add Label
                    </Button>
                  </div>

                  {props.get_all_reward_label_data ? (
                    props.get_all_reward_label_data.length > 0 ? (
                      <>
                        {options?.map((option, index) => (
                          <form key={option._id} className="mt-1">
                            <Row className="mb-3">
                              <div className="col-sm-2">
                                <label
                                  className="form-label"
                                  htmlFor={option._id}
                                >
                                  {option.name}
                                </label>
                              </div>

                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={option.threshold_value}
                                  name={option._id}
                                  id={option._id}
                                  onChange={handleAddInputs}
                                />
                              </div>

                              <div className="col-sm-2">
                                <Button
                                  color="primary"
                                  className="btn btn-sm waves-effect waves-light"
                                  onClick={() => handleApprovedModal(option)}
                                >
                                  Edit
                                </Button>
                              </div>
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

        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalHeader toggle={toggle}>Add Label</ModalHeader>
          <ModalBody>
            <form className="mt-1" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Label Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter label name"
                  required
                  value={labelName}
                  onChange={e => setLabelName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="threshold_value">
                  Upper Limit Point<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  required
                  className="form-control"
                  name="threshold_value"
                  id="threshold_value"
                  placeholder="Enter upper limit point"
                  value={thresholdValue}
                  onChange={e => setthresholdValue(e.target.value)}
                />
              </div>
              <div
                style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}
              >
                <Button color="secondary" onClick={toggle}>
                  Cancel
                </Button>{" "}
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>

        {/* ============ status update modal starts=============== */}
        <Modal isOpen={modalApprovedUpdate} toggle={toggleApproved} centered>
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
            Do you want to update upper limit of {editInfo.name}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleApproved}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={handleEdit}>
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
  const { get_all_reason_loading, get_all_reason_data } = state.Reason

  const {
    add_reward_label_data,
    add_reward_label_error,
    add_reward_label_loading,

    get_all_reward_label_data,
    get_all_reward_label_error,
    get_all_reward_label_loading,

    reward_label_edit_data,
    reward_label_edit_loading,

    reward_label_status_edit_data,
    reward_label_status_edit_loading,

    reward_label_delete_loading,
  } = state.RewardLabel

  return {
    get_all_reason_loading,
    get_all_reason_data,

    add_reward_label_data,
    add_reward_label_error,
    add_reward_label_loading,

    get_all_reward_label_data,
    get_all_reward_label_error,
    get_all_reward_label_loading,

    reward_label_edit_data,
    reward_label_edit_loading,

    reward_label_status_edit_data,
    reward_label_status_edit_loading,

    reward_label_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllReasonAction,
    getAllRewardLabelAction,
    getAllRewardLabelFresh,
    rewardLabelUpdateAction,
    rewardLabelUpdateFresh,
    addRewardLabelAction,
    addRewardLabelFresh,
  })(RewardLabel)
)
