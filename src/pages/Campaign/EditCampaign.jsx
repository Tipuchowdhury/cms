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
  addCampaignAction,
  addCampaignFresh,
  campaignEditAction,
  campaignEditFresh,
  getCampaignByIdAction,
  getCampaignByIdActionFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import PageLoader from "components/CustomLoader/PageLoader"

function EditCampaign(props) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    props.getCampaignByIdActionFresh()
  }, [])

  const [getInfo, SetGetInfo] = useState(true)

  //select multiple branch
  const common_branches = props?.get_all_branch_data?.filter(elem =>
    props?.get_campaign_by_id_data?.restaurants?.find(
      ({ res_id }) => elem._id === res_id
    )
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
    image:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.image
        : "",
  })

  const [campaignInfo, setCampaignInfo] = useState({
    name:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.name
        : "",
    image:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.image
        : "",
    description:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.description
        : "",
    is_delivery:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.is_delivery
        : false,
    is_pickup:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.is_pickup
        : false,
    is_dine:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.is_dine
        : false,
    is_active:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.is_active
        : true,
    start_date:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.start_date
        : new Date().toISOString(),
    end_date:
      props?.get_campaign_by_id_data != undefined
        ? props?.get_campaign_by_id_data.end_date
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
    const uniqueId = uuidv4()
    // console.log(campaignInfo);
    props.addCampaignAction(uniqueId, campaignInfo, selectedBranch)
  }

  const handleSubmitForEdit = e => {
    e.preventDefault()
    console.log("======================I am in the edit form==================")

    props.campaignEditAction(
      props?.get_campaign_by_id_data._id,
      campaignInfo,
      selectedBranch
    )
  }

  // console.log(props.add_campaign_loading)
  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    if (props.get_campaign_by_id_data != undefined) {
      setCampaignInfo({
        ...campaignInfo,
        name: props?.get_campaign_by_id_data.name,
        image: props?.get_campaign_by_id_data.image,
        description: props?.get_campaign_by_id_data.description,
        is_delivery: props?.get_campaign_by_id_data.is_delivery,
        is_pickup: props?.get_campaign_by_id_data.is_pickup,
        is_dine: props?.get_campaign_by_id_data.is_dine,
        is_active: props?.get_campaign_by_id_data.is_active,
        start_date: props?.get_campaign_by_id_data.start_date,
        end_date: props?.get_campaign_by_id_data.end_date,
      })

      setImages({ ...images, image: props?.get_campaign_by_id_data.image })

      const common_branches = props?.get_all_branch_data?.filter(elem =>
        props?.get_campaign_by_id_data?.restaurants?.find(
          ({ res_id }) => elem._id === res_id
        )
      )

      const branch_data_edit = common_branches
        ? common_branches?.map((item, key) => {
            return { label: item.name, value: item._id }
          })
        : ""

      setSelectedBranch(branch_data_edit)

      // let branchData = props?.get_zone_by_id_data?.branches?.map(
      //   (item, key) => ({
      //     label: "Test",
      //     value: item.branch_id,
      //   })
      // )

      // const common_branches = props?.get_all_branch_data?.filter(elem =>
      //   branchData?.find(({ value }) => elem._id === value)
      // )
      // // console.log(common_branches)

      // const branch_data_edit =
      //   common_branches?.length > 0
      //     ? common_branches?.map((item, key) => {
      //         return { label: item.name, value: item._id }
      //       })
      //     : ""

      // setBranch(branchData)
      // //setSelectedBranch(branchData)
      // setSelectedBranch(branch_data_edit)
    }

    if (getInfo) {
      props.getCampaignByIdAction(location?.state?._id)
      SetGetInfo(false)
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
  }, [props])

  if (getInfo) {
    return <PageLoader />
  }

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Campaign"
              breadcrumbItem="Edit Campaign"
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
                        Edit Campaign
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
                      Image
                    </label>
                    {props?.get_campaign_by_id_data?.image ? (
                      <div className="col-md-10">
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          id="image"
                          onChange={handleFiles}
                        />
                      </div>
                    ) : (
                      <div className="col-md-10">
                        <input
                          type="file"
                          className="form-control"
                          name="image"
                          id="image"
                          onChange={handleFiles}
                          required
                        />
                      </div>
                    )}
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
                      Branches
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
                        required
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
                        Edit Campaign
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

  const {
    add_campaign_loading,
    campaign_edit_loading,
    get_campaign_by_id_data,
    get_campaign_by_id_loading,
  } = state.Campaign
  return {
    get_all_branch_loading,
    get_all_branch_data,
    add_campaign_loading,
    campaign_edit_loading,
    get_campaign_by_id_data,
    get_campaign_by_id_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    addCampaignAction,
    addCampaignFresh,
    campaignEditAction,
    campaignEditFresh,
    getCampaignByIdAction,
    getCampaignByIdActionFresh,
  })(EditCampaign)
)
