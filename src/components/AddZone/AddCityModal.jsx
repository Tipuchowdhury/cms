import React, { useState } from "react"
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
} from "reactstrap"
import { connect } from "react-redux"
import withRouter from "components/Common/withRouter"

function AddCityModal(props) {
  return (
    <div>
      <Button
        color="primary"
        className="btn btn-primary btn-md waves-effect waves-light"
        onClick={toggle}
      >
        <i className="fas fa-folder-plus"></i> Add Zone
      </Button>{" "}
      <Modal isOpen={modal} toggle={toggle} centered backdrop={true} size="lg">
        <ModalHeader toggle={toggle}>Add Zone</ModalHeader>
        <ModalBody>
          <form className="mt-4" action="#">
            <div className="mb-3">
              <label className="form-label" htmlFor="area">
                Area Name
              </label>
              <input
                type="text"
                className="form-control"
                id="area"
                placeholder="Enter area name"
                name="area"
                required
              />
            </div>

            <div className="mb-3 row">
              <div className="col-12 text-end">
                <button
                  className="btn btn-primary w-md waves-effect waves-light"
                  type="submit"
                >
                  Add Zone
                </button>
              </div>
            </div>
          </form>
        </ModalBody>
        {/* <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter> */}
      </Modal>
    </div>
  )
}

//export default AddZoneModal;

const mapStateToProps = () => {
  // const {
  // } = gstate.property;
  // return {
  // };
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(
    GoogleApiWrapper({
      apiKey: "AIzaSyDJkREeL-PpO7Z45k-MsD5sJD_m1mzNGEk",
      LoadingContainer: LoadingContainer,
      v: "3",
    })(AddCityModal)
  )
)
