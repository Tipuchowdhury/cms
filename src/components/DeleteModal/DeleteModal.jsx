import React, { useState, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import withRouter from "components/Common/withRouter"
;` `
import { connect, useSelector, useDispatch } from "react-redux"
import {
  cityDeleteAction,
  getAllCityAction,
  cityDeleteFresh,
} from "store/zoneCity/actions"
import { toast } from "react-toastify"

function DeleteModal(props) {
  console.log(props.id)
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  const handleDelete = () => {
    toggle()
    props.cityDeleteAction(props.id)
  }
  console.log(props.city_delete_loading)
  useEffect(() => {
    if (props.city_delete_loading === "Success") {
      toast.success("City deleted Successfully")
      props.cityDeleteFresh()
      //props.getAllCityAction();
    }
  }, [props.city_delete_loading])

  return (
    <div style={{ justifyContent: "center" }}>
      <Button color="danger" onClick={toggle}>
        Delete
      </Button>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader
          className="text-center"
          style={{ textAlign: "center", margin: "0 auto" }}
        >
          <div className="icon-box">
            <i
              className="fa red-circle fa-trash"
              style={{ color: "red", fontSize: "40px" }}
            ></i>
          </div>
          <h2>Are you sure?</h2>
        </ModalHeader>
        <ModalBody>
          Do you really want to delete these records? This process cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>{" "}
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

//export default DeleteModal

const mapStateToProps = state => {
  const { get_all_city_loading, city_delete_loading } = state.zoneCity

  return {
    get_all_city_loading,
    city_delete_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    cityDeleteAction,
    getAllCityAction,
    cityDeleteFresh,
  })(DeleteModal)
)
