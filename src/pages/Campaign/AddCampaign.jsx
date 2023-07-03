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
  BreadcrumbItem,
} from "reactstrap"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"
import Select from "react-select"
import Breadcrumbs from "components/Common/Breadcrumb"
import {
  getAllBranchAction,
  addCampaignAction,
  addCampaignFresh,
  campaignEditAction,
  campaignEditFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import moment from "moment"

function AddCampaign(props) {
  const navigate = useNavigate()
  const location = useLocation()
  console.log("lof", location?.state?.restaurants)

  //select multiple branch
  const common_branches = props?.get_all_branch_data?.filter(elem =>
    location?.state?.restaurants?.find(({ res_id }) => elem._id === res_id)
  )

  const branch_data_edit = common_branches
    ? common_branches?.map((item, key) => {
        return { label: item.name, value: item._id }
      })
    : ""
  const [selectedBranch, setSelectedBranch] = useState(
    branch_data_edit ? branch_data_edit : ""
  )
  const handleSelectBranch = e => {
    setSelectedBranch(e)
  }

  useEffect(() => {
    if (props.get_all_branch_loading === "Success")
      setSelectedBranch(branch_data_edit)
  }, [props.get_all_branch_loading])

  let branchDate = undefined
  if (props.get_all_branch_data?.length > 0) {
    branchDate = props.get_all_branch_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const [images, setImages] = useState({
    image: location.state ? location.state.image : "",
  })

  // console.log(location.state)
  const [campaignInfo, setCampaignInfo] = useState({
    name: location.state ? location.state.name : "",
    image: location.state ? location.state.image : "",
    description: location.state ? location.state.description : "",
    is_delivery: location.state ? location.state.is_delivery : false,
    is_pickup: location.state ? location.state.is_pickup : false,
    is_dine: location.state ? location.state.is_dine : false,
    is_active: location.state ? location.state.is_active : true,
    start_date: location.state
      ? location.state.start_date
      : new Date().toISOString(),
    end_date: location.state
      ? location.state.end_date
      : new Date().toISOString(),
  })
  // console.log("tt", new Date().toISOString())
  const handleTimeChange = e => {
    console.log("e :", e.target.value)
    console.log(new Date(e.target.value).toISOString())
    name = e.target.name
    value = e.target.value
    let new_time_string = `${value}:00Z`
    setCampaignInfo({
      ...campaignInfo,
      [name]: new Date(new_time_string).toISOString(),
    })
  }

  let name, value, checked
  const handleInputs = e => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setCampaignInfo({ ...campaignInfo, [name]: value })
  }

  const handleCheckBox = e => {
    // console.log(e);
    name = e.target.name
    checked = e.target.checked
    setCampaignInfo({ ...campaignInfo, [name]: checked })
  }

  const handleFiles = e => {
    name = e.target.name
    value = e.target.files[0]
    setCampaignInfo({ ...campaignInfo, [name]: value })
    const reader = new FileReader()

    reader.onload = () => {
      setImages({ ...images, [name]: reader.result })
    }

    reader.readAsDataURL(value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (
      !moment(campaignInfo.start_date, "YYYY-MM-DDTHH:mm:ss").isBefore(
        moment(campaignInfo.end_date, "YYYY-MM-DDTHH:mm:ss")
      )
    ) {
      toast.error("Start time can't be grater than or equal to end time")
    } else {
      const uniqueId = uuidv4()
      props.addCampaignAction(uniqueId, campaignInfo, selectedBranch)
    }
  }

  const handleSubmitForEdit = e => {
    e.preventDefault()
    console.log("======================I am in the edit form==================")

    props.campaignEditAction(location.state._id, campaignInfo, selectedBranch)
  }

  // console.log(props.add_campaign_loading)
  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    // console.log("add_campaign_loading :", props.add_campaign_loading)
    if (props.add_campaign_loading === "Success") {
      // redirect
      props.addCampaignFresh()
      navigate("/all-campaign")
    }

    if (props.campaign_edit_loading === "Success") {
      toast.success("Campaign edited Successfully")
      // redirect
      props.campaignEditFresh()
      navigate("/all-campaign")
    }
  }, [
    props.get_all_branch_loading,
    props.add_campaign_loading,
    props.campaign_edit_loading,
  ])

  console.log(props.get_all_branch_data)

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Row className="align-items-center">
              <Col sm={6}>
                <div className="page-title-box">
                  <h4 className="font-size-18">Add Campaign</h4>
                  <ol className="breadcrumb mb-0">
                    <BreadcrumbItem>
                      <Link to="/">Foodi</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <Link to="/all-campaign">Campaign</Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem active>Add Campaign</BreadcrumbItem>
                  </ol>
                </div>
              </Col>
            </Row>

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
                          ? "Edit Campaign"
                          : "Add a New Campaign"}
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
                      Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        name="name"
                        onChange={handleInputs}
                        value={campaignInfo.name ?? ""}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Description <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter description"
                        name="description"
                        onChange={handleInputs}
                        value={campaignInfo.description ?? ""}
                        required
                      ></textarea>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Image <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .bmp, .png, .webp"
                        className="form-control"
                        name="image"
                        id="image"
                        onChange={handleFiles}
                        required
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
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Branches <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <Select
                        value={selectedBranch}
                        onChange={handleSelectBranch}
                        options={branchDate}
                        isMulti={true}
                        required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <div className="col-sm-4">
                      <div className="form-check">
                        <label
                          className="form-check-label"
                          htmlFor="is_delivery"
                        >
                          Delivery
                        </label>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="is_delivery"
                          checked={campaignInfo.is_delivery}
                          name="is_delivery"
                          onChange={handleCheckBox}
                        />
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-check">
                        <label className="form-check-label" htmlFor="is_pickup">
                          Pickup
                        </label>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="is_pickup"
                          checked={campaignInfo.is_pickup}
                          name="is_pickup"
                          onChange={handleCheckBox}
                        />
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-check">
                        <label className="form-check-label" htmlFor="is_dine">
                          Dine
                        </label>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="is_dine"
                          checked={campaignInfo.is_dine}
                          name="is_dine"
                          onChange={handleCheckBox}
                        />
                      </div>
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Start Time <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="datetime-local"
                        id="start_date"
                        className="form-control"
                        name="start_date"
                        placeholder="Start Time"
                        value={campaignInfo.start_date.slice(0, 16)}
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
                      End Time <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-10">
                      <input
                        type="datetime-local"
                        id="end_date"
                        className="form-control"
                        name="end_date"
                        placeholder="End Time"
                        value={campaignInfo.end_date.slice(0, 16)}
                        onChange={e => handleTimeChange(e)}
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
                        {location.state ? "Edit Campaign" : "Add Campaign"}
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
  const { get_all_branch_loading, get_all_branch_data } = state.Restaurant

  const { add_campaign_loading, campaign_edit_loading } = state.Campaign
  return {
    get_all_branch_loading,
    get_all_branch_data,
    add_campaign_loading,
    campaign_edit_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    addCampaignAction,
    addCampaignFresh,
    campaignEditAction,
    campaignEditFresh,
  })(AddCampaign)
)
