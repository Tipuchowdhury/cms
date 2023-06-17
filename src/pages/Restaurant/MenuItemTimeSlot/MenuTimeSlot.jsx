import React, { useState, useEffect } from "react"
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
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
import { v4 as uuidv4 } from "uuid"
import DatatableTablesWorking from "pages/Tables/DatatableTablesWorking"
import { Link, useNavigate } from "react-router-dom"
import {
  getAllMenuTimeSlot,
  menuTimeSlotDeleteAction,
  menuTimeSlotDeleteFresh,
  editMenuTimeSlotStatusAction,
  editMenuTimeSlotStatusFresh,
} from "store/actions"

function MenuTimeSlot(props) {
  const navigate = useNavigate()

  const [editInfo, setEditInfo] = useState({})
  const [modalStatusUpdate, setModalStatusUpdate] = useState(false)
  const [modalDel, setModalDel] = useState(false)

  const [deleteItem, setDeleteItem] = useState()

  const toggleDel = () => setModalDel(!modalDel)
  const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate)

  const handleStatusModal = row => {
    setEditInfo(row)
    toggleStatus()
  }

  const handleStatusUpdate = () => {
    props.editMenuTimeSlotStatusAction({
      ...editInfo,
      is_active: !editInfo.is_active,
    })
  }

  const handleDeleteModal = row => {
    setDeleteItem(row._id)
    toggleDel()
  }

  const handleDelete = () => {
    props.menuTimeSlotDeleteAction(deleteItem)
  }

  const handleEdit = row => {
    // console.log(row);
    navigate("/add-time-slot", { state: row })
  }
  const actionRef = (cell, row) => (
    <div style={{ display: "flex", gap: 10 }}>
      <Button
        color="primary"
        className="btn btn-primary waves-effect waves-light"
        onClick={() => handleEdit(row)}
      >
        Edit
      </Button>{" "}
      <Button
        color="danger"
        className="btn btn-danger waves-effect waves-light"
        onClick={() => handleDeleteModal(row)}
      >
        Delete
      </Button>{" "}
    </div>
  )

  const statusRef = (cell, row) => (
    <Button
      color={row.is_active ? "success" : "secondary"}
      className="btn waves-effect waves-light"
      onClick={() => handleStatusModal(row)}
    >
      {row.is_active ? "Active" : "Deactivate"}
    </Button>
  )

  const activeData = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "",
      text: "Status",
      sort: true,
      formatter: statusRef,
    },
    {
      dataField: "hello",
      text: "Action",
      sort: true,
      formatter: actionRef,
    },
  ]
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ]

  useEffect(() => {
    if (props.get_all_menu_time_slot_loading == false) {
      props.getAllMenuTimeSlot()
    }
    if (props.menu_time_slot_delete_loading === "Success") {
      // console.log("I am in the delete")
      toast.success("Menu Time Slot Deleted")
      toggleDel()
      props.menuTimeSlotDeleteFresh()
    }

    if (props.edit_menu_time_slot_status_loading === "Success") {
      toast.success("Time Slot Status Updated")
      toggleStatus()
      props.editMenuTimeSlotStatusFresh()
    }

    if (props.edit_menu_time_slot_status_loading === "Failed") {
      toast.error("Something went wrong")
      // toggleEditModal();
      props.editMenuTimeSlotStatusFresh()
    }
  }, [
    props.get_all_menu_time_slot_loading,
    props.edit_menu_time_slot_status_loading,
  ])

  // console.log(props.get_all_menu_time_slot_data);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            maintitle="Foodi"
            title="Restaurant"
            breadcrumbItem="Menu Item TIme Slot"
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
                      Menu Time Slot
                    </CardTitle>
                    <Link to="/add-time-slot">
                      <Button
                        style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }}
                      >
                        Add Time Slot
                      </Button>
                    </Link>
                  </div>

                  {props.get_all_menu_time_slot_data ? (
                    props.get_all_menu_time_slot_data.length > 0 ? (
                      <DatatableTablesWorking
                        products={props.get_all_menu_time_slot_data}
                        columnData={activeData}
                        defaultSorted={defaultSorted}
                        key={props.get_all_menu_time_slot_data?._id}
                      />
                    ) : null
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ============ delete modal starts=============== */}
        <Modal isOpen={modalDel} toggle={toggleDel} centered>
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
            <Button color="secondary" onClick={toggleDel}>
              Cancel
            </Button>{" "}
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
        {/* ============ delete modal ends=============== */}

        {/* ============ status update modal starts=============== */}
        <Modal isOpen={modalStatusUpdate} toggle={toggleStatus} centered>
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
            Do you want to {editInfo.is_active ? "deactivate" : "activate"} this
            record?{" "}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleStatus}>
              Cancel
            </Button>{" "}
            <Button color="primary" onClick={handleStatusUpdate}>
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
  const {
    get_all_menu_time_slot_data,
    get_all_menu_time_slot_error,
    get_all_menu_time_slot_loading,
    menu_time_slot_delete_loading,
    edit_menu_time_slot_status_loading,
  } = state.Restaurant

  return {
    get_all_menu_time_slot_data,
    get_all_menu_time_slot_error,
    get_all_menu_time_slot_loading,
    menu_time_slot_delete_loading,
    edit_menu_time_slot_status_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    getAllMenuTimeSlot,
    menuTimeSlotDeleteAction,
    menuTimeSlotDeleteFresh,
    editMenuTimeSlotStatusAction,
    editMenuTimeSlotStatusFresh,
  })(MenuTimeSlot)
)
