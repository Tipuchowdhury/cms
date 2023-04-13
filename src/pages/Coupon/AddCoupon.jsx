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
  addCouponAction,
  addCouponFresh,
  couponEditAction,
  couponEditFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"

function AddCoupon(props) {
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

  let branchDate = undefined
  if (props.get_all_branch_data?.length > 0) {
    branchDate = props.get_all_branch_data?.map((item, key) => ({
      label: item.name,
      value: item._id,
    }))
  }

  const [couponInfo, setCouponInfo] = useState({
    name: location.state ? location.state.name : "",
    image: location.state ? location.state.image : "",
    description: location.state ? location.state.description : "",
    coupon_type_id: location.state ? location.state.coupon_type_id : "",
    coupon_type_name: location.state ? location.state.coupon_type_name : "",
    is_gradual: location.state ? location.state.is_gradual : "",
    daily_use_limit: location.state ? location.state.daily_use_limit : "",
    is_percent: location.state ? location.state.is_percent : "",
    discount_in_amount: location.state ? location.state.discount_in_amount : "",
    discount_in_percent: location.state ? location.state.discount_in_percent : "",
    minimum_order_amount: location.state ? location.state.minimum_order_amount : "",
    maximum_discount_amount: location.state ? location.state.maximum_discount_amount : "",
    total_coupon: location.state ? location.state.total_coupon : "",

    valid_time_in_a_day_start: location.state
      ? location.state.valid_time_in_a_day_start
      : new Date().toISOString(),
    valid_time_in_a_day_end: location.state
      ? location.state.valid_time_in_a_day_end
      : new Date().toISOString(),

    start_date: location.state
      ? location.state.start_date
      : new Date().toISOString(),
    end_date: location.state
      ? location.state.end_date
      : new Date().toISOString(),
  })
  console.log("tt", new Date().toISOString())
  const handleTimeChange = e => {
    console.log("e :", e.target.value)
    console.log(new Date(e.target.value).toISOString())
    name = e.target.name
    value = e.target.value
    let new_time_string = `${value}:00Z`
    setCouponInfo({
      ...couponInfo,
      [name]: new Date(new_time_string).toISOString(),
    })
  }

  let name, value
  const handleInputs = e => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setCouponInfo({ ...couponInfo, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const uniqueId = uuidv4()
    console.log(couponInfo);
    // props.addCouponAction(uniqueId, couponInfo, selectedBranch)
  }

  const handleSubmitForEdit = e => {
    e.preventDefault()
    console.log("======================I am in the edit form==================")

    props.couponEditAction(location.state._id, couponInfo, selectedBranch)
  }

  console.log(props.add_coupon_loading)
  useEffect(() => {
    if (props.get_all_branch_loading == false) {
      props.getAllBranchAction()
    }

    console.log("add_coupon_loading :", props.add_coupon_loading)
    if (props.add_coupon_loading === "Success") {
      // redirect
      props.addCouponFresh()
      navigate("/coupon")
    }

    if (props.coupon_edit_loading === "Success") {
      // redirect
      props.couponEditFresh()
      navigate("/coupon")
    }
  }, [
    props.get_all_branch_loading,
    props.add_coupon_loading,
    props.coupon_edit_loading,
  ])

  console.log(props.get_all_branch_data)

  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Coupon"
              breadcrumbItem={location.state ? "Edit Coupon" : "Add Coupon"}
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
                          ? "Edit Coupon"
                          : "Add a New Coupon"}
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
                        value={couponInfo.name ?? ""}
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
                        value={couponInfo.description ?? ""}
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
                        value={couponInfo.start_date.slice(0, 16)}
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
                        value={couponInfo.end_date.slice(0, 16)}
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
                        {location.state ? "Edit Coupon" : "Add Coupon"}
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

  const { add_coupon_loading, coupon_edit_loading } = state.Coupon
  return {
    get_all_branch_loading,
    get_all_branch_data,
    add_coupon_loading,
    coupon_edit_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllBranchAction,
    addCouponAction,
    addCouponFresh,
    couponEditAction,
    couponEditFresh,
  })(AddCoupon)
)
