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
  addVoucherSettingAction,
  addVoucherSettingFresh,
  voucherSettingEditAction,
  voucherSettingEditFresh,
} from "store/actions"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function AddVoucherSetting(props) {
  const navigate = useNavigate()
  const location = useLocation()

  console.log(location.state)
  const [voucherSettingInfo, setVoucherSettingInfo] = useState({
    name: location.state ? location.state.name : "",
    image: location.state ? location.state.image : "",
    voucher_amount: location.state ? location.state.voucher_amount : 0,
    voucher_cost_in_point: location.state ? location.state.voucher_cost_in_point : 0,
    validity_time: location.state ? location.state.validity_time : 0,
    is_delivery: location.state ? location.state.is_delivery : false,
    is_pickup: location.state ? location.state.is_pickup : false,
    is_dine: location.state ? location.state.is_dine : false,
    is_active: location.state ? location.state.is_active : true,
  })

  let name, value, checked
  const handleInputs = e => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setVoucherSettingInfo({ ...voucherSettingInfo, [name]: value })
  }

  const handleCheckBox = (e) => {
    // console.log(e);
    name = e.target.name;
    checked = e.target.checked;
    setVoucherSettingInfo({ ...voucherSettingInfo, [name]: checked })

  }

  const handleSubmit = e => {
    e.preventDefault()
    const uniqueId = uuidv4()
    // console.log(voucherSettingInfo);
    props.addVoucherSettingAction(uniqueId, voucherSettingInfo)
  }

  const handleSubmitForEdit = e => {
    e.preventDefault()
    console.log("======================I am in the edit form==================")

    props.voucherSettingEditAction(
      location.state._id,
      voucherSettingInfo
    )
  }

  console.log(props.add_voucher_setting_loading)
  useEffect(() => {


    console.log(
      "add_voucher_setting_loading :",
      props.add_voucher_setting_loading
    )
    if (props.add_voucher_setting_loading === "Success") {
      // redirect
      props.addVoucherSettingFresh()
      navigate("/voucher_settings")
    }

    if (props.voucher_setting_edit_loading === "Success") {
      toast.success("Voucher Setting edited Successfully")
      // redirect
      props.voucherSettingEditFresh()
      navigate("/voucher_settings")
    }
  }, [
    props.add_voucher_setting_loading,
    props.voucher_setting_edit_loading,
  ])


  return (
    <>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              maintitle="Foodi"
              title="Voucher Setting"
              breadcrumbItem={
                location.state ? "Edit Voucher Setting" : "Add Voucher Setting"
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
                        marginBottom: "10px",
                        marginTop: "20px",
                        backgroundColor: "#1E417D",
                        padding: "15px",
                      }}
                    >
                      <CardTitle className="h4" style={{ color: "#FFFFFF" }}>
                        {location.state
                          ? "Edit Voucher Setting"
                          : "Add a New Voucher Setting"}
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
                    <label htmlFor="name" className="col-md-2 col-form-label" > Name
                    </label>
                    <div className="col-md-10">
                      <input type="text" className="form-control" id="name" placeholder="Enter name"
                        name="name" onChange={handleInputs} value={voucherSettingInfo.name ?? ""} required
                      />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label htmlFor="image" className="col-md-2 col-form-label">Image</label>
                    <div className="col-md-10">
                      <input type="file" className="form-control" id="image" onChange={e => console.log(e)} required />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label htmlFor="voucher_amount" className="col-md-2 col-form-label" > Voucher Amount
                    </label>
                    <div className="col-md-10">
                      <input type="text" className="form-control" id="voucher_amount" placeholder="Enter voucher amount" name="voucher_amount" onChange={handleInputs} value={voucherSettingInfo.voucher_amount ?? ""} required />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label htmlFor="voucher_cost_in_point" className="col-md-2 col-form-label" > Voucher Cost in Point
                    </label>
                    <div className="col-md-10">
                      <input type="text" className="form-control" id="voucher_cost_in_point" placeholder="Enter voucher cost in point" name="voucher_cost_in_point" onChange={handleInputs} value={voucherSettingInfo.voucher_cost_in_point ?? ""} required />
                    </div>
                  </Row>

                  <Row className="mb-3">
                    <label htmlFor="validity_time" className="col-md-2 col-form-label" > Validity Time
                    </label>
                    <div className="col-md-10">
                      <input type="number" className="form-control" id="validity_time" placeholder="Enter validity time" name="validity_time" onChange={handleInputs} value={voucherSettingInfo.validity_time ?? ""} required />
                    </div>
                  </Row>

                  <Row className="mb-3">

                    <div className="col-sm-4">
                      <div className="form-check">
                        <label className="form-check-label" htmlFor="is_delivery">Delivery</label>
                        <input type="checkbox" className="form-check-input" id="is_delivery" checked={voucherSettingInfo.is_delivery} name="is_delivery" onChange={handleCheckBox} />

                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-check">
                        <label className="form-check-label" htmlFor="is_pickup">Pickup</label>
                        <input type="checkbox" className="form-check-input" id="is_pickup" checked={voucherSettingInfo.is_pickup} name="is_pickup" onChange={handleCheckBox} />

                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="form-check">
                        <label className="form-check-label" htmlFor="is_dine">Dine</label>
                        <input type="checkbox" className="form-check-input" id="is_dine" checked={voucherSettingInfo.is_dine} name="is_dine" onChange={handleCheckBox} />

                      </div>
                    </div>

                  </Row>

                  <div className="mb-3 row">
                    <div className="col-12 text-end">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="submit"
                      >
                        {location.state
                          ? "Edit Voucher Setting"
                          : "Add Voucher Setting"}
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
  const { add_voucher_setting_loading, voucher_setting_edit_loading } =
    state.VoucherSetting
  return {
    add_voucher_setting_loading,
    voucher_setting_edit_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    addVoucherSettingAction,
    addVoucherSettingFresh,
    voucherSettingEditAction,
    voucherSettingEditFresh,
  })(AddVoucherSetting)
)
