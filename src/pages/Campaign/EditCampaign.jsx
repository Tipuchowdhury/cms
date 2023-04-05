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
  getAllBranchAction,
  getAllCityAction,
  addCampaignAction,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"

function AddCampaign(props) {
  const navigate = useNavigate()

  //select multiple branch
  const [selectedBranch, setSelectedBranch] = useState(null)

  const handleSelectBranch = e => {
    setSelectedBranch(e)
  }

  let branchDate = undefined
  if (props.get_all_branch_data?.length > 0) {
    branchDate = props.get_all_branch_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const [campaignInfo, setCampaignInfo] = useState({
    name: "",
    image: "",
    description: "",
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
  })
  console.log("tt", new Date().toISOString())
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

  let name, value
  const handleInputs = e => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setCampaignInfo({ ...campaignInfo, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const uniqueId = uuidv4()
    props.addCampaignAction(uniqueId, campaignInfo, selectedBranch)
  }

  console.log(props.add_campaign_loading)
  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    if (props.add_campaign_loading == "Success") {
      // redirect
      navigate("/campaign")
      props.addCampaignFresh()
    }
  }, [props.get_all_branch_loading, props.add_campaign_loading])

  console.log(props.get_all_branch_data)

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Campaign"
              breadcrumbItem="Add Campaign"
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
                        Add a New Campaign{" "}
                      </CardTitle>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="col-10 mx-auto">
                <form className="mt-4" action="#" onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Name
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
                        value={campaignInfo.description ?? ""}
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
                      />
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Branches
                    </label>
                    <div className="col-md-10">
                      <Select
                        value={selectedBranch}
                        onChange={handleSelectBranch}
                        options={branchDate}
                        isMulti={true}
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      Start Time
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
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                    >
                      End Time
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
                      />
                    </div>
                  </Row>

                  <div className="mb-3 row">
                    <div className="col-12 text-end">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="submit"
                      >
                        Add Campaign
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
  const { get_all_branch_loading, get_all_branch_data, add_campaign_loading } =
    state.Restaurant

  const { get_all_city_data, get_all_city_error, get_all_city_loading } =
    state.Campaign
  return {
    get_all_branch_loading,
    get_all_branch_data,

    get_all_city_data,
    get_all_city_error,
    get_all_city_loading,
    add_campaign_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    getAllCityAction,
    addCampaignAction,
  })(AddCampaign)
)
